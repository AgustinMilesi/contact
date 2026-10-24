"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { PreferencesControls } from "@/components/PreferencesControls";

const INQUIRY_SCOPES = [
  { id: "enterprise", label: "Enterprise Cloud", preset: "Enterprise Deployment & Custom Cloud Setup" },
  { id: "retail", label: "VOUT Retail (ERP)", preset: "VOUT Retail & Point of Sale Integration" },
  { id: "vout", label: "VOUT Mobile & Web", preset: "VOUT Personal Finance & Cloud Sync Architecture" },
  { id: "inbox", label: "VOUT Inbox (CRM)", preset: "VOUT Inbox & Unified Inbound Pipeline" },
  { id: "cargo", label: "VOUT Cargo (Freight)", preset: "VOUT Cargo & Customs Automation" },
  { id: "security", label: "Security & SLA", preset: "Dedicated Instance & Security Architecture" },
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
    "block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-1 flex items-center justify-between";
  const inputClass =
    "w-full bg-[#0D121B] border border-[#1E293B] rounded-2xl px-3.5 py-2.5 text-sm font-medium text-white placeholder:text-slate-500 outline-none transition-colors duration-150 focus:border-slate-500 focus:ring-1 focus:ring-slate-500";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col justify-between min-h-screen space-y-6 sm:space-y-8 animate-smooth-in">
      {/* 1. Header Superior */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E293B]">
        <div className="flex items-center gap-3">
          {/* Official VOUT Vc Monogram - Clean Matte, Zero Glow */}
          <div className="size-10 sm:size-11 rounded-2xl bg-[#121824] border border-[#1E293B] flex items-center justify-center transition-transform hover:scale-105 shrink-0 shadow-sm">
            <span className="font-bold text-xl text-[#c6f827] flex items-baseline leading-none select-none tracking-tight">
              V<span className="text-[11px] font-semibold text-slate-400 ml-0.5">c</span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base sm:text-lg text-white block leading-none">
                Agustín Milesi
              </span>
              <span className="text-slate-600 text-xs font-mono">/</span>
              <span className="font-medium tracking-tight text-xs sm:text-sm text-slate-300 block leading-none">
                VOUT Gateway
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#121824] border border-[#1E293B] text-slate-400 font-medium">
                v1.0.1
              </span>
            </div>
            <span className="text-[11px] sm:text-xs text-slate-400 font-normal">
              Full Stack &amp; Mobile Software Architect · Creator of VOUT Ecosystem
            </span>
          </div>
        </div>

        {/* Telemetry pill and appearance controls */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A0E14] border border-[#1E293B] text-[11px] font-mono text-slate-400">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="text-white font-medium">EDGE-LATAM-01</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">99.99% UPTIME</span>
            <span className="text-slate-600">|</span>
            <span className="text-[10px]">TLS 1.3</span>
          </div>
          <PreferencesControls />
        </div>
      </header>

      {/* 2. Main Two-Column Harmonious Layout */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start my-auto">
        {/* Left Column (5/12): Identity, Thesis Headline & Direct Node Network */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#121824] text-[#c6f827] border border-[#1E293B]">
              <span className="size-1.5 rounded-full bg-[#c6f827]" />
              Sovereign Inbound Channel
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[38px] font-black text-white leading-[1.12] tracking-tight">
              Engineered for <span className="block font-light text-slate-400">Autonomous</span> Digital Commerce.
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
              Deploy managed cloud instances, integrate POS retail hardware, connect freight pipelines, or request custom architecture audits directly through the VOUT Gateway.
            </p>
          </div>

          {/* Direct Channels & Ecosystem Card */}
          <div className="clay-card p-5 sm:p-6 rounded-3xl space-y-5 bg-[#121824] border border-[#1E293B] shadow-lg">
            {/* Direct Channels Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-xl bg-[#0D121B] border border-[#1E293B] flex items-center justify-center shadow-sm">
                  <span className="font-bold text-sm text-[#c6f827] leading-none">
                    V<span className="text-[9px] text-slate-400">c</span>
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Direct Channels</h3>
                  <p className="text-[10px] text-slate-400 font-mono">SLA &amp; Enterprise Routing</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                ACTIVE
              </span>
            </div>

            {/* Endpoints */}
            <div className="space-y-2.5">
              {/* Primary Inbound Email with Copy Button */}
              <div className="bg-[#0D121B] p-3 rounded-2xl border border-[#1E293B] flex items-center justify-between group">
                <div className="min-w-0 pr-2">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Primary Inbound Endpoint</p>
                  <p className="text-xs font-mono font-bold text-white truncate">
                    inbound@vout.network
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyInboundEmail}
                  className="px-2.5 py-1 rounded-xl bg-[#121824] border border-[#1E293B] hover:border-slate-500 text-[11px] text-slate-200 font-medium transition flex items-center gap-1 shrink-0 cursor-pointer shadow-xs active:scale-95"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <svg className="size-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Security Endpoint */}
              <div className="bg-[#0D121B] p-3 rounded-2xl border border-[#1E293B] flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Security &amp; Vulnerability</p>
                  <p className="text-xs font-mono font-bold text-white">
                    security@vout.network
                  </p>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#121824] text-slate-400 border border-[#1E293B]">
                  PGP Key
                </span>
              </div>
            </div>

            {/* Live Ecosystem Nodes with Micro Telemetry */}
            <div className="pt-2 border-t border-[#1E293B] space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Ecosystem Node Network</p>
                <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  All Nodes Online
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Node 1: VOUT Retail */}
                <a
                  href="https://milesi-erp.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-[#0D121B] border border-[#1E293B] hover:border-slate-500 font-bold text-white transition group shadow-sm"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="size-6 rounded-lg bg-[#182030] border border-[#1E293B] flex items-center justify-center text-[10px] font-bold text-[#c6f827] shrink-0">
                      Vr
                    </span>
                    <span className="text-[11px] truncate leading-tight">VOUT Retail</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 shrink-0">~11ms</span>
                </a>

                {/* Node 2: VOUT Inbox */}
                <a
                  href="https://saas-am.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-[#0D121B] border border-[#1E293B] hover:border-slate-500 font-bold text-white transition group shadow-sm"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="size-6 rounded-lg bg-[#182030] border border-[#1E293B] flex items-center justify-center text-[10px] font-bold text-[#c6f827] shrink-0">
                      Vi
                    </span>
                    <span className="text-[11px] truncate leading-tight">VOUT Inbox</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 shrink-0">~14ms</span>
                </a>

                {/* Node 3: VOUT Cargo */}
                <a
                  href="https://cargo-am.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-[#0D121B] border border-[#1E293B] hover:border-slate-500 font-bold text-white transition group shadow-sm"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="size-6 rounded-lg bg-[#182030] border border-[#1E293B] flex items-center justify-center text-[10px] font-bold text-[#c6f827] shrink-0">
                      Vg
                    </span>
                    <span className="text-[11px] truncate leading-tight">VOUT Cargo</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 shrink-0">~16ms</span>
                </a>

                {/* Node 4: VOUT Web */}
                <a
                  href="https://vout-web.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-[#0D121B] border border-[#1E293B] hover:border-slate-500 font-bold text-white transition group shadow-sm"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="size-6 rounded-lg bg-[#182030] border border-[#1E293B] flex items-center justify-center text-[10px] font-bold text-[#c6f827] shrink-0">
                      Vp
                    </span>
                    <span className="text-[11px] truncate leading-tight">VOUT Web</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 shrink-0">~9ms</span>
                </a>
              </div>
            </div>

            {/* Security Compliance Posture */}
            <div className="pt-2 border-t border-[#1E293B]">
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#0D121B] border border-[#1E293B]">
                  <span className="size-1.5 rounded-full bg-slate-400" />
                  <span>ISO 27001 Stance</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#0D121B] border border-[#1E293B]">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <span>Zero Data Reselling</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7/12): High-Efficiency Interactive Gateway Form Card */}
        <div className="lg:col-span-7">
          <div className="clay-card p-6 sm:p-7 rounded-3xl bg-[#121824] border border-[#1E293B] shadow-xl relative overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#c6f827]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-white">Direct Transmission Gateway</h2>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-[#0D121B] px-2.5 py-0.5 rounded-full border border-[#1E293B]">
                SECURE ENDPOINT
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
              {/* Inquiry Scope Pills */}
              <div className="space-y-1.5">
                <label className={labelClass}>
                  <span>Inquiry Scope</span>
                  <span className="text-[9px] font-mono text-slate-400">Select Preset</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {INQUIRY_SCOPES.map((scope) => (
                    <button
                      key={scope.id}
                      type="button"
                      onClick={() => handleSelectScope(scope)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
                        selectedScope === scope.id
                          ? "bg-[#c6f827] text-[#0a0e14] font-bold border-[#c6f827] shadow-xs"
                          : "bg-[#0A0E14] text-slate-400 border-[#1E293B] hover:border-slate-600 hover:text-white"
                      }`}
                    >
                      {scope.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className={labelClass} htmlFor="name">
                    <span>Authorized Name</span>
                    <span className="text-[9px] font-mono text-slate-500">Required</span>
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    placeholder="e.g. Alex Mercer"
                    aria-label="Your Name"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-rose-500 text-xs mt-1 font-medium">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass} htmlFor="email">
                    <span>Enterprise Email</span>
                    <span className="text-[9px] font-mono text-slate-500">Verified Dispatch</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="alex@enterprise.corp"
                    aria-label="Your Email"
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Routing Subject */}
              <div>
                <label className={labelClass} htmlFor="subject">
                  <span>Routing Subject</span>
                  <span className="text-[9px] font-mono text-slate-500">Triage Classification</span>
                </label>
                <input
                  id="subject"
                  {...register("subject")}
                  placeholder="e.g. Inbound Retail POS Hardware Integration"
                  aria-label="Subject"
                  className={inputClass}
                />
                {errors.subject && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className={labelClass} htmlFor="message">
                  <span>Project Overview &amp; Technical Requirements</span>
                  <span className="text-[9px] font-mono text-slate-500">
                    {messageVal.length} / 5000
                  </span>
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  placeholder="Specify system volume, expected user base, target infrastructure, and timeline requirements..."
                  aria-label="Message"
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{errors.message.message}</p>
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

              {/* Submit Button & Security Disclaimer - Clean Matte, No Glow */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-7 py-3 bg-[#c6f827] hover:bg-[#b4e518] text-[#0a0e14] font-bold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 select-none cursor-pointer active:scale-95 transition-all disabled:opacity-50 shadow-sm"
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

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <svg className="size-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>TLS 1.3 Vaulted · No Data Reselling</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Footer */}
      <footer className="pt-4 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span>© 2026 Agustín Milesi.</span>
          <span className="text-slate-600">·</span>
          <span>VOUT Software Ecosystem.</span>
          <span className="text-slate-600">·</span>
          <a
            href="https://github.com/AgustinMilesi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline font-bold"
          >
            github.com/AgustinMilesi ↗
          </a>
        </div>
        <div className="flex items-center gap-5 text-[11px]">
          <a href="/legal" className="hover:text-white transition font-mono">
            SLA &amp; Compliance
          </a>
          <a href="/legal" className="hover:text-white transition font-mono">
            Security Policy
          </a>
          <span className="font-medium text-slate-400 font-mono">
            VOUT Architecture
          </span>
        </div>
      </footer>
    </div>
  );
}
