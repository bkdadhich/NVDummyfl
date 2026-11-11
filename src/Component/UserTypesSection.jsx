"use client";

import { Building2, Laptop, Check } from "lucide-react";
import ActionButton from "./Button/ActionButtons";

const clientFeatures = [
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

const providerFeatures = [
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

function FeatureList({ items }) {
  return (
    <ul className="grid grid-cols-1 content-start gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Check
            size={19}
            strokeWidth={2.5}
            className="mt-0.5 shrink-0 text-emerald-500 dark:text-emerald-400"
            aria-hidden="true"
          />

          <span className="text-[15px] leading-[23px] text-slate-900 dark:text-white sm:text-base">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function UserTypeCard({
  type,
  title,
  descriptions,
  features,
  icon: Icon,
  accent,
  featureBackground,
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
}) {
  return (
    <article className="relative flex min-w-0 flex-col overflow-hidden rounded-[27px] border border-[#dfe5f1] bg-white shadow-[0_12px_45px_rgba(15,23,42,0.055)] transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      <div className={`h-[6px] shrink-0 ${accent}`} />

      <div className="flex flex-1 flex-col p-5 sm:p-8 lg:p-[38px]">
        {/* Icon and audience label */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[19px] border border-slate-200 bg-slate-100 text-[#0d2c65] dark:border-slate-700 dark:bg-slate-800 dark:text-blue-300">
            <Icon size={28} strokeWidth={1.8} />
          </div>

          <span className="rounded-full bg-[#f0efff] px-4 py-2 text-sm font-semibold text-[#0751ae] dark:bg-indigo-950/60 dark:text-blue-300">
            {type}
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-5 text-[29px] font-extrabold leading-[1.18] tracking-tight text-[#101f3c] dark:text-white sm:text-[35px]">
          {title}
        </h2>

        {/* Descriptions */}
        <div className="mt-4 space-y-3 text-[16px] leading-[27px] text-slate-600 dark:text-slate-300 sm:text-[18px] sm:leading-[30px]">
          {descriptions.map((description) => (
            <p key={description}>{description}</p>
          ))}
        </div>

        {/* Feature list panel */}
        <div
          className={`mt-7 flex-1 rounded-[21px] border border-slate-200/70 p-5 dark:border-slate-700 sm:p-6 ${featureBackground}`}
        >
          <FeatureList items={features} />
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ActionButton onClick={onPrimaryClick}>{primaryLabel}</ActionButton>

          <ActionButton variant="secondary" onClick={onSecondaryClick}>
            {secondaryLabel}
          </ActionButton>
        </div>
      </div>
    </article>
  );
}

export default function UserTypesSection({
  onPostRequirement,
  onBecomeProvider,
  onClientLearnMore,
  onProviderLearnMore,
}) {
  return (
    <section
      id="for-clients-and-providers"
      className="bg-[#f4f6fb] px-4 pb-14 pt-8 transition-colors duration-300 dark:bg-slate-950 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
        <UserTypeCard
          type="For Clients / Service Receivers"
          title="Get the Work Done Without Managing the Complexity"
          descriptions={[
            "Freevance gives individuals and organizations a structured way to source and manage professional services.",
            "From a single requirement to a multi-provider project, the platform helps organize the process from initial request through delivery and completion.",
          ]}
          features={clientFeatures}
          icon={Building2}
          accent="bg-gradient-to-r from-primary to-[#ff5a65]"
          featureBackground="bg-[#edf3fc] dark:bg-[#13203F]"
          primaryLabel="Post a Requirement"
          secondaryLabel="Learn more"
          onPrimaryClick={onPostRequirement}
          onSecondaryClick={onClientLearnMore}
        />

        <UserTypeCard
          type="For Service Providers"
          title="Find Opportunities. Deliver Results. Build Relationships."
          descriptions={[
            "Freevance gives qualified professionals and organizations access to opportunities that match their capabilities.",
            "Providers can review requirements, submit proposals, participate in awarded projects, manage deliverables, communicate with project teams, and track project activity through one platform.",
          ]}
          features={providerFeatures}
          icon={Laptop}
          accent="bg-gradient-to-r from-secondary to-blue-500"
          featureBackground="bg-[#f5f3ff] dark:bg-[#1B1838]"
          primaryLabel="Become a Provider"
          secondaryLabel="Learn more"
          onPrimaryClick={onBecomeProvider}
          onSecondaryClick={onProviderLearnMore}
        />
      </div>
    </section>
  );
}
