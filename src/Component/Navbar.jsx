"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, Languages, ChevronDown } from "lucide-react";
import freevance from "@/assets/freevance-logo.png";
import freevanceDark from "@/assets/freevance_footer.png";
import LanguageSelector from "./LanguageSelector";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Project", href: "/projects" },
  { label: "Talent", href: "/talents" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  // const [language, setLanguage] = useState("EN");
  // const [languageOpen, setLanguageOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  // useEffect(() => {
  //     window.googleTranslateElementInit = () => {
  //       new window.google.translate.TranslateElement(
  //         {
  //           pageLanguage: "en",
  //           includedLanguages: "en, hi",
  //           autoDisplay: false,
  //         },
  //         "google_translate_element",
  //       );
  //     };

  //     if (!document.querySelector("#google-translate-script")) {
  //       const script = document.createElement("script");
  //       script.id = "google-translate-script";
  //       script.src =
  //         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //       script.async = true;
  //       document.body.appendChild(script);
  //     }
  //   }, []);
    
  const toggleTheme = () => {
    const nextIsDark = !isDark;

    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  const changeLanguage = (code) => {
    setLanguage(code.toUpperCase());
    setLanguageOpen(false);

    const applyTranslation = () => {
      const googleSelect = document.querySelector(".goog-te-combo");

      if (!googleSelect) {
        setTimeout(applyTranslation, 500);
        return;
      }

      // Empty value resets the page to its original language.
      googleSelect.value = code === "en" ? "" : code;

      googleSelect.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    };

    applyTranslation();
  };

  return (
    <header className="group sticky top-0 z-50 h-[72px] bg-white text-[#1b2437] shadow-sm transition-shadow duration-300 dark:bg-slate-950 dark:text-white">
      {/* Animated gradient underline */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-secondary to-[#7a3df0] transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
      {/* <div
        id="google_translate_element"
        className="absolute -left-[9999px] top-0"
        aria-hidden="true"
      /> */}
      <nav className="mx-auto flex h-full max-w-[1490px] items-center justify-between px-4 sm:px-6 lg:px-6">
        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-2 text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-200 dark:hover:text-primary xl:text-base"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Logo */}
        <Link
          href="/"
          aria-label="Freevance home"
          className="shrink-0 text-2xl font-extrabold tracking-tight text-[#0a2b66] dark:text-white sm:text-3xl"
        >
          <Image
            src={isDark ? freevanceDark : freevance}
            alt="logo"
            className="h-20 w-44 object-contain"
          />
        </Link>
        <div className="flex space-x-4">
        {/* Desktop language and theme controls */}
        <div className="hidden items-center justify-center gap-2 lg:flex">
          <LanguageSelector />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2.5 text-sm font-semibold text-primary border border-primary transition duration-200 hover:-translate-y-0.5 hover:brightness-90 dark:text-primary dark:hover:bg-slate-800"
          >
            Freelancer Login
          </Link>

          <Link
            href="/signup"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            Client Login
          </Link>
        </div>
        </div>
        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 lg:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
     
      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-slate-200 bg-white px-4 pb-5 pt-4 shadow-lg dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-2">

            {/* Navigation links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-primary dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}

            {/* Language and theme controls */}
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 px-4 py-4 dark:border-slate-800">

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Language
                </span>
                <LanguageSelector />
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Login buttons - same labels and styling as desktop */}
            <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">

              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition duration-200 hover:-translate-y-0.5 hover:brightness-90 dark:text-primary dark:hover:bg-slate-800"
              >
                Freelancer Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:brightness-95"
              >
                Client Login
              </Link>

            </div>
          </div>
        </div>
      )}

    </header>
  );
}
