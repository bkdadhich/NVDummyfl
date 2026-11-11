"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileSearch,
  Gauge,
  Handshake,
  Layers3,
  Laptop,
  Rocket,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wallet,
  Workflow,
} from "lucide-react";
import ActionButton from "./Button/ActionButtons";
import CompanyEcosystemDiagram from "./CompanyEcosystemDiagram";

const platformFeatures = [
  {
    title: "Browse portfolios",
    description:
      "Discover skilled professionals through work samples and proven experience.",
    icon: FileSearch,
    iconClass:
      "bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-300",
  },
  {
    title: "Fast bids",
    description:
      "Receive clear proposals and find the right fit for your project sooner.",
    icon: Clock3,
    iconClass:
      "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300",
  },
  {
    title: "Quality work",
    description:
      "Work with talent focused on delivering against your agreed requirements.",
    icon: BadgeCheck,
    iconClass:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300",
  },
  {
    title: "Track progress",
    description:
      "Keep milestones, project updates, and delivery progress easy to follow.",
    icon: Gauge,
    iconClass:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300",
  },
];

const ecosystemNodes = [
  {
    name: "NOVA",
    type: "Platform",
    color:
      "border-slate-800 text-slate-800 dark:border-slate-300 dark:text-slate-100",
  },
  {
    name: "Abroadium",
    type: "Platform",
    color: "border-teal-400 text-teal-600 dark:text-teal-300",
  },
  {
    name: "Partner network",
    type: "Network",
    color:
      "border-indigo-900 text-indigo-900 dark:border-indigo-300 dark:text-indigo-200",
  },
  { name: "Freevance", type: "Platform", color: "border-primary text-primary" },
  {
    name: "Google Workspace",
    type: "Tools",
    color:
      "border-slate-800 text-slate-800 dark:border-slate-300 dark:text-slate-100",
  },
  {
    name: "Delivery teams",
    type: "People",
    color: "border-teal-400 text-teal-600 dark:text-teal-300",
  },
  {
    name: "Client solutions",
    type: "Services",
    color: "border-primary text-primary",
  },
];

const partnerNames = [
  "Freevance",
  "Abroadium",
  "NOVA",
  "Hyper V Solutions",
  "Partner Network",
  "Google Workspace",
  "Delivery Partners",
  "Freevance",
];

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-5xl`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:text-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-heading dark:text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default function HomePageSections({
  onBrowseProjects,
  onFindTalent,
  onFindWork,
  onLearnMore,
}) {
  const [sprintAmount, setSprintAmount] = useState("1000");
  const amount = Math.max(0, Number(sprintAmount) || 0);
  const money = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  const feeBreakdown = useMemo(
    () => ({
      milestone: amount,
      clientPays: amount * 1.1,
      providerReceives: amount * 0.9,
      platformFee: amount * 0.2,
    }),
    [amount],
  );

  return (
    <main className="bg-white text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* What's great about Freevance */}
      <section className="relative overflow-hidden bg-slate-50 px-5 py-14 dark:bg-slate-900/70 sm:px-8 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-200/25 blur-3xl dark:bg-blue-900/20" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            centered
            title={
              <>
                What’s Great About{" "}
                <span className="text-primary">Freevance</span>
              </>
            }
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platformFeatures.map(
              ({ title, description, icon: Icon, iconClass }, index) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 sm:p-6"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${iconClass}`}
                  >
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {description}
                  </p>
                  <div className="mt-5 h-1 w-10 rounded-full bg-primary/70 transition-all duration-300 group-hover:w-16" />
                </article>
              ),
            )}
          </div>

          {/* Two main user journeys */}
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <article className="group relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff9c86] via-[#ff6d68] to-[#e83c49] p-6 text-white shadow-md sm:p-8 lg:p-9">
              <div className="pointer-events-none absolute -right-8 -top-12 -z-10 h-48 w-48 rounded-full border-[28px] border-white/10 transition-transform duration-500 group-hover:scale-110" />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/20 backdrop-blur-sm">
                <Laptop aria-hidden="true" className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-extrabold sm:text-2xl">
                I need a developer for my project
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/90 sm:text-base">
                Find the right skills for your next idea. Share your
                requirements, compare proposals, and move forward one sprint at
                a time.
              </p>
              <div className="mt-6">
                <ActionButton
                  onClick={onFindTalent || onBrowseProjects}
                  className="!min-h-[44px] !bg-white !px-5 !py-2.5 !text-primary !shadow-none hover:!bg-white/90"
                >
                  Post a Project{" "}
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </ActionButton>
              </div>
            </article>

            <article className="group relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#3978f6] via-[#2860dc] to-[#193c9d] p-6 text-white shadow-md sm:p-8 lg:p-9">
              <div className="pointer-events-none absolute -right-8 -top-12 -z-10 h-48 w-48 rounded-full border-[28px] border-white/10 transition-transform duration-500 group-hover:scale-110" />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/20 backdrop-blur-sm">
                <Rocket aria-hidden="true" className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-extrabold sm:text-2xl">
                Find your next great opportunity
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/90 sm:text-base">
                Put your skills to work, showcase your experience, and connect
                with projects that match your strengths.
              </p>
              <div className="mt-6">
                <ActionButton
                  variant="secondary"
                  onClick={onFindWork}
                  className="!min-h-[44px] !bg-slate-950 !px-5 !py-2.5 !text-white !shadow-none hover:!bg-slate-900"
                >
                  Start Building{" "}
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </ActionButton>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Transparent fee calculator */}
      <section className="px-5 py-14 dark:bg-slate-950 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              title="Simple, transparent fees"
              description="Clients pay 10% on top. Freelancers keep 90%. Money is held until you approve each sprint."
            />
            <ul className="mt-6 space-y-3">
              {[
                "No monthly fees, no listing fees",
                "Skill-verified freelancers",
                "Admin-managed disputes",
                "Payouts 5 days after approval",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-primary"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/15">
                <CircleDollarSign aria-hidden="true" className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Fee calculator
                </h3>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  See how a sprint payment breaks down
                </p>
              </div>
            </div>
            <label
              htmlFor="sprint-amount"
              className="mt-6 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Sprint amount (USD)
            </label>
            <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 dark:border-slate-700 dark:bg-slate-950">
              <span className="mr-2 text-slate-500 dark:text-slate-400">$</span>
              <input
                id="sprint-amount"
                type="number"
                min="0"
                step="50"
                value={sprintAmount}
                onChange={(event) => setSprintAmount(event.target.value)}
                className="w-full bg-transparent py-3 text-sm font-semibold text-slate-900 outline-none dark:text-white"
                aria-describedby="fee-note"
              />
            </div>
            <div className="my-5 h-px bg-slate-200 dark:bg-slate-800" />
            <dl className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600 dark:text-slate-300">
                  Milestone amount
                </dt>
                <dd className="font-semibold tabular-nums text-slate-900 dark:text-white">
                  {money(feeBreakdown.milestone)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600 dark:text-slate-300">
                  Client pays (+10%)
                </dt>
                <dd className="font-semibold tabular-nums text-slate-900 dark:text-white">
                  {money(feeBreakdown.clientPays)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600 dark:text-slate-300">
                  Provider receives (−10%)
                </dt>
                <dd className="font-semibold tabular-nums text-slate-900 dark:text-white">
                  {money(feeBreakdown.providerReceives)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                <dt className="font-bold text-slate-900 dark:text-white">
                  Platform fee
                </dt>
                <dd className="text-base font-extrabold tabular-nums text-primary">
                  {money(feeBreakdown.platformFee)}
                </dd>
              </div>
            </dl>
            <p
              id="fee-note"
              className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400"
            >
              Illustrative calculation based on a 10% client fee and a 10%
              provider fee. Confirm the applicable terms before payment.
            </p>
          </div>
        </div>
      </section>

      {/* Connected portfolio ecosystem */}
      <section className="overflow-hidden bg-slate-50 px-5 py-14 dark:bg-slate-900/70 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            centered
            title="One Connected Portfolio. Multiple Ways to Serve."
          />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                Hyper V Solutions brings its platforms together under shared
                standards for design, operations, security, and support. Each
                platform serves a distinct need while benefiting from the
                experience and resources of the broader organization.
              </p>
              <h3 className="mt-6 text-base font-bold text-slate-900 dark:text-white">
                Through this ecosystem approach, Hyper V Solutions enables:
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Consistent user experience",
                  "Shared operating standards",
                  "Clear ownership and accountability",
                  "Scalable support across platforms",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <ActionButton variant="secondary" onClick={onLearnMore}>
                  Learn more{" "}
                  <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </ActionButton>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-7">
              <CompanyEcosystemDiagram />
            </div>
          </div>
        </div>
      </section>      
    </main>
  );
}
