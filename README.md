# 📬 Contact Page

A sleek, modern contact and outreach application built with Next.js, TypeScript, Tailwind CSS, and Neon PostgreSQL. Designed to capture high-intent inquiries with client/server schema validation, spam mitigation, and instant email dispatch via Resend.

![Live Demo Preview](https://img.shields.io/badge/Status-Live%20in%20Production-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=for-the-badge&logo=postgresql)

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
git clone https://github.com/AgustinMilesi/contact-page.git
cd contact-page

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
```

### ⚙️ Environment Variables

Edit your `.env` file with your credentials:

```env
# PostgreSQL connection string (Neon or local)
DATABASE_URL="postgresql://user:password@ep-xyz.neon.tech/neondb?sslmode=require"

# Resend API Key (get yours at resend.com)
RESEND_API_KEY="re_your_api_key"

# Email address where inquiries will be received
CONTACT_EMAIL="your-inbox@example.com"
```

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
contact-page/
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

## 📄 License

This project is licensed under the [MIT License](LICENSE).