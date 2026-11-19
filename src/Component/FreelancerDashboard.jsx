"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Search, MessageSquare, FolderKanban, Wallet,
  Award, Flag, PackageCheck, FileText, UserRound, Bell, LifeBuoy,
  ChevronDown, ArrowUpRight, Clock3, CheckCircle2, Circle, LogOut,
  Save, ArrowLeft, BriefcaseBusiness, ClipboardList, Globe, Settings,
  SlidersHorizontal, MapPin, CalendarDays, DollarSign, X, Search as SearchIcon
} from "lucide-react";
import { getCurrentUser, updateUser, logoutUser } from "@/lib/demoAuth";

const primaryTabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "opportunities", label: "Opportunities", icon: Search },
  { id: "responses", label: "My Responses", icon: MessageSquare },
  { id: "projects", label: "My Projects", icon: FolderKanban },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "payments", label: "Payments", icon: Wallet },
];
const moreTabs = [
  { id: "awards", label: "Awards", icon: Award },
  { id: "milestones", label: "Milestones", icon: Flag },
  { id: "deliverables", label: "Deliverables", icon: PackageCheck },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "support", label: "Support", icon: LifeBuoy },
];

const fieldClass = "mt-1.5 h-12 w-full rounded-xl border border-[#dfe5f0] bg-white px-3.5 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-slate-600 dark:bg-[#172541] dark:text-white";
const labelClass = "block text-xs font-bold text-[#33415f] dark:text-slate-200";

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return <label className={labelClass}>{label}<input type={type} value={value ?? ""} onChange={onChange} placeholder={placeholder || ""} className={fieldClass} /></label>;
}
function TextField({ label, value, onChange, placeholder }) {
  return <label className={labelClass}>{label}<textarea value={value ?? ""} onChange={onChange} placeholder={placeholder || ""} rows={3} className="mt-1.5 w-full rounded-xl border border-[#dfe5f0] bg-white px-3.5 py-3 text-sm text-slate-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-slate-600 dark:bg-[#172541] dark:text-white" /></label>;
}
function StatCard({ title, value, note, icon: Icon }) {
  return <div className="rounded-2xl border border-[#e7eaf2] bg-white p-5 shadow-[0_8px_24px_rgba(20,35,70,.05)] dark:border-slate-700 dark:bg-[#111c38]">
    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400"><span>{title}</span><Icon size={19} className="text-primary" /></div>
    <p className="mt-3 text-3xl font-bold tracking-tight text-[#14213d] dark:text-white">{value}</p>
    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{note}</p>
  </div>;
}

export default function FreelancerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [moreOpen, setMoreOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [profileEditing, setProfileEditing] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [opportunityQuery, setOpportunityQuery] = useState("");
  const [opportunityCategory, setOpportunityCategory] = useState("All categories");
  const [opportunityLocation, setOpportunityLocation] = useState("");
  const [opportunityType, setOpportunityType] = useState("Any location");
  const [opportunityBudget, setOpportunityBudget] = useState("Any budget");
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState("Freevance Admin");
  const [activeConversation, setActiveConversation] = useState(false);
  const [messageDraft, setMessageDraft] = useState("");
  const [demoMessages, setDemoMessages] = useState([]);

  useEffect(() => {
    const current = getCurrentUser();
    if (!current || current.role !== "freelancer") {
      router.replace("/");
      return;
    }
    setUser(current);
    const requestedTab = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("tab") : null;
    if (requestedTab) setActiveTab(requestedTab);
  }, [router]);
  
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");

  if (tab && ["profile", "notifications"].includes(tab)) {
    setActiveTab(tab);
  }
}, []);

  const profile = useMemo(() => ({
    name: user?.name || "",
    country: user?.country || "",
    providerType: user?.providerType || "Individual",
    category: user?.category || "",
    headline: user?.headline || "",
    languages: Array.isArray(user?.languages) ? user.languages.join(", ") : user?.languages || "English",
    capabilities: Array.isArray(user?.capabilities) ? user.capabilities.join(", ") : user?.capabilities || "",
    qualifications: Array.isArray(user?.qualifications) ? user.qualifications.join("; ") : user?.qualifications || "",
    rate: user?.rate || "",
    bio: user?.bio || "",
    portfolio: Array.isArray(user?.portfolio) ? user.portfolio.join("\n") : user?.portfolio || "",
    paymentMethod: user?.payout?.method || user?.paymentMethod || "",
    paymentDetails: user?.payout?.detail || user?.paymentDetails || "",
    taxForm: user?.taxFile?.type || user?.taxForm || "Not provided",
  }), [user]);

  const [form, setForm] = useState(profile);
  useEffect(() => setForm(profile), [profile]);
  const setField = (key) => (e) => setForm((old) => ({ ...old, [key]: e.target.value }));

  const selectTab = (id) => {
    if (id === "support") { router.push("/support"); return; }
    setActiveTab(id);
    setMoreOpen(false);
    if (id === "profile") router.replace("/freelancer/dashboard?tab=profile");
    else router.replace("/freelancer/dashboard");
  };

  const saveProfile = (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const updates = {
        name: form.name.trim(),
        country: form.country,
        providerType: form.providerType,
        category: form.category,
        headline: form.headline,
        languages: form.languages.split(",").map((v) => v.trim()).filter(Boolean),
        capabilities: form.capabilities.split(",").map((v) => v.trim()).filter(Boolean),
        qualifications: form.qualifications.split(";").map((v) => v.trim()).filter(Boolean),
        rate: form.rate,
        bio: form.bio,
        portfolio: form.portfolio.split("\n").map((v) => v.trim()).filter(Boolean),
        payout: { method: form.paymentMethod, detail: form.paymentDetails },
        taxFile: { ...(user.taxFile || {}), type: form.taxForm },
      };
      const updated = updateUser(user.id, updates);
      const nextUser = updated || { ...user, ...updates };
      setUser(nextUser);
      localStorage.setItem("freevance_session", nextUser.id);
      setProfileEditing(false);
      setSavedMessage("Your profile has been saved.");
      window.setTimeout(() => setSavedMessage(""), 3000);
    } catch {
      setSavedMessage("Unable to save your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    window.dispatchEvent(new Event("freevance-auth-change"));
    router.push("/");
  };

  if (!user) return <div className="min-h-[60vh] bg-[#f3f4fa] dark:bg-slate-950" />;

  const activeMore = moreTabs.find((tab) => tab.id === activeTab);
  const checklist = [
    ["Add a 20+ character bio", (u) => (u.bio || "").trim().length >= 20],
    ["Add at least 3 capabilities", (u) => (u.capabilities || []).length >= 3],
    ["Set your hourly rate", (u) => !!u.rate],
    ["Add qualifications or certifications", (u) => (u.qualifications || []).length > 0],
    ["Add portfolio links", (u) => (u.portfolio || []).length > 0],
    ["Add payment details", (u) => !!(u.payout?.detail || u.paymentDetails)],
    ["Provide tax information", (u) => !!(u.taxFile?.type && u.taxFile.type !== "Not provided")],
  ];
  const completed = checklist.filter(([, test]) => test(user)).length;
  const progress = Math.round((completed / checklist.length) * 100);

  return <main className="min-h-screen bg-[#f3f4fa] pb-16 text-[#14213d] dark:bg-[#0b1428] dark:text-white">
    <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:py-12">
      {activeTab === "profile" ? (
        <>
          <div className="mb-8 flex items-center gap-3 text-sm">
            <button onClick={() => selectTab("overview")} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold dark:border-slate-700 dark:bg-[#111c38]"><ArrowLeft size={16}/> Back</button>
            <span className="text-slate-400">Dashboard</span><span className="text-slate-400">›</span><span className="font-semibold">Profile</span>
          </div>

          {!profileEditing ? (
            <div className="grid items-start gap-5 lg:grid-cols-2">
              <section className="rounded-2xl border border-[#e2e7f1] bg-white p-6 shadow-[0_12px_35px_rgba(20,35,70,.06)] dark:border-slate-700 dark:bg-[#111c38]">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h1 className="text-xl font-bold tracking-tight text-[#14213d] dark:text-white">Provider profile</h1>
                  <button type="button" onClick={() => setProfileEditing(true)} className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(252,48,48,.22)] transition hover:-translate-y-0.5 hover:brightness-95">Edit profile</button>
                </div>
                {[
                  ["Name", user.name || "Not provided"],
                  ["Provider type", user.providerType || "Individual"],
                  ["Main category", user.category || "Not provided"],
                  ["Country", user.country || "Not provided"],
                  ["Rate", user.rate ? `$${user.rate}/hour` : "On request"],
                  ["Rating", user.rating ? user.rating : "No reviews yet"],
                  ["Review status", user.status === "approved" ? "Approved" : "Pending review"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 py-2 text-sm sm:text-base">
                    <span className="text-[#243451] dark:text-slate-300">{label}</span>
                    <strong className="text-right font-bold text-[#14213d] dark:text-white">{value}</strong>
                  </div>
                ))}
                <div className="mt-5">
                  <h2 className="text-sm font-bold text-[#14213d] dark:text-white">Capabilities and specialties</h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{user.capabilities?.length ? (Array.isArray(user.capabilities) ? user.capabilities.join(", ") : user.capabilities) : "Add capabilities in your profile"}</p>
                </div>
                <div className="mt-5">
                  <h2 className="text-sm font-bold text-[#14213d] dark:text-white">Qualifications and credentials</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user.qualifications?.length ? (Array.isArray(user.qualifications) ? user.qualifications.join(", ") : user.qualifications) : "None added yet"}</p>
                </div>
              </section>

              <section className="rounded-2xl border border-[#e2e7f1] bg-white p-6 shadow-[0_12px_35px_rgba(20,35,70,.06)] dark:border-slate-700 dark:bg-[#111c38]">
                <h2 className="mb-3 text-xl font-bold tracking-tight text-[#14213d] dark:text-white">Payout and tax</h2>
                <div className="flex items-center justify-between gap-4 py-2 text-sm sm:text-base">
                  <span className="text-[#243451] dark:text-slate-300">Payout method</span>
                  <strong className="font-bold text-[#14213d] dark:text-white">{user.payout?.method || user.paymentMethod || "Not set"}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 py-2 text-sm sm:text-base">
                  <span className="text-[#243451] dark:text-slate-300">Tax form</span>
                  <strong className="font-bold text-[#14213d] dark:text-white">{(user.taxFile?.type || user.taxForm) && (user.taxFile?.type || user.taxForm) !== "Not provided" ? (user.taxFile?.type || user.taxForm) : "Missing"}</strong>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" onClick={() => router.push("/provider-profile")} className="rounded-full border border-[#dfe5f0] px-5 py-3 text-sm font-bold text-[#14213d] transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-white">View public profile</button>
                  <button type="button" onClick={() => router.push("/skills")} className="rounded-full border border-[#dfe5f0] px-5 py-3 text-sm font-bold text-[#14213d] transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-white">Skill tests</button>
                </div>
              </section>
            </div>
          ) : (
            <div className="mx-auto max-w-[576px]">
              <div className="mb-6 flex items-center justify-between gap-3"><h1 className="text-3xl font-bold">Edit profile</h1><button type="button" onClick={() => setProfileEditing(false)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold dark:border-slate-700 dark:bg-[#111c38]">Cancel</button></div>
              <form onSubmit={saveProfile} className="space-y-5 rounded-2xl border border-[#e7eaf2] bg-white p-5 shadow-[0_12px_35px_rgba(20,35,70,.06)] sm:p-6 dark:border-slate-700 dark:bg-[#111c38]">
                <p className="text-xs text-slate-500 dark:text-slate-400">{user.email} · <b>Provider</b> · {user.status || "pending"}</p>
                <Field label="Full name or authorized representative" value={form.name} onChange={setField("name")} />
                <Field label="Country" value={form.country} onChange={setField("country")} />
                <label className={labelClass}>Provider type<select value={form.providerType} onChange={setField("providerType")} className={fieldClass}>{["Individual","Agency","Company","Consultant","Vendor / Subcontractor"].map((v)=><option key={v}>{v}</option>)}</select></label>
                <label className={labelClass}>Main category<select value={form.category} onChange={setField("category")} className={fieldClass}>{["Mobile Apps","Web Development","UI/UX Design","Content Writing","Digital Marketing","Data & Analytics","Data Entry","Consulting & Advisory","Operations & Admin Support","Other"].map((v)=><option key={v}>{v}</option>)}</select></label>
                <Field label="Headline (shown on your profile)" value={form.headline} onChange={setField("headline")} placeholder="e.g. Accessibility audits and Next.js remediation" />
                <Field label="Languages (comma separated)" value={form.languages} onChange={setField("languages")} placeholder="English" />
                <Field label="Capabilities and specialties (comma separated)" value={form.capabilities} onChange={setField("capabilities")} placeholder="React, Next.js, UI design" />
                <TextField label="Qualifications, certifications and credentials" value={form.qualifications} onChange={setField("qualifications")} placeholder="Separate entries with semicolons" />
                <Field label="Standard hourly rate (USD, optional)" value={form.rate} onChange={setField("rate")} type="number" />
                <TextField label="Summary and relevant experience" value={form.bio} onChange={setField("bio")} />
                <TextField label="Portfolio and reference links (one per line)" value={form.portfolio} onChange={setField("portfolio")} />
                <div className="border-t border-slate-100 pt-4 dark:border-slate-700"><h2 className="mb-4 text-lg font-bold">Payment & tax</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className={labelClass}>Payment method<select value={form.paymentMethod} onChange={setField("paymentMethod")} className={fieldClass}><option value="">Select method</option>{["Bank transfer","PayPal","Payoneer","Wise","Other"].map(v=><option key={v}>{v}</option>)}</select></label>
                    <Field label="Payment details (email / account)" value={form.paymentDetails} onChange={setField("paymentDetails")} />
                  </div>
                  <label className={`${labelClass} mt-4`}>Tax form type<select value={form.taxForm} onChange={setField("taxForm")} className={fieldClass}>{["Not provided","W-9","W-8BEN","Other"].map(v=><option key={v}>{v}</option>)}</select></label>
                  <label className={`${labelClass} mt-4 block`}>Upload signed form (PDF/PNG/JPG, max 400KB)<input type="file" accept=".pdf,.png,.jpg,.jpeg" className={`${fieldClass} h-auto py-3`} onChange={(e)=>setForm((old)=>({...old,taxUploadName:e.target.files?.[0]?.name || ""}))}/>{form.taxUploadName && <span className="mt-1 block text-xs text-slate-500">{form.taxUploadName} (demo: filename only)</span>}</label>
                </div>
                <p className="text-xs text-slate-500">No verification badges yet. <button type="button" onClick={()=>router.push("/skills")} className="font-bold text-primary">Take a skill test</button></p>
                {savedMessage && <p role="status" className="text-sm font-semibold text-emerald-600">{savedMessage}</p>}
                <button type="submit" disabled={saving} className="flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-white shadow-[0_10px_25px_rgba(252,48,48,.22)] transition hover:-translate-y-0.5 hover:brightness-95 disabled:opacity-60"><Save size={17}/>{saving ? "Saving..." : "Save"}</button>
              </form>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div><h1 className="text-3xl font-bold tracking-tight">Hi, {user.name || "there"}</h1><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Provider dashboard · {user.providerType || "Individual"}</p></div>
            <Link href="/projects" className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(252,48,48,.2)]">Find Opportunities</Link>
          </div>
          {user.status !== "approved" && <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"><Clock3 size={16} className="mr-2 inline"/>Your provider profile is awaiting review by the Freevance team. Meanwhile, take a skill test and complete your profile.</div>}

          <div className="relative mb-6">
            <div className="flex flex-wrap gap-2">
              {primaryTabs.map(({id,label})=><button key={id} onClick={()=>selectTab(id)} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${activeTab===id ? "border-[#0a2b66] bg-[#0a2b66] text-white" : "border-[#e0e5ef] bg-white text-slate-700 hover:border-primary dark:border-slate-700 dark:bg-[#111c38] dark:text-slate-200"}`}>{label}</button>)}
              <div className="relative"><button onClick={()=>setMoreOpen(v=>!v)} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold ${activeMore ? "border-[#0a2b66] bg-[#0a2b66] text-white" : "border-[#e0e5ef] bg-white dark:border-slate-700 dark:bg-[#111c38]"}`}>More <ChevronDown size={15}/></button>
                {moreOpen && <div className="absolute left-0 top-12 z-30 w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-[#111c38]">{moreTabs.map(({id,label,icon:Icon})=><button key={id} onClick={()=>selectTab(id)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800"><Icon size={16}/>{label}</button>)}</div>}
              </div>
            </div>
          </div>

          {activeTab === "opportunities" ? (
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold tracking-tight">Opportunities</h2>
                <button
                  type="button"
                  onClick={() => setFiltersOpen((value) => !value)}
                  aria-expanded={filtersOpen}
                  className="inline-flex items-center gap-2 rounded-full border border-[#dfe5f0] bg-white px-4 py-2.5 text-xs font-bold text-[#243451] shadow-sm transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-[#111c38] dark:text-slate-200"
                >
                  <SlidersHorizontal size={15} />
                  Search all with filters
                  <ChevronDown size={14} className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {filtersOpen && (
                <div className="rounded-2xl border border-[#e4e8f1] bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-[#111c38]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-bold">Filter opportunities</h3>
                    <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={17}/></button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <label className={labelClass}>Search projects
                      <div className="relative mt-1.5"><SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={opportunityQuery} onChange={(e)=>setOpportunityQuery(e.target.value)} placeholder="Project title or keyword" className={`${fieldClass} mt-0 pl-9`}/></div>
                    </label>
                    <label className={labelClass}>Category
                      <select value={opportunityCategory} onChange={(e)=>setOpportunityCategory(e.target.value)} className={fieldClass}>{["All categories","Mobile Apps","Web Development","UI/UX Design","Content Writing","Digital Marketing","Data & Analytics","Data Entry","Consulting & Advisory","Operations & Admin Support","Other"].map((v)=><option key={v}>{v}</option>)}</select>
                    </label>
                    <label className={labelClass}>Location
                      <div className="relative mt-1.5"><MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={opportunityLocation} onChange={(e)=>setOpportunityLocation(e.target.value)} placeholder="City, state or country" className={`${fieldClass} mt-0 pl-9`}/></div>
                    </label>
                    <label className={labelClass}>Work location
                      <select value={opportunityType} onChange={(e)=>setOpportunityType(e.target.value)} className={fieldClass}>{["Any location","Remote","On-site","Hybrid"].map((v)=><option key={v}>{v}</option>)}</select>
                    </label>
                    <label className={labelClass}>Budget
                      <select value={opportunityBudget} onChange={(e)=>setOpportunityBudget(e.target.value)} className={fieldClass}>{["Any budget","Under $500","$500 – $1,000","$1,000 – $5,000","$5,000+"].map((v)=><option key={v}>{v}</option>)}</select>
                    </label>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-end gap-2">
                    <button type="button" onClick={()=>{setOpportunityQuery("");setOpportunityCategory("All categories");setOpportunityLocation("");setOpportunityType("Any location");setOpportunityBudget("Any budget");}} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Clear filters</button>
                    <button type="button" onClick={()=>setFiltersOpen(false)} className="rounded-full bg-primary px-5 py-2 text-xs font-bold text-white">Apply filters</button>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-[#dcd8ff] bg-[#f5f3ff] px-4 py-3 text-xs leading-5 text-[#6254a5] dark:border-[#51458b] dark:bg-[#211c43] dark:text-[#c7bfff]">
                For applicable engagements, providers operating through Freevance may perform services under the applicable subcontracting or project-delivery structure.
              </div>

              <div className="rounded-2xl border border-[#e6e9f1] bg-white p-4 shadow-[0_5px_18px_rgba(20,35,70,.035)] dark:border-slate-700 dark:bg-[#111c38] sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-bold text-[#1c2b49] dark:text-white">Matching your capabilities <span className="ml-1 text-slate-400">(0)</span></h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">No matching opportunities right now.</p>
              </div>

              <div className="rounded-2xl border border-[#e6e9f1] bg-white p-4 shadow-[0_5px_18px_rgba(20,35,70,.035)] dark:border-slate-700 dark:bg-[#111c38] sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-bold text-[#1c2b49] dark:text-white">Other open opportunities <span className="ml-1 text-slate-400">(0)</span></h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">None.</p>
              </div>
            </section>
          ) : activeTab === "responses" ? (
            <section className="pt-1">
              <h2 className="mb-4 text-xl font-bold tracking-tight">My Responses</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#dfe3ec] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      <th className="px-3 py-3 font-semibold">Opportunity</th>
                      <th className="px-3 py-3 font-semibold">Pricing</th>
                      <th className="px-3 py-3 font-semibold">Timeline</th>
                      <th className="px-3 py-3 font-semibold">Submitted</th>
                      <th className="px-3 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#dfe3ec] dark:border-slate-700">
                      <td colSpan={5} className="px-3 py-3 text-slate-500 dark:text-slate-400">Nothing here yet.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          ) : activeTab === "projects" ? (
            <section className="pt-1">
              <h2 className="mb-4 text-xl font-bold tracking-tight">Active Projects</h2>
              <div className="flex min-h-24 max-w-[690px] items-center justify-center rounded-2xl border border-[#e7eaf2] bg-white px-5 py-7 text-center text-base text-slate-500 shadow-[0_8px_24px_rgba(20,35,70,.04)] dark:border-slate-700 dark:bg-[#111c38] dark:text-slate-400">
                No active projects.
              </div>
            </section>
          ) : activeTab === "messages" ? (
            <section className="-mt-8">
              <div className="mb-5 rounded-t-2xl bg-[#0a2b66] px-5 py-4 text-center text-white">
                <h2 className="text-xl font-bold">Messages</h2>
                <p className="mt-1 text-xs text-blue-100">Home / Messages</p>
              </div>
              <div className="mx-auto grid min-h-[390px] max-w-[1050px] gap-3 rounded-2xl bg-[#f7f7fb] p-3 sm:grid-cols-[260px_minmax(0,1fr)] dark:bg-[#111c38]">
                <aside className="rounded-xl border border-[#e7eaf2] bg-white p-4 dark:border-slate-700 dark:bg-[#172541]">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#14213d] dark:text-white">Inbox</h3>
                    <button type="button" onClick={() => setNewMessageOpen(true)} className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-sm">+ New</button>
                  </div>
                  <p className="text-xs text-slate-400">No conversations yet.</p>
                </aside>
                <div className="flex min-h-[350px] flex-col rounded-xl border border-[#e7eaf2] bg-white dark:border-slate-700 dark:bg-[#172541]">
                  {activeConversation ? (
                    <>
                      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8efff] text-sm font-bold text-[#0a2b66]">F</div>
                        <div><p className="text-sm font-bold text-[#14213d] dark:text-white">{messageRecipient}</p><p className="text-[11px] text-slate-400">Freevance team</p></div>
                      </div>
                      <div className="flex flex-1 flex-col items-center justify-center gap-3 overflow-y-auto p-4">
                        {demoMessages.length === 0 ? <p className="rounded-full bg-[#f2f1fa] px-4 py-2 text-[11px] text-slate-500 dark:bg-slate-700 dark:text-slate-300">No messages yet — say hello!</p> : demoMessages.map((message, index) => (
                          <div key={index} className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[#0a2b66] px-4 py-2.5 text-sm text-white">{message}</div>
                        ))}
                      </div>
                      <form onSubmit={(e) => { e.preventDefault(); if (!messageDraft.trim()) return; setDemoMessages((items) => [...items, messageDraft.trim()]); setMessageDraft(""); }} className="border-t border-slate-100 p-3 dark:border-slate-700">
                        <div className="flex gap-2">
                          <input value={messageDraft} onChange={(e) => setMessageDraft(e.target.value)} placeholder="Write a message... (text only)" className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-primary dark:border-slate-600 dark:bg-[#111c38] dark:text-white" />
                          <button type="submit" className="rounded-full bg-primary px-4 text-xs font-bold text-white">Send</button>
                        </div>
                        <p className="mt-2 text-[10px] leading-4 text-slate-400">Text only — attachments aren't supported. Emails and phone numbers are hidden automatically. Keep work and payments on Freevance.</p>
                      </form>
                    </>
                  ) : (
                    <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1eafa] text-[#9272b5]"><MessageSquare size={23}/></div>
                      <h3 className="text-sm font-bold text-[#14213d] dark:text-white">Select a conversation</h3>
                      <p className="mt-1 max-w-xs text-xs text-slate-500 dark:text-slate-400">Reply to clients, or message the Freevance team.</p>
                      <button type="button" onClick={() => setNewMessageOpen(true)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm">New message</button>
                    </div>
                  )}
                </div>
              </div>
              {newMessageOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-[2px]">
                  <div role="dialog" aria-modal="true" aria-labelledby="new-message-title" className="w-full max-w-[390px] rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#111c38]">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 id="new-message-title" className="text-base font-bold text-[#14213d] dark:text-white">New message</h3>
                      <button type="button" onClick={() => setNewMessageOpen(false)} aria-label="Close" className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={17}/></button>
                    </div>
                    <label className={labelClass}>To
                      <select value={messageRecipient} onChange={(e) => setMessageRecipient(e.target.value)} className={fieldClass}>
                        <option>Freevance Admin</option>
                      </select>
                    </label>
                    <button type="button" onClick={() => { setActiveConversation(true); setDemoMessages([]); setNewMessageOpen(false); }} className="mt-4 h-11 w-full rounded-full bg-primary text-sm font-bold text-white shadow-sm">Open chat</button>
                  </div>
                </div>
              )}
            </section>
          ) : activeTab === "payments" ? (
            <section className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {[
                  ["Project Value", "$0.00", "agreed price"],
                  ["Milestone Amount", "$0.00", "all milestones"],
                  ["Pending", "$0.00", "not yet funded"],
                  ["Approved", "$0.00", "in hold period"],
                  ["Processing", "$0.00", "being processed"],
                  ["Paid", "$0.00", "completed"],
                ].map(([title, value, note]) => (
                  <div key={title} className="rounded-2xl border border-[#dfe5f0] bg-white px-4 py-4 dark:border-slate-700 dark:bg-[#111c38]">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-[#14213d] dark:text-white">{value}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{note}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300">
                Funded and held: <strong className="font-bold">$0.00</strong>
                <span className="text-slate-400"> · </span>
                Amounts are shown after the Freevance fee.
              </p>

              <section className="rounded-2xl border border-[#dfe5f0] bg-white p-5 shadow-[0_8px_24px_rgba(20,35,70,.05)] sm:p-6 dark:border-slate-700 dark:bg-[#111c38]">
                <h2 className="mb-3 text-xl font-bold text-[#14213d] dark:text-white">Milestone payments</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#dfe5f0] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        {["Project", "Milestone", "Amount", "Payment status", "Due"].map((heading) => (
                          <th key={heading} className="px-3 py-3 font-semibold">{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#dfe5f0] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        <td colSpan={5} className="px-3 py-4">Nothing here yet.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="grid items-start gap-5 lg:grid-cols-2">
                <section className="rounded-2xl border border-[#dfe5f0] bg-white p-5 shadow-[0_8px_24px_rgba(20,35,70,.05)] sm:p-6 dark:border-slate-700 dark:bg-[#111c38]">
                  <h2 className="mb-3 text-xl font-bold text-[#14213d] dark:text-white">Payment History</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[450px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-[#dfe5f0] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                          {["Date", "Event", "Milestone", "Amount"].map((heading) => (
                            <th key={heading} className="px-3 py-3 font-semibold">{heading}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#dfe5f0] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                          <td colSpan={4} className="px-3 py-4">Nothing here yet.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="rounded-2xl border border-[#dfe5f0] bg-white p-5 shadow-[0_8px_24px_rgba(20,35,70,.05)] sm:p-6 dark:border-slate-700 dark:bg-[#111c38]">
                  <h2 className="mb-3 text-xl font-bold text-[#14213d] dark:text-white">Invoices / Transaction Documents</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Documents appear after a milestone is funded.</p>
                </section>
              </div>
            </section>
          ) : activeTab === "awards" ? (
            <section className="pt-1">
              <h2 className="mb-4 text-xl font-bold tracking-tight">Awards</h2>
              <div className="flex min-h-[160px] flex-col items-center justify-center rounded-2xl border border-[#e7eaf2] bg-white px-5 py-7 text-center shadow-[0_8px_24px_rgba(20,35,70,.05)] dark:border-slate-700 dark:bg-[#111c38]">
                <p className="text-sm text-slate-500 dark:text-slate-400">No awards yet. When a client selects your response, the award appears here.</p>
                <Link href="/projects" className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(252,48,48,.2)] transition hover:-translate-y-0.5">Browse Opportunities</Link>
              </div>
            </section>
          ) : activeTab === "milestones" ? (
            <section className="pt-1">
              <h2 className="mb-4 text-xl font-bold tracking-tight">Milestones</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                  <thead><tr className="border-b border-[#dfe3ec] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    {["Project","Milestone","Responsible","Due","Required deliverable","Amount","Status"].map((heading)=><th key={heading} className="px-3 py-3 font-semibold">{heading}</th>)}
                  </tr></thead>
                  <tbody><tr className="border-b border-[#dfe3ec] dark:border-slate-700"><td colSpan={7} className="px-3 py-3 text-slate-500 dark:text-slate-400">Nothing here yet.</td></tr></tbody>
                </table>
              </div>
            </section>
          ) : activeTab === "deliverables" ? (
            <section className="space-y-7 pt-1">
              <div><h2 className="mb-4 text-xl font-bold tracking-tight">Deliverables to upload (0)</h2>
                <div className="flex min-h-24 items-center justify-center rounded-2xl border border-[#e7eaf2] bg-white px-5 py-7 text-center text-base text-slate-500 shadow-[0_8px_24px_rgba(20,35,70,.05)] dark:border-slate-700 dark:bg-[#111c38] dark:text-slate-400">No deliverables are due right now.</div>
              </div>
              <div><h2 className="mb-4 text-xl font-bold tracking-tight">Deliverable history</h2>
                <div className="flex min-h-24 items-center justify-center rounded-2xl border border-[#e7eaf2] bg-white px-5 py-7 text-center text-base text-slate-500 shadow-[0_8px_24px_rgba(20,35,70,.05)] dark:border-slate-700 dark:bg-[#111c38] dark:text-slate-400">No completed deliverables yet.</div>
              </div>
            </section>
          ) : activeTab === "documents" ? (
            <section className="pt-1">
              <h2 className="mb-4 text-xl font-bold tracking-tight">Project documents</h2>
              <div className="overflow-x-auto"><table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead><tr className="border-b border-[#dfe3ec] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  {["Document","Type","Project","Added by","Date"].map((heading)=><th key={heading} className="px-3 py-3 font-semibold">{heading}</th>)}
                </tr></thead>
                <tbody><tr className="border-b border-[#dfe3ec] dark:border-slate-700"><td colSpan={5} className="px-3 py-3 text-slate-500 dark:text-slate-400">Nothing here yet.</td></tr></tbody>
              </table></div>
            </section>
          ) : activeTab === "notifications" ? (
            <section className="pt-1">
              <h2 className="mb-4 text-xl font-bold tracking-tight">Notifications</h2>
              <div className="min-h-20 rounded-2xl border border-[#e7eaf2] bg-white px-5 py-6 text-sm text-slate-500 shadow-[0_8px_24px_rgba(20,35,70,.05)] dark:border-slate-700 dark:bg-[#111c38] dark:text-slate-400">Nothing yet.</div>
            </section>
          ) : activeTab === "overview" ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Needs your action" value="0" note="all clear" icon={Bell}/>
                <StatCard title="New opportunities" value="0" note="open for your response" icon={BriefcaseBusiness}/>
                <StatCard title="Projects in progress" value="0" note="0 completed" icon={FolderKanban}/>
                <StatCard title="Earned" value="$0.00" note="$0.00 processing" icon={Wallet}/>
              </div>
              <section className="mt-5 rounded-2xl border border-[#e7eaf2] bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#111c38]"><h2 className="font-bold">What to do next</h2><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Nothing waiting on you right now. Find new work below.</p></section>
              <section className="mt-5 rounded-2xl border border-[#e7eaf2] bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#111c38]"><div className="flex items-center justify-between"><h2 className="font-bold">Opportunities for you</h2><button onClick={()=>selectTab("opportunities")} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold dark:border-slate-700">Browse all</button></div><p className="mt-4 text-sm text-slate-500">No new matches right now. <Link href="/projects" className="font-bold text-primary">Browse all opportunities.</Link></p></section>
              <section className="mt-5 rounded-2xl border border-[#e7eaf2] bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-[#111c38]"><div className="mb-3 flex items-center justify-between"><h2 className="font-bold">Complete your profile</h2><span className="text-sm font-bold">{progress}%</span></div><div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-full rounded-full bg-primary transition-all" style={{width:`${progress}%`}}/></div><div className="space-y-2">{checklist.map(([label,test])=><div key={label} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">{test(user)?<CheckCircle2 size={16} className="text-emerald-500"/>:<Circle size={16} className="text-slate-300"/>}{label}</div>)}</div><button onClick={()=>selectTab("profile")} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white">Edit profile</button></section>
            </>
          ) : (
            <section className="rounded-2xl border border-[#e7eaf2] bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-[#111c38]">
              {(() => { const item = [...primaryTabs,...moreTabs].find((t)=>t.id===activeTab); const Icon=item?.icon || ClipboardList; return <><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-primary dark:bg-red-950/30"><Icon size={25}/></div><h2 className="text-xl font-bold">{item?.label || "Dashboard"}</h2><p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">This section is ready for its next workflow step. Your dashboard navigation and account are connected.</p>{activeTab==="profile" && <button onClick={()=>selectTab("profile")} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white">Edit profile</button>}</>; })()}
            </section>
          )}
        </>
      )}
    </div>
  </main>;
}
