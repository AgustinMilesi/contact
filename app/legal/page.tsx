import Link from "next/link";
import { PreferencesControls } from "@/components/PreferencesControls";

export const metadata = {
  title: "Términos Legales, Privacidad & SLA · VOUT",
  description: "Contrato de Servicio Administrado Cloud, Política de Privacidad, SLA 99.9% y Cookies del Ecosistema VOUT.",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#0A0E14] text-slate-100 p-4 sm:p-8 lg:p-12 animate-smooth-in">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Header */}
        <header className="flex items-center justify-between pb-6 border-b border-[#1E293B]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="size-9 rounded-2xl bg-[var(--primary-accent)] text-[var(--primary-accent-text)] flex items-center justify-center font-black text-sm shadow-[var(--primary-accent-shadow)] transition-transform group-hover:scale-105">
              V
            </div>
            <div>
              <span className="font-black text-white text-base block leading-none">VOUT</span>
              <span className="text-[11px] text-slate-400 font-medium">Centro Legal &amp; Contratos Cloud</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <PreferencesControls />
            <Link
              href="/"
              className="text-xs font-bold text-[var(--primary-accent)] hover:underline underline-offset-4"
            >
              ← Volver al inicio
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121824] border border-[#1E293B] text-[11px] font-mono font-bold text-[var(--primary-accent)]">
            <span className="size-2 rounded-full bg-[var(--primary-accent)]" />
            <span>Última actualización: Octubre 2026 · Versión 3.0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Marco Legal, Contrato de Hosting &amp; Privacidad
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            El ecosistema VOUT opera bajo el modelo de Software Administrado en la Nube (Managed SaaS). Proveemos la infraestructura de alta disponibilidad, copias de seguridad continuas, monitoreo preventivo y soporte técnico integral.
          </p>
        </div>

        {/* Document Sections */}
        <div className="space-y-8">
          {/* 1. Contrato de Hosting y Servicio Administrado */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#121824] border border-[#1E293B] space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] flex items-center justify-center font-black text-sm">
                01
              </span>
              <h2 className="text-xl font-bold text-white">
                Contrato de Servicio Administrado &amp; Hosting Cloud
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1">
              <p>
                <strong>1.1. Naturaleza del Servicio:</strong> VOUT comercializa el aprovisionamiento, alojamiento (hosting) de alto rendimiento, mantenimiento preventivo y correctivo, y administración de bases de datos de las aplicaciones del ecosistema (VOUT Retail, VOUT Inbox, VOUT Cargo y VOUT). No se realiza venta ni cesión del código fuente propietario ni de derechos patrimoniales sobre los desarrollos de software.
              </p>
              <p>
                <strong>1.2. Mantenimiento y Actualizaciones:</strong> La suscripción mensual o anual incluye el despliegue automático de actualizaciones de seguridad, optimizaciones de rendimiento y mejoras continuas de interfaz sin costo de desarrollo adicional.
              </p>
              <p>
                <strong>1.3. Copias de Seguridad (Backups):</strong> El servicio implementa respaldos automatizados continuos de todas las bases de datos de clientes, con redundancia geográfica para garantizar la recuperación ante cualquier contingencia.
              </p>
              <p>
                <strong>1.4. Titularidad y Soberanía de los Datos:</strong> Todos los datos comerciales, inventarios, transacciones contables, registros de carga y clientes ingresados en las plataformas son de exclusiva propiedad del suscriptor. El cliente puede exportar la totalidad de su información en formatos abiertos estándar en cualquier momento.
              </p>
            </div>
          </section>

          {/* 2. Acuerdo de Nivel de Servicio (SLA) */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#121824] border border-[#1E293B] space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] flex items-center justify-center font-black text-sm">
                02
              </span>
              <h2 className="text-xl font-bold text-white">
                Acuerdo de Nivel de Servicio (SLA 99.9%)
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1">
              <p>
                <strong>2.1. Disponibilidad Garantizada:</strong> Nos comprometemos a mantener un tiempo de actividad del servicio (uptime) de al menos el <strong>99.9%</strong> anual, excluyendo ventanas de mantenimiento preventivo previamente notificadas en horarios de menor impacto operativo.
              </p>
              <p>
                <strong>2.2. Monitoreo Proactivo 24/7/365:</strong> Los servidores y microservicios son monitoreados de manera ininterrumpida con detección temprana de anomalías, auto-escalado ante picos de demanda y alertas automatizadas.
              </p>
              <p>
                <strong>2.3. Tiempos de Respuesta ante Incidentes:</strong> Las solicitudes de soporte clasificadas como críticas (aquellas que interrumpen el cobro o emisión de operaciones) recibirán atención prioritaria en un plazo menor a 2 horas.
              </p>
            </div>
          </section>

          {/* 3. Política de Privacidad y Protección de Datos */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#121824] border border-[#1E293B] space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] flex items-center justify-center font-black text-sm">
                03
              </span>
              <h2 className="text-xl font-bold text-white">
                Política de Privacidad &amp; Protección de Datos (GDPR)
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1">
              <p>
                <strong>3.1. Confidencialidad Absoluta:</strong> VOUT jamás comercializa, cede, arrienda ni comparte las bases de datos de clientes, proveedores o finanzas con terceras entidades publicitarias o intermediarios de datos.
              </p>
              <p>
                <strong>3.2. Cifrado de Información:</strong> Toda comunicación entre clientes y servidores se transmite encriptada mediante protocolo TLS 1.3 (HTTPS), y los datos sensibles en almacenamiento persistente se encuentran resguardados con cifrado estándar de la industria (AES-256).
              </p>
              <p>
                <strong>3.3. Aislamiento Multi-Tenant:</strong> La información de cada suscriptor se encuentra estrictamente aislada a nivel de esquema o claves de inquilino (tenant isolation), impidiendo cualquier acceso cruzado no autorizado.
              </p>
              <p>
                <strong>3.4. Derechos del Titular (ARCO):</strong> El suscriptor puede ejercer en cualquier momento sus derechos de acceso, rectificación, cancelación y oposición respecto a sus credenciales de cuenta contactando a nuestro equipo de soporte.
              </p>
            </div>
          </section>

          {/* 4. Política de Cookies y Almacenamiento Local */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#121824] border border-[#1E293B] space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] flex items-center justify-center font-black text-sm">
                04
              </span>
              <h2 className="text-xl font-bold text-white">
                Política de Cookies &amp; Almacenamiento Local
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1">
              <p>
                <strong>4.1. Qué Cookies Utilizamos:</strong> VOUT utiliza únicamente cookies técnicas estrictamente necesarias para la autenticación segura de usuarios (JWT de sesión con atributo HttpOnly y SameSite=Lax) y la prevención de falsificación de peticiones (CSRF).
              </p>
              <p>
                <strong>4.2. Almacenamiento Local (LocalStorage / AsyncStorage):</strong> Se almacena exclusivamente información de preferencias de usuario del lado del cliente, tales como:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-3 text-slate-400">
                <li>Tema visual (Modo Oscuro / Modo Claro).</li>
                <li>Paleta de acento de diseño (Lime, Emerald, Indigo, Rose, Amber, Cyan, Violet).</li>
                <li>Idioma seleccionado para la interfaz (Español, Inglés, Portugués, Chino).</li>
                <li>Estado de consentimiento de cookies y caché local fuera de línea.</li>
              </ul>
              <p className="pt-1">
                <strong>4.3. Ausencia de Cookies de Terceros:</strong> Nuestras aplicaciones web y móviles no contienen píxeles de rastreo publicitario de redes sociales, brokers de datos ni código de analítica intrusiva.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="pt-8 pb-12 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} VOUT Ecosystem · Infraestructura Administrada en la Nube.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[var(--primary-accent)] transition">
              Inicio
            </Link>
            <a href="mailto:soporte@vout.cloud" className="hover:text-[var(--primary-accent)] transition">
              Canal de Soporte &amp; SLA ↗
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
