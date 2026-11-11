"use client";

import { Play } from "lucide-react";

export default function HeroButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  btnPrimaryWidth = "",
}) {
  const variants = {
    primary: "bg-primary",
    secondary: "bg-[#cc2020]",
    navy: "bg-[#102e6d]",
  };

  const trailingVariants = {
    primary: "bg-black/15",
    secondary: "bg-black/15",
    navy: "bg-black/15",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex justify-between min-h-[58px] min-w-[230px] items-stretch overflow-hidden rounded-full text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.97] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-yellow-300 ${variants[variant]} ${btnPrimaryWidth} ${className}`}
    >
      <span className="flex items-center justify-center px-5 text-sm font-bold sm:px-7 sm:text-base">
        {children}
      </span>

      <span
        className={`flex min-w-[66px] items-center justify-center px-3 transition-colors duration-300 group-hover:bg-black/25 ${trailingVariants[variant]}`}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#101b38] transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110">
          <Play
            size={15}
            fill="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
      </span>
    </button>
  );
}
