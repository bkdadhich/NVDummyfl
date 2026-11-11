"use client";

import { useState } from "react";
import { BriefcaseBusiness, Lightbulb, Shield, ArrowRight } from "lucide-react";
import HeroButton from "./Button/HeroButton";
import Image from "next/image";
import logo from "@/assets/logo.png"

const popularCategories = [
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Content Writing",
];

export default function HeroSection({
  onCompaniesClick,
  onFindWorkClick,
  onAboutClick,
  onCategoryClick,
  onMeetAriaClick,
}) {
  const [activeCategory, setActiveCategory] = useState("");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryClick?.(category);
  };

  return (
    <section className="hero-section relative isolate overflow-hidden bg-[#070d27] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-[58px]">
      {/* Ambient background glows */}
      <div
        className="hero-blob hero-blob-one pointer-events-none absolute -left-40 top-[-120px] -z-10 h-[420px] w-[420px] rounded-full bg-blue-700/25 blur-[100px] sm:h-[600px] sm:w-[600px]"
        aria-hidden="true"
      />
      <div
        className="hero-blob hero-blob-two pointer-events-none absolute -right-40 bottom-[-150px] -z-10 h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[110px] sm:h-[650px] sm:w-[650px]"
        aria-hidden="true"
      />

      {/* Subtle dotted background */}
      <div
        className="hero-dots pointer-events-none absolute inset-0 -z-10 opacity-40"
        aria-hidden="true"
      />

      {/* Floating decorative icons */}
      <div
        className="hero-floaters pointer-events-none absolute inset-0 -z-0 hidden overflow-hidden md:block"
        aria-hidden="true"
      >
        <BriefcaseBusiness className="floater floater-one absolute left-[6.5%] top-[36%] h-9 w-9 text-blue-200/20" />
        <Lightbulb className="floater floater-two absolute right-[9.5%] top-[31%] h-10 w-10 text-blue-100/20" />
        <Shield className="floater floater-three absolute bottom-[23%] left-[10%] h-11 w-11 text-blue-100/15" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1225px]">
        {/* Main hero card */}
        <div className="hero-card relative overflow-hidden rounded-[30px] border border-white/15 bg-white/[0.075] px-5 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-8 sm:py-10 md:rounded-[38px] md:px-10 md:py-12 lg:px-14 lg:py-[60px]">
          {/* Soft card highlight */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-400/[0.13] via-transparent to-indigo-400/[0.06]"
            aria-hidden="true"
          />

          <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
            {/* Tagline */}
            <div className="rv-fade inline-flex max-w-full items-center justify-center rounded-full border border-white/50 px-4 py-2.5 text-xs font-bold text-white sm:px-6 sm:text-sm md:text-base">
              Verified Talent. Protected Payments.
            </div>

            {/* Heading */}
            <h1 className="rv-blur mt-7 max-w-[1080px] text-[35px] font-extrabold leading-[1.12] tracking-[-0.045em] text-white sm:mt-8 sm:text-5xl md:text-[58px] lg:text-[64px]">
              Hire verified talent.{" "}
              <span className="gt inline-block bg-gradient-to-r from-[#35368f] via-[#9ab8ff] to-[#d77bda] bg-clip-text text-transparent">
                Pay one sprint at a time.
              </span>
            </h1>

            {/* Description */}
            <p className="rv mt-6 max-w-[920px] text-sm leading-6 text-slate-200 sm:text-base sm:leading-7 md:text-lg">
              Post a project, get bids, confirm your developer, and fund work in
              milestones. Skill-verified freelancers. A team watching every
              deadline.
            </p>

            {/* Role buttons */}
            <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-5">
              <div className="rv-pop">
                <HeroButton
                  variant="primary"
                  btnPrimaryWidth="100px"
                  onClick={onCompaniesClick}
                >
                  For Companies
                </HeroButton>
              </div>

              <div className="rv-pop rv-pop-delay-1">
                <HeroButton
                  variant="secondary"
                  onClick={onFindWorkClick}
                  className="w-full sm:w-auto"
                >
                  Find work
                </HeroButton>
              </div>

              <div className="rv-pop rv-pop-delay-2">
                <HeroButton
                  variant="navy"
                  onClick={onAboutClick}
                  className="w-full sm:w-auto"
                >
                  About us
                </HeroButton>
              </div>
            </div>

            {/* Popular categories */}
            <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-3">
              <span className="chip-label text-sm font-semibold text-slate-300">
                Popular:
              </span>

              {popularCategories.map((category, index) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`chip rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:px-5 sm:text-sm ${
                    activeCategory === category
                      ? "border-primary bg-primary/20 text-white"
                      : "border-white/25 bg-white/[0.07] text-white hover:border-white/50 hover:bg-white/[0.13]"
                  }`}
                  style={{ "--chip-index": index }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Animated divider */}
            <div className="divider mt-8 h-px w-full bg-white/15 sm:mt-9" />

            {/* Meet Aria area */}
            <div className="meet mt-8 flex w-full flex-col items-center sm:mt-9">
              <p className="max-w-[700px] text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                Your guide to Freevance. Ask questions, explore services, and
                find the right place to start.
              </p>

              <button
                type="button"
                onClick={() => {
                  onMeetAriaClick?.();
                  window.dispatchEvent(new Event("open-aria-assistant"));
                }}
                className="ask mt-5 inline-flex min-h-[60px] items-center gap-3 rounded-full bg-primary py-2 pl-2.5 pr-5 text-sm font-bold text-white shadow-[0_0_0_12px_rgba(252,48,48,0.10),0_12px_30px_rgba(252,48,48,0.25)] transition-all duration-300 hover:scale-105 hover:bg-red-500 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-yellow-300 sm:pr-7 sm:text-base"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/80 bg-white text-[#0d2c65]">
                  <Image src={logo} alt="Freevance icon" className="p-1 pr-2 pt-2"/>
                </span>

                <span>Meet Aria</span>

                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Supporting text below card */}
        <p className="below mx-auto mt-7 max-w-[800px] px-2 text-center text-sm leading-6 text-slate-300 sm:mt-8 sm:text-base sm:leading-7">
          Freevance connects clients with skill-verified providers across
          professional services, with every requirement reviewed and every
          payment held until approval.
        </p>
      </div>
    </section>
  );
}
