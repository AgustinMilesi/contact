"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { PreferencesControls } from "@/components/PreferencesControls";
import { PreferencesBlock } from "@/components/PreferencesBlock";

const INQUIRY_SCOPES = [
  { id: "enterprise", label: "⚡ Enterprise Cloud", preset: "Enterprise Deployment & Custom Cloud Setup" },
  { id: "retail", label: "🛒 VOUT Retail (ERP)", preset: "VOUT Retail & Point of Sale Integration" },
  { id: "vout", label: "📱 VOUT Mobile & Web", preset: "VOUT Personal Finance & Cloud Sync Architecture" },
  { id: "inbox", label: "📬 VOUT Inbox (CRM)", preset: "VOUT Inbox & Unified Inbound Pipeline" },
  { id: "cargo", label: "🚢 VOUT Cargo (Freight)", preset: "VOUT Cargo & Customs Automation" },
  { id: "security", label: "🔐 Security & SLA", preset: "Dedicated Instance & Security Architecture" },
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedScope, setSelectedScope] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const messageVal = watch("message", "");

  const handleSelectScope = (scope: typeof INQUIRY_SCOPES[0]) => {
    setSelectedScope(scope.id);
    setValue("subject", scope.preset, { shouldValidate: true });
    toast.info(`Inquiry scope set: ${scope.label}`);
  };

  const copyInboundEmail = async () => {
    try {
      await navigator.clipboard.writeText("inbound@vout.network");
      setCopiedEmail(true);
      toast.success("Enterprise endpoint copied: inbound@vout.network");
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  const onSubmit = async (data: ContactInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 429) {
        toast.error("Rate limit reached. Please wait 60 seconds before sending another message.");
        return;
      }

      if (!res.ok) throw new Error();

      toast.success("Transmission received. VOUT Gateway has queued your message securely.");
      reset();
      setSelectedScope(null);
    } catch {
      toast.error("Transmission failed. Please verify your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const labelClass =
    "block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted,#94A3B8)] mb-1.5 flex items-center justify-between";
  const inputClass =
    "w-full bg-[var(--bg-card-subtle,#0A0E14)] border border-[var(--border-card,#1E293B)] rounded-2xl px-4 py-3.5 text-sm font-medium text-[var(--text-main,#ffffff)] placeholder:text-[var(--text-muted,#64748B)] outline-none transition-all duration-200 focus:bg-[#0D121B] focus:border-[var(--primary-accent)] focus:ring-4 focus:ring-[var(--primary-accent-shadow)] shadow-inner";

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-between min-h-[90vh] py-4 space-y-10 animate-smooth-in">
      {/* 1. Elevated Header with Telemetry Status Banner */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-card,#1E293B)]">
        <div className="flex items-center gap-3.5">
          {/* Official VOUT Vc Monogram */}
          <div className="size-11 rounded-2xl bg-[#0A0E14] border border-[#1E293B] flex items-center justify-center shadow-[0_0_20px_rgba(198,248,39,0.3)] transition-transform hover:scale-105 shrink-0">
            <span className="font-black text-2xl bg-gradient-to-br from-[#C6F827] via-[#10B981] to-[#00FF88] bg-clip-text text-transparent flex items-baseline leading-none select-none pl-0.5">
              V<span className="text-[12px] font-black text-[#C6F827] ml-0.5">c</span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-tight text-lg text-[var(--text-main,#ffffff)] block leading-none">
                Agustín Milesi
              </span>
              <span className="text-slate-600 text-xs font-mono">/</span>
              <span className="font-bold tracking-tight text-sm text-[var(--primary-accent)] block leading-none">
                VOUT Gateway
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#121824] border border-[#1E293B] text-[var(--primary-accent)] font-bold">
                v1.0.1
              </span>
            </div>
            <span className="text-xs text-[var(--text-muted,#94A3B8)] font-medium">
              Full Stack &amp; Mobile Software Architect · Creator of VOUT Ecosystem
            </span>
          </div>
        </div>

        {/* Telemetry pill and appearance controls */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A0E14] border border-[#1E293B] text-[11px] font-mono text-[var(--text-muted,#94A3B8)]">
            <span className="size-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[var(--text-main,#ffffff)] font-bold">EDGE-LATAM-01</span>
            <span className="text-slate-600">|</span>
            <span className="text-[#C6F827]">99.99% UPTIME</span>
            <span className="text-slate-600">|</span>
            <span className="text-[10px]">TLS 1.3</span>
          </div>
          <PreferencesControls />
        </div>
      </header>

      {/* 2. Main Two-Column Layout */}
      <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start my-auto py-4">
        {/* Left Column: Thesis Headline and Elevated Form */}
        <div className="md:col-span-3 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] border border-[var(--primary-accent)]/20 mb-2">
              <span className="size-1.5 rounded-full bg-[var(--primary-accent)]" />
              Sovereign Inbound Channel
            </div>
            <h1 className="text-4xl sm:text-5xl leading-tight tracking-tight">
              <span className="block font-light text-[var(--text-muted,#94A3B8)]">Engineered for</span>
              <span className="block font-black text-[var(--text-main,#ffffff)]">Autonomous</span>
              <span className="block font-black text-[var(--primary-accent)]">Digital Commerce.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted,#94A3B8)] pt-2 max-w-xl font-normal leading-relaxed">
              Deploy managed cloud instances, integrate POS retail hardware, connect freight pipelines, or request custom architecture audits directly through the VOUT Gateway.
            </p>
          </div>

          <div className="clay-card p-6 sm:p-8 rounded-3xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] shadow-2xl relative overflow-hidden">
            {/* Subtle atmospheric ambient glow */}
            <div className="absolute -top-24 -right-24 size-60 bg-[var(--primary-accent)]/5 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
              {/* Inquiry Scope Pills (Distinctive, Non-Generic Architecture) */}
              <div className="space-y-2">
                <label className={labelClass}>
                  <span>Inquiry Scope</span>
                  <span className="text-[10px] font-mono text-[var(--primary-accent)]">Direct Preset</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_SCOPES.map((scope) => (
                    <button
                      key={scope.id}
                      type="button"
                      onClick={() => handleSelectScope(scope)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
                        selectedScope === scope.id
                          ? "bg-[var(--primary-accent)] text-[var(--primary-accent-text,#0A0E14)] font-bold border-[var(--primary-accent)] shadow-[0_0_12px_var(--primary-accent-shadow)]"
                          : "bg-[#0A0E14] text-[var(--text-muted,#94A3B8)] border-[#1E293B] hover:border-[var(--primary-accent)]/50 hover:text-[var(--text-main,#ffffff)]"
                      }`}
                    >
                      {scope.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email in 2 columns on tablet/desktop */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="name">
                    <span>Authorized Name</span>
                    <span className="text-[10px] text-slate-500 font-mono">Required</span>
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    placeholder="Full name or Corporate Lead"
                    aria-label="Name"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass} htmlFor="email">
                    <span>Corporate Email</span>
                    <span className="text-[10px] text-slate-500 font-mono">TLS Verified</span>
                  </label>
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
              </div>

              {/* Subject */}
              <div>
                <label className={labelClass} htmlFor="subject">
                  <span>Subject / Scope Specification</span>
                </label>
                <input
                  id="subject"
                  {...register("subject")}
                  placeholder="Deployment inquiry, migration or custom SLA"
                  aria-label="Subject"
                  className={inputClass}
                />
                {errors.subject && (
                  <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.subject.message}</p>
                )}
              </div>

              {/* Message with live character telemetry */}
              <div>
                <label className={labelClass} htmlFor="message">
                  <span>Project Overview &amp; Technical Requirements</span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {messageVal.length} / 5000
                  </span>
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  placeholder="Specify system volume, expected user base, target infrastructure, and timeline requirements..."
                  aria-label="Message"
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.message.message}</p>
                )}
              </div>

              {/* Anti-Bot Silent Honeypot Trap */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                {...register("website")}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              {/* Submit Button & Security Disclaimer */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="clay-btn w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#C6F827] to-[#10B981] text-[#0A0E14] font-black rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 select-none cursor-pointer shadow-[0_10px_24px_rgba(198,248,39,0.35)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="size-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Encrypting Payload...</span>
                    </>
                  ) : (
                    <>
                      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      <span>Dispatch Inbound Transmission</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted,#64748B)]">
                  <svg className="size-3.5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>TLS 1.3 Vaulted · No Data Reselling</span>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Telemetry & Ecosystem Architecture */}
        <div className="md:col-span-2 space-y-6 md:pt-14">
          <div className="clay-card p-6 sm:p-7 rounded-3xl space-y-6 bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] shadow-2xl">
            {/* Top Security & Direct Channels */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-card,#1E293B)]">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-[#0A0E14] border border-[#1E293B] flex items-center justify-center shadow-[0_0_15px_rgba(198,248,39,0.25)]">
                  <span className="font-black text-xl bg-gradient-to-br from-[#C6F827] via-[#10B981] to-[#00FF88] bg-clip-text text-transparent flex items-baseline leading-none select-none pl-0.5">
                    V<span className="text-[11px] font-black text-[#C6F827] ml-0.5">c</span>
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-main,#ffffff)]">Direct Channels</h3>
                  <p className="text-[11px] text-[var(--text-muted,#94A3B8)] font-mono">SLA &amp; Enterprise Routing</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                ACTIVE
              </span>
            </div>

            <div className="space-y-3">
              {/* Official Inbound Email with Copy Button */}
              <div className="bg-[var(--bg-card-subtle,#0A0E14)] p-3.5 rounded-2xl border border-[var(--border-card,#1E293B)] flex items-center justify-between group">
                <div className="min-w-0 pr-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted,#64748B)]">Primary Inbound Endpoint</p>
                  <p className="text-sm font-mono font-bold text-[var(--text-main,#ffffff)] truncate">
                    inbound@vout.network
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyInboundEmail}
                  className="px-3 py-1.5 rounded-xl bg-[#121824] border border-[#1E293B] hover:border-[var(--primary-accent)] text-xs text-[var(--primary-accent)] font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs active:scale-95"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <svg className="size-3.5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Security & Bug Bounty / SLA Endpoint */}
              <div className="bg-[var(--bg-card-subtle,#0A0E14)] p-3.5 rounded-2xl border border-[var(--border-card,#1E293B)] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted,#64748B)]">Security &amp; Vulnerability</p>
                  <p className="text-sm font-mono font-bold text-[var(--text-main,#ffffff)]">
                    security@vout.network
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#121824] text-[var(--text-muted,#94A3B8)] border border-[#1E293B]">
                  PGP Key
                </span>
              </div>
            </div>

            {/* Live Ecosystem Nodes with Micro Telemetry */}
            <div className="pt-3 border-t border-[var(--border-card,#1E293B)] space-y-3">
              <div className="flex items-center justify-between">
                <p className={labelClass}>Ecosystem Node Network</p>
                <span className="text-[10px] font-mono text-[#10B981] flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  All Nodes Online
                </span>
              </div>

              <div className="flex flex-col gap-2.5 text-xs">
                {/* Node 1: VOUT Retail */}
                <a
                  href="https://milesi-erp.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-card-subtle,#0A0E14)] border border-[var(--border-card,#1E293B)] hover:border-[#C6F827]/60 hover:shadow-[0_0_15px_rgba(198,248,39,0.2)] font-bold text-[var(--text-main,#ffffff)] transition group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="size-7 rounded-xl bg-[#121824] border border-[#1E293B] flex items-center justify-center text-[12px] font-black leading-none text-[#C6F827]">
                      V<span className="text-[10px] text-[#10B981]">r</span>
                    </span>
                    <div>
                      <span className="block leading-none">VOUT Retail</span>
                      <span className="text-[10px] text-[var(--text-muted,#64748B)] font-normal">Offline-First ERP &amp; POS</span>
                    </div>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">~11ms</span>
                    <span className="text-[11px] text-[var(--primary-accent)] group-hover:translate-x-0.5 transition-transform">↗</span>
                  </div>
                </a>

                {/* Node 2: VOUT Inbox */}
                <a
                  href="https://saas-am.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-card-subtle,#0A0E14)] border border-[var(--border-card,#1E293B)] hover:border-[#C6F827]/60 hover:shadow-[0_0_15px_rgba(198,248,39,0.2)] font-bold text-[var(--text-main,#ffffff)] transition group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="size-7 rounded-xl bg-[#121824] border border-[#1E293B] flex items-center justify-center text-[12px] font-black leading-none text-[#C6F827]">
                      V<span className="text-[10px] text-[#10B981]">i</span>
                    </span>
                    <div>
                      <span className="block leading-none">VOUT Inbox</span>
                      <span className="text-[10px] text-[var(--text-muted,#64748B)] font-normal">Distributed CRM &amp; Relay</span>
                    </div>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">~14ms</span>
                    <span className="text-[11px] text-[var(--primary-accent)] group-hover:translate-x-0.5 transition-transform">↗</span>
                  </div>
                </a>

                {/* Node 3: VOUT Cargo */}
                <a
                  href="https://cargo-am.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-card-subtle,#0A0E14)] border border-[var(--border-card,#1E293B)] hover:border-[#C6F827]/60 hover:shadow-[0_0_15px_rgba(198,248,39,0.2)] font-bold text-[var(--text-main,#ffffff)] transition group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="size-7 rounded-xl bg-[#121824] border border-[#1E293B] flex items-center justify-center text-[12px] font-black leading-none text-[#C6F827]">
                      V<span className="text-[10px] text-[#10B981]">g</span>
                    </span>
                    <div>
                      <span className="block leading-none">VOUT Cargo</span>
                      <span className="text-[10px] text-[var(--text-muted,#64748B)] font-normal">Global Freight &amp; Customs OS</span>
                    </div>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">~16ms</span>
                    <span className="text-[11px] text-[var(--primary-accent)] group-hover:translate-x-0.5 transition-transform">↗</span>
                  </div>
                </a>

                {/* Node 4: VOUT Web & Mobile */}
                <a
                  href="https://vout-web.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-card-subtle,#0A0E14)] border border-[var(--border-card,#1E293B)] hover:border-[#C6F827]/60 hover:shadow-[0_0_15px_rgba(198,248,39,0.2)] font-bold text-[var(--text-main,#ffffff)] transition group"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="size-7 rounded-xl bg-[#121824] border border-[#1E293B] flex items-center justify-center text-[12px] font-black leading-none text-[#C6F827]">
                      V<span className="text-[10px] text-[#10B981]">p</span>
                    </span>
                    <div>
                      <span className="block leading-none">VOUT Web &amp; Mobile</span>
                      <span className="text-[10px] text-[var(--text-muted,#64748B)] font-normal">Personal Finance Cloud Sync</span>
                    </div>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">~9ms</span>
                    <span className="text-[11px] text-[var(--primary-accent)] group-hover:translate-x-0.5 transition-transform">↗</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Security Compliance Posture */}
            <div className="pt-3 border-t border-[var(--border-card,#1E293B)]">
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[var(--text-muted,#94A3B8)]">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#0A0E14] border border-[#1E293B]">
                  <span className="size-1.5 rounded-full bg-[#C6F827]" />
                  <span>ISO 27001 Stance</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#0A0E14] border border-[#1E293B]">
                  <span className="size-1.5 rounded-full bg-[#10B981]" />
                  <span>Zero Data Reselling</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Block (Color and Mode) */}
          <PreferencesBlock compact />
        </div>
      </div>

      {/* 3. Confident & Clean Footer */}
      <footer className="pt-6 border-t border-[var(--border-card,#1E293B)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted,#94A3B8)]">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span>© {new Date().getFullYear()} Agustín Milesi.</span>
          <span className="text-slate-600">·</span>
          <span>VOUT Software Ecosystem.</span>
          <span className="text-slate-600">·</span>
          <a
            href="https://github.com/AgustinMilesi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary-accent)] hover:underline font-bold"
          >
            github.com/AgustinMilesi ↗
          </a>
        </div>
        <div className="flex items-center gap-5 text-[11px]">
          <a href="/legal" className="hover:text-[var(--primary-accent)] transition font-mono">
            SLA &amp; Compliance
          </a>
          <a href="/legal" className="hover:text-[var(--primary-accent)] transition font-mono">
            Security Policy
          </a>
          <span className="font-bold text-[var(--primary-accent)] font-mono">
            VOUT Design System
          </span>
        </div>
      </footer>
    </div>
  );
}
