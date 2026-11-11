
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Globe,
  ChevronDown,
  ChevronUp,
  Search,
  Check,
  X,
} from "lucide-react";

export const LANGUAGES = [
  {
    countryCode: "US",
    langCode: "EN",
    code: "en",
    name: "English",
    nativeName: "English",
  },
  {
    countryCode: "ES",
    langCode: "ES",
    code: "es",
    name: "Spanish",
    nativeName: "Español",
  },
  {
    countryCode: "FR",
    langCode: "FR",
    code: "fr",
    name: "French",
    nativeName: "Français",
  },
  {
    countryCode: "DE",
    langCode: "DE",
    code: "de",
    name: "German",
    nativeName: "Deutsch",
  },
  {
    countryCode: "CN",
    langCode: "ZH",
    code: "zh-CN",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
  },
  {
    countryCode: "JP",
    langCode: "JA",
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
  },
  {
    countryCode: "IT",
    langCode: "IT",
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
  },
  {
    countryCode: "PT",
    langCode: "PT",
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
  },
  {
    countryCode: "RU",
    langCode: "RU",
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
  },
  {
    countryCode: "SA",
    langCode: "AR",
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
  },
  {
    countryCode: "IN",
    langCode: "HI",
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
  },
  {
    countryCode: "KR",
    langCode: "KO",
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
  },
  {
    countryCode: "NL",
    langCode: "NL",
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
  },
  {
    countryCode: "TR",
    langCode: "TR",
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
  },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState(null);

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Synchronize selected language with Google Translate's active state
  useEffect(() => {
    const checkTranslationState = () => {
      try {
        const isTranslated =
          document.documentElement.classList.contains("translated-ltr") ||
          document.documentElement.classList.contains("translated-rtl");

        const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
        const cookieLang = match && match[1];

        if (!isTranslated || cookieLang === "en") {
          setSelectedLang((prev) => {
            if (prev.code !== "en") {
              try {
                localStorage.setItem("app_language", "en");
              } catch {}

              const host = window.location.hostname;

              document.cookie =
                "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

              if (
                host &&
                host !== "localhost" &&
                !host.startsWith("127.")
              ) {
                document.cookie =
                  `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;

                if (host.includes(".")) {
                  const rootDomain =
                    "." + host.split(".").slice(-2).join(".");

                  document.cookie =
                    `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${rootDomain};`;
                }
              }

              return LANGUAGES[0];
            }

            return prev;
          });
        } else if (isTranslated && cookieLang && cookieLang !== "en") {
          setSelectedLang((prev) => {
            if (prev.code.toLowerCase() !== cookieLang.toLowerCase()) {
              const found = LANGUAGES.find(
                (lang) =>
                  lang.code.toLowerCase() === cookieLang.toLowerCase()
              );

              return found || prev;
            }

            return prev;
          });
        }
      } catch {
        // Ignore translation state errors
      }
    };

    checkTranslationState();

    const observer = new MutationObserver(checkTranslationState);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "lang"],
    });

    const interval = setInterval(checkTranslationState, 400);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);

      const focusTimeout = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
        clearTimeout(focusTimeout);
      };
    }
  }, [isOpen]);

  // Mobile dropdown positioning
  useEffect(() => {
    if (!isOpen) {
      setDropdownPosition(null);
      return;
    }

    const updateDropdownPosition = () => {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 640;

      if (isMobile) {
        const viewportWidth = window.innerWidth;
        const dropdownWidth = Math.min(288, viewportWidth - 24);

        const left = Math.max(
          12,
          Math.min(
            rect.right - dropdownWidth,
            viewportWidth - dropdownWidth - 12
          )
        );

        const top = Math.min(
          rect.bottom + 8,
          window.innerHeight - 220
        );

        setDropdownPosition({
          position: "fixed",
          top: `${Math.max(12, top)}px`,
          left: `${left}px`,
          width: `${dropdownWidth}px`,
          maxHeight: `calc(100dvh - ${Math.max(12, top)}px - 12px)`,
        });
      } else {
        setDropdownPosition(null);
      }
    };

    updateDropdownPosition();

    window.addEventListener("resize", updateDropdownPosition);
    window.addEventListener("scroll", updateDropdownPosition, true);

    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition, true);
    };
  }, [isOpen]);

  // Handle language selection
  const handleSelectLanguage = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
    setSearchQuery("");

    const targetCode = lang.code;

    try {
      localStorage.setItem("app_language", targetCode);
    } catch {}

    // Clear previous Google Translate cookie
    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

    // Set selected language
    if (targetCode !== "en") {
      document.cookie =
        `googtrans=/en/${targetCode}; path=/; SameSite=Lax`;
    }

    // Reload so Google Translate applies the cookie
    window.location.reload();
  };

  // Filter languages
  const filteredLanguages = LANGUAGES.filter((item) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return (
      item.name.toLowerCase().includes(query) ||
      item.nativeName.toLowerCase().includes(query) ||
      item.countryCode.toLowerCase().includes(query) ||
      item.langCode.toLowerCase().includes(query)
    );
  });

  const isMobilePositioned = Boolean(dropdownPosition);

  return (
    <div
      ref={dropdownRef}
      className="notranslate relative inline-block text-left"
      translate="no"
    >
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        translate="no"
        onClick={() => setIsOpen((prev) => !prev)}
        className="notranslate flex h-[36px] cursor-pointer select-none items-center gap-1.5 rounded-full border border-[#d9deea] bg-white px-3 py-1 text-slate-800 shadow-xs transition-all duration-200 hover:border-[#0850C4] hover:shadow-[0_4px_14px_rgba(5,10,30,0.12)] focus:outline-none sm:gap-2"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4 shrink-0 text-[#2563eb]" />

        <span className="notranslate text-xs font-bold tracking-tight text-slate-900 sm:text-sm">
          {selectedLang.countryCode}
        </span>

        <span className="notranslate text-xs font-medium text-slate-600 sm:text-sm">
          {selectedLang.langCode}
        </span>

        {isOpen ? (
          <ChevronUp className="h-3.5 w-3.5 shrink-0 text-slate-500" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-500" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          translate="no"
          style={dropdownPosition || undefined}
          className={`notranslate z-[99999] rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_10px_35px_rgba(0,0,0,0.12)] animate-in fade-in zoom-in-95 duration-150 ${
            isMobilePositioned
              ? "fixed"
              : "absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-24px)]"
          }`}
        >
          {/* Search Bar */}
          <div className="mb-1 flex items-center border-b border-slate-100 px-3 py-2">
            <Search className="mr-2.5 h-4 w-4 shrink-0 text-slate-400" />

            <input
              ref={searchInputRef}
              type="text"
              translate="no"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language..."
              className="notranslate w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="cursor-pointer rounded-full p-0.5 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Languages List */}
          <div
            role="listbox"
            translate="no"
            className="notranslate max-h-64 space-y-0.5 overflow-y-auto py-1 pr-0.5 [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300"
          >
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected =
                  lang.langCode === selectedLang.langCode &&
                  lang.countryCode === selectedLang.countryCode;

                return (
                  <button
                    key={`${lang.countryCode}-${lang.langCode}`}
                    type="button"
                    role="option"
                    translate="no"
                    aria-selected={isSelected}
                    onClick={() => handleSelectLanguage(lang)}
                    className={`notranslate flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors duration-150 ${
                      isSelected
                        ? "bg-[#EEF4FF] text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <span
                        className={`notranslate w-7 shrink-0 text-left font-mono text-xs font-bold tracking-normal ${
                          isSelected
                            ? "text-slate-900"
                            : "text-slate-800"
                        }`}
                      >
                        {lang.countryCode}
                      </span>

                      <div className="flex min-w-0 flex-col">
                        <span
                          className={`notranslate truncate text-sm leading-tight ${
                            isSelected
                              ? "font-semibold text-[#2563eb]"
                              : "font-medium text-slate-800"
                          }`}
                        >
                          {lang.name}
                        </span>

                        <span className="notranslate mt-0.5 truncate text-xs font-normal leading-tight text-slate-400">
                          {lang.nativeName}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="ml-2 h-4 w-4 shrink-0 stroke-[2.5] text-[#2563eb]" />
                    )}
                  </button>
                );
              })
            ) : (
              <div
                translate="no"
                className="notranslate py-6 text-center text-xs text-slate-400"
              >
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
