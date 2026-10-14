# 📬 Contact Page

A modern, full-stack contact form built with Next.js. Features client & server validation, database persistence, and real email delivery.

## ✨ Features

- Client + server validation with Zod
- Messages persisted in SQLite via Prisma
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
| Database | SQLite + Prisma |
| Emails | Resend |
| Notifications | Sonner |

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

    DATABASE_URL="file:./dev.db"
    RESEND_API_KEY="re_your_api_key"
    CONTACT_EMAIL="your@email.com"

## 📄 License

MIT