"use client";

import Link from "next/link";
import {
  Check,
  ClipboardList,
  Users,
  Building2,
  Landmark,
  ArrowRight,
  LayoutDashboard,
  FileText,
  MessageSquare,
  FolderKanban,
  Flag,
  PackageCheck,
  CreditCard,
  Bell,
  LifeBuoy,
  Search,
  SlidersHorizontal,
  Scale,
  Rocket,
  ClipboardCheck,
} from "lucide-react";

const clientTasks = [
  "Submit requirements",
  "Define project scope",
  "Set timelines and deliverables",
  "Review provider responses",
  "Compare proposals",
  "Select providers",
  "Manage project milestones",
  "Exchange documents",
  "Communicate with project participants",
  "Review deliverables",
  "Approve completed work",
  "Manage project transactions",
  "Maintain project records",
];

const dashboardTabs = [
  "Overview",
  "My Requirements",
  "Responses",
  "Projects",
  "Milestones",
  "Deliverables",
  "Messages",
  "Documents",
  "Payments",
  "Notifications",
  "Support",
];

const dashboardStats = [
  "Active Requirements",
  "Responses Received",
  "Active Projects",
  "Pending Approvals",
  "Upcoming Milestones",
  "Outstanding Actions",
];

const audiences = [
  {
    title: "Individuals",
    description:
      "Get a focused assignment completed by a qualified professional.",
    Icon: Users,
  },
  {
    title: "Businesses",
    description:
      "Source a specialist or a full team for a defined project.",
    Icon: Building2,
  },
  {
    title: "Government and public sector",
    description:
      "Publish requirements and manage delivery with clear records.",
    Icon: Landmark,
  },
];

const workflow = [
  {
    title: "Submit Requirement",
    description: "Tell us what needs to be completed.",
    Icon: FileText,
  },
  {
    title: "Define the Scope",
    description:
      "Requirements, deliverables, timelines, qualifications, and commercial terms are structured.",
    Icon: SlidersHorizontal,
  },
  {
    title: "Source Providers",
    description:
      "Qualified individuals and organizations can review relevant opportunities.",
    Icon: Search,
  },
  {
    title: "Receive Responses",
    description:
      "Providers submit their capabilities, approach, pricing, timelines, and required information.",
    Icon: MessageSquare,
  },
  {
    title: "Evaluate & Select",
    description:
      "Responses are reviewed and the appropriate provider or team is selected.",
    Icon: Scale,
  },
  {
    title: "Start the Project",
    description:
      "Project scope, responsibilities, milestones, communication, and deliverables are established.",
    Icon: Rocket,
  },
  {
    title: "Manage Delivery",
    description:
      "Progress, documentation, milestones, communications, and deliverables are managed through the platform.",
    Icon: PackageCheck,
  },
  {
    title: "Review & Accept",
    description:
      "Completed work is reviewed against the agreed requirements.",
    Icon: ClipboardCheck,
  },
  {
    title: "Complete Payment",
    description:
      "Approved transactions are processed according to the applicable project terms.",
    Icon: CreditCard,
  },
  {
    title: "Close the Project",
    description:
      "The engagement is completed, documented, and closed.",
    Icon: Flag,
  },
];

function ClientDashboardPreview() {
  const statIcons = [
    ClipboardList,
    MessageSquare,
    FolderKanban,
    Check,
    Flag,
    Bell,
  ];

  return (
    <div className="relative mx-auto w-full max-w-[510px]">
      <div className="absolute -inset-4 rounded-[34px] bg-gradient-to-br from-blue-200/60 via-indigo-100/50 to-red-100/50 blur-2xl dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-red-900/10" />
      <div className="relative rounded-[22px] border border-white bg-white p-5 shadow-[0_18px_55px_rgba(15,35,75,0.12)] dark:border-slate-700 dark:bg-[#111c38] sm:p-6">
        <div className="mb-1 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#164baf] dark:bg-blue-950/60 dark:text-blue-300">
            <LayoutDashboard size={17} />
          </span>
          <div>
            <h3 className="text-md font-bold text-[#14213d] dark:text-white">
              Your client dashboard
            </h3>
            <p className="text-[12px] text-slate-500 dark:text-slate-400">
              Everything for a requirement lives in one place.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {dashboardTabs.map((tab, index) => (
            <span
              key={tab}
              className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                index === 0
                  ? "bg-[#0a2b66] text-white"
                  : "bg-[#eef2fb] text-[#254b85] dark:bg-slate-800 dark:text-slate-200"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {dashboardStats.map((stat, index) => {
            const Icon = statIcons[index];
            return (
              <div
                key={stat}
                className="flex min-h-[58px] items-center gap-2 rounded-xl border border-slate-100 bg-[#fbfcff] px-3 py-3 dark:border-slate-700 dark:bg-[#0d1830]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563eb] dark:bg-blue-950/60 dark:text-blue-300">
                  <Icon size={14} />
                </span>
                <span className="text-[10px] font-medium leading-4 text-slate-600 dark:text-slate-300 sm:text-[13px]">
                  {stat}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ForClientsPage() {
  return (
    <main className="bg-bgWhite text-[#14213d] dark:bg-[#0b1428] dark:text-white">
      {/* Page banner only. The site Navbar and Footer are provided by the layout. */}
      <section className="relative overflow-hidden bg-primary-gradient px-5 py-7 text-center text-white sm:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.12),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            For Clients
          </h1>
          <p className="mt-1 text-xs text-blue-100">
            Home <span className="px-1.5 opacity-70">›</span> For Clients
          </p>
        </div>
      </section>

      {/* Intro and client dashboard preview */}
      <section className="px-5 py-10 sm:px-7 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-secondary">
              For Clients / Service Receivers
            </p>
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-heading dark:text-white sm:text-4xl">
              Get the Work Done Without Managing the Complexity
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-[17px] sm:leading-7">
              Freevance gives individuals and organizations a structured way to
              source and manage professional services.
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-[17px] sm:leading-7">
              From a single requirement to a multi-provider project, the
              platform helps organize the process from initial request through
              delivery and completion.
            </p>

            <ul className="mt-5 grid max-w-xl grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2">
              {clientTasks.map((task) => (
                <li
                  key={task}
                  className="flex items-start gap-2 text-sm leading-5 text-slate-700 dark:text-slate-300 sm:text-[15px]"
                >
                  <Check
                    size={15}
                    strokeWidth={2.8}
                    className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                  />
                  {task}
                </li>
              ))}
            </ul>

            <Link href="/post-requirement" className="btn-style mt-6 gap-2">
              <span>Post a Requirement</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <ClientDashboardPreview />
        </div>
      </section>

      {/* Who can post */}
      <section className="px-5 pb-10 sm:px-7 sm:pb-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-7 text-center text-2xl font-bold tracking-tight text-heading dark:text-white sm:text-4xl">
            Who can post a requirement
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-white bg-white p-5 shadow-[0_8px_28px_rgba(15,35,75,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(15,35,75,0.1)] dark:border-slate-700 dark:bg-[#111c38]"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2fb] text-[#2563eb] dark:bg-slate-800 dark:text-blue-300">
                  <Icon size={19} />
                </span>
                <h3 className="text-sm font-bold text-[#14213d] dark:text-white sm:text-lg">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-5 text-slate-500 dark:text-slate-400 sm:text-[15px]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Requirement-to-completion workflow */}
      <section className="px-5 pb-12 sm:px-7 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-7 text-center text-2xl font-bold tracking-tight text-heading dark:text-white sm:text-4xl">
            From requirement to completion
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {workflow.map(({ title, description, Icon }, index) => (
              <article
                key={title}
                className="group relative min-h-[168px] rounded-2xl border border-white bg-white p-4 shadow-[0_7px_24px_rgba(20,35,70,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(20,35,70,0.1)] dark:border-slate-700 dark:bg-[#111c38]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#17458c] text-sm font-bold text-white shadow-sm">
                    {index + 1}
                  </span>
                  <Icon
                    size={16}
                    className="text-primary opacity-70 transition group-hover:opacity-100"
                  />
                </div>
                <h3 className="text-[16px] font-bold leading-5 text-[#14213d] dark:text-white">
                  {title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-[1.55] text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
