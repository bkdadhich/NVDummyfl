
"use client";

import { useEffect } from "react";

export default function GoogleTranslateLoader() {
  useEffect(() => {
    const initializeGoogleTranslate = () => {
      if (!window.google?.translate?.TranslateElement) return;

      const container = document.getElementById(
        "google_translate_element"
      );

      if (!container || container.dataset.initialized === "true") {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "en,es,fr,de,zh-CN,ja,it,pt,ru,ar,hi,ko,nl,tr",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      container.dataset.initialized = "true";
    };

    window.googleTranslateElementInit =
      initializeGoogleTranslate;

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");

      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      document.body.appendChild(script);
    } else {
      initializeGoogleTranslate();
    }

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      className="notranslate hidden"
      translate="no"
    />
  );
}
