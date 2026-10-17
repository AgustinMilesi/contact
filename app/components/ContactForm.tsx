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
    "block text-[11px] font-bold uppercase tracking-[0.15em] text-[#72729A] mb-1.5";
  const inputClass =
    "w-full bg-[#F8F9FE] border border-[#E2E1F4] rounded-2xl px-4 py-3 text-sm font-medium text-[#18182E] placeholder:text-[#94A3B8] outline-none transition-all duration-200 focus:bg-white focus:border-[#5E48E8] focus:ring-4 focus:ring-[#5E48E8]/15 shadow-inner";

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-between min-h-[90vh] py-4 space-y-10 animate-smooth-in">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between pb-4 border-b border-[#EAE9F6]">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-gradient-to-br from-[#6852F6] to-[#5538EA] flex items-center justify-center text-white font-black text-sm shadow-[0_4px_12px_rgba(85,56,234,0.35)]">
            AM
          </div>
          <div>
            <span className="font-bold tracking-tight text-base text-[#18182E] block leading-none">
              Agustín Milesi
            </span>
            <span className="text-xs text-[#72729A] font-medium">Full Stack Developer</span>
          </div>
        </div>
        <PreferencesControls />
      </header>

      {/* Main Two-Column Layout */}
      <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start my-auto py-6">
        {/* Left Column: Headline and Clay Form Card */}
        <div className="md:col-span-3 space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#64748B] leading-tight">
              Let&apos;s build
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#64748B] leading-tight">
              something
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#5E48E8] leading-tight">
              great together.
            </h1>
          </div>

          <div className="clay-card p-6 sm:p-8 rounded-3xl">
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
                  className="clay-btn w-full sm:w-auto px-8 py-3.5 text-white font-bold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 select-none cursor-pointer"
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
          <div className="clay-card p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="size-14 rounded-2xl bg-gradient-to-br from-[#6852F6] to-[#5538EA] flex items-center justify-center shadow-[0_10px_24px_rgba(85,56,234,0.35)] text-white">
              <svg
                className="w-7 h-7 translate-x-0.5 -translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>

            <div className="space-y-5">
              <div className="bg-[#F8F9FE] p-4 rounded-2xl border border-[#EAE9F6]">
                <p className={labelClass}>Direct Email</p>
                <a
                  href="mailto:agusmilesi2002@gmail.com"
                  className="text-base font-bold text-[#18182E] hover:text-[#5E48E8] transition-colors break-all"
                >
                  agusmilesi2002@gmail.com
                </a>
              </div>

              <div className="bg-[#F8F9FE] p-4 rounded-2xl border border-[#EAE9F6]">
                <p className={labelClass}>LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/agustin-milesi-1982281b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-[#18182E] hover:text-[#5E48E8] transition-colors flex items-center justify-between"
                >
                  <span>Agustín Milesi</span>
                  <span className="text-xs text-[#5E48E8]">Connect →</span>
                </a>
              </div>

              <div className="bg-[#F8F9FE] p-4 rounded-2xl border border-[#EAE9F6]">
                <p className={labelClass}>GitHub</p>
                <a
                  href="https://github.com/AgustinMilesi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-[#18182E] hover:text-[#5E48E8] transition-colors flex items-center justify-between"
                >
                  <span>@AgustinMilesi</span>
                  <span className="text-xs text-[#5E48E8]">Repositories →</span>
                </a>
              </div>
            </div>

            {/* Live Ecosystem Demos */}
            <div className="pt-4 border-t border-[#EAE9F6] space-y-3">
              <p className={labelClass}>Ecosystem Projects</p>
              <div className="flex flex-col gap-2 text-xs">
                <a
                  href="https://milesi-erp.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-[#EAE9F6] hover:border-[#5E48E8] hover:text-[#5E48E8] font-bold text-[#18182E] transition shadow-xs"
                >
                  <span>Milesi ERP & POS</span>
                  <span className="text-[11px] text-[#72729A]">Live Demo ↗</span>
                </a>
                <a
                  href="https://saas-am.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-[#EAE9F6] hover:border-[#5E48E8] hover:text-[#5E48E8] font-bold text-[#18182E] transition shadow-xs"
                >
                  <span>Contact SaaS</span>
                  <span className="text-[11px] text-[#72729A]">Live Demo ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Preferences Block (Color and Mode) */}
          <PreferencesBlock compact />
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-6 border-t border-[#EAE9F6] flex flex-wrap items-center justify-between gap-4 text-xs text-[#72729A]">
        <p>© 2026 Agustín Milesi · Full Stack Developer · ERP & SaaS Architect.</p>
        <span className="font-medium text-[#5E48E8]">Claymorphism Design System</span>
      </footer>
    </div>
  );
}