"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import ActionButton from "./Button/ActionButtons";

const questions = [
  {
    question: "How do payments work?",
    answer:
      "You fund a time card (Sprint) upfront. Funds are held by Hyper V Solutions LLC until you approve the work, then released to the freelancer after a 5-day hold.",
  },
  {
    question: "What if the work is not good?",
    answer:
      "If the delivery does not match the agreed scope, communicate the specific changes needed and work with the other party to resolve the issue before approving the Sprint.",
  },
  {
    question: "Who can work on Freevance?",
    answer:
      "Freelancers from any country who are 18 or older can join. Every profile is reviewed by an admin, and skills tests can earn verified badges that help improve profile visibility.",
  },
  {
    question: "Do I need to pay taxes?",
    answer:
      "Tax obligations depend on your location and circumstances. Please consult a qualified tax professional about your reporting and payment requirements.",
  },
  {
    question: "Is my data sold?",
    answer:
      "No. We don't sell or share your personal information. Please review our Privacy Policy for details about how your information is handled.",
  },
];

export default function HomeQuestionsSection({
  onGetStarted,
  privacyPolicyHref = "/privacy-policy",
}) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="bg-slate-50 px-4 py-14 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 sm:py-16 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-7 text-center text-2xl font-bold tracking-tight text-[#0a2b66] dark:text-white sm:text-4xl">
            Questions
          </h2>

          <div className="space-y-2.5">
            {questions.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
                  className={`overflow-hidden rounded-lg border bg-white transition-all duration-200 dark:bg-slate-900 ${
                    isOpen
                      ? "border-primary/30 shadow-[0_4px_16px_rgba(252,48,48,0.08)] dark:border-primary/40"
                      : "border-transparent shadow-sm hover:border-slate-200 dark:hover:border-slate-700"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-semibold transition-colors sm:px-5 ${
                      isOpen
                        ? "text-primary"
                        : "text-[#0a2b66] hover:text-primary dark:text-slate-100"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          isOpen
                            ? "bg-primary"
                            : "bg-[#0a2b66] dark:bg-slate-400"
                        }`}
                      />
                      {item.question}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pl-8 text-xs leading-6 text-slate-600 dark:text-slate-300 sm:px-5 sm:pl-10 sm:text-sm">
                      {index === 4 ? (
                        <>
                          No. We don't sell or share personal information. See
                          our{" "}
                          <a
                            href={privacyPolicyHref}
                            className="font-semibold text-primary underline-offset-2 hover:underline"
                          >
                            Privacy Policy
                          </a>
                          .
                        </>
                      ) : (
                        item.answer
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-[#fc3030] via-[#a32970] to-[#0a4aa0] px-5 py-10 text-center text-white shadow-lg sm:mt-16 sm:px-8 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Ready to get started?
            </h2>
            <p className="mt-2 text-sm text-white/90 sm:text-base">
              Sign up with just your email. No passwords.
            </p>
            <div className="mt-5 flex justify-center">
              <ActionButton
                href="/signup"
                onClick={onGetStarted}
                variant="secondary"
                className="min-h-9 border-0 bg-white px-5 py-2 text-xs font-bold text-[#0a2b66] shadow-none hover:bg-slate-100 hover:text-primary sm:min-h-10 sm:text-sm"
              >
                Get started free <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
