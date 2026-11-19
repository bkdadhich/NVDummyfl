"use client";

import Link from "next/link";
import {
  FileText,
  SlidersHorizontal,
  Search,
  MessageSquareText,
  Scale,
  Rocket,
  PackageCheck,
  ClipboardCheck,
  CreditCard,
  Flag,
  Users,
  BriefcaseBusiness,
  Building2,
  ArrowRight,
} from "lucide-react";

const workflowSteps = [
  {
    title: "Submit Requirement",
    description: "Tell us what needs to be completed.",
    appLabel: "In the app: Post a Requirement form",
    icon: FileText,
  },
  {
    title: "Define the Scope",
    description:
      "Requirements, deliverables, timelines, qualifications, and commercial terms are structured.",
    appLabel: "In the app: Requirement structuring by the Freevance team",
    icon: SlidersHorizontal,
  },
  {
    title: "Source Providers",
    description:
      "Qualified individuals and organizations can review relevant opportunities.",
    appLabel: "In the app: Published as an Opportunity",
    icon: Search,
  },
  {
    title: "Receive Responses",
    description:
      "Providers submit their capabilities, approach, pricing, timelines, and required information.",
    appLabel: "In the app: Provider response form",
    icon: MessageSquareText,
  },
  {
    title: "Evaluate & Select",
    description:
      "Responses are reviewed and the appropriate provider or team is selected.",
    appLabel: "In the app: Compare Proposals · Select Provider",
    icon: Scale,
  },
  {
    title: "Start the Project",
    description:
      "Project scope, responsibilities, milestones, communication, and deliverables are established.",
    appLabel: "In the app: Project workspace and agreement",
    icon: Rocket,
  },
  {
    title: "Manage Delivery",
    description:
      "Progress, documentation, milestones, communications, and deliverables are managed through the platform.",
    appLabel: "In the app: Milestones · Tasks · Messages · Documents",
    icon: PackageCheck,
  },
  {
    title: "Review & Accept",
    description:
      "Completed work is reviewed against the agreed requirements.",
    appLabel: "In the app: Deliverables · Approvals",
    icon: ClipboardCheck,
  },
  {
    title: "Complete Payment",
    description:
      "Approved transactions are processed according to the applicable project terms.",
    appLabel: "In the app: Payments · Invoices",
    icon: CreditCard,
  },
  {
    title: "Close the Project",
    description: "The engagement is completed, documented, and closed.",
    appLabel: "In the app: Project Completed · Feedback",
    icon: Flag,
  },
];

const audiences = [
  {
    title: "Clients / Service Receivers",
    description:
      "Submit requirements, review responses, select a provider, review deliverables, approve work and manage payments.",
    icon: Users,
  },
  {
    title: "Providers",
    description:
      "Review opportunities, submit responses, manage awarded projects, upload deliverables and track payment status.",
    icon: BriefcaseBusiness,
  },
  {
    title: "The Freevance team",
    description:
      "Structures requirements, publishes opportunities, evaluates responses, confirms awards, oversees delivery, payments and issue resolution.",
    icon: Building2,
  },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-[#f4f5fb] text-[#102b5c] dark:bg-[#0b1428] dark:text-white">
      {/* Page title banner — header and footer are intentionally excluded. */}
      <section className="relative overflow-hidden bg-[#0a2b66] px-5 py-8 text-center text-white sm:py-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.28),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h1>
          <p className="mt-2 text-xs text-blue-100 sm:text-sm">
            Home <span className="px-1.5 opacity-70">›</span> How It Works
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-[#0a2b66] dark:text-white sm:text-3xl">
              How Freevance Works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-7">
              Freevance is a structured services marketplace and
              project-delivery platform connecting individuals and
              organizations with qualified providers while supporting the
              workflow from requirement through completion.
            </p>
          </header>

          {/* Numbered project workflow */}
          <div className="relative mx-auto max-w-[680px]">
            <div className="absolute bottom-7 left-[18px] top-7 w-px bg-gradient-to-b from-primary via-[#9aa9c9] to-[#0a2b66] sm:left-[19px]" />

            <div className="space-y-3.5 sm:space-y-4">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article
                    key={step.title}
                    className="group relative flex items-start gap-3 sm:gap-4"
                  >
                    <div className="relative z-10 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br from-primary to-[#17458c] text-sm font-bold text-white shadow-[0_7px_16px_rgba(10,43,102,0.2)] sm:h-10 sm:w-10">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1 rounded-2xl border border-white/90 bg-white px-4 py-3.5 shadow-[0_7px_24px_rgba(20,35,70,0.055)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(20,35,70,0.09)] dark:border-slate-700 dark:bg-[#111c38] sm:px-5 sm:py-4">
                      <div className="flex items-center gap-2">
                        <Icon
                          size={16}
                          strokeWidth={2.2}
                          className="shrink-0 text-primary"
                        />
                        <h3 className="text-sm font-bold text-[#14213d] dark:text-white sm:text-base">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300 sm:text-sm">
                        {step.description}
                      </p>
                      <span className="mt-2 inline-flex max-w-full rounded-full bg-[#eef1ff] px-2.5 py-1 text-[10px] font-semibold leading-4 text-[#164baf] dark:bg-blue-950/60 dark:text-blue-200 sm:text-[11px]">
                        {step.appLabel}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Roles and responsibilities */}
          <div className="mx-auto mt-8 grid max-w-5xl gap-3 sm:mt-9 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <article
                  key={audience.title}
                  className="rounded-2xl border border-white bg-white p-4 shadow-[0_7px_24px_rgba(20,35,70,0.055)] dark:border-slate-700 dark:bg-[#111c38] sm:p-5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-primary dark:bg-red-950/30">
                      <Icon size={18} />
                    </span>
                    <h3 className="text-sm font-bold text-[#14213d] dark:text-white">
                      {audience.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-600 dark:text-slate-300 sm:text-sm">
                    {audience.description}
                  </p>
                </article>
              );
            })}
          </div>

          {/* Calls to action */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row">
            <Link
              href="/post-requirement"
              className="btn-style inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(252,48,48,0.22)] transition hover:-translate-y-0.5 hover:bg-[#e62929]"
            >
              Post a Requirement
              <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("freevance:open-login", {
                    detail: { role: "freelancer" },
                  })
                );
              }}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#dce3f0] bg-white px-6 py-3 text-sm font-bold text-[#14213d] transition hover:border-[#0a2b66] hover:bg-blue-50 dark:border-slate-600 dark:bg-[#111c38] dark:text-white dark:hover:bg-slate-800"
            >
              Become a Provider
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
