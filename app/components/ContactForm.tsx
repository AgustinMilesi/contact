"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { PreferencesControls } from "@/components/PreferencesControls";
import { PreferencesBlock } from "@/components/PreferencesBlock";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const labelClass =
    "block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted,#94A3B8)] mb-1.5";
  const inputClass =
    "w-full bg-[var(--bg-card-subtle,#0F1520)] border border-[var(--border-card,#1E293B)] rounded-2xl px-4 py-3 text-sm font-medium text-[var(--text-main,#ffffff)] placeholder:text-[var(--text-muted,#94A3B8)] outline-none transition-all duration-200 focus:bg-[var(--bg-card,#121824)] focus:border-[var(--primary-accent)] focus:ring-4 focus:ring-[var(--primary-accent-shadow)] shadow-inner";

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-between min-h-[90vh] py-4 space-y-10 animate-smooth-in">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between pb-4 border-b border-[var(--border-card,#1E293B)]">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-[#0A0E14] border border-[#1E293B] flex items-center justify-center shadow-[0_0_15px_rgba(198,248,39,0.25)] transition-transform hover:scale-105">
            <span className="font-black text-xl bg-gradient-to-br from-[#C6F827] via-[#10B981] to-[#00FF88] bg-clip-text text-transparent flex items-baseline leading-none select-none pl-0.5">
              V<span className="text-[11px] font-black text-[#C6F827] ml-0.5">c</span>
            </span>
          </div>
          <div>
            <span className="font-black tracking-tight text-base text-[var(--text-main,#ffffff)] block leading-none">
              VOUT Connect
            </span>
            <span className="text-xs text-[var(--text-muted,#94A3B8)] font-medium">Inbound Gateway &amp; Enterprise Onboarding</span>
          </div>
        </div>
        <PreferencesControls />
      </header>

      {/* Main Two-Column Layout */}
      <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start my-auto py-6">
        {/* Left Column: Headline and Form Card */}
        <div className="md:col-span-3 space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[var(--text-muted,#94A3B8)] leading-tight">
              Let&apos;s build
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[var(--text-muted,#94A3B8)] leading-tight">
              something
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--primary-accent)] leading-tight">
              great together.
            </h1>
          </div>

          <div className="clay-card p-6 sm:p-8 rounded-3xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="name">Name</label>
                <input
                  id="name"
                  {...register("name")}
                  placeholder="Your full name"
                  aria-label="Name"
                  className={inputClass}
                />
                {errors.name && (
                  <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="name@company.com"
                  aria-label="Email"
                  className={inputClass}
                />
                {errors.email && (
                  <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  {...register("subject")}
                  placeholder="Project inquiry or proposal"
                  aria-label="Subject"
                  className={inputClass}
                />
                {errors.subject && (
                  <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="message">Message</label>
                <textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell me about your project, timeline, and goals..."
                  aria-label="Message"
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.message.message}</p>
                )}
              </div>

              {/* Honeypot: off-screen */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                {...register("website")}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="clay-btn w-full sm:w-auto px-8 py-3.5 text-[var(--primary-accent-text,#0A0E14)] font-black rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 select-none cursor-pointer shadow-[0_10px_24px_var(--primary-accent-shadow)]"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span>{loading ? "Sending..." : "Send message"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Contact Details Card */}
        <div className="md:col-span-2 space-y-6 md:pt-16">
          <div className="clay-card p-6 sm:p-8 rounded-3xl space-y-6 bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] shadow-2xl">
            <div className="size-14 rounded-2xl bg-[#0A0E14] border border-[#1E293B] flex items-center justify-center shadow-[0_0_20px_rgba(198,248,39,0.3)]">
              <span className="font-black text-3xl bg-gradient-to-br from-[#C6F827] via-[#10B981] to-[#00FF88] bg-clip-text text-transparent flex items-baseline leading-none select-none pl-1">
                V<span className="text-base font-black text-[#C6F827] ml-0.5">c</span>
              </span>
            </div>

            <div className="space-y-5">
              <div className="bg-[var(--bg-card-subtle,#0F1520)] p-4 rounded-2xl border border-[var(--border-card,#1E293B)]">
                <p className={labelClass}>Direct Email</p>
                <a
                  href="mailto:agusmilesi2002@gmail.com"
                  className="text-base font-bold text-[var(--text-main,#ffffff)] hover:text-[var(--primary-accent)] transition-colors break-all flex items-center gap-2.5 group/email"
                >
                  <svg className="size-4 shrink-0 text-[var(--text-muted,#94A3B8)] group-hover/email:text-[var(--primary-accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>agusmilesi2002@gmail.com</span>
                </a>
              </div>

              <div className="bg-[var(--bg-card-subtle,#0F1520)] p-4 rounded-2xl border border-[var(--border-card,#1E293B)]">
                <p className={labelClass}>LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/agustin-milesi-1982281b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-[var(--text-main,#ffffff)] hover:text-[var(--primary-accent)] transition-colors flex items-center justify-between group/in"
                >
                  <span className="flex items-center gap-2.5">
                    <svg className="size-4 shrink-0 text-[var(--text-muted,#94A3B8)] group-hover/in:text-[var(--primary-accent)] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>Agustín Milesi</span>
                  </span>
                  <span className="text-xs text-[var(--primary-accent)] font-semibold">Connect →</span>
                </a>
              </div>

              <div className="bg-[var(--bg-card-subtle,#0F1520)] p-4 rounded-2xl border border-[var(--border-card,#1E293B)]">
                <p className={labelClass}>GitHub</p>
                <a
                  href="https://github.com/AgustinMilesi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-[var(--text-main,#ffffff)] hover:text-[var(--primary-accent)] transition-colors flex items-center justify-between group/gh"
                >
                  <span className="flex items-center gap-2.5">
                    <svg className="size-4 shrink-0 text-[var(--text-muted,#94A3B8)] group-hover/gh:text-[var(--primary-accent)] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    <span>@AgustinMilesi</span>
                  </span>
                  <span className="text-xs text-[var(--primary-accent)] font-semibold">Repositories →</span>
                </a>
              </div>
            </div>

            {/* Live Ecosystem Demos */}
            <div className="pt-4 border-t border-[var(--border-card,#1E293B)] space-y-3">
              <p className={labelClass}>Ecosystem Projects</p>
              <div className="flex flex-col gap-2 text-xs">
                <a
                  href="https://milesi-erp.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[var(--bg-card-subtle,#0F1520)] border border-[var(--border-card,#1E293B)] hover:border-[#C6F827]/60 hover:shadow-[0_0_12px_rgba(198,248,39,0.2)] font-bold text-[var(--text-main,#ffffff)] transition group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="size-6 rounded-lg bg-[#0A0E14] border border-[#1E293B] flex items-center justify-center text-[11px] font-black leading-none text-[#C6F827]">
                      V<span className="text-[9px] text-[#10B981]">r</span>
                    </span>
                    <span>VOUT Retail (ERP &amp; POS)</span>
                  </span>
                  <span className="text-[11px] text-[var(--text-muted,#94A3B8)] group-hover:text-[#C6F827] transition">Live Demo ↗</span>
                </a>
                <a
                  href="https://saas-am.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[var(--bg-card-subtle,#0F1520)] border border-[var(--border-card,#1E293B)] hover:border-[#C6F827]/60 hover:shadow-[0_0_12px_rgba(198,248,39,0.2)] font-bold text-[var(--text-main,#ffffff)] transition group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="size-6 rounded-lg bg-[#0A0E14] border border-[#1E293B] flex items-center justify-center text-[11px] font-black leading-none text-[#C6F827]">
                      V<span className="text-[9px] text-[#10B981]">i</span>
                    </span>
                    <span>VOUT Inbox (SaaS CRM)</span>
                  </span>
                  <span className="text-[11px] text-[var(--text-muted,#94A3B8)] group-hover:text-[#C6F827] transition">Live Demo ↗</span>
                </a>
                <a
                  href="https://sap-logistics.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[var(--bg-card-subtle,#0F1520)] border border-[var(--border-card,#1E293B)] hover:border-[#C6F827]/60 hover:shadow-[0_0_12px_rgba(198,248,39,0.2)] font-bold text-[var(--text-main,#ffffff)] transition group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="size-6 rounded-lg bg-[#0A0E14] border border-[#1E293B] flex items-center justify-center text-[11px] font-black leading-none text-[#C6F827]">
                      V<span className="text-[9px] text-[#10B981]">g</span>
                    </span>
                    <span>VOUT Cargo (Global Freight)</span>
                  </span>
                  <span className="text-[11px] text-[var(--text-muted,#94A3B8)] group-hover:text-[#C6F827] transition">Live Demo ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Preferences Block (Color and Mode) */}
          <PreferencesBlock compact />
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-6 border-t border-[var(--border-card,#1E293B)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted,#94A3B8)]">
        <p>© {new Date().getFullYear()} Agustín Milesi · VOUT Ecosystem.</p>
        <div className="flex items-center gap-4">
          <a href="/legal" className="hover:text-[var(--primary-accent)] transition">
            Términos &amp; Privacidad
          </a>
          <span className="font-semibold text-[var(--primary-accent)]">VOUT Pocket Design System</span>
        </div>
      </footer>
    </div>
  );
}
