
"use client";

import { useEffect } from "react";

export default function GoogleTranslateLoader() {
  useEffect(() => {
    let script = document.getElementById("google-translate-script");

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

    window.googleTranslateElementInit = initializeGoogleTranslate;

    if (!script) {
      script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      initializeGoogleTranslate();
    } else {
      script.addEventListener("load", initializeGoogleTranslate);
    }

    return () => {
      if (script) {
        script.removeEventListener("load", initializeGoogleTranslate);
      }
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        top: 0,
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    />
  );
}
