"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Dna, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/detect", label: "Detect" },
  { href: "/education", label: "Education" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <div className="flex items-center gap-1 rounded-xl border border-brand-100 bg-brand-50 p-1 dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={() => setTheme("light")}
        title="Light mode"
        className={clsx(
          "rounded-lg p-1.5 transition-colors",
          theme === "light"
            ? "bg-white text-brand-600 shadow-sm dark:bg-gray-700"
            : "text-gray-400 hover:text-brand-600",
        )}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        title="System default"
        className={clsx(
          "rounded-lg p-1.5 transition-colors",
          theme === "system"
            ? "bg-white text-brand-600 shadow-sm dark:bg-gray-700"
            : "text-gray-400 hover:text-brand-600",
        )}
      >
        <Monitor className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        title="Dark mode"
        className={clsx(
          "rounded-lg p-1.5 transition-colors",
          theme === "dark"
            ? "bg-white text-brand-600 shadow-sm dark:bg-gray-700"
            : "text-gray-400 hover:text-brand-600",
        )}
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-brand-700 dark:text-brand-400"
        >
          <Dna className="h-6 w-6" />
          <span className="text-lg">DermaScan AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400",
                pathname === link.href
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-gray-600 dark:text-gray-400",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            className="md:hidden text-brand-700 dark:text-brand-400"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 px-6 pb-6 md:hidden border-t border-brand-100 dark:border-gray-800 pt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "text-sm font-medium",
                pathname === link.href
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-gray-600 dark:text-gray-400",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
