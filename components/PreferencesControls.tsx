"use client";

import { useState } from "react";
import { usePreferences, THEMES } from "@/components/PreferencesProvider";

export function PreferencesControls() {
  const { theme, setTheme, mode, setMode } = usePreferences();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#72729A] hover:text-[#5E48E8] transition-all py-1.5 px-3 rounded-xl bg-white border border-[#EAE9F6] shadow-xs hover:shadow-sm select-none cursor-pointer"
        title="Customization & Preferences"
        aria-label="Open appearance preferences"
      >
        {/* Sun / Moon icon */}
        {mode === "dark" ? (
          <svg className="size-3.5 text-[#72729A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg className="size-3.5 text-[#72729A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}

        {/* Color accent dot */}
        <span
          className="size-2 rounded-full shadow-xs"
          style={{ backgroundColor: THEMES.find((x) => x.id === theme)?.hex }}
        />

        {/* Chevron down */}
        <svg
          className={`size-3 text-[#72729A] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-56 p-4 rounded-3xl bg-white/95 border border-[#EAE9F6] backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.18)] z-50 space-y-4 animate-smooth-in">
            {/* Mode selection: Light / Dark */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#72729A] font-bold mb-2">
                Appearance
              </p>
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[#F8F9FE] border border-[#EAE9F6]">
                <button
                  type="button"
                  onClick={() => setMode("light")}
                  className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mode === "light"
                      ? "bg-white text-[#18182E] shadow-xs"
                      : "text-[#72729A] hover:text-[#18182E]"
                  }`}
                >
                  <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>Light</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("dark")}
                  className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mode === "dark"
                      ? "bg-[#5E48E8] text-white shadow-xs"
                      : "text-[#72729A] hover:text-[#18182E]"
                  }`}
                >
                  <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  <span>Dark</span>
                </button>
              </div>
            </div>

            {/* Color Accent Themes */}
            <div className="border-t border-[#EAE9F6] pt-3">
              <p className="text-[10px] uppercase tracking-wider text-[#72729A] font-bold mb-2.5">
                Accent Color
              </p>
              <div className="flex items-center justify-between gap-2 px-1">
                {THEMES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTheme(item.id)}
                    className={`size-6 rounded-full transition-all cursor-pointer ${item.colorClass} ${
                      theme === item.id
                        ? "scale-125 ring-2 ring-offset-2 ring-[#5E48E8] shadow-sm"
                        : "opacity-60 hover:opacity-100 hover:scale-110"
                    }`}
                    title={item.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
