"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Min. 2 characters"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Min. 3 characters"),
  message: z.string().min(10, "Min. 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
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
      
      {/* LEFT: Form */}
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
              rows={3}
              className={`${inputClass} resize-none`}
            />
            {errors.message && (
              <p className="text-rose-400 text-xs mt-1">{errors.message.message}</p>
            )}
          </div>

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

      {/* RIGHT: Contact info */}
      <div className="md:col-span-2 space-y-8 md:pt-24">
        <div className="w-14 h-14 rounded-full bg-rose-400 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-slate-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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