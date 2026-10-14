import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/contact-schema";
import { escapeHtml } from "@/lib/escape-html";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { website, ...data } = parsed.data;

  // A real person never sees this field. If it has content, it's a bot:
  // answer as if everything went fine and drop the message.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await prisma.contactMessage.create({ data });
  } catch (error) {
    console.error("Could not save the contact message", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  // The message is already stored, so if the email fails we log it
  // and still tell the visitor it went through.
  try {
    const { error } = await resend.emails.send({
      from: "Contact Page <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `Nuevo mensaje: ${data.subject}`,
      replyTo: data.email,
      html: `
        <h2>Nuevo mensaje desde tu portfolio</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Asunto:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
      `,
    });
    if (error) console.error("Resend could not send the email", error);
  } catch (error) {
    console.error("Resend request failed", error);
  }

  return NextResponse.json({ ok: true });
}