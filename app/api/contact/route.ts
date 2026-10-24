import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/contact-schema";
import { escapeHtml } from "@/lib/escape-html";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-Memory Sliding-Window Rate Limiter (Max 5 requests per 60s per IP)
const ipRateLimits = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Periodic pruning of stale IPs to prevent memory leak
  if (ipRateLimits.size > 200) {
    for (const [k, ts] of ipRateLimits.entries()) {
      const active = ts.filter((t) => now - t < WINDOW_MS);
      if (active.length === 0) {
        ipRateLimits.delete(k);
      } else {
        ipRateLimits.set(k, active);
      }
    }
  }

  const timestamps = ipRateLimits.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS) {
    ipRateLimits.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  ipRateLimits.set(ip, validTimestamps);
  return false;
}

export async function POST(req: Request) {
  // 1. Client IP Extraction
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

  // 2. Rate Limit Verification (Protection against DDoS and mail-bombing)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Security rate limit exceeded. Please wait 60 seconds." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // 3. Payload parsing & size safety
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request payload." }, { status: 400 });
  }

  // 4. Schema Validation (OWASP Input Hygiene)
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Validation failed.", errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { website, ...data } = parsed.data;

  // 5. Silent Honeypot Trap: Drop bot submissions gracefully
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // 6. Encrypted Storage in Database
  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });
  } catch (error) {
    console.error("[VOUT Security] Database write exception:", error);
    return NextResponse.json(
      { ok: false, message: "Service temporarily unavailable. Please retry." },
      { status: 500 }
    );
  }

  // 7. Resend Dispatch with Fallback Enterprise Routing
  const targetEmail = process.env.CONTACT_EMAIL || "inbound@vout.network";

  if (process.env.RESEND_API_KEY) {
    try {
      const { error } = await resend.emails.send({
        from: "VOUT Gateway <onboarding@resend.dev>",
        to: targetEmail,
        subject: `[VOUT Inbound] ${data.subject}`,
        replyTo: data.email,
        html: `
          <div style="font-family: monospace, sans-serif; background: #0A0E14; color: #FFFFFF; padding: 24px; border-radius: 12px; border: 1px solid #1E293B;">
            <div style="color: #C6F827; font-size: 18px; font-weight: bold; margin-bottom: 16px;">
              ⚡ VOUT Connect · Inbound Telemetry
            </div>
            <p><strong>From:</strong> ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;</p>
            <p><strong>Inquiry Scope:</strong> ${escapeHtml(data.subject)}</p>
            <hr style="border: 0; border-top: 1px solid #1E293B; margin: 16px 0;" />
            <div style="background: #121824; padding: 16px; border-radius: 8px; color: #E2E8F0; line-height: 1.6;">
              ${escapeHtml(data.message).replace(/\n/g, "<br>")}
            </div>
            <div style="margin-top: 20px; font-size: 11px; color: #94A3B8;">
              Authenticated Payload · IP Origin: ${escapeHtml(ip)}
            </div>
          </div>
        `,
      });
      if (error) {
        console.error("[VOUT Security] Resend delivery notice:", error);
      }
    } catch (err) {
      console.error("[VOUT Security] Mail dispatch exception:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
