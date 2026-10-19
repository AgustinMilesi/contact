# 📬 Contact Portal & Lead Gateway

Portal de contacto rápido y captura de oportunidades comerciales. Diseñado con validación dual estricta (Zod en cliente y servidor), protección anti-spam silenciosa (honeypot), almacenamiento persistente en PostgreSQL y despacho de emails transaccionales en tiempo real con Resend.

<p align="left">
  <a href="https://agustinmilesi-contact.vercel.app"><img src="https://img.shields.io/badge/Demo%20en%20Vivo-agustinmilesi--contact.vercel.app-f43f5e?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3-20232a?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
</p>

---

## 🎯 ¿Para qué sirve?

- **Captura confiable de mensajes**: Formulario interactivo con retroalimentación inmediata de errores mediante esquemas Zod compartidos entre frontend y backend.
- **Protección anti-spam transparente**: Trampa honeypot invisible que bloquea bots automatizados sin interrumpir al usuario con captchas molestos.
- **Entrega de correo inmediata**: Envío transaccional a través de la API de Resend, configurando automáticamente el correo del visitante en el encabezado `Reply-To`.
- **Registro persistente**: Cada mensaje se almacena de forma segura en una base de datos PostgreSQL Serverless en Neon mediante Prisma ORM.

---

## ✨ Características Principales

- ⚡ **Validación Dual con Zod**: Mismo esquema de validación consumido por React Hook Form y por los Route Handlers de Next.js.
- 🛡️ **Seguridad y Sanitización**: Sanitización estricta de strings y escape de HTML para prevenir inyecciones antes del despacho.
- 🎨 **Interfaz Glassmorphism**: Estética moderna en modo oscuro, micro-interacciones suaves y notificaciones con Sonner.
- 💾 **Persistencia Serverless**: Base de datos Postgres en la nube con pooling de conexiones para despliegue sin servidor.

---

## 🛠️ Stack Tecnológico

- **Frontend & Backend**: Next.js 16 (App Router) + React 19
- **Lenguaje**: TypeScript (tipado estricto)
- **Estilos**: Tailwind CSS 4
- **Formularios & Validación**: React Hook Form + Zod
- **Base de Datos**: PostgreSQL Serverless en Neon
- **ORM**: Prisma
- **Servicio de Email**: Resend API
- **Notificaciones**: Sonner Toasts

---

## 🚀 Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/AgustinMilesi/contact.git
cd contact

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Generar cliente Prisma y correr
npx prisma generate
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

### 🔗 Otros Proyectos
- [💳 Retail Engine & POS](https://github.com/AgustinMilesi/retail) — Punto de venta, arqueo ciego de caja y control de inventario.
- [📥 Customer Inbox SaaS](https://github.com/AgustinMilesi/inbox) — Bandeja de entrada multi-inquilino y formularios embebibles.
- [🌐 OneCargo Logistics](https://github.com/AgustinMilesi/cargo) — Sistema operativo de fletes internacionales y despacho de aduana.