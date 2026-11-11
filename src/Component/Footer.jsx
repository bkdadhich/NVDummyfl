
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import logo from "@/assets/freevance_footer.png";
import certificationBadges from "@/assets/certifications.png";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Find Services", href: "#/services" },
      { label: "Opportunities", href: "#/opportunities" },
      { label: "How It Works", href: "#/how" },
      { label: "For Clients", href: "#/clients" },
      { label: "For Providers", href: "#/providers" },
      { label: "Post a Requirement", href: "#/post" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#/about" },
      { label: "Resources", href: "#/resources" },
      { label: "Support", href: "#/support" },
      { label: "Skill tests", href: "#/skills" },
      { label: "Contact", href: "mailto:support@freevance.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Legal Center", href: "#/legal" },
      { label: "Terms of Use", href: "#/legal/terms" },
      { label: "Privacy Policy", href: "#/legal/privacy" },
      { label: "Cookie Policy", href: "#/legal/cookies" },
      { label: "Do Not Sell or Share", href: "#/legal/privacy-choices" },
      { label: "Marketplace Terms", href: "#/legal/marketplace-terms" },
      { label: "Payments & Issue Resolution", href: "#/legal/refund" },
      { label: "Accessibility", href: "#/legal/accessibility" },
    ],
  },
];

const legalBottomLinks = [
  { label: "Legal Center", href: "#/legal" },
  { label: "Privacy", href: "#/legal/privacy" },
  { label: "Terms", href: "#/legal/terms" },
  { label: "Cookies", href: "#/legal/cookies" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    // Connect your newsletter subscription API here.
    setMessage("Newsletter API integration is required to complete signup.");
  };

  const openCookieSettings = () => {
    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
  };

  return (
    <footer className="border-t border-white/10 bg-footerColor text-white">
      <div className="mx-auto max-w-[1160px] px-5 py-12 sm:px-8 lg:px-10 lg:py-14">

        {/* Main footer columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand and newsletter */}
          <div className="sm:col-span-2 lg:col-span-3">
            <Link
              href="/"
              aria-label="Freevance home"
              className="inline-flex items-center"
            >
              <Image
                src={logo}
                alt="Freevance"
                width={190}
                height={56}
                className="h-auto w-40 object-contain sm:w-44"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              A product of{" "}
              <span className="font-semibold text-white">
                Hyper V Solutions LLC
              </span>
              , South Carolina, USA.
            </p>

            {/* Newsletter */}
            <div className="mt-5">
              <h3 className="text-sm font-bold text-white">
                Get new-project alerts
              </h3>

              <form
                onSubmit={handleSubscribe}
                className="mt-2 flex flex-col gap-2 sm:flex-row"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Your email
                </label>

                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setMessage("");
                  }}
                  placeholder="Your email"
                  required
                  className="min-w-0 flex-1 rounded-xl border border-slate-600 bg-black px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/30"
                />

                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Subscribe
                </button>
              </form>

              {message && (
                <p
                  role="status"
                  aria-live="polite"
                  className="mt-2 text-xs leading-5 text-slate-300"
                >
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Navigation columns */}
          {footerLinks.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <h3 className="text-base font-bold text-white">
                {group.title}
              </h3>

              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm leading-6 text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact information */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold text-white">
              We Are Here
            </h3>

            <div className="mt-5 space-y-5">

              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />

                <address className="text-sm leading-6 not-italic text-slate-300">
                  PO Box 1084,
                  <br />
                  Columbia, SC 29202
                </address>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-primary" />

                <div>
                  <a
                    href="tel:+18333747366"
                    className="text-sm leading-6 text-white transition hover:text-primary"
                  >
                    1-833-3RISEON
                    <span className="text-slate-300">
                      {" "}(1-833-374-7366)
                    </span>
                  </a>

                  <p className="mt-1 text-xs text-slate-400">
                    Voice • Text • Toll-Free • Fax
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-primary" />

                <a
                  href="mailto:support@freevance.com"
                  className="break-all text-sm text-white transition hover:text-primary"
                >
                  support@freevance.com
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Certification section */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">

            <div className="flex items-center justify-center px-4 py-3">
              <Image
                src={certificationBadges}
                alt="DBE, SBE and business certification badges"                
                className="h-auto w-auto object-contain rounded-lg"
              />
            </div>

            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-white">
                We are SBE | DBE certified · D-U-N-S® registered
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Hyper V Solutions LLC · Columbia, South Carolina
              </p>
            </div>

          </div>
        </div>

        {/* Company description */}
        <div className="mt-8">
          <p className="max-w-5xl text-sm leading-6 text-slate-300">
            Freevance is a structured services marketplace and
            project-delivery platform connecting individuals and
            organizations with qualified providers while supporting
            the workflow from requirement through completion.
          </p>
        </div>

        {/* Bottom footer */}
        <div className="mt-5 border-t border-white/10 pt-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <p className="text-sm text-slate-400">
              © 2026 Hyper V Solutions LLC. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <nav
                aria-label="Footer legal links"
                className="flex flex-wrap gap-x-5 gap-y-3"
              >
                {legalBottomLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <button
                type="button"
                onClick={openCookieSettings}
                className="text-left text-sm text-slate-300 underline decoration-slate-500 underline-offset-4 transition-colors hover:text-white"
              >
                Do Not Sell or Share My Personal Information
              </button>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
