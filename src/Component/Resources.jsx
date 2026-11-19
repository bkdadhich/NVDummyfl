
"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  CalendarDays,
  Clock3,
  ArrowRight,
  Copy,
  Check,
  Share2,
  CreditCard,
  FilePenLine,
  Rocket,
  ReceiptText,
  Globe2,
  FileText,
  Scale,
  Medal,
  X,
} from "lucide-react";

import {
  articles,
  categories,
  tags,
  formatDate,
} from "@/data/resourcesData";

const iconMap = {
  CreditCard,
  FilePenLine,
  Rocket,
  ReceiptText,
  Globe2,
  FileText,
  Scale,
  Medal,
};

export default function Resources() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [copied, setCopied] = useState(false);

  const searchParams = useSearchParams();
  const tagFromUrl = searchParams.get("tag");

  useEffect(() => {
    if (tagFromUrl) {
      setActiveTag(tagFromUrl);
      setActiveCategory("");
    }
  }, [tagFromUrl]);

  const filteredArticles = useMemo(() => {
    return [...articles]
      .filter((article) => {
        const matchesCategory =
          !activeCategory || article.category === activeCategory;

        const matchesTag =
          !activeTag || article.tags.includes(activeTag);

        const searchText = [
          article.title,
          article.excerpt,
          article.category,
          ...article.tags,
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !search || searchText.includes(search.toLowerCase());

        return matchesCategory && matchesTag && matchesSearch;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [search, activeCategory, activeTag]);

  const latestPosts = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("");
    setActiveTag("");
  };

  const copyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const shareLinks = [
    {
      label: "X",
      href: `https://x.com/intent/post?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <main className="resources-page bg-[#f3f5fb] text-slate-800 transition-colors duration-300 dark:bg-[#0b1428] dark:text-slate-100">

      {/* Banner */}
      <section className="resources-banner bg-primary-gradient relative overflow-hidden px-4 py-9 text-center text-white sm:py-11">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.2),transparent_65%)]" />

        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Resources
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-2 flex items-center justify-center gap-2 text-sm text-blue-100"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-white">Resources</span>
          </nav>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#ffc928]" />
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto grid max-w-[1240px] grid-cols-1 gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-9 lg:py-14">

        {/* Article listing */}
        <div className="min-w-0">

          {/* <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
              Freevance Insights
            </p>
            <h2 className="mt-2 text-2xl font-bold text-heading dark:text-white sm:text-3xl">
              Ideas, guides and updates
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              Explore practical guidance on hiring, freelancing, payments,
              career development and the Freevance platform.
            </p>
          </div> */}          

          {/* Active filters */}
          {(activeCategory || activeTag || search) && (
            <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                {filteredArticles.length} result(s)
              </span>

              {activeCategory && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {activeCategory}
                </span>
              )}

              {activeTag && (
                <span className="rounded-full bg-red-50 px-3 py-1 text-red-600 dark:bg-red-950 dark:text-red-300">
                  {activeTag}
                </span>
              )}

              <button
                type="button"
                onClick={clearFilters}
                className="font-bold text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Article cards */}
          <div className="flex flex-col gap-6">
            {filteredArticles.map((article) => {
              const Icon = iconMap[article.icon] || FileText;

              return (
                <article
                  key={article.slug}
                  className="resource-article-card overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-[#111c38]"
                >
                  <Link
                    href={`/resources/${article.slug}`}
                    className="group block"
                  >
                    <div
                      className="relative flex h-[170px] items-center justify-center overflow-hidden sm:h-[210px]"
                      style={{
                        background: `linear-gradient(135deg, ${article.gradient[0]}, ${article.gradient[1]})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.25),transparent_40%)]" />
                      <Icon
                        size={66}
                        strokeWidth={1.3}
                        className="relative text-white/90 transition duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>Freevance Team</span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={13} />
                          {formatDate(article.date)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock3 size={13} />
                          {article.readTime} min read
                        </span>
                        <span>{article.category}</span>
                      </div>

                      <h3 className="text-xl font-bold leading-snug text-heading transition-colors group-hover:text-primary dark:text-white sm:text-2xl">
                        {article.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                        {article.excerpt}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                        Read More
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}

            {filteredArticles.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center dark:border-slate-700 dark:bg-[#111c38]">
                <Search className="mx-auto text-slate-400" size={34} />
                <h3 className="mt-4 font-bold text-heading dark:text-white">
                  No articles found
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Try another search term or clear your filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn-style mt-5"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-5">

          {/* Search */}
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition-colors dark:border-slate-700 dark:bg-[#111c38]">
            <Search size={19} className="shrink-0 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search resource articles"
              className="h-10 w-full bg-transparent rounded-2xl text-sm outline-none placeholder:text-slate-400 dark:text-white"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="text-slate-400 hover:text-primary"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* Latest posts */}
          <div className="resource-sidebar-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#111c38]">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-white">
              Latest Posts
            </h3>

            <div className="flex flex-col gap-4">
              {latestPosts.map((article) => (
                <Link
                  key={article.slug}
                  href={`/resources/${article.slug}`}
                  className="group flex items-start gap-3"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{
                      background: `linear-gradient(135deg, ${article.gradient[0]}, ${article.gradient[1]})`,
                    }}
                  >
                    <span className="text-lg font-bold">
                      {article.title.charAt(0)}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-semibold leading-5 text-slate-700 transition-colors group-hover:text-primary dark:text-slate-200">
                      {article.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(article.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="resource-sidebar-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#111c38]">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-white">
              Blog Categories
            </h3>

            <div className="flex flex-col gap-1">
              {categories.map((category) => {
                const count = articles.filter(
                  (article) => article.category === category
                ).length;

                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(active ? "" : category);
                      setActiveTag("");
                    }}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      active
                        ? "bg-blue-50 font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{category}</span>
                    <span className="text-xs font-semibold">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="resource-sidebar-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#111c38]">
            <h3 className="mb-4 text-lg font-bold text-heading dark:text-white">
              Tags
            </h3>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setActiveTag(activeTag === tag ? "" : tag);
                    setActiveCategory("");
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    activeTag === tag
                      ? "border-primary bg-primary text-white"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="resource-sidebar-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#111c38]">
            <h3 className="mb-4 inline-flex items-center gap-2 text-lg font-bold text-heading dark:text-white">
              <Share2 size={18} />
              Share Resources
            </h3>

            <button
              type="button"
              onClick={copyPageLink}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Link copied" : "Copy page link"}
            </button>

            <div className="grid grid-cols-2 gap-2">
              {shareLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-slate-50 px-3 py-2 text-center text-xs font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
