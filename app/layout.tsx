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
  title: "VOUT Connect — Enterprise Inbound Hub & Managed Cloud Solutions",
  description: "Inbound communications hub, ecosystem live access and cloud support for VOUT applications.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0E14] text-white selection:bg-[var(--primary-accent)] selection:text-[var(--primary-accent-text)] transition-colors duration-200">
        <PreferencesProvider>
          {children}
          <CookieBanner />
          <Toaster position="top-right" richColors />
        </PreferencesProvider>
      </body>
    </html>
  );
}