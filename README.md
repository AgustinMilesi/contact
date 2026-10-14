# 📬 Contact Page

A modern, full-stack contact form built with Next.js. Features client & server validation, PostgreSQL persistence, and real email delivery.

![Contact Page](./public/Screenshot.png)

## 🚀 Live Demo

**[agustinmilesi-contact.vercel.app](https://agustinmilesi-contact.vercel.app)**

## ✨ Features

- Client + server validation with Zod
- Messages persisted in PostgreSQL via Prisma
- Email delivery with Resend
- Toast notifications (Sonner)
- Fully responsive
- Dark premium UI with Tailwind CSS
- TypeScript end-to-end

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod |
| Database | PostgreSQL (Neon) + Prisma |
| Emails | Resend |
| Notifications | Sonner |
| Deploy | Vercel |

## 📦 Local Setup

Clone the repo and install dependencies:

    git clone https://github.com/AgustinMilesi/contact-page.git
    cd contact-page
    npm install
    cp .env.example .env
    npx prisma migrate dev
    npm run dev

## 🔑 Environment Variables

Create a `.env` file in the root with:

    DATABASE_URL="postgresql://..."
    RESEND_API_KEY="re_your_api_key"
    CONTACT_EMAIL="your@email.com"

## 📄 License

MIT