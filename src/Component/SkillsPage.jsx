"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight, Medal, CheckCircle2, Laptop, Palette,
  PenTool, Megaphone, Bot, Smartphone, FileText, X, Award, ArrowLeft,
} from "lucide-react";
import { getCurrentUser } from "@/lib/demoAuth";

const skillTests = [
  {
    id: "web-development",
    title: "Web Development",
    Icon: Laptop,
    questions: [
      { q: "Which HTML tag defines the largest heading?", options: ["<header>", "<h1>", "<head>", "<title>"], answer: 1 },
      { q: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "background"], answer: 2 },
      { q: "Which keyword declares a block-scoped variable in JavaScript?", options: ["var", "let", "define", "static"], answer: 1 },
      { q: "What does HTTP 404 indicate?", options: ["Server error", "Redirect", "OK", "Not found"], answer: 3 },
      { q: "Which of these is NOT a JavaScript library/framework?", options: ["React", "Svelte", "Vue", "Django"], answer: 3 },
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    Icon: Palette,
    questions: [
      { q: "Minimum WCAG AA contrast ratio for normal body text?", options: ["2:1", "3:1", "4.5:1", "10:1"], answer: 2 },
      { q: "Which is a UI design tool?", options: ["Figma", "Postman", "Docker", "Git"], answer: 0 },
      { q: "What does UX primarily focus on?", options: ["User experience", "Source code", "Server speed", "File storage"], answer: 0 },
      { q: "Which is a common low-fidelity design artifact?", options: ["Wireframe", "Invoice", "Database", "Deployment"], answer: 0 },
      { q: "Which principle helps make interfaces easier to use?", options: ["Consistency", "Randomness", "Hidden controls", "Unclear labels"], answer: 0 },
    ],
  },
  {
    id: "content-writing",
    title: "Content Writing",
    Icon: PenTool,
    questions: [
      { q: "What is the main purpose of an introduction?", options: ["Introduce the topic", "Repeat the conclusion", "List references only", "Add unrelated details"], answer: 0 },
      { q: "Which quality makes writing easier to understand?", options: ["Clarity", "Jargon", "Long sentences", "Repetition"], answer: 0 },
      { q: "What should a headline communicate?", options: ["The main idea", "The author's address", "A random fact", "Only a date"], answer: 0 },
      { q: "What is proofreading used for?", options: ["Finding errors", "Choosing a domain", "Publishing ads", "Designing a logo"], answer: 0 },
      { q: "Which tone is generally best for professional business content?", options: ["Clear and appropriate", "Needlessly complex", "Aggressive", "Unrelated"], answer: 0 },
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    Icon: Megaphone,
    questions: [
      { q: "CTR is calculated as…", options: ["Impressions ÷ clicks", "Clicks ÷ impressions", "Sales ÷ clicks", "Views ÷ shares"], answer: 1 },
      { q: "Which is a paid channel?", options: ["Organic SEO", "Google Ads", "Unpaid referral", "Direct traffic"], answer: 1 },
      { q: "What does SEO stand for?", options: ["Search Engine Optimization", "Social Email Outreach", "Search Event Order", "Sales Engagement Option"], answer: 0 },
      { q: "Which metric measures conversion efficiency?", options: ["Conversion rate", "Font size", "Page width", "File size"], answer: 0 },
      { q: "What is a target audience?", options: ["The intended customer group", "A website server", "A design template", "A payment method"], answer: 0 },
    ],
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    Icon: Bot,
    questions: [
      { q: "SQL is used to…", options: ["Style web pages", "Query databases", "Compile apps", "Edit images"], answer: 1 },
      { q: "Which is a Python data-analysis library?", options: ["pandas", "Express", "Jetpack", "Bootstrap"], answer: 0 },
      { q: "Which chart is useful for comparing categories?", options: ["Bar chart", "Scatter map only", "Text block", "Folder tree"], answer: 0 },
      { q: "What does KPI stand for?", options: ["Key Performance Indicator", "Known Program Input", "Key Process Image", "Kernel Program Interface"], answer: 0 },
      { q: "Which measure represents the middle value?", options: ["Median", "Range", "Sum", "Mode only"], answer: 0 },
    ],
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    Icon: Smartphone,
    questions: [
      { q: "Which language is commonly used for native Android development?", options: ["Kotlin", "CSS", "SQL", "HTML"], answer: 0 },
      { q: "Which is a cross-platform framework?", options: ["React Native", "SwiftUI only", "Jetpack Compose only", "Core Data"], answer: 0 },
      { q: "Push notifications on Android are typically delivered via…", options: ["FCM (Firebase Cloud Messaging)", "SMTP", "FTP", "CSS"], answer: 0 },
      { q: "Which language is used to build native iOS apps?", options: ["Swift", "PHP", "SQL", "Ruby"], answer: 0 },
      { q: "What is responsive layout?", options: ["Adapting to screen sizes", "A fixed desktop-only layout", "A database backup", "A notification sound"], answer: 0 },
    ],
  },
  {
    id: "resume-career",
    title: "Resume & Career",
    Icon: FileText,
    questions: [
      { q: "Which format is generally most ATS-friendly?", options: ["Text-based PDF or DOCX", "Image-only PDF", "PNG", "Scanned JPG"], answer: 0 },
      { q: "A resume should be…", options: ["Tailored to the role", "Identical for every job", "Mostly decorative", "Without contact details"], answer: 0 },
      { q: "What should a strong bullet point emphasize?", options: ["Impact and results", "Unrelated hobbies", "Long paragraphs", "Personal opinions"], answer: 0 },
      { q: "Which is useful before an interview?", options: ["Research the organization", "Avoid reading the role", "Arrive unprepared", "Ignore the job description"], answer: 0 },
      { q: "What should a professional cover letter do?", options: ["Connect experience to the role", "Repeat every resume line", "Include unrelated stories", "Replace the resume"], answer: 0 },
    ],
  },
];

const STORAGE_KEY = "freevance_skill_test_results";

function readResults() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function SkillsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [results, setResults] = useState({});
  const [activeTestId, setActiveTestId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [resultModal, setResultModal] = useState(null);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current || null);
    setResults(readResults());
    setAuthChecked(true);
  }, []);

  const activeTest = useMemo(
    () => skillTests.find((test) => test.id === activeTestId) || null,
    [activeTestId]
  );

  const openLogin = () => {
    window.dispatchEvent(
      new CustomEvent("freevance:open-login", {
        detail: { role: "freelancer" },
      })
    );
  };

  const startTest = (id) => {
    setAnswers({});
    setResultModal(null);
    setActiveTestId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitTest = (event) => {
    event.preventDefault();
    if (!activeTest) return;

    const score = activeTest.questions.reduce(
      (total, question, index) =>
        total + (Number(answers[index]) === question.answer ? 1 : 0),
      0
    );
    const passed = score >= 4;
    const nextResults = {
      ...results,
      [activeTest.id]: {
        score,
        passed: passed || Boolean(results[activeTest.id]?.passed),
        completedAt: new Date().toISOString(),
      },
    };

    setResults(nextResults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextResults));
    setResultModal({ score, passed, title: activeTest.title });
  };

  if (!authChecked) {
    return (
      <main className="min-h-[360px] bg-[#f3f5fb] dark:bg-[#0b1428]" />
    );
  }

  if (!user) {
    return (
      <main className="min-h-[375px] bg-[#f3f5fb] px-5 py-12 dark:bg-[#0b1428] sm:py-[52px]">
        <section className="mx-auto flex min-h-[207px] max-w-[1456px] flex-col items-center justify-center rounded-[22px] border border-[#e1e7f2] bg-white px-5 py-7 text-center shadow-[0_14px_40px_rgba(15,35,75,0.06)] dark:border-slate-700 dark:bg-[#111c38]">
          <h1 className="text-xl font-bold text-[#10264d] dark:text-white">
            Skill verification
          </h1>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-300 sm:text-lg">
            Log in to continue.
          </p>
          <button
            type="button"
            onClick={openLogin}
            className="btn-style mt-5 inline-flex min-h-[56px] items-center justify-center rounded-full px-7 text-base font-bold text-white shadow-[0_10px_24px_rgba(252,48,48,0.22)]"
          >
            Log in / Sign up
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[560px] bg-[#f3f5fb] px-5 py-7 text-[#10264d] dark:bg-[#0b1428] dark:text-white sm:px-8 sm:py-9">
      <div className="mx-auto max-w-[1100px]">
        {activeTest ? (
          <>
            <button
              type="button"
              onClick={() => setActiveTestId(null)}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dfe5f1] bg-white px-4 py-2 text-md font-semibold text-[#17345f] transition hover:border-primary dark:border-slate-700 dark:bg-[#111c38] dark:text-white"
            >
              <ArrowLeft size={15} /> Tests
            </button>
            <div className="mx-auto max-w-[690px]">
              <div className="mb-5">
                <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
                  <button type="button" onClick={() => setActiveTestId(null)} className="hover:text-primary">← Tests</button>
                </p>
                <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-[#10264d] dark:text-white sm:text-3xl">
                  <activeTest.Icon size={27} className="text-primary" />
                  {activeTest.title} test
                </h1>
                <p className="mt-2 text-md text-slate-500 dark:text-slate-400">
                  Answer all 5 questions. Score 4/5 or more to earn a badge.
                </p>
              </div>

              <form onSubmit={submitTest} className="space-y-3">
                {activeTest.questions.map((question, questionIndex) => (
                  <fieldset
                    key={`${activeTest.id}-${questionIndex}`}
                    className="rounded-2xl border border-[#e2e7f1] bg-white p-4 shadow-[0_8px_24px_rgba(15,35,75,0.055)] dark:border-slate-700 dark:bg-[#111c38] sm:p-5"
                  >
                    <p className="mb-4 rounded-lg bg-white px-1 py-1 text-sm font-bold leading-6 text-[#14213d] dark:bg-[#111c38] dark:text-white">
                      {questionIndex + 1}. {question.q}
                    </p>
                    <div className="space-y-1.5">
                      {question.options.map((option, optionIndex) => {
                        const selected = Number(answers[questionIndex]) === optionIndex;
                        return (
                          <label
                            key={option}
                            className={`flex min-h-[45px] cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-md transition ${
                              selected
                                ? "border-primary bg-red-50/70 text-[#14213d] dark:bg-red-950/20 dark:text-white"
                                : "border-[#dfe5ef] bg-white text-slate-700 hover:border-primary/50 dark:border-slate-600 dark:bg-[#0d1830] dark:text-slate-200"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${questionIndex}`}
                              value={optionIndex}
                              checked={selected}
                              onChange={() =>
                                setAnswers((current) => ({
                                  ...current,
                                  [questionIndex]: String(optionIndex),
                                }))
                              }
                              className="h-4 w-4 accent-[#fc3030]"
                            />
                            <span>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}

                <button
                  type="submit"
                  disabled={Object.keys(answers).length !== 5}
                  className="btn-style flex min-h-11 w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(252,48,48,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit answers
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="mb-7">
              <div className="mb-8 flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <button
                  type="button"
                  onClick={() => router.push(user.role === "client" ? "/client/dashboard" : "/freelancer/dashboard")}
                  className="rounded-full border border-[#dfe5f1] bg-white px-4 py-2 hover:border-primary dark:border-slate-700 dark:bg-[#111c38] dark:text-white"
                >
                  ← Back
                </button>
                <button type="button" onClick={() => router.push(user.role === "client" ? "/client/dashboard" : "/freelancer/dashboard")} className="hover:text-primary">
                  Dashboard
                </button>
                <ChevronRight size={13} />
                <span>Skill tests</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#10264d] dark:text-white sm:text-4xl">
                Skill verification <Medal size={25} className="ml-1 inline-block align-middle text-amber-500" />
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                5 questions per test. Score 4/5 or more to earn a badge. Verified providers rank higher on responses.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skillTests.map(({ id, title, Icon }) => {
                const result = results[id];
                return (
                  <article
                    key={id}
                    className="rounded-2xl border border-[#e2e7f1] bg-white p-5 shadow-[0_9px_25px_rgba(15,35,75,0.065)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(15,35,75,0.1)] dark:border-slate-700 dark:bg-[#111c38]"
                  >
                    <Icon size={25} className="mb-3 text-primary" />
                    <h2 className="text-lg font-bold text-[#14213d] dark:text-white">
                      {title}
                    </h2>
                    {result?.passed ? (
                      <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                        <CheckCircle2 size={13} /> Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startTest(id)}
                        className="btn-style mt-3 inline-flex min-h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-bold text-white shadow-[0_7px_16px_rgba(252,48,48,0.2)]"
                      >
                        {result ? "Retake test" : "Start test"}
                      </button>
                    )}
                    {result && !result.passed && (
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        Latest score: {result.score}/5
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>

      {resultModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-result-title"
            className="relative w-full max-w-[410px] rounded-[22px] bg-white px-6 py-7 text-center shadow-2xl dark:bg-[#111c38]"
          >
            <button
              type="button"
              onClick={() => {
                setResultModal(null);
                setActiveTestId(null);
              }}
              aria-label="Close result"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
            >
              <X size={16} />
            </button>
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-950/30">
              {resultModal.passed ? <Medal size={34} /> : <Award size={32} />}
            </div>
            <h2 id="skill-result-title" className="text-xl font-bold text-[#14213d] dark:text-white">
              {resultModal.passed ? `Verified! ${resultModal.score}/5` : `Score: ${resultModal.score}/5`}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              {resultModal.passed
                ? `${resultModal.title} verification badge earned.`
                : "You need at least 4 correct answers to earn this badge. You can try again."}
            </p>
            <button
              type="button"
              onClick={() => {
                setResultModal(null);
                setActiveTestId(null);
              }}
              className="btn-style mt-5 flex min-h-11 w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold text-white"
            >
              Continue
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
