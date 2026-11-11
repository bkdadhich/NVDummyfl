"use client";

import { useState } from "react";
import {
  Laptop,
  Smartphone,
  Palette,
  PenTool,
  Megaphone,
  Bot,
  FileText,
  Compass,
  FolderOpen,
  ArrowRight,
  X,
} from "lucide-react";

import ActionButton from "./Button/ActionButtons";

const serviceCategories = [
  {
    name: "Web Development",
    icon: Laptop,
  },
  {
    name: "Mobile Apps",
    icon: Smartphone,
  },
  {
    name: "UI/UX Design",
    icon: Palette,
  },
  {
    name: "Content Writing",
    icon: PenTool,
  },
  {
    name: "Digital Marketing",
    icon: Megaphone,
  },
  {
    name: "Data & Analytics",
    icon: Bot,
  },
  {
    name: "Resume & Career",
    icon: FileText,
  },
  {
    name: "Consulting & Advisory",
    icon: Compass,
  },
  {
    name: "Operations & Admin Support",
    icon: FolderOpen,
  },
];

export default function ServicesSection({
  onCategorySelect,
  onViewAll,
  onPostProject,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect?.(category);
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f4f6fb] px-4 pb-16 pt-12 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 sm:pb-10 sm:pt-14 lg:px-8"
    >
      <div className="mx-auto max-w-[1405px] lg:mx-28">
        {/* =========================================
            FIND SERVICES
        ========================================= */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-heading dark:text-white sm:text-4xl">
            Find <span className="text-primary">Services</span>
          </h2>

          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            Browse services across professional categories
          </p>
        </div>

        {/* =========================================
            SERVICE CATEGORY GRID
        ========================================= */}
        <div className="mx-auto mt-10 grid max-w-[1380px] grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-7 md:grid-cols-3  lg:grid-cols-5 lg:gap-x-7 lg:gap-y-8">
          {serviceCategories.map((category) => {
            const CategoryIcon = category.icon;
            const isSelected = selectedCategory === category.name;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => handleCategoryClick(category.name)}
                aria-pressed={isSelected}
                className={`group flex min-h-[52px] min-w-0 items-center gap-3 rounded-xl text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                  isSelected
                    ? "text-primary"
                    : "text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                }`}
              >
                <span
                  className={`flex h-[49px] w-[49px] shrink-0 items-center justify-center rounded-[16px] border transition-all duration-200 ${
                    isSelected
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-[#dfe5f1] bg-[#edf2fa] text-[#17417f] group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-blue-300"
                  }`}
                >
                  <CategoryIcon size={23} strokeWidth={1.8} />
                </span>

                <span className="text-[15px] font-medium leading-[22px] sm:text-base">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* =========================================
            LATEST PROJECTS HEADER
        ========================================= */}
        <div className="mt-14 flex items-center justify-between gap-4 sm:mt-[72px]">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#101f3c] dark:text-white sm:text-3xl lg:text-[32px]">
            Latest projects
          </h2>

          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-lg"
          >
            View all
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>

        {/* =========================================
            LATEST PROJECTS EMPTY STATE
        ========================================= */}
        <div className="mt-7 flex min-h-[220px] flex-col items-center justify-center rounded-[23px] border border-[#dfe5f1] bg-white px-5 py-9 text-center shadow-[0_12px_40px_rgba(15,23,42,0.045)] transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:min-h-[226px] sm:py-10">
          <h3 className="text-xl font-bold text-[#101f3c] dark:text-white sm:text-[22px]">
            New projects appear here
          </h3>

          <p className="mt-3 max-w-[850px] text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Be the first to post a requirement and receive responses from
            qualified providers.
          </p>

          <div className="mt-5">
            <ActionButton onClick={onPostProject}>Post a project</ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
