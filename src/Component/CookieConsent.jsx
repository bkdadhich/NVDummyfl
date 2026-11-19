"use client";

import { useEffect, useState } from "react";
import { X, Cookie, ChevronDown, ChevronUp } from "lucide-react";

const CONSENT_KEY = "freevance_cookie_preferences";
const DISMISSED_KEY = "freevance_cookie_consent_dismissed";

const defaultPreferences = {
  essential: true,
  functional: true,
  analytics: true,
  marketing: true,
  ai: true,
};

const categories = [
  {
    key: "essential",
    title: "Essential cookies",
    description:
      "Required for core website features, security and account access. These cookies are always active.",
    required: true,
  },
  {
    key: "functional",
    title: "Functional cookies",
    description:
      "Remember your preferences and choices to provide a more personalized experience.",
  },
  {
    key: "analytics",
    title: "Analytics cookies",
    description:
      "Help us understand how visitors use Freevance so we can improve the website.",
  },
  {
    key: "marketing",
    title: "Marketing cookies",
    description:
      "Help measure and personalize promotional content and campaigns.",
  },
  {
    key: "ai",
    title: "AI features",
    description:
      "Allow optional AI-powered features and related preference settings.",
  },
];

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);

 useEffect(() => {
  const openCookiePreferences = () => {
    const saved = window.localStorage.getItem(CONSENT_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({
          ...defaultPreferences,
          ...parsed,
          essential: true,
        });
      } catch {
        setPreferences(defaultPreferences);
      }
    }

    setCustomizing(false);
    setVisible(true);
  };

  window.addEventListener(
    "freevance:open-cookie-preferences",
    openCookiePreferences
  );

  try {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    const dismissed = window.sessionStorage.getItem(DISMISSED_KEY);

    if (saved) {
      setPreferences({
        ...defaultPreferences,
        ...JSON.parse(saved),
        essential: true,
      });
      setVisible(false);
    } else if (!dismissed) {
      setVisible(true);
    }
  } catch {
    setVisible(true);
  }

  return () => {
    window.removeEventListener(
      "freevance:open-cookie-preferences",
      openCookiePreferences
    );
  };
}, []);

  const savePreferences = (nextPreferences) => {
    const safePreferences = {
      ...nextPreferences,
      essential: true,
    };

    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify(safePreferences)
    );
    window.sessionStorage.removeItem(DISMISSED_KEY);
    setPreferences(safePreferences);
    setVisible(false);
  };

  const acceptAll = () => savePreferences(defaultPreferences);

  const essentialOnly = () =>
    savePreferences({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      ai: false,
    });

  const dismissTemporarily = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setVisible(false);
  };

  const togglePreference = (key) => {
    if (key === "essential") return;
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[200] w-[calc(100%-2rem)] max-w-[460px] sm:bottom-6 sm:right-6"
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        className="pointer-events-auto relative max-h-[min(80vh,620px)] w-full overflow-y-auto rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_12px_36px_rgba(10,30,70,0.22)] dark:border-slate-700 dark:bg-[#111c38] sm:p-5"
      >
        <button
          type="button"
          onClick={dismissTemporarily}
          aria-label="Close cookie preferences"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 pr-9">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-primary dark:bg-red-950/30">
            <Cookie size={19} />
          </span>
          <div>
            <h2
              id="cookie-consent-title"
              className="text-base font-bold text-[#10264d] dark:text-white sm:text-lg"
            >
              Your privacy choices
            </h2>
            {/* <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Manage your cookie preferences
            </p> */}
          </div>
        </div>

        <p className="mt-3 text-xs leading-[1.55] text-slate-600 dark:text-slate-300 sm:text-[14px]">
          We use essential cookies to run Freevance. Analytics, marketing and AI tools 
          stay off unless you allow them. See our Cookie Policy and Privacy Policy.
        </p>

        <div className="mt-3 flex flex-row gap-2">
          <button
            type="button"
            onClick={acceptAll}
            className="btn-style inline-flex min-h-10 flex-1 items-center justify-center rounded-lg px-3 py-2 text-xs font-bold text-white shadow-[0_6px_14px_rgba(252,48,48,0.18)] sm:text-[14px]"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={essentialOnly}
            className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-primary/60 bg-white px-3 py-2 text-xs font-bold text-primary transition hover:bg-red-50 dark:border-red-400/70 dark:bg-[#0d1830] dark:text-red-300 sm:text-[14px]"
          >
            Essential only
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCustomizing((current) => !current)}
          aria-expanded={customizing}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 underline decoration-slate-400 underline-offset-2 transition hover:text-primary dark:text-slate-400"
        >
          {customizing ? "Hide preferences" : "Customize"}
          {customizing ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {customizing && (
          <div className="mt-3 space-y-2">
            {categories.map((category) => (
              <div
                key={category.key}
                className="flex items-start justify-between gap-4 rounded-xl border border-[#e7ebf3] px-4 py-3 dark:border-slate-700"
              >
                <div className="min-w-0">
                  <p className="text-md font-bold text-[#14213d] dark:text-white">
                    {category.title}
                    {category.required && (
                      <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                        Always on
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
                    {category.description}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={Boolean(preferences[category.key])}
                  aria-label={`${category.title} ${preferences[category.key] ? "on" : "off"}`}
                  disabled={category.required}
                  onClick={() => togglePreference(category.key)}
                  className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition ${
                    preferences[category.key]
                      ? "bg-primary"
                      : "bg-slate-300 dark:bg-slate-600"
                  } ${category.required ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
                      preferences[category.key] ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => savePreferences(preferences)}
              className="btn-style mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold text-white"
            >
              Save my choices
            </button>
          </div>
        )}

        <p className="mt-2 text-center text-[13px] leading-4 text-slate-400 dark:text-slate-500">
          Essential cookies are needed for the website to function. Read our
          Privacy Policy and Cookie Policy for more information.
        </p>
      </section>
    </div>
  );
}
