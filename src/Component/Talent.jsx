"use client";

import { useMemo, useState } from "react";
import {
  Code2,
  Smartphone,
  Palette,
  PenLine,
  Megaphone,
  Bot,
  FileText,
  Compass,
  FolderKanban,
  Search,
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";

const categories = [
  { name: "Web Development", count: 0, Icon: Code2 },
  { name: "Mobile Apps", count: 0, Icon: Smartphone },
  { name: "UI/UX Design", count: 0, Icon: Palette },
  { name: "Content Writing", count: 0, Icon: PenLine },
  { name: "Digital Marketing", count: 0, Icon: Megaphone },
  { name: "Data & Analytics", count: 0, Icon: Bot },
  { name: "Resume & Career", count: 0, Icon: FileText },
  { name: "Consulting & Advisory", count: 0, Icon: Compass },
  { name: "Operations & Admin Support", count: 0, Icon: FolderKanban },
];

const providerTypes = [
  "Individual",
  "Agency",
  "Company",
  "Consultant",
  "Vendor / Subcontractor",
];

// Add provider objects here when provider data is available.
// Expected fields: name, description, category, type, capabilities, specialty.
const providers = [];

export default function TalentPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [providerType, setProviderType] = useState("");

  const filteredProviders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return providers.filter((provider) => {
      const matchesCategory =
        !selectedCategory || provider.category === selectedCategory;
      const matchesType = !providerType || provider.type === providerType;
      const searchableText = [
        provider.name,
        provider.description,
        provider.category,
        provider.type,
        ...(provider.capabilities || []),
        ...(provider.specialty || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = !query || searchableText.includes(query);

      return matchesCategory && matchesType && matchesSearch;
    });
  }, [selectedCategory, searchQuery, providerType]);

  return (
    <main className="min-h-screen bg-bgWhite text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Page heading */}
      <section className="border-b border-slate-200 bg-primary-gradient dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-col items-center mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Find Services
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-3 flex items-center gap-2 text-sm text-white dark:text-slate-400"
          >
            <a
              href="/"
              className="transition-colors hover:text-primary dark:hover:text-primary"
            >
              Home
            </a>
            <span aria-hidden="true">›</span>
            <span className="font-medium text-white dark:text-slate-200">
              Find Services
            </span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
          Browse service categories and qualified providers. Can&apos;t find the
          right match?{" "}
          <a
            href="#/post"
            className="font-semibold text-primary transition-colors dark:text-secondary dark:decoration-secondary dark:hover:text-secondary"
          >
            Post a Requirement
          </a>{" "}
          and receive structured responses from providers.
        </p>

        {/* Service category filters */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ name, count, Icon }) => {
            const isSelected = selectedCategory === name;

            return (
              <button
                key={name}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  setSelectedCategory((current) =>
                    current === name ? "" : name,
                  )
                }
                className={`group flex min-h-20 items-center gap-4 rounded-xl border p-4 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/50"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700 dark:hover:bg-slate-900/80"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isSelected
                      ? "bg-blue-600 text-white dark:bg-blue-500"
                      : "bg-blue-50 text-blue-600 group-hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-400 dark:group-hover:bg-slate-800"
                  }`}
                >
                  <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {name}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                    {count} providers
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className={`shrink-0 transition-transform ${
                    isSelected
                      ? "translate-x-0.5 text-blue-600 dark:text-blue-400"
                      : "text-slate-400 group-hover:translate-x-0.5 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Search and provider type */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search providers</span>
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by name, capability or specialty…"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/10"
            />
          </label>

          <label className="block sm:w-64">
            <span className="sr-only">Provider type</span>
            <select
              value={providerType}
              onChange={(event) => setProviderType(event.target.value)}
              aria-label="Provider type"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-400 dark:focus:ring-blue-400/10"
            >
              <option value="">All provider types</option>
              {providerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Provider results */}
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider, index) => (
              <article
                key={provider.id || `${provider.name}-${index}`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                    <BriefcaseBusiness size={20} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-slate-900 dark:text-white">
                      {provider.name}
                    </h2>
                    {provider.type && (
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {provider.type}
                      </p>
                    )}
                  </div>
                </div>
                {provider.description && (
                  <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {provider.description}
                  </p>
                )}
                {provider.category && (
                  <span className="mt-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {provider.category}
                  </span>
                )}
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center dark:border-slate-700 dark:bg-slate-900/60">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-400">
                <Search size={20} aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                No providers match
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-400">
                Try another category or search term, or{" "}
                <a
                  href="#/post"
                  className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  post a requirement
                </a>{" "}
                and let providers respond to you.
              </p>
              {(selectedCategory || searchQuery || providerType) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("");
                    setSearchQuery("");
                    setProviderType("");
                  }}
                  className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
