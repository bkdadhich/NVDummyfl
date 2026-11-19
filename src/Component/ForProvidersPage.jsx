"use client";

import {
  Check, Users, Building2, Link2, Award, ClipboardList,
  LayoutDashboard, BriefcaseBusiness, FileCheck2, Wallet,
  Bell, ArrowRight
} from "lucide-react";

const providerTasks = [
  "Create provider profile",
  "Add capabilities and specialties",
  "Add qualifications and credentials",
  "Review available opportunities",
  "Submit proposals",
  "Provide pricing and timelines",
  "Receive project awards",
  "Manage assigned projects",
  "Complete milestones",
  "Upload deliverables",
  "Communicate with project stakeholders",
  "Track approvals",
  "View payment status",
  "Maintain completed-project history",
];

const providerTabs = [
  "Overview", "Opportunities", "My Responses", "Awards",
  "Active Projects", "Milestones", "Deliverables", "Messages",
  "Documents", "Payments", "Profile", "Notifications", "Support",
];

const providerTypes = [
  {
    title: "Independent professionals",
    description: "Find opportunities that match your capabilities.",
    Icon: Users,
  },
  {
    title: "Agencies, vendors and consultants",
    description: "Respond as a team and manage awarded work in one place.",
    Icon: Building2,
  },
  {
    title: "Subcontractors",
    description: "Deliver under the applicable subcontracting or project-delivery structure.",
    Icon: Link2,
  },
  {
    title: "Verified capabilities",
    description: "Pass skill tests to earn badges, and add qualifications and credentials to your profile.",
    Icon: Award,
  },
  {
    title: "Clear payment status",
    description: "See pending, approved, processing and paid amounts for every milestone.",
    Icon: Wallet,
  },
];

function ProviderDashboardPreview() {
  const tabs = providerTabs;  

  return (
    <div className="relative mx-auto w-full max-w-[510px]">
      <div className="absolute -inset-4 rounded-[34px] bg-gradient-to-br from-blue-200/60 via-indigo-100/50 to-red-100/50 blur-2xl dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-red-900/10" />
      <div className="relative rounded-[22px] border border-white bg-white p-5 shadow-[0_18px_55px_rgba(15,35,75,0.12)] dark:border-slate-700 dark:bg-[#111c38] sm:p-6">
        <div className="mb-1 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#164baf] dark:bg-blue-950/60 dark:text-blue-300">
            <LayoutDashboard size={17} />
          </span>
          <div>
            <h3 className="text-md font-bold text-[#14213d] dark:text-white">Your provider dashboard</h3>
            <p className="text-[13px] text-slate-500 dark:text-slate-400">Opportunities, awards and delivery in one place.</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tabs.map((tab, index) => (
            <span key={tab} className={`rounded-full px-2.5 py-1 text-[13px] font-semibold ${
              index === 0
                ? "bg-[#0a2b66] text-white"
                : "bg-[#eef2fb] text-[#254b85] dark:bg-slate-800 dark:text-slate-200"
            }`}>{tab}</span>
          ))}
        </div>        
      </div>
    </div>
  );
}

export default function ForProvidersPage() {
  const openProviderLogin = () => {
    window.dispatchEvent(new CustomEvent("freevance:open-login", {
      detail: { role: "freelancer" },
    }));
  };

  return (
    <main className="bg-bgWhite text-[#14213d] dark:bg-[#0b1428] dark:text-white">
      {/* Navbar and Footer are provided by the site layout. */}
      <section className="relative overflow-hidden bg-primary-gradient px-5 py-7 text-center text-white sm:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.12),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">For Providers</h1>
          <p className="mt-1 text-xs text-blue-100">Home <span className="px-1.5 opacity-70">›</span> For Providers</p>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-7 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-secondary">For Service Providers</p>
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-heading dark:text-white sm:text-4xl">
              Find Opportunities. Deliver Results. Build Relationships.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-[16px] sm:leading-7">
              Freevance gives qualified professionals and organizations access to opportunities that match their capabilities.
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-[16px] sm:leading-7">
              Providers can review requirements, submit proposals, participate in awarded projects, manage deliverables, communicate with project teams, and track project activity through one platform.
            </p>
            <ul className="mt-5 grid max-w-xl grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2">
              {providerTasks.map((task) => (
                <li key={task} className="flex items-start gap-2 text-xs leading-5 text-slate-700 dark:text-slate-300 sm:text-[15px]">
                  <Check size={15} strokeWidth={2.8} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  {task}
                </li>
              ))}
            </ul>
            <button type="button" onClick={openProviderLogin} className="btn-style mt-6 inline-flex items-center gap-2">
              <span>Become a Provider</span><ArrowRight size={16} />
            </button>
          </div>
          <ProviderDashboardPreview />
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-7 sm:pb-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-7 text-center text-2xl font-bold tracking-tight text-heading dark:text-white sm:text-4xl">Who can be a provider</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {providerTypes.map(({ title, description, Icon }) => (
              <article key={title} className="rounded-2xl border border-white bg-white p-5 shadow-[0_8px_28px_rgba(15,35,75,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(15,35,75,0.1)] dark:border-slate-700 dark:bg-[#111c38]">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2fb] text-[#2563eb] dark:bg-slate-800 dark:text-blue-300"><Icon size={19} /></span>
                <h3 className="text-sm font-bold text-[#14213d] dark:text-white sm:text-lg">{title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-[15px]">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-[#dfe5fb] bg-[#eef2ff]/70 px-4 py-3 text-[15px] leading-5 text-[#53658a] dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
            For applicable engagements, providers operating through Freevance/Hyper V Solutions may perform services under the applicable subcontracting or project-delivery structure.
          </p>
        </div>
      </section>
    </main>
  );
}
