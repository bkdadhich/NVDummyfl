"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, Clock3,
  Globe2, MapPin, Share2, Star, BriefcaseBusiness
} from "lucide-react";
import { getCurrentUser } from "@/lib/demoAuth";

const cardClass =
  "rounded-xl border border-[#e6e9f2] bg-white p-5 shadow-[0_5px_18px_rgba(20,35,70,.045)] dark:border-slate-700 dark:bg-[#111c38]";

function displayDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function PublicProviderProfile() {
  const router = useRouter();
  const [provider, setProvider] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Demo mode: load the signed-in provider's saved profile.
    // A production public profile should load by provider ID from the backend.
    const current = getCurrentUser();
    if (current?.role === "freelancer") setProvider(current);
  }, []);

  const skills = useMemo(() => {
    const values = provider?.capabilities || provider?.skills || [];
    return Array.isArray(values)
      ? values.filter(Boolean)
      : String(values).split(",").map((item) => item.trim()).filter(Boolean);
  }, [provider]);

  const languages = useMemo(() => {
    const values = provider?.languages || ["English"];
    return Array.isArray(values) ? values.filter(Boolean) : String(values).split(",").map((item) => item.trim()).filter(Boolean);
  }, [provider]);

  const qualifications = useMemo(() => {
    const values = provider?.qualifications || [];
    return Array.isArray(values) ? values.filter(Boolean) : String(values).split(";").map((item) => item.trim()).filter(Boolean);
  }, [provider]);

  const verifiedSkills = useMemo(() => {
    const values = provider?.verifiedSkills || [];
    return Array.isArray(values) ? values : [];
  }, [provider]);

  const initials = (provider?.name || "N").trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const headline = provider?.headline || (provider?.category ? `${provider.category} specialist` : "Service provider");
  const joined = displayDate(provider?.createdAt || provider?.joinedAt || provider?.created_at);
  const rate = provider?.rate ? `$${provider.rate}/hr` : "On request";

  const shareProfile = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: `${provider?.name || "Provider"} | Freevance`, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // User cancelled the native share sheet.
    }
  };

  if (!provider) {
    return (
      <main className="min-h-[65vh] bg-[#f3f4fa] px-4 py-12 dark:bg-[#0b1428]">
        <div className="mx-auto max-w-5xl rounded-xl border border-[#e6e9f2] bg-white p-8 text-center dark:border-slate-700 dark:bg-[#111c38]">
          <h1 className="text-xl font-bold text-[#14213d] dark:text-white">Provider profile unavailable</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in as a provider to preview this profile in the current demo.</p>
          <Link href="/" className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white">Back to Freevance</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f4fa] px-4 py-7 text-[#14213d] dark:bg-[#0b1428] dark:text-white sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center justify-between">
          <button type="button" onClick={() => router.back()} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-primary dark:text-slate-300">
            <ArrowLeft size={14} /> Find Services
          </button>
          <span className="text-xs text-slate-400">Public provider profile</span>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <section className={`${cardClass} text-center`}>
              <div className="relative mx-auto mb-3 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#2860e8] text-2xl font-bold text-white shadow-[0_5px_14px_rgba(40,96,232,.25)]">
                {initials}
                <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-[3px] border-white bg-emerald-500 dark:border-[#111c38]" />
              </div>
              <h1 className="text-base font-bold">{provider.name || "Provider"}</h1>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{headline}</p>
              <span className="mt-2 inline-flex rounded-full bg-[#f0edff] px-3 py-1 text-[9px] font-bold text-[#6956b4] dark:bg-[#28234b] dark:text-[#c7bfff]">New on Freevance</span>

              <div className="mt-5 space-y-3 text-left">
                {[
                  [MapPin, "From", provider.country || "—"],
                  [CalendarDays, "Member since", joined],
                  [Globe2, "Languages", languages.join(", ") || "—"],
                  [Clock3, "Last delivery", provider.lastDelivery ? displayDate(provider.lastDelivery) : "—"],
                  [BriefcaseBusiness, "Hourly rate", rate],
                ].map(([Icon, label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-3 text-[11px]">
                    <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Icon size={12} />{label}</span>
                    <strong className="max-w-[120px] text-right font-semibold text-[#14213d] dark:text-white">{value}</strong>
                  </div>
                ))}
              </div>
              <button type="button" onClick={shareProfile} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#e5e8f0] px-3 py-2 text-[11px] font-semibold text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200">
                <Share2 size={12} /> {copied ? "Link copied" : "Share profile"}
              </button>
            </section>

            <section className={cardClass}>
              <h2 className="mb-2 text-xs font-bold">Verified skills</h2>
              {verifiedSkills.length ? (
                <div className="flex flex-wrap gap-2">
                  {verifiedSkills.map((skill, index) => <span key={`${skill}-${index}`} className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"><CheckCircle2 size={11}/>{typeof skill === "string" ? skill : skill.name}</span>)}
                </div>
              ) : <p className="text-[10px] text-slate-500 dark:text-slate-400">No skill tests passed yet.</p>}
            </section>
          </aside>

          <div className="space-y-4">
            <section className={cardClass}>
              <h2 className="text-lg font-extrabold tracking-tight">{headline}</h2>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ["0", "Projects completed"],
                  ["0", "Milestones delivered"],
                  ["0", "Repeat clients"],
                  ["0", "Active now"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg bg-[#eef2fa] px-2 py-3 text-center dark:bg-[#1b2a49]">
                    <p className="text-sm font-extrabold">{value}</p>
                    <p className="mt-1 text-[9px] leading-3 text-slate-500 dark:text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={cardClass}>
              <h2 className="text-sm font-bold">About me</h2>
              <p className="mt-2 whitespace-pre-line text-xs leading-5 text-slate-500 dark:text-slate-400">{provider.bio?.trim() || "This provider has not written a bio yet."}</p>
              <h3 className="mt-3 text-[11px] font-bold">Skills</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{skills.length ? skills.join(", ") : "—"}</p>
              {qualifications.length > 0 && (
                <>
                  <h3 className="mt-3 text-[11px] font-bold">Qualifications</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{qualifications.join(", ")}</p>
                </>
              )}
            </section>

            <section className={cardClass}>
              <h2 className="text-sm font-bold">Work history</h2>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">No completed projects yet.</p>
            </section>

            <section className={cardClass}>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold">Reviews</h2>
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400"><Star size={11}/> No reviews yet</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">No reviews yet.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
