"use client";

import { MapPin } from "lucide-react";

export default function ProjectDiscoverySection({
  onViewProjects,
  onPostProject,
}) {
  return (
    <section className="bg-[#f4f6fb] px-4 py-14 transition-colors duration-300 dark:bg-slate-950 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto grid max-w-[1405px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14 lg:mx-28">
        {/* Left: Project location illustration */}
        <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br from-[#ffc9cc] via-[#f2cce6] to-[#dfceff] p-6 transition-colors duration-300 dark:from-[#392536] dark:via-[#302342] dark:to-[#25234f] sm:min-h-[400px] sm:p-10 lg:min-h-[400px]">
        {/* Decorative location pins */}
        <MapPin
          className="absolute left-[9%] top-[12%] h-7 w-7 fill-primary text-primary drop-shadow-md sm:h-8 sm:w-8"
          strokeWidth={1.8}
          aria-hidden="true"
        />

        <MapPin
          className="absolute right-[6%] top-[35%] h-7 w-7 fill-primary text-primary drop-shadow-md sm:h-8 sm:w-8"
          strokeWidth={1.8}
          aria-hidden="true"
        />

        <MapPin
          className="absolute bottom-[8%] left-[20%] h-7 w-7 fill-primary text-primary drop-shadow-md sm:h-8 sm:w-8"
          strokeWidth={1.8}
          aria-hidden="true"
        />

        {/* Floating project notification */}
        <div className="relative z-10 flex w-full max-w-[425px] items-center gap-3 rounded-[20px] bg-white px-4 py-5 shadow-[0_20px_40px_rgba(30,41,59,0.16)] transition-colors duration-300 dark:bg-[#111c38] dark:shadow-[0_20px_40px_rgba(0,0,0,0.2)] sm:gap-4 sm:px-6 sm:py-6">

          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-600 text-xs font-bold text-white sm:h-12 sm:w-12 sm:text-sm dark:bg-[#46556f]">
            YN
          </div>

          {/* Name */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
              Your name
            </p>
          </div>

          {/* Status */}
          <span className="text-xs font-medium text-slate-500 sm:text-sm dark:text-[#a9baff]">
            New
          </span>

        </div>
      </div>

        {/* Right: Content */}
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#0d2c65] dark:text-white sm:text-4xl lg:text-[30px]">
            Discover Projects Around Your Location{" "}
            <span className="text-primary">In Our Platform</span>
          </h2>

          <p className="mt-5 text-base font-medium text-slate-600 dark:text-slate-300 sm:text-lg">
            Get inspired by real projects
          </p>

          <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-[28px]">
            Freevance connects clients across the United States and around the
            world with skill-verified freelancers. Filter open projects by
            location, skill, language and freelancer type, then bid when you're
            ready — every project is reviewed by our team first.
          </p>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onViewProjects}
              className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-primary px-5 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(252,48,48,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 sm:px-6 sm:text-base"
            >
              View Projects
            </button>

            <button
              type="button"
              onClick={onPostProject}
              className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-[#0d1b3b] px-5 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#17366d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 sm:px-6 sm:text-base"
            >
              Post a Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
