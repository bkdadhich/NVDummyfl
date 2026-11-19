"use client";
import { useEffect } from "react";

export default function GoogleTranslateLoader() {
  useEffect(() => {
    // Agar script pehle se loaded hai toh dubara load na karein
    if (window.google?.translate) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          // Jo jo languages chahiye unke codes yahan add kar sakte hain
          includedLanguages: "en,es,zh-CN,de,ar,fr,pt,ru,ja,it,hi",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div id="google_translate_element" className="hidden" />;
}