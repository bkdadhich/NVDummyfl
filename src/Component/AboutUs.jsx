"use client";

import {  
  Award,
  Timer,  
  FilePenLine,
  Megaphone,
  Users,
  Handshake,
  PackageCheck,
  CheckSquare,
  Check,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Clock3,
  FileCheck2,
  Landmark,
  Layers3,
  LockKeyhole,
  Sparkles,
  Wallet,
  Workflow,
  GraduationCap,
  Laptop,
  Compass,
  Store,
  Target,
  Scale,
  ClipboardCheck,
  CircleDollarSign,
  UserRound,
  Building,
  Puzzle,
  Package,
  CheckCircle2,
  ReceiptText,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

import Link from "next/link";
import CompanyEcosystemDiagram from "./CompanyEcosystemDiagram";
import LogoSlider from "./LogoSlider";

const audienceGroups = [
  {
    icon: UserRound,
    title: "Individuals",
    description: "People who need a service completed.",
  },
  {
    icon: Building2,
    title: "Businesses",
    description: "Companies sourcing specialists, teams or vendors.",
  },
  {
    icon: Landmark,
    title: "Government and public-sector organizations",
    description: "Structured requirements with documented qualifications.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Independent professionals",
    description: "Specialists offering focused expertise.",
  },
  {
    icon: Laptop,
    title: "Freelancers",
    description: "Individuals delivering defined work.",
  },
  {
    icon: Compass,
    title: "Consultants",
    description: "Advisory and assignment-based engagements.",
  },
  {
    icon: Building,
    title: "Companies",
    description: "Organizations delivering larger scopes.",
  },
  {
    icon: Puzzle,
    title: "Agencies",
    description: "Multi-discipline teams under one project lead.",
  },
  {
    icon: Package,
    title: "Vendors",
    description: "Suppliers of services to other organizations.",
  },
  {
    icon: Target,
    title: "Specialized service providers",
    description: "Niche capabilities and certifications.",
  },
  {
    icon: Handshake,
    title: "Subcontractors",
    description: "Providers working within a project-delivery structure.",
  },
];

const businessModels = ["B2B", "B2C", "C2B", "B2B2C"];

const projectSteps = [
  {
    icon: FileCheck2,
    title: "Requirement submitted and structured",
    time: "Day 1",
  },
  {
    icon: BriefcaseBusiness,
    title: "Published as an opportunity",
    time: "Day 1–2",
  },
  {
    icon: Users,
    title: "Qualified providers submit responses",
    time: "Day 2–7",
  },
  {
    icon: Handshake,
    title: "Provider selected and project awarded",
    time: "Day 7–10",
  },
  {
    icon: PackageCheck,
    title: "Milestones, deliverables and approvals",
    time: "Each milestone",
  },
  { icon: CheckCircle2, title: "Approved work is paid", time: "+5 days" },
];

const audiences = [
  {
    icon: UserRound,
    title: "Individuals",
    text: "People who need a service completed.",
  },
  {
    icon: Building2,
    title: "Businesses",
    text: "Companies sourcing specialists, teams or vendors.",
  },
  {
    icon: Landmark,
    title: "Government and public-sector organizations",
    text: "Structured requirements with documented qualifications.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Independent professionals",
    text: "Specialists offering focused expertise.",
  },
  {
    icon: Laptop,
    title: "Freelancers",
    text: "Individuals delivering defined work.",
  },
  {
    icon: Compass,
    title: "Consultants",
    text: "Advisory and assignment-based engagements.",
  },
  {
    icon: Store,
    title: "Companies",
    text: "Organizations delivering larger scopes.",
  },
  {
    icon: Layers3,
    title: "Agencies",
    text: "Multi-discipline teams under one project lead.",
  },
  {
    icon: PackageCheck,
    title: "Vendors",
    text: "Suppliers of services to other organizations.",
  },
  {
    icon: Target,
    title: "Specialized service providers",
    text: "Niche capabilities and certifications.",
  },
  {
    icon: Handshake,
    title: "Subcontractors",
    text: "Providers working within a project-delivery structure.",
  },
];

const deliveryPoints = [
  "Requirements are structured with scope, deliverables, timeline and qualifications",
  "Responses are compared side by side and evaluated",
  "Milestones define who is responsible, what is delivered, by when and for how much",
  "Deliverables are versioned, reviewed and approved or revised",
  "Payments, issues and approvals are recorded with timestamps",
  "Completed projects keep their documentation and history",
];

const trustPoints = [
  "Freevance review of each requirement and provider profile",
  "Clear milestone scope, deliverables and due dates",
  "Verification badges and documented credentials",
  "Payments held until approval, with a documented issue-resolution process",
  "Compliance review for tax forms, agreements and public-sector requirements",
];

const trustSignals = [
  { icon: ShieldCheck, text: "Requirements reviewed before publication" },
  { icon: BadgeCheck, text: "Credentials and verification badges" },
  { icon: Clock3, text: "Deadline alerts to Freevance, client and provider" },
  { icon: Scale, text: "Structured issue resolution with a project record" },
];

const ecosystem = [
  {
    name: "NovaJobs.us",
    text: "Talent and employers",
    icon: BriefcaseBusiness,
  },
  { name: "UltraAura", text: "Learning and skills", icon: GraduationCap },
  { name: "Nova Home Care", text: "Care services", icon: Users },
  {
    name: "Freevance",
    text: "Services and projects",
    icon: Workflow,
    main: true,
  },
  { name: "Paradigm Shift", text: "Monitoring and retention", icon: Sparkles },
  { name: "LegitZone.law", text: "Legal services", icon: ShieldCheck },
  { name: "Kushi Gateway", text: "Additional services", icon: Compass },
];

const highlights = [
  {
    icon: BadgeCheck,
    title: "Skill-verified providers",
    text: "Profiles reviewed by our team",
  },
  {
    icon: Wallet,
    title: "Pay per milestone",
    text: "Funds released after approval",
  },
  {
    icon: ClipboardCheck,
    title: "Requirements reviewed",
    text: "Checked before publication",
  },
  {
    icon: MessageCircle,
    title: "Real support",
    text: "Help from the Freevance team",
  },
];

function SectionTitle({ eyebrow, children, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-[42px] lg:leading-tight">
        {children}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

function PrimaryLink({ href, children, secondary = false }) {
  return (
    <a
      href={href}
      className={
        secondary
          ? "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-bold text-slate-800 dark:text-slate-200 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950"
          : "inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
      }
    >
      {children}
      <ArrowRight size={17} />
    </a>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base"
        >
          <CheckCircle2
            className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
            size={19}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function About() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* About Us Header Section */}
       <section className="resources-banner relative overflow-hidden bg-primary-gradient px-4 py-7 text-center text-white sm:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_65%)]" />

      <div className="relative z-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          About Freevance
        </h1>

        <nav
          aria-label="Breadcrumb"
          className="mt-1 flex items-center justify-center gap-1 text-xs text-blue-100/80"
        >
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-white">About</span>
        </nav>

        {/* Yellow underline */}
        <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-yellowHighlight" />
      </div>
    </section>
      
      {/* About Us - Structured Services Marketplace Section */}
      <section className="relative overflow-hidden bg-bgWhite px-4 py-16 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:py-20">

        <div className="mx-auto max-w-6xl">

          {/* Section Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-btn-primary dark:text-white sm:text-4xl lg:text-[38px]">
              A Structured Services Marketplace
              <span className="block mt-1">
                and Project-Delivery Platform
              </span>
            </h2>

            {/* Intro Highlight */}
            <div className="mt-7 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/90 to-rose-50/90 px-5 py-4 text-left shadow-sm dark:border-slate-700 dark:from-slate-900 dark:to-slate-800 sm:px-6 sm:py-5">
              <p className="text-sm font-medium leading-relaxed text-btn-primary dark:text-slate-200 sm:text-base">
                Freevance is a structured services marketplace and
                project-delivery platform connecting individuals and
                organizations with qualified providers while supporting
                the workflow from requirement through completion.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="mx-auto mt-12 grid max-w-5xl items-center gap-9 lg:grid-cols-2 lg:gap-10">

            {/* Left Content */}
            <div className="text-[15px] leading-[1.65] text-slate-600 dark:text-slate-300">

              <p>
                Freevance gives individuals and organizations one place
                to define what they need, receive responses from qualified
                providers, select a provider, and manage the work through
                to completion.
              </p>

              <p className="mt-3">
                Requirements are structured before they are published.
                Responses are compared on scope, approach, timeline and
                price. Work is delivered in{" "}
                <strong className="font-bold text-btn-primary dark:text-white">
                  milestones with defined deliverables
                </strong>
                , reviewed against the agreed requirements, and paid on
                approval. Messages, documents, approvals and payments stay
                in one project record.
              </p>

              <p className="mt-3">
                Freevance has{" "}
                <strong className="font-bold text-btn-primary dark:text-white">
                  no monthly fees
                </strong>
                : a 10% service fee for clients and 10% for providers on
                each milestone.
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                <Link
                  href="/post-requirement"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(252,48,48,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e62929] hover:shadow-[0_10px_24px_rgba(252,48,48,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                >
                  Post a Requirement
                </Link>

                <Link
                  href="/become-provider"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-btn-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-primary dark:hover:text-primary"
                >
                  Become a Provider
                </Link>

              </div>
            </div>

            {/* Right Workflow Card */}
            <div className="rounded-[24px] bg-white p-5 shadow-[0_15px_45px_rgba(15,23,42,0.12)] transition-colors duration-300 dark:bg-slate-900 dark:shadow-[0_15px_45px_rgba(0,0,0,0.3)] sm:p-6">

              <h3 className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                How a project moves on Freevance
              </h3>

              <div className="space-y-2.5">

                {[
                  {
                    icon: FilePenLine,
                    title: "Requirement submitted and structured",
                    duration: "Day 1",
                  },
                  {
                    icon: Megaphone,
                    title: "Published as an opportunity",
                    duration: "Day 1–2",
                  },
                  {
                    icon: Users,
                    title: "Qualified providers submit responses",
                    duration: "Day 2–7",
                  },
                  {
                    icon: Handshake,
                    title: "Provider selected and project awarded",
                    duration: "Day 7–10",
                  },
                  {
                    icon: PackageCheck,
                    title: "Milestones, deliverables and approvals",
                    duration: "Each milestone",
                  },
                  {
                    icon: CheckSquare,
                    title: "Approved work is paid",
                    duration: "+5 days",
                  },
                ].map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={index}
                      className="flex min-h-[50px] items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-[#eef2fb] px-3 py-3 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-blue-500/50 dark:hover:bg-slate-800 sm:px-4"
                    >
                      {/* Step Icon and Title */}
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#2563eb] dark:bg-slate-700 dark:text-blue-300">
                          <Icon size={17} strokeWidth={2} />
                        </div>

                        <span className="text-xs font-semibold leading-snug text-btn-primary dark:text-slate-100 sm:text-[13px]">
                          {step.title}
                        </span>
                      </div>

                      {/* Duration */}
                      <div className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 sm:text-xs">
                        <Check size={13} strokeWidth={3} />
                        <span>{step.duration}</span>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>
        </div>
      </section>
     
      {/* Who Freevance Serves */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#1d5ca8] via-[#06469a] to-[#174777] px-4 py-14 transition-colors duration-300 dark:from-[#071d42] dark:via-[#082f68] dark:to-[#102b4b] sm:px-6 sm:py-16 lg:px-8 lg:py-12">

        {/* Background glow */}
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-[450px] w-[450px] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="mx-auto max-w-5xl">

          {/* Heading */}
          <div className="mx-auto mb-9 max-w-4xl text-center sm:mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[40px]">
              Who Freevance{" "}
              <span className="text-yellowHighlight">Serves</span>
            </h2>

            <p className="mx-auto mt-4 max-w-4xl text-sm font-medium leading-6 text-blue-50 sm:text-base lg:text-[17px] lg:leading-[1.6]">
              Freevance supports individual-to-individual, business-to-business,
              public-sector and larger multi-provider engagements. Business
              models include B2B, B2C, C2B and B2B2C.
            </p>
          </div>

          {/* Audience cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">

            {audienceGroups.map((group) => {
              const Icon = group.icon;

              return (
                <div
                  key={group.title}
                  className="group flex min-h-[155px] flex-col rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 sm:min-h-[162px] sm:p-6"
                >
                  {/* Icon */}
                  <div className="mb-3 flex h-9 w-9 items-center justify-start text-btn-primary dark:text-blue-300">
                    <Icon
                      size={29}
                      strokeWidth={1.9}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold leading-snug text-[#172747] dark:text-white sm:text-[19px]">
                    {group.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
                    {group.description}
                  </p>
                </div>
              );
            })}

          </div>

          {/* Business models */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            {businessModels.map((model) => (
              <span
                key={model}
                className="inline-flex min-w-[72px] items-center justify-center rounded-full border border-white/80 bg-white px-5 py-3 text-sm font-bold tracking-wide text-btn-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-headingColor dark:hover:text-btn-primary"
              >
                {model}
              </span>
            ))}
          </div>

        </div>
      </section>
      
      {/* From Requirement to Completion */}
      <section className="relative overflow-hidden bg-bgWhite px-5 py-16 text-btn-primary transition-colors dark:bg-slate-950 dark:text-white sm:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          {/* Section heading */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              From Requirement{" "}
              <span className="text-[#ff3038]">to Completion</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left content */}
            <div className="max-w-[650px]">
              <p className="mb-6 text-base leading-relaxed text-btn-primary dark:text-slate-300 sm:text-md">
                Freevance stays in the project-delivery process from the first
                requirement to the final record.
              </p>

              <ul className="mb-8 space-y-3.5">
                {[
                  "Requirements are structured with scope, deliverables, timeline and qualifications",
                  "Responses are compared side by side and evaluated",
                  "Milestones define who is responsible, what is delivered, by when and for how much",
                  "Deliverables are versioned, reviewed and approved or revised",
                  "Payments, issues and approvals are recorded with timestamps",
                  "Completed projects keep their documentation and history",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff3038]" />
                    <span className="text-base leading-relaxed text-btn-primary dark:text-slate-300 sm:text-md">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/how-it-works"
                className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#ff3038] px-7 py-3 text-base font-bold text-white shadow-[0_10px_24px_rgba(255,48,56,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e9252d] hover:shadow-[0_14px_28px_rgba(255,48,56,0.3)]"
              >
                See How It Works
              </Link>
            </div>

            {/* Right milestone payment card */}
            <div className="w-full rounded-[28px] bg-white p-6 shadow-[0_24px_65px_rgba(15,23,42,0.16)] dark:bg-slate-900 sm:p-8 lg:p-7 xl:p-8">
              <p className="mb-5 text-base font-bold text-slate-500 dark:text-slate-400">
                Example: one $1,000 milestone
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base text-btn-primary dark:text-slate-300 sm:text-md">
                    Milestone amount
                  </span>
                  <span className="text-base font-bold text-btn-primary dark:text-white sm:text-md">
                    $1,000.00
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-base text-btn-primary dark:text-slate-300 sm:text-md">
                    Client pays (+10%)
                  </span>
                  <span className="text-base font-bold text-btn-primary dark:text-white sm:text-md">
                    $1,100.00
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-base text-btn-primary dark:text-slate-300 sm:text-md">
                    Provider receives (−10%)
                  </span>
                  <span className="text-base font-bold text-btn-primary dark:text-white sm:text-md">
                    $900.00
                  </span>
                </div>
              </div>

              <div className="my-5 border-t border-slate-200 dark:border-slate-700" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-lg font-bold text-btn-primary dark:text-white sm:text-lg">
                  Freevance fee
                </span>
                <span className="text-lg font-bold text-[#ff3038] sm:text-lg">
                  $200.00
                </span>
              </div>

              {/* Fee gradient indicator */}
              <div className="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-[#ff3038] via-[#873b87] to-[#0752b9]" />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
                Held until approved · paid after a 5-day processing period
              </p>
            </div>
          </div>
        </div>
      </section>      
     
      {/* Standards, Accountability & Trust */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#205da8] via-[#06449a] to-[#17436f] px-5 py-14 text-white transition-colors sm:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Section heading */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Standards, Accountability &{" "}
              <span className="text-yellowHighlight">Trust</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left content */}
            <div className="max-w-[680px]">
              <p className="mb-6 text-base leading-relaxed text-white/90 sm:text-md">
                Marketplaces fail when standards are vague and outcomes are
                unmeasured. Freevance defines the process for quality,
                documentation and accountability, and evaluates every
                engagement against its scope and deliverables.
              </p>

              <ul className="space-y-3.5">
                {[
                  "Freevance review of each requirement and provider profile",
                  "Clear milestone scope, deliverables and due dates",
                  "Verification badges and documented credentials",
                  "Payments held until approval, with a documented issue-resolution process",
                  "Compliance review for tax forms, agreements and public-sector requirements",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#ffbd17]" />
                    <span className="text-base leading-relaxed text-white/95 sm:text-md">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right standards card */}
            <div className="w-full rounded-[28px] border border-slate-200/70 bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.16)] sm:p-7">
              <div className="space-y-3">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Requirements reviewed before publication",
                  },
                  {
                    icon: Award,
                    title: "Credentials and verification badges",
                  },
                  {
                    icon: Timer,
                    title: "Deadline alerts to Freevance, client and provider",
                  },
                  {
                    icon: Scale,
                    title: "Structured issue resolution with a project record",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="flex min-h-[64px] items-center gap-4 rounded-2xl border border-[#dce5f5] bg-[#eef3fc] px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b9cbea] hover:shadow-sm sm:px-5"
                    >
                      <Icon
                        size={23}
                        strokeWidth={2}
                        className="shrink-0 text-btn-primary"
                      />

                      <p className="text-sm font-bold leading-relaxed text-[#17294c] sm:text-base">
                        {item.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Hyper V Solutions Ecosystem */}
      <section className="overflow-hidden bg-bgWhite px-5 py-16 text-btn-primary transition-colors dark:bg-slate-950 dark:text-white sm:px-8 lg:pt-20 lg:pb-12">
        <div className="mx-auto max-w-6xl">
          {/* Section heading */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              The Hyper V Solutions{" "}
              <span className="text-[#ff3038]">Ecosystem</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left content */}
            <div className="max-w-[680px]">
              <p className="mb-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-md">
                Freevance is a Hyper V Solutions LLC company, based in Columbia,
                South Carolina. It operates alongside related platforms so that
                learning, work and opportunity connect rather than exist in
                isolation.
              </p>

              <ul className="space-y-3">
                {[
                  {
                    name: "UltraAura",
                    description: "learning and skills pathways",
                  },
                  {
                    name: "NovaJobs.us",
                    description: "a job portal connecting talent with employers",
                  },
                  {
                    name: "Paradigm Shift",
                    description:
                      "monitoring, rehabilitation and retention programs",
                  },
                  {
                    name: "Nova Home Care, Kushi Gateway and LegitZone.law",
                    description: "further services in the portfolio",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#ff3038]" />

                    <p className="text-base leading-relaxed text-btn-primary dark:text-slate-200 sm:text-lg">
                      <strong className="font-bold">{item.name}</strong>
                      {" — "}
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-base leading-relaxed text-btn-primary dark:text-slate-300 sm:text-lg">
                For applicable engagements, providers operating through
                Freevance/Hyper V Solutions may perform services under the
                applicable subcontracting or project-delivery structure.
              </p>
            </div>

            {/* Right content - Connected ecosystem diagram */}
            <div className="flex w-full items-center justify-center">
              <div className="w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900 sm:p-5">
                
                {/* Add your connected-system component here */}
                <CompanyEcosystemDiagram/>

              </div>
            </div>
          </div>
        </div>
      </section>
      <LogoSlider/>

    {/* Value highlights and final CTA - footer intentionally omitted */}
    <section className="relative overflow-hidden bg-gradient-to-r from-[#1555a5] via-[#064394] to-[#1c4776] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 dark:from-[#101f3b] dark:via-[#102c58] dark:to-[#172d49]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-blue-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px]">

        {/* Trust cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[18px]">

          {/* Card 1 */}
          <div className="flex min-h-[156px] flex-col items-center justify-center rounded-[22px] border border-white/70 bg-white px-4 py-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <CheckCircle2 className="mb-4 h-9 w-9 text-emerald-500" strokeWidth={2.2} />

            <h3 className="text-lg font-bold text-[#172544] dark:text-white">
              Skill-verified providers
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Profiles reviewed by our team
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex min-h-[156px] flex-col items-center justify-center rounded-[22px] border border-white/70 bg-white px-4 py-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <ReceiptText className="mb-4 h-9 w-9 text-indigo-500" strokeWidth={2} />

            <h3 className="text-lg font-bold text-[#172544] dark:text-white">
              Pay per milestone
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Funds released after approval
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex min-h-[156px] flex-col items-center justify-center rounded-[22px] border border-white/70 bg-white px-4 py-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <ShieldCheck className="mb-4 h-9 w-9 text-blue-500" strokeWidth={2} />

            <h3 className="text-lg font-bold text-[#172544] dark:text-white">
              Requirements reviewed
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Checked before publication
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex min-h-[156px] flex-col items-center justify-center rounded-[22px] border border-white/70 bg-white px-4 py-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <MessageCircle className="mb-4 h-9 w-9 text-violet-500" strokeWidth={2} />

            <h3 className="text-lg font-bold text-[#172544] dark:text-white">
              Real support
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Help from the Freevance team
            </p>
          </div>

        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            href="/post-requirement"
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-primary px-7 text-base font-bold text-white shadow-lg shadow-red-950/20 transition duration-300 hover:-translate-y-1 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800 sm:w-auto"
          >
            Post a Requirement
          </Link>

          <Link
            href="#/become-provider"
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-white px-7 text-base font-bold text-[#0a2b66] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            Become a Provider
          </Link>

          <Link
            href="mailto:support@freevance.com"
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-white px-7 text-base font-bold text-[#0a2b66] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            Contact us
          </Link>

        </div>
      </div>
    </section>
    </main>
  );
}
