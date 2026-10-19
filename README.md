# 📬 Contact Portal & Lead Gateway

A modern, lightweight contact page and lead capture gateway. Built with end-to-end schema validation (Zod on both client and server), silent bot mitigation (honeypot), persistent storage in PostgreSQL, and real-time transactional email delivery with Resend.

<p align="left">
  <a href="https://agustinmilesi-contact.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-agustinmilesi--contact.vercel.app-f43f5e?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3-20232a?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
</p>

---

## 🎯 What is it for?

- **Reliable message capture**: An interactive form providing instant validation feedback through a shared Zod schema between client and server.
- **Silent anti-spam protection**: An invisible honeypot field catches automated web crawlers without bothering legitimate visitors with captchas.
- **Instant email notifications**: Dispatches formatted messages via Resend with the visitor's email address set as `Reply-To`.
- **Persistent cloud storage**: Inquiries are saved safely in serverless PostgreSQL (Neon) via Prisma ORM for record keeping.

---

## ✨ Key Features

- ⚡ **Dual-Layer Validation**: Single source of truth using a shared Zod schema between React Hook Form and Next.js Route Handlers.
- 🛡️ **Sanitization & Security**: Input cleaning and HTML entity escaping before email delivery to prevent injection attacks.
- 🎨 **Minimalist Glassmorphism UI**: Clean dark theme with smooth micro-interactions and toast notifications via Sonner.
- 💾 **Serverless Postgres Persistence**: Cloud database storage with built-in connection pooling for instant scaling.

---

## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (strictly typed)
- **Styling**: Tailwind CSS 4
- **Forms & Validation**: React Hook Form + Zod
- **Database**: PostgreSQL Serverless (Neon)
- **ORM**: Prisma ORM
- **Email Delivery**: Resend API
- **Notifications**: Sonner

---

## 🚀 Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/AgustinMilesi/contact.git
cd contact

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Generate Prisma client & start development server
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 🔗 Other Projects
- [💳 Retail Engine & POS](https://github.com/AgustinMilesi/retail) — Point of sale, atomic stock control, and cash drawer audits.
- [📥 Customer Inbox SaaS](https://github.com/AgustinMilesi/inbox) — Multi-tenant customer inquiry inbox and embeddable forms.
- [🌐 OneCargo Logistics](https://github.com/AgustinMilesi/cargo) — International freight forwarding, customs clearance, and container tracking.