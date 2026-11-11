"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      id="totop"
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className={`
      fixed bottom-21 right-6 z-[90]
      flex h-11 w-11 items-center justify-center
      rounded-full
      bg-white text-primary
      shadow-lg
      transition-all duration-300
      hover:bg-primary
      hover:text-white
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-blue-500
      focus-visible:ring-offset-2
      focus-visible:ring-offset-white
      dark:bg-white
      dark:text-primary
      dark:hover:bg-primary
      dark:hover:text-white
      dark:focus-visible:ring-offset-gray-900
      ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }
    `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
