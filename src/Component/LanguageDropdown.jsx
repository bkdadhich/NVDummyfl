"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, ChevronUp, Search, Check } from "lucide-react";

export const languages = [
  { code: "en", country: "US", langCode: "EN", label: "English", subLabel: "English" },
  { code: "es", country: "ES", langCode: "ES", label: "Spanish", subLabel: "Español" },
  { code: "fr", country: "FR", langCode: "FR", label: "French", subLabel: "Français" },
  { code: "de", country: "DE", langCode: "DE", label: "German", subLabel: "Deutsch" },
  { code: "zh-CN", country: "CN", langCode: "ZH", label: "Chinese (Simplified)", subLabel: "简体中文" },
  { code: "ar", country: "AR", langCode: "AR", label: "Arabic", subLabel: "العربية" },
  { code: "pt", country: "PT", langCode: "PT", label: "Portuguese", subLabel: "Português" },
  { code: "ru", country: "RU", langCode: "RU", label: "Russian", subLabel: "Русский" },
  { code: "ja", country: "JA", langCode: "JA", label: "Japanese", subLabel: "日本語" },
  { code: "it", country: "IT", langCode: "IT", label: "Italian", subLabel: "Italiano" },
  { code: "hi", country: "IN", langCode: "HI", label: "Hindi", subLabel: "हिन्दी" },
];

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Sync with stored preference or Google translate cookie on mount
  useEffect(() => {
    try {
      const savedCode = localStorage.getItem("preferred_lang_code");
      if (savedCode) {
        const found = languages.find((l) => l.code === savedCode);
        if (found) setSelectedLang(found);
      } else {
        const cookieMatch = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
        if (cookieMatch && cookieMatch[1]) {
          const found = languages.find((l) => l.code === cookieMatch[1]);
          if (found) setSelectedLang(found);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectLang = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
    setSearchQuery("");

    try {
      localStorage.setItem("preferred_lang_code", lang.code);
    } catch {
      // ignore
    }

    // Set Google Translate cookie
    if (lang.code === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if (typeof window !== "undefined" && window.location.hostname) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
      }
    } else {
      document.cookie = `googtrans=/auto/${lang.code}; path=/;`;
      if (typeof window !== "undefined" && window.location.hostname) {
        document.cookie = `googtrans=/auto/${lang.code}; domain=${window.location.hostname}; path=/;`;
      }
    }

    // Trigger Google Translate hidden select
    const triggerSelect = () => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = lang.code;
        select.dispatchEvent(new Event("change"));
        return true;
      }
      return false;
    };

    if (!triggerSelect()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (triggerSelect() || attempts > 10) {
          clearInterval(interval);
        }
      }, 250);
    }
  };

  const filteredLanguages = languages.filter((lang) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      lang.label.toLowerCase().includes(q) ||
      lang.subLabel.toLowerCase().includes(q) ||
      lang.country.toLowerCase().includes(q) ||
      lang.langCode.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className={`relative z-[200] inline-block text-left font-sans ${
        isOpen ? "isolate" : ""
      }`}
      ref={dropdownRef}
    >
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 sm:gap-2 bg-white hover:bg-slate-50 text-slate-800 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-lg sm:rounded-xl border border-slate-200/90 shadow-sm transition-all duration-150 cursor-pointer select-none"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB] shrink-0" />
        <span className="font-bold text-[11px] sm:text-[13px] text-slate-900 tracking-wide">
          {selectedLang.country}
        </span>
        <span className="font-semibold text-[11px] sm:text-[13px] text-slate-700">
          {selectedLang.langCode}
        </span>
        {isOpen ? (
          <ChevronUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500 shrink-0" />
        ) : (
          <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500 shrink-0" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        
        <div className="absolute right-0 top-full z-[9999] mt-2 w-[min(270px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-100/80 bg-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)]">

          {/* Search Header */}
          <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-slate-100">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language..."
              className="w-full text-[13px] text-slate-800 placeholder:text-slate-400 bg-transparent outline-none"
            />
          </div>

          {/* Languages List */}
          <div className="max-h-[50vh] overflow-y-auto overscroll-contain p-1.5 space-y-0.5">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = selectedLang.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => selectLang(lang)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#EEF4FF]"
                        : "hover:bg-slate-50 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 text-[12px] font-bold text-slate-800 tracking-wide uppercase shrink-0">
                        {lang.country}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`text-[13px] font-semibold leading-tight truncate ${
                            isSelected ? "text-[#2563EB]" : "text-slate-900"
                          }`}
                        >
                          {lang.label}
                        </span>
                        <span
                          className={`text-[11px] leading-tight mt-0.5 truncate ${
                            isSelected ? "text-[#2563EB]/70" : "text-slate-400"
                          }`}
                        >
                          {lang.subLabel}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-[#2563EB] shrink-0 stroke-[2.5] ml-2" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="py-6 text-center text-xs text-slate-400">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}