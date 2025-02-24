"use client";

import { useContext } from "react";
import { ThemeContext } from "@/components/themes/ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 transition-all 
      duration-300 ease-in-out ring-2 ring-slate-500 z-50 
      backdrop-blur-md hover:ring-slate-400 hover:scale-110"
    >
      {theme === "light" ? (
        <MoonIcon className="w-6 h-6 text-gray-900 dark:text-white" />
      ) : (
        <SunIcon className="w-6 h-6 text-gray-900 dark:text-white" />
      )}
    </button>
  );
}
