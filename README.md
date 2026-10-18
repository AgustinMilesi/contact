# 📬 Contact Portal

A sleek, modern contact and outreach application built with Next.js, TypeScript, Tailwind CSS, and Neon PostgreSQL. Designed to capture high-intent inquiries with client/server schema validation, spam mitigation, and instant email dispatch via Resend.

![Live Demo Preview](https://img.shields.io/badge/Status-Live%20in%20Production-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=for-the-badge&logo=postgresql)
[![GitHub stars](https://img.shields.io/github/stars/AgustinMilesi/contact?style=for-the-badge&logo=github&color=gold)](https://github.com/AgustinMilesi/contact/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/AgustinMilesi/contact?style=for-the-badge&logo=github&color=blue)](https://github.com/AgustinMilesi/contact/network/members)

🌐 **Live Demo:** [agustinmilesi-contact.vercel.app](https://agustinmilesi-contact.vercel.app)

---

## ✨ Features & Highlights

- ⚡ **Dual-Layer Validation:** Single source of truth using a shared Zod schema on both React Hook Form (client) and Next.js Route Handlers (server).
- 🛡️ **Anti-Spam & Security:**
  - Invisible honeypot field traps automated spam crawlers.
  - Strict input sanitization and HTML escaping prior to email delivery.
  - Server-side body size constraints.
- ✉️ **Transactional Email Dispatch:** Dispatches formatted emails using Resend with visitor email configured as the `Reply-To` header.
- 💾 **Persistent Database Storage:** Automatically records all received inquiries in Neon Serverless PostgreSQL through Prisma ORM.
- 🎨 **Minimalist Glassmorphism UI:** Ultra-clean dark aesthetic, custom paper-airplane action icon, responsive multi-column layout, and interactive toasts via Sonner.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Server components, edge routing, Turbopack |
| **Language** | TypeScript 5 | Strict type checking & zero `any` policy |
| **Styling** | Tailwind CSS 4 | Custom dark mode palette with rose accents |
| **Forms & Validation** | React Hook Form + Zod | Shared schema, instant inline error states |
| **Database** | PostgreSQL (Neon) | Serverless Postgres with connection pooling |
| **ORM** | Prisma | Automated schema migrations & typed queries |
| **Email Service** | Resend | High deliverability transactional email API |
| **Notifications** | Sonner | Accessible, responsive notification toasts |
| **Hosting** | Vercel | Global CDN deployment and serverless compute |

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- **Node.js** 20.9+ installed
- A **PostgreSQL** database (a free database on [Neon.tech](https://neon.tech) works out of the box)
- A **Resend** account for email delivery (optional in development)

### Step-by-Step Installation

```bash
# 1. Clone the repository
git clone https://github.com/AgustinMilesi/contact.git
cd contact

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
```

### ⚙️ Environment Variables

| Variable | Required | Description | Example |
|---|:---:|---|---|
| `DATABASE_URL` | Yes | Neon pooled connection string (`-pooler.`) for Next.js runtime & queries | `postgresql://user:pass@ep-xyz-pooler.region.aws.neon.tech/neondb?sslmode=require` |
| `DIRECT_URL` | Yes | Neon direct unpooled connection string for Prisma migrations & schema changes | `postgresql://user:pass@ep-xyz.region.aws.neon.tech/neondb?sslmode=require` |
| `RESEND_API_KEY` | Yes | API key from [Resend](https://resend.com) for dispatching visitor messages | `re_your_api_key_here` |
| `CONTACT_EMAIL` | Yes | Destination email where visitor inquiries are delivered | `your-inbox@example.com` |

### 🔄 Database Migration & Start Server

```bash
# Run database migrations
npx prisma migrate dev --name init

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
contact/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # Server-side submission handler & email dispatcher
│   ├── components/
│   │   └── ContactForm.tsx      # Interactive contact form with paper airplane badge
│   ├── globals.css              # Dark theme base & Tailwind CSS directives
│   ├── layout.tsx               # Root application shell & Sonner toaster
│   └── page.tsx                 # Main landing view
├── lib/
│   ├── contact-schema.ts        # Shared Zod validation schema
│   ├── db.ts                    # Prisma database client singleton
│   └── email.ts                 # Resend API integration helper
├── prisma/
│   └── schema.prisma            # Message entity definition
└── package.json
```

---

## 🔒 Security Best Practices

1. **Input Sanitization:** Disallows raw HTML or script injections in message subject and body.
2. **Honeypot Traps:** Traps bots filling phantom inputs off-screen.
3. **Environment Security:** API keys are never exposed to the client bundle.

---

## 🌐 Complete Ecosystem Suite

This contact gateway is part of a unified 3-tier retail & commercial enterprise architecture:

| Component | Repository | Live Deployment | Role & Focus |
|---|---|---|---|
| **Retail Engine & POS** | [AgustinMilesi/retail](https://github.com/AgustinMilesi/retail) | [milesi-erp.vercel.app](https://milesi-erp.vercel.app) | Core cloud operating system, atomic inventory ledger, blind cash shifts, thermal ticket printing, and cashier POS. |
| **Customer Inbox Platform** | [AgustinMilesi/inbox](https://github.com/AgustinMilesi/inbox) | [saas-am.vercel.app](https://saas-am.vercel.app) | Multi-tenant customer inbox, embeddable contact forms, contact directory, and CRM leads bridge. |
| **Contact Portal** | [AgustinMilesi/contact](https://github.com/AgustinMilesi/contact) | [agustinmilesi-contact.vercel.app](https://agustinmilesi-contact.vercel.app) | High-intent lead generation portal, anti-spam validation gateway, and email delivery dispatch. *(This Repository)* |

---

## ⭐ Show Your Support

If you find this project useful or interesting, please give it a **Star** on GitHub! It helps more developers discover the ecosystem.

[![Star on GitHub](https://img.shields.io/static/v1?label=Star%20Repo&message=%E2%AD%90&color=yellow&style=for-the-badge&logo=github)](https://github.com/AgustinMilesi/contact)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).