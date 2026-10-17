"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

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
    "block text-[11px] font-medium uppercase tracking-[0.15em] text-slate-400 mb-2";
  const inputClass =
    "w-full bg-transparent border-0 border-b border-white/10 px-0 py-3 text-lg text-white placeholder:text-slate-600 outline-none transition focus:border-rose-400";

  return (
    <div className="w-full max-w-6xl grid md:grid-cols-5 gap-12 md:gap-20">
      <div className="md:col-span-3 space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-light text-white leading-tight">
            Let&apos;s build
          </h1>
          <h1 className="text-5xl md:text-6xl font-light text-white leading-tight">
            something
          </h1>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            great together.
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 pt-6">
          <div>
            <input
              {...register("name")}
              placeholder="Name"
              aria-label="Name"
              className={inputClass}
            />
            {errors.name && (
              <p className="text-rose-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              aria-label="Email"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-rose-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("subject")}
              placeholder="Subject"
              aria-label="Subject"
              className={inputClass}
            />
            {errors.subject && (
              <p className="text-rose-400 text-xs mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("message")}
              placeholder="Tell me about your project..."
              aria-label="Message"
              rows={3}
              className={`${inputClass} resize-none`}
            />
            {errors.message && (
              <p className="text-rose-400 text-xs mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Honeypot: off-screen, people never fill it in */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            {...register("website")}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-rose-400 hover:bg-rose-500 disabled:bg-rose-400/50 text-slate-900 font-semibold rounded-full transition-colors text-sm uppercase tracking-wider"
            >
              {loading ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </div>

      <div className="md:col-span-2 space-y-8 md:pt-24">
        <div className="w-14 h-14 rounded-full bg-rose-400 flex items-center justify-center shadow-lg shadow-rose-400/20">
          <svg
            className="w-6 h-6 text-slate-900 translate-x-0.5 -translate-y-0.5"
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

        <div className="space-y-6">
          <div>
            <p className={labelClass}>Email</p>
            <p className="text-white text-lg">agusmilesi2002@gmail.com</p>
          </div>

          <div>
            <p className={labelClass}>LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/agustin-milesi-1982281b6/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-lg hover:text-rose-400 transition"
            >
              @agustin-milesi
            </a>
          </div>

          <div>
            <p className={labelClass}>GitHub</p>
            <a
              href="https://github.com/AgustinMilesi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-lg hover:text-rose-400 transition"
            >
              @AgustinMilesi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}