
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, ArrowLeft, ArrowRight } from "lucide-react";

import {
  articles,
  formatDate,
} from "@/data/resourcesData";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ResourceArticlePage({ params }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) notFound();

  const relatedArticles = articles
    .filter(
      (item) =>
        item.slug !== article.slug &&
        (item.category === article.category ||
          item.tags.some((tag) => article.tags.includes(tag)))
    )
    .slice(0, 2);

  return (
    <main className="resources-page min-h-screen bg-bgWhite text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">

      {/* Article banner */}
      <section className="resources-banner bg-primary-gradient px-4 py-8 text-center text-white sm:py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Resources
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-blue-100"
          >
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <span>/</span>
            <span>{article.category}</span>
          </nav>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-yellowHighlight" />
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14">

        <Link
          href="/resources"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
        >
          <ArrowLeft size={16} />
          Back to Resources
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">

          {/* Article */}
          <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">

            <div
              className="flex h-[220px] items-center justify-center sm:h-[280px]"
              style={{
                background: `linear-gradient(135deg, ${article.gradient[0]}, ${article.gradient[1]})`,
              }}
            >
              <span className="text-6xl font-bold text-white/90">
                {article.title.charAt(0)}
              </span>
            </div>

            <div className="p-5 sm:p-8">

              <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Freevance Team</span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays size={14} />
                  {formatDate(article.date)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 size={14} />
                  {article.readTime} min read
                </span>
                <span>{article.category}</span>
              </div>

              <h1 className="text-2xl font-bold leading-tight text-heading dark:text-white sm:text-3xl">
                {article.title}
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                {article.excerpt}
              </p>

              <div className="article-body mt-7 space-y-5">
                {article.content.map((block, index) => {
                  if (block.type === "h") {
                    return (
                      <h2
                        key={index}
                        className="pt-2 text-xl font-bold text-heading dark:text-white"
                      >
                        {block.text}
                      </h2>
                    );
                  }

                  if (block.type === "ul") {
                    return (
                      <ul
                        key={index}
                        className="ml-5 list-disc space-y-3 text-sm leading-7 text-slate-700 marker:text-primary dark:text-slate-300 sm:text-base"
                      >
                        {block.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p
                      key={index}
                      className="text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base"
                    >
                      {block.text}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6 dark:border-slate-700">
                <span className="mr-1 text-sm font-bold text-heading dark:text-white">
                  Tags:
                </span>

                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/resources?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 rounded-2xl bg-aboutCardBg p-6 text-center dark:bg-slate-800">
                <h3 className="text-lg font-bold text-heading dark:text-white">
                  Ready to put this into practice?
                </h3>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Start your next project or connect with verified talent on Freevance.
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Link href="/post-requirement" className="btn-style">
                    Post a Requirement
                  </Link>

                  <Link
                    href="/talents"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-darkBlue px-6 py-3 text-sm font-bold text-darkBlue transition hover:bg-darkBlue hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-darkBlue"
                  >
                    Find Talent
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* Article sidebar */}
          <aside className="flex flex-col gap-5">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h3 className="mb-4 text-lg font-bold text-heading dark:text-white">
                Article Details
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Category
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-white">
                {article.category}
              </p>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Published
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-white">
                {formatDate(article.date)}
              </p>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Reading time
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-white">
                {article.readTime} minutes
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h3 className="mb-4 text-lg font-bold text-heading dark:text-white">
                Related Articles
              </h3>

              <div className="flex flex-col gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/resources/${related.slug}`}
                    className="group"
                  >
                    <p className="text-sm font-semibold leading-5 text-slate-700 transition-colors group-hover:text-primary dark:text-slate-200">
                      {related.title}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary">
                      Read article
                      <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
