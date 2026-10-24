import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { PreferencesProvider } from "@/components/PreferencesProvider";
import { CookieBanner } from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agustinmilesi-contact.vercel.app"),
  title: "Agustín Milesi · VOUT Connect — Sovereign Cloud & Full Stack Architecture",
  description:
    "Official gateway and contact portal for Agustín Milesi. Direct channels for enterprise software engineering, POS retail hardware integration, and VOUT cloud applications.",
  applicationName: "VOUT Connect",
  keywords: [
    "Agustín Milesi",
    "Full Stack Developer",
    "React Native",
    "Next.js",
    "VOUT Ecosystem",
    "Point of Sale",
    "SaaS Architecture",
    "TypeScript",
  ],
  authors: [{ name: "Agustín Milesi", url: "https://github.com/AgustinMilesi" }],
  creator: "Agustín Milesi",
  publisher: "VOUT Ecosystem",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Agustín Milesi · VOUT Connect Gateway",
    description:
      "Direct inbound channel and architecture portfolio. Production-grade POS, SaaS, Freight Logistics, and Mobile Finance apps.",
    url: "https://agustinmilesi-contact.vercel.app",
    siteName: "VOUT Connect",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VOUT Connect · Agustín Milesi Software Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agustín Milesi · VOUT Connect Gateway",
    description: "Sovereign Inbound Gateway & Full Stack Engineering Ecosystem.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://agustinmilesi-contact.vercel.app/#person",
      name: "Agustín Milesi",
      jobTitle: "Lead Full Stack & Mobile Software Architect",
      url: "https://agustinmilesi-contact.vercel.app",
      sameAs: ["https://github.com/AgustinMilesi"],
      worksFor: {
        "@type": "Organization",
        name: "VOUT Software Ecosystem",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://agustinmilesi-contact.vercel.app/#website",
      url: "https://agustinmilesi-contact.vercel.app",
      name: "VOUT Connect",
      publisher: {
        "@id": "https://agustinmilesi-contact.vercel.app/#person",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0E14] text-white selection:bg-[var(--primary-accent)] selection:text-[var(--primary-accent-text)] transition-colors duration-200">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PreferencesProvider>
          {children}
          <CookieBanner />
          <Toaster position="top-right" richColors />
        </PreferencesProvider>
      </body>
    </html>
  );
}