"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  FileText,
  FolderOpen,
  Megaphone,
  Palette,
  Smartphone,
  SlidersHorizontal,
  Sparkles,
  Compass,
} from "lucide-react";

const categories = [
  { label: "Web Development", icon: Code2 },
  { label: "Mobile Apps", icon: Smartphone },
  { label: "UI/UX Design", icon: Palette },
  { label: "Content Writing", icon: FileText },
  { label: "Digital Marketing", icon: Megaphone },
  { label: "Data & Analytics", icon: Sparkles },
  { label: "Resume & Career", icon: BriefcaseBusiness },
  { label: "Consulting & Advisory", icon: Compass },
  { label: "Operations & Admin Support", icon: FolderOpen },
];

const providerTypes = [
  "Individual",
  "Agency",
  "Company",
  "Consultant",
  "Vendor / Subcontractor",
];

const languages = ["English", "Spanish", "Hindi", "French", "Arabic", "Portuguese"];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [sort, setSort] = useState("new");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sectors, setSectors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // Connect your projects API here when project data is available.
  const projects = [];

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = projects.filter((project) => {
      const searchableText = [
        project.title,
        project.description,
        project.category,
        ...(project.capabilities || []),
        ...(project.qualifications || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);
      const matchesBudget =
        !minBudget || Number(project.budget || 0) >= Number(minBudget);
      const matchesSector = !sectors.length || sectors.includes(project.sector);
      const matchesCategory =
        !selectedCategory || project.category === selectedCategory;
      const matchesProvider =
        !selectedProviders.length ||
        selectedProviders.some((type) =>
          (project.providerTypes || []).includes(type)
        );
      const matchesLanguage =
        !selectedLanguages.length ||
        selectedLanguages.some((language) =>
          (project.languages || []).includes(language)
        );

      return (
        matchesSearch &&
        matchesBudget &&
        matchesSector &&
        matchesCategory &&
        matchesProvider &&
        matchesLanguage
      );
    });

    return [...results].sort((a, b) => {
      if (sort === "budget") return Number(b.budget || 0) - Number(a.budget || 0);
      if (sort === "bids") return Number(a.responses || 0) - Number(b.responses || 0);
      if (sort === "deadline") {
        return new Date(a.deadline || "9999-12-31") - new Date(b.deadline || "9999-12-31");
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [projects, search, minBudget, sort, sectors, selectedCategory, selectedProviders, selectedLanguages]);

  const toggleValue = (value, setter, current) => {
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setMinBudget("");
    setSort("new");
    setSectors([]);
    setSelectedCategory("");
    setSelectedProviders([]);
    setSelectedLanguages([]);
  };

  return (
    <main className="min-h-screen bg-bgWhite text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Page heading */}
      <section className="bg-primary-gradient py-10 dark:bg-slate-900">
        <div className="flex flex-col items-center mx-auto max-w-7xl px-5 sm:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Opportunities
          </h1>
          <nav aria-label="Breadcrumb" className="mt-3 text-sm text-white">
            <a href="/" className="transition hover:text-primary dark:hover:text-blue-400">Home</a>
            <ArrowRight className="mx-2 inline-block h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-white dark:text-slate-200">Opportunities</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10">
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-4 text-sm leading-6 text-blue-950 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-100 sm:px-5">
          Browse requirements published by clients. Review the scope, then submit a response with your approach, timeline and pricing. For applicable engagements, providers operating through Freevance/Hyper V Solutions may perform services under the applicable subcontracting or project-delivery structure.
        </div>

        {/* Search and sort controls */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Search opportunities</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, capability or qualification…"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-950"
            />
          </label>
          <label className="sm:w-36">
            <span className="sr-only">Minimum budget</span>
            <input
              type="number"
              min="0"
              value={minBudget}
              onChange={(event) => setMinBudget(event.target.value)}
              placeholder="Min budget"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-950"
            />
          </label>
          <label className="sm:w-48">
            <span className="sr-only">Sort opportunities</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-950"
            >
              <option value="new">Newest</option>
              <option value="budget">Highest budget</option>
              <option value="bids">Fewest responses</option>
              <option value="deadline">Response deadline soon</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="project-filters"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> {filtersOpen ? "Hide filters" : "Filters"}
          </button>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Filters sidebar */}
          {filtersOpen && (
            <aside
              id="project-filters"
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-800">
                <h2 className="font-bold text-slate-900 dark:text-white">Filters</h2>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Clear all
                </button>
              </div>

              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                <details open className="px-4 py-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">Public / Private</summary>
                  <div className="mt-3 space-y-3">
                    {["Public", "Private"].map((sector) => (
                      <label key={sector} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={sectors.includes(sector)}
                          onChange={() => toggleValue(sector, setSectors, sectors)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800"
                        />
                        {sector}
                      </label>
                    ))}
                  </div>
                </details>

                <details open className="px-4 py-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">Location</summary>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Location filters will appear when project location data is connected.</p>
                </details>

                <details className="px-4 py-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">Capabilities</summary>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Capability filters will appear when project data is connected.</p>
                </details>

                <details className="px-4 py-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">Category</summary>
                  <div className="mt-3 space-y-3">
                    {categories.map((category) => (
                      <label key={category.label} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <input
                          type="radio"
                          name="project-category"
                          checked={selectedCategory === category.label}
                          onChange={() => setSelectedCategory((current) => current === category.label ? "" : category.label)}
                          className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800"
                        />
                        <span className="inline-flex items-center gap-2"><category.icon className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden="true" />{category.label}</span>
                      </label>
                    ))}
                  </div>
                </details>

                <details className="px-4 py-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">Provider type</summary>
                  <div className="mt-3 space-y-3">
                    {providerTypes.map((type) => (
                      <label key={type} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={selectedProviders.includes(type)}
                          onChange={() => toggleValue(type, setSelectedProviders, selectedProviders)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </details>

                <details className="px-4 py-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">Languages</summary>
                  <div className="mt-3 space-y-3">
                    {languages.map((language) => (
                      <label key={language} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={selectedLanguages.includes(language)}
                          onChange={() => toggleValue(language, setSelectedLanguages, selectedLanguages)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800"
                        />
                        {language}
                      </label>
                    ))}
                  </div>
                </details>
              </div>
            </aside>
          )}

          {/* Opportunity results */}
          <section aria-live="polite" className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-100">{filteredProjects.length}</span>{" "}
                {filteredProjects.length === 1 ? "opportunity" : "opportunities"} found
              </p>
            </div>

            {filteredProjects.length > 0 ? (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <article key={project.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">{project.category}</p>
                        <h2 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{project.title}</h2>
                      </div>
                      {project.budget != null && (
                        <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          {project.budgetLabel || project.budget}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p>
                    <a href={project.href || "#/opportunities"} className="mt-4 inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">View opportunity <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></a>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center dark:border-slate-700 dark:bg-slate-900/70 sm:px-8">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-300" aria-hidden="true"><FolderOpen className="h-7 w-7" /></span>
                <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">No opportunities available yet</h2>
                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {search || minBudget || sectors.length || selectedCategory || selectedProviders.length || selectedLanguages.length
                    ? "No opportunities match your current filters. Try clearing some filters or changing your search."
                    : "New opportunities will appear here when clients publish requirements. Check back soon or post a requirement to get started."}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={clearFilters} className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                    Clear filters
                  </button>
                  <a href="#/post" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
                    Post a requirement
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
