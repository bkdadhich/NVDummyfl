"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

const topics = [
  "Requirement or opportunity",
  "Payment",
  "Account or profile",
  "Project or deliverable",
  "Technical issue",
  "Other",
];

const faqs = [
  {
    question: "When is a milestone paid?",
    answer:
      "5 days after the client approves the deliverable.",
  },
  {
    question: "How do I request a revision?",
    answer:
      "Open the project workspace, go to Deliverables and choose Request Revision.",
  },
  {
    question: "How do I change my profile?",
    answer:
      "Open your profile from the account menu.",
  },
];

export default function SupportPage() {
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState(-1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message.trim()) return;

    // UI-only demonstration: connect this form to the support API when available.
    setSubmitted(true);
    setMessage("");
  };

  return (
    <main className="bg-bgWhite text-[#14213d] dark:bg-[#0b1428] dark:text-white">
      {/* Navbar and Footer are supplied by the shared site layout. */}
      <section className="relative overflow-hidden bg-primary-gradient px-5 py-7 text-center text-white sm:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.13),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Support
          </h1>
          <p className="mt-1 text-xs text-blue-100">
            Home <span className="px-1.5 opacity-70">›</span> Support
          </p>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-7 sm:py-10 lg:py-12">
        <div className="mx-auto grid max-w-6xl items-start gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Contact form */}
          <section className="rounded-2xl border border-white bg-white p-5 shadow-[0_8px_28px_rgba(15,35,75,0.07)] dark:border-slate-700 dark:bg-[#111c38] sm:p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-primary dark:bg-red-950/30">
                <MessageSquare size={17} />
              </span>
              <h2 className="text-base font-bold text-[#14213d] dark:text-white sm:text-xl">
                Contact the Freevance team
              </h2>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300 sm:text-[15px]">
              Questions about a requirement, a payment or an issue? Send us a
              message and we will reply within one business day.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label
                  htmlFor="support-topic"
                  className="mb-1.5 block text-md font-semibold text-[#14213d] dark:text-slate-200"
                >
                  Topic
                </label>
                <div className="relative">
                  <select
                    id="support-topic"
                    value={topic}
                    onChange={(event) => {
                      setTopic(event.target.value);
                      setSubmitted(false);
                    }}
                    className="w-full appearance-none rounded-xl border border-[#dfe4ef] bg-white px-4 py-3 pr-10 text-md text-[#14213d] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-slate-600 dark:bg-[#0d1830] dark:text-white"
                  >
                    {topics.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="support-message"
                  className="mb-1.5 block text-md font-semibold text-[#14213d] dark:text-slate-200"
                >
                  Message
                </label>
                <textarea
                  id="support-message"
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setSubmitted(false);
                  }}
                  placeholder="How can we help?"
                  rows={5}
                  required
                  className="min-h-[125px] w-full resize-y rounded-xl border border-[#dfe4ef] bg-white px-4 py-3 text-md text-[#14213d] outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-slate-600 dark:bg-[#0d1830] dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              <button
                type="submit"
                className="btn-style flex min-h-11 w-full items-center justify-center rounded-full px-5 py-3 text-md font-bold text-white shadow-[0_8px_20px_rgba(252,48,48,0.2)] transition hover:-translate-y-0.5"
              >
                Send message
              </button>

              {submitted && (
                <p
                  role="status"
                  className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                >
                  Your message is ready. Support form submission needs to be
                  connected to the support service to send it.
                </p>
              )}
            </form>
          </section>

          {/* Contact information and FAQs */}
          <section className="rounded-2xl border border-white bg-white p-5 shadow-[0_8px_28px_rgba(15,35,75,0.07)] dark:border-slate-700 dark:bg-[#111c38] sm:p-6">
            <h2 className="text-base font-bold text-[#14213d] dark:text-white sm:text-xl">
              Other ways to reach us
            </h2>

            <div className="mt-4 space-y-3">
              <a
                href="tel:18333747366"
                className="flex items-center justify-between gap-3 text-xs text-slate-700 transition hover:text-primary dark:text-slate-300 sm:text-sm"
              >
                <span className="flex items-center gap-2">
                  <Phone size={15} className="shrink-0 text-primary" />
                  Phone
                </span>
                <span className="text-right font-semibold text-[#14213d] dark:text-white">
                  1-833-374-7366
                </span>
              </a>

              <a
                href="mailto:support@freevance.com"
                className="flex items-center justify-between gap-3 text-xs text-slate-700 transition hover:text-primary dark:text-slate-300 sm:text-sm"
              >
                <span className="flex items-center gap-2">
                  <Mail size={15} className="shrink-0 text-primary" />
                  Email
                </span>
                <span className="text-right font-semibold text-[#14213d] dark:text-white">
                  support@freevance.com
                </span>
              </a>

              <div className="flex items-start justify-between gap-3 text-xs text-slate-700 dark:text-slate-300 sm:text-sm">
                <span className="flex shrink-0 items-center gap-2">
                  <MapPin size={15} className="text-primary" />
                  Address
                </span>
                <span className="text-right font-medium text-[#14213d] dark:text-white">
                  PO Box 1084, Columbia, SC 29202
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-[#dce3ff] bg-[#eef1ff] px-3.5 py-3 text-xs leading-5 text-[#465b91] dark:border-slate-700 dark:bg-blue-950/40 dark:text-blue-200 sm:text-[15px]">
              Have a problem with a specific project? Open the project
              workspace and choose <strong>Raise an Issue</strong>. Records
              stay with the project.
            </div>

            <div className="mt-5">
              <h3 className="mb-3 text-lg font-bold text-[#14213d] dark:text-white">
                Common questions
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.question}
                      className={`overflow-hidden rounded-xl border transition-colors ${
                        isOpen
                          ? "border-primary/30 bg-white dark:bg-[#0d1830]"
                          : "border-[#e1e6f0] bg-white dark:border-slate-700 dark:bg-[#0d1830]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq(isOpen ? -1 : index)
                        }
                        aria-expanded={isOpen}
                        className={`flex w-full items-center gap-2 px-3.5 py-3 text-left text-xs font-semibold transition sm:text-lg ${
                          isOpen
                            ? "text-primary"
                            : "text-[#14213d] hover:text-primary dark:text-slate-200"
                        }`}
                      >
                        <ChevronRight
                          size={14}
                          className={`shrink-0 transition-transform ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                        {faq.question}
                      </button>
                      {isOpen && (
                        <p className="px-3.5 pb-3.5 pl-9 text-xs leading-5 text-slate-600 dark:text-slate-300 sm:text-[15px]">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
