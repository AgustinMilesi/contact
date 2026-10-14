import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/contact-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    await prisma.contactMessage.create({ data });

    await resend.emails.send({
      from: "Contact Page <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `Nuevo mensaje: ${data.subject}`,
      replyTo: data.email,
      html: `
        <h2>Nuevo mensaje desde tu portfolio</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Asunto:</strong> ${data.subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}