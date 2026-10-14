import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/contact-schema";
import { escapeHtml } from "@/lib/escape-html";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    await prisma.contactMessage.create({ data });

    await resend.emails.send({
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}