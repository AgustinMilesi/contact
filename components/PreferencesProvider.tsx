"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "lime" | "mint" | "emerald" | "jade";
export type Mode = "light" | "dark";

export const THEMES: { id: Theme; name: string; colorClass: string; hex: string }[] = [
  { id: "lime", name: "Cyber Lime", colorClass: "bg-[#c6f827]", hex: "#c6f827" },
  { id: "mint", name: "Electric Mint", colorClass: "bg-[#00ff88]", hex: "#00ff88" },
  { id: "emerald", name: "Neon Emerald", colorClass: "bg-[#10b981]", hex: "#10b981" },
  { id: "jade", name: "Forest Jade", colorClass: "bg-[#059669]", hex: "#059669" },
];

type PreferencesContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
};

const PreferencesContext = createContext<PreferencesContextType | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("contact-mode") as Mode | null;
      if (saved === "light" || saved === "dark") return saved;
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    }
    return "dark";
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("contact-theme") as Theme | null;
      if (saved && THEMES.some((t) => t.id === saved)) return saved;
    }
    return "lime";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    localStorage.setItem("contact-mode", newMode);
    document.documentElement.setAttribute("data-mode", newMode);
    if (newMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("contact-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <PreferencesContext.Provider value={{ theme, setTheme, mode, setMode }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return ctx;
}
