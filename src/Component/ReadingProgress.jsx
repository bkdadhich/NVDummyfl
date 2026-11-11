"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      const scrollProgress = window.scrollY / scrollableHeight;
      setProgress(Math.min(1, Math.max(0, scrollProgress)));
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[120] h-1 w-full origin-left bg-[linear-gradient(110deg,#a83b79_0%,#583b91_48%,#173f8a_100%)] shadow-[0_0_10px_rgba(168,59,121,0.35)]`}
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
