"use client";

import { usePreferences, THEMES } from "@/components/PreferencesProvider";

export function PreferencesBlock({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, mode, setMode } = usePreferences();

  return (
    <div className={`clay-card ${compact ? "p-5" : "p-6 sm:p-8"} rounded-3xl space-y-5`}>
      <div className="border-b border-[#EAE9F6] pb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-[#72729A]">
          Personalización &amp; Aspecto
        </p>
        <h2 className="text-lg font-black text-[#18182E]">
          Preferencias de Interfaz
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 items-center">
        {/* 1. Mode: Light vs Dark */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#72729A]">
            Modo de Pantalla
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#F8F9FE] border border-[#EAE9F6]">
            <button
              type="button"
              onClick={() => setMode("light")}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === "light"
                  ? "bg-white text-[#18182E] shadow-xs"
                  : "text-[#72729A] hover:text-[#18182E]"
              }`}
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span>Claro</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("dark")}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === "dark"
                  ? "bg-[#5E48E8] text-white shadow-xs"
                  : "text-[#72729A] hover:text-[#18182E]"
              }`}
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              <span>Oscuro</span>
            </button>
          </div>
        </div>

        {/* 2. Color Accent Palettes */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#72729A]">
            Color de Acento
          </label>
          <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-[#F8F9FE] border border-[#EAE9F6] h-[46px]">
            {THEMES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTheme(item.id)}
                className={`size-7 rounded-full transition-all cursor-pointer ${item.colorClass} ${
                  theme === item.id
                    ? "scale-115 ring-2 ring-offset-2 ring-[#5E48E8] shadow-md"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
                title={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
