"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  FilePenLine,
  Rocket,
  ReceiptText,
  Globe2,
  Landmark,
  FileText,
  Scale,
  Medal,
  Search,
  UserRound,
  CalendarDays,
  Linkedin,
  Clock3,
  Tag,
  Copy,
  Check,
  Share2,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";


const articles = [
  {
    id: 1,
    title: "How milestone payments protect clients and providers",
    description:
      "Paying a whole project upfront is risky. Paying at the very end is risky too. Milestones address both.",
    category: "Payments",
    date: "Sep 24, 2026",
    readTime: "4 min read",
    icon: CreditCard,
    gradient: "from-[#ff777d] to-[#fa3038]",
    tags: ["Payments", "Milestones", "Clients", "Providers"],
    slug: "milestone-payments-protect-clients-and-providers",
  },
  {
    id: 2,
    title: "How to write a requirement that attracts qualified responses",
    description:
      "The quality of the responses you receive depends on the quality of your requirement. Here is a simple template.",
    category: "Clients",
    date: "Sep 17, 2026",
    readTime: "5 min read",
    icon: FilePenLine,
    gradient: "from-[#3677d5] to-[#2876e8]",
    tags: ["Requirements", "Clients", "Scope"],
    slug: "write-a-requirement-that-attracts-qualified-responses",
  },
  {
    id: 3,
    title: "How to submit a strong response to an opportunity",
    description:
      "No feedback yet? These habits help newer providers stand out in a response list.",
    category: "Providers",
    date: "Sep 10, 2026",
    readTime: "5 min read",
    icon: Rocket,
    gradient: "from-[#5595f0] to-[#3485ed]",
    tags: ["Providers", "Opportunities", "Responses"],
    slug: "submit-a-strong-response-to-an-opportunity",
  },
  {
    id: 4,
    title: "W-9 vs W-8BEN: the tax forms providers need",
    description:
      "A plain-English guide to which form you submit before your first payment. (Educational only, not tax advice.)",
    category: "Taxes",
    date: "Sep 3, 2026",
    readTime: "4 min read",
    icon: ReceiptText,
    gradient: "from-[#31b66c] to-[#35d477]",
    tags: ["W-9", "W-8BEN", "Taxes", "Providers"],
    slug: "w9-vs-w8ben-tax-forms-providers-need",
  },
  {
    id: 5,
    title: "Engaging providers across borders: a client's checklist",
    description:
      "Time zones, ownership and payment protection: what to settle before day one.",
    category: "Clients",
    date: "Aug 27, 2026",
    readTime: "6 min read",
    icon: Globe2,
    gradient: "from-[#16a8c1] to-[#13c4d9]",
    tags: ["International", "Clients", "Payments"],
    slug: "engaging-providers-across-borders",
  },
  {
    id: 6,
    title: "Public-sector requirements: what providers should prepare",
    description:
      "Documents and credentials that commonly matter when responding to a public-sector requirement.",
    category: "Public sector",
    date: "Aug 20, 2026",
    readTime: "6 min read",
    icon: Landmark,
    gradient: "from-[#64748b] to-[#94a3b8]",
    tags: ["Public sector", "Compliance", "Credentials"],
    slug: "public-sector-requirements-providers-prepare",
  },
  {
    id: 7,
    title: "Resume tips that get past applicant tracking systems",
    description:
      "Most US employers use an applicant tracking system. Here is how to make sure your resume is read.",
    category: "Resume",
    date: "Aug 7, 2026",
    readTime: "4 min read",
    icon: FileText,
    gradient: "from-[#d94691] to-[#ed65b0]",
    tags: ["Resume", "ATS", "Career"],
    slug: "resume-tips-applicant-tracking-systems",
  },
  {
    id: 8,
    title: "Fixed price or hourly: choosing a commercial structure",
    description:
      "A quick guide, and why milestones combine the strengths of both.",
    category: "Pricing",
    date: "Aug 5, 2026",
    readTime: "3 min read",
    icon: Scale,
    gradient: "from-[#e99a27] to-[#ffc21d]",
    tags: ["Pricing", "Contracts", "Milestones"],
    slug: "fixed-price-or-hourly-commercial-structure",
  },
  {
    id: 9,
    title: "Product update: credentials, verification badges and response ranking",
    description:
      "Providers can add credentials and earn category badges. Verified responses are shown first.",
    category: "Product",
    date: "Jul 29, 2026",
    readTime: "2 min read",
    icon: Medal,
    gradient: "from-[#1556bd] to-[#2465ed]",
    tags: ["Product", "Credentials", "Providers"],
    slug: "credentials-verification-badges-response-ranking",
  },
];

const categories = [
  { name: "Payments & Taxes", count: 2 },
  { name: "Requirements", count: 1 },
  { name: "Providers", count: 1 },
  { name: "Public Sector", count: 1 },
  { name: "Resume & Career", count: 1 },
  { name: "Product Updates", count: 1 },
];

const tags = [
  "ATS",
  "Badges",
  "Career",
  "Clients",
  "Compliance",
  "Contracts",
  "Credentials",
  "IP",
  "International",
  "Milestones",
  "Opportunities",
  "Payments",
  "Pricing",
  "Product",
  "Providers",
  "Public sector",
  "Requirements",
  "Responses",
  "Resume",
  "Scope",
  "Taxes",
  "W-8BEN",
  "W-9",
];

function ResourceCard({ article }) {
  const Icon = article.icon;

  return (
    <article className="resource-article-card overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.06)] transition-all duration-300 dark:border-slate-800 dark:bg-slate-900">
      <Link
        href={`/resources/${article.slug}`}
        aria-label={`Read ${article.title}`}
        className={`flex h-[135px] items-center justify-center bg-gradient-to-br ${article.gradient} sm:h-[150px]`}
      >
        <Icon
          className="h-12 w-12 text-white drop-shadow-md sm:h-14 sm:w-14"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </Link>

      <div className="p-4 sm:px-5 sm:py-4">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <UserRound size={12} />
            Freevance Team
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={12} />
            {article.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 size={12} />
            {article.readTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <Tag size={12} />
            {article.category}
          </span>
        </div>

        <Link href={`/resources/${article.slug}`}>
          <h2 className="text-[15px] font-bold leading-snug text-slate-900 transition-colors hover:text-primary dark:text-white dark:hover:text-primary sm:text-base">
            {article.title}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-[13px]">
          {article.description}
        </p>

        <Link
          href={`/resources/${article.slug}`}
          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary transition-all hover:gap-2"
        >
          Read More
          <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return articles.filter((article) => {
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        !activeCategory ||
        article.category.toLowerCase() === activeCategory.toLowerCase() ||
        article.tags.some(
          (tag) => tag.toLowerCase() === activeCategory.toLowerCase(),
        );

      const matchesTag =
        !activeTag ||
        article.tags.some(
          (tag) => tag.toLowerCase() === activeTag.toLowerCase(),
        );

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, activeCategory, activeTag]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const latestPosts = [...articles]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  return (
    <main className="resources-page min-h-screen bg-bgWhite dark:bg-[#0b1222]">
      {/* Page heading */}
      <section className="resources-banner relative overflow-hidden bg-primary-gradient px-4 py-7 text-center text-white sm:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_65%)]" />

        <div className="relative z-10">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Resources
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-1 flex items-center justify-center gap-1 text-xs text-blue-100/80"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-white">Resources</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(270px,0.95fr)] lg:gap-7">

          {/* Article list */}
          <div className="min-w-0">
            {filteredArticles.length > 0 ? (
              <div className="grid gap-5">
                {filteredArticles.map((article) => (
                  <ResourceCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center dark:border-slate-800 dark:bg-slate-900">
                <BookOpen className="mx-auto h-10 w-10 text-slate-400" />
                <h2 className="mt-3 text-lg font-bold text-slate-800 dark:text-white">
                  No articles found
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Try another search term or clear your filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("");
                    setActiveTag("");
                  }}
                  className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4 lg:sticky lg:top-24">

            {/* Search */}
            <div className="resource-sidebar-card rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_5px_20px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
              <label htmlFor="resource-search" className="sr-only">
                Search articles
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 dark:border-slate-700">
                <Search className="h-4 w-4 shrink-0 text-slate-400" />
                <input
                  id="resource-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="h-10 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-white"
                />
              </div>
            </div>

            {/* Latest posts */}
            <div className="resource-sidebar-card rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_5px_20px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                Latest Posts
              </h3>

              <div className="space-y-3">
                {latestPosts.map((article) => {
                  const Icon = article.icon;

                  return (
                    <Link
                      key={article.id}
                      href={`/resources/${article.slug}`}
                      className="group flex items-start gap-3"
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${article.gradient}`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>

                      <div className="min-w-0">
                        <p className="line-clamp-2 text-xs font-semibold leading-relaxed text-slate-700 transition-colors group-hover:text-primary dark:text-slate-200">
                          {article.title}
                        </p>
                        <span className="mt-1 block text-[10px] text-slate-400">
                          {article.date}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Categories */}
            <div className="resource-sidebar-card rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_5px_20px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                Blog Categories
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.name}
                    onClick={() => {
                      setActiveCategory(
                        activeCategory === category.name ? "" : category.name,
                      );
                      setActiveTag("");
                    }}
                    className={`flex w-full items-center justify-between py-2 text-left text-xs transition hover:text-primary ${
                      activeCategory === category.name
                        ? "font-bold text-primary"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span>{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="resource-sidebar-card rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_5px_20px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                Tags
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => {
                      setActiveTag(activeTag === tag ? "" : tag);
                      setActiveCategory("");
                    }}
                    className={`rounded-md border px-2 py-1 text-[10px] transition ${
                      activeTag === tag
                        ? "border-primary bg-primary text-white"
                        : "border-slate-200 bg-slate-50 text-slate-500 hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="resource-sidebar-card rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_5px_20px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                Share
              </h3>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy page link"
                  className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#0a2b66] px-2.5 text-[11px] font-semibold text-white transition hover:bg-primary"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Copied" : "Copy"}
                </button>

                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on X"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0a2b66] text-white transition hover:bg-primary"
                >
                  <FaXTwitter size={15} />
                </a>

                <a
                  href="https://www.linkedin.com/sharing/share-offsite/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0a2b66] text-white transition hover:bg-primary"
                >
                  <FaLinkedinIn size={15} />
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0a2b66] text-white transition hover:bg-primary"
                >
                  <FaFacebookF size={15} />
                </a>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on WhatsApp"
                  className="flex h-8 items-center justify-center gap-1 rounded-md bg-[#0a2b66] px-2.5 text-[11px] font-semibold text-white transition hover:bg-primary"
                >
                  <FaWhatsapp size={15} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
