<div align="center">

# 📬 VOUT Connect
### Managed Inbound Gateway, Enterprise Onboarding & Anti-Bot Hub

[![VOUT Ecosystem](https://img.shields.io/badge/VOUT-Managed_Cloud-C6F827?style=for-the-badge&logoColor=black&labelColor=0A0E14)](https://github.com/AgustinMilesi)
[![SLA](https://img.shields.io/badge/SLA-99.9%25_Uptime-C6F827?style=for-the-badge&logo=shield&logoColor=black&labelColor=0A0E14)](https://agustinmilesi-contact.vercel.app/legal)
[![Live Demo](https://img.shields.io/badge/Live_Service-agustinmilesi--contact.vercel.app-C6F827?style=for-the-badge&logo=vercel&logoColor=black&labelColor=0A0E14)](https://agustinmilesi-contact.vercel.app)
[![Legal Framework](https://img.shields.io/badge/Legal-SLA_%26_Privacy-10B981?style=for-the-badge&logoColor=white&labelColor=0A0E14)](https://agustinmilesi-contact.vercel.app/legal)

<p align="center">
  <strong>Portal central de contacto, acceso corporativo y canal de enlace para el ecosistema gestionado VOUT.</strong>
</p>

</div>

---

## 🎯 Modelo de Servicio Administrado (Managed SaaS)

**VOUT Connect** es la puerta de entrada pública para clientes, prospectos y socios del ecosistema:
- 🚀 **Zero-DevOps:** Gateway en la nube de alta disponibilidad, protegido contra sobrecargas y ataques de bots.
- ⚡ **Validación en Doble Capa:** Esquemas Zod unificados entre React Hook Form y Server Actions de Next.js, con 4 tests automáticos de cobertura.
- 🛡️ **Defensa Anti-Spam Silenciosa:** Trampa de campo honeypot que neutraliza envíos automatizados sin fricción de captchas para humanos.
- 📬 **Despacho Inmediato de Notificaciones:** Enrutamiento transaccional vía Resend con cabeceras `Reply-To` directas.
- 💾 **Persistencia Cloud:** Registro seguro en PostgreSQL serverless (Neon) mediante Prisma ORM.
- 🌐 **Directorio del Ecosistema:** Enlaces en vivo hacia las instancias administradas de VOUT Retail, VOUT Inbox y VOUT Cargo.

---

## 🛠️ Stack Tecnológico

`Next.js 16` • `React 19` • `TypeScript` • `PostgreSQL Serverless (Neon)` • `Prisma ORM` • `Tailwind CSS v4` • `Zod` • `Resend API`

---

## ⚙️ Operación & Mantenimiento Interno

```bash
# Verificación de compilación y tipado
npm run typecheck

# Suite de pruebas automatizadas (esquema y honeypot)
npm test

# Sincronización de esquema de datos
npx prisma db push
```

---

<div align="center">
  <p>© 2026 VOUT Connect · Managed Cloud Inbound Gateway.</p>
</div>
