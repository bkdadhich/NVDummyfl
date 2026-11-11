"use client";

import { ArrowRight, CalendarDays, Clock3, UserRound } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    category: "Payments",
    date: "Sep 24, 2026",
    readTime: "4 min read",
    title: "How milestone payments protect clients and providers",
    excerpt:
      "Paying a whole project upfront is risky. Paying at the very end is risky too. Milestones address both.",
    emoji: "💳",
    artwork: "from-[#ff6b70] to-[#ff3037]",
    href: "/blog/milestone-payments",
  },
  {
    id: 2,
    category: "Clients",
    date: "Sep 17, 2026",
    readTime: "5 min read",
    title: "How to write a requirement that attracts qualified responses",
    excerpt:
      "The quality of the responses you receive depends on the quality of your requirement. Here is a simple template.",
    emoji: "📝",
    artwork: "from-[#1c5bb8] to-[#347cf1]",
    href: "/blog/write-a-requirement",
  },
  {
    id: 3,
    category: "Providers",
    date: "Sep 10, 2026",
    readTime: "5 min read",
    title: "How to submit a strong response to an opportunity",
    excerpt:
      "No feedback yet? These habits help newer providers stand out in a response list.",
    emoji: "🚀",
    artwork: "from-[#4078ee] to-[#5599f6]",
    href: "/blog/strong-opportunity-response",
  },
];

export default function FeaturedBlogSection({
  posts = blogPosts,
  onViewAll,
  onReadMore,
}) {
  return (
    <section className="bg-[#f3f5fb] px-4 py-12 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-7 flex items-start justify-between gap-4 sm:mb-8">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#0a2b66] dark:text-white sm:text-4xl lg:text-[42px]">
              Featured <span className="text-primary">Blog</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              Tips for hiring, freelancing, payments and careers
            </p>
          </div>

          <a
            href="/blog"
            onClick={onViewAll}
            className="mt-2 inline-flex shrink-0 items-center gap-1 text-sm font-bold text-primary transition hover:gap-2 sm:text-base"
          >
            View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-slate-200/70 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900"
            >
              <a
                href={post.href || "/blog"}
                onClick={(event) => onReadMore?.(post, event)}
                aria-label={`Read more: ${post.title}`}
                className={`relative flex aspect-[1.48/1] items-center justify-center overflow-hidden bg-gradient-to-br ${post.artwork} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary`}
              >
                <span
                  aria-hidden="true"
                  className="select-none text-6xl drop-shadow-sm transition duration-300 group-hover:scale-110 sm:text-7xl"
                >
                  {post.emoji}
                </span>
              </a>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <UserRound className="h-4 w-4 fill-violet-800 text-violet-800 dark:fill-violet-300 dark:text-violet-300" aria-hidden="true" />
                    Freevance Team
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-violet-500" aria-hidden="true" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>

                <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <span className="text-xs text-slate-500" aria-hidden="true">♧</span>
                  {post.category}
                </p>

                <h3 className="mt-3 text-lg font-bold leading-7 text-[#0a2b66] dark:text-white sm:text-xl">
                  <a
                    href={post.href || "/blog"}
                    onClick={(event) => onReadMore?.(post, event)}
                    className="transition-colors hover:text-primary"
                  >
                    {post.title}
                  </a>
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
                  {post.excerpt}
                </p>

                <a
                  href={post.href || "/blog"}
                  onClick={(event) => onReadMore?.(post, event)}
                  className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-bold text-primary transition-all hover:gap-2"
                >
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
