"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, ClipboardList, MessageSquare, FolderKanban, Wallet,
  Flag, PackageCheck, FileText, Bell, LifeBuoy, ChevronDown,
  Plus, Search, CalendarDays, Clock3, CheckCircle2, Circle,
  ArrowUpRight, X, Send, Filter, Eye, Pencil, Ban, BriefcaseBusiness, Hand
} from "lucide-react";
import { getCurrentUser, logoutUser } from "@/lib/demoAuth";

const mainTabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "requirements", label: "My Requirements", icon: ClipboardList },
  { id: "responses", label: "Responses", icon: MessageSquare },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "payments", label: "Payments", icon: Wallet },
];
const moreTabs = [
  { id: "milestones", label: "Milestones" },
  { id: "deliverables", label: "Deliverables" },
  { id: "documents", label: "Documents" },
  { id: "notifications", label: "Notifications" },
  { id: "support", label: "Support" },
];

const demoRequirements = [];
const statusStyles = {
  "Open for responses": "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  "Pending review": "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  "In progress": "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  Completed: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  Cancelled: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
};
const field = "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-slate-600 dark:bg-[#172541] dark:text-white";
const label = "block text-xs font-bold text-slate-700 dark:text-slate-200";

function Stat({ title, value, note, icon: Icon, tone = "text-primary" }) {
  return <div className="rounded-2xl border border-[#e7eaf2] bg-white p-4 shadow-[0_6px_20px_rgba(20,35,70,.045)] dark:border-slate-700 dark:bg-[#111c38] sm:p-5">
    <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm"><span>{title}</span><Icon size={18} className={tone}/></div>
    <p className="mt-2 text-3xl font-bold tracking-tight text-[#14213d] dark:text-white">{value}</p>
    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{note}</p>
  </div>;
}
function Empty({ title, description, action, onAction }) {
  return <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-10 text-center dark:border-slate-700 dark:bg-[#111c38]">
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-primary dark:bg-red-950/30"><ClipboardList size={22}/></div>
    <h3 className="font-bold text-[#14213d] dark:text-white">{title}</h3>
    <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
    {action && <button onClick={onAction} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(252,48,48,.2)]">{action}</button>}
  </div>;
}

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("overview");
  const [moreOpen, setMoreOpen] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [requirements, setRequirements] = useState(demoRequirements);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState({
    title: "", category: "", description: "", minBudget: "", maxBudget: "",
    timeline: "", location: "Remote", deadline: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const current = getCurrentUser();
    if (!current || current.role !== "client") {
      router.replace("/");
      return;
    }
    setUser(current);
  }, [router]);

  const firstName = user?.name?.trim()?.split(/\s+/)[0] || "there";
  const openCount = requirements.filter((r) => r.status === "Open for responses").length;
  const responseCount = requirements.reduce((n, r) => n + r.responses, 0);
  const activeCount = requirements.filter((r) => r.status === "In progress").length;
  const filteredRequirements = useMemo(() => requirements.filter((r) => {
    const matchesText = `${r.title} ${r.category} ${r.description}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    return matchesText && matchesStatus;
  }), [requirements, search, statusFilter]);

  const selectTab = (id) => {
    setTab(id);
    setMoreOpen(false);
  };
  const updateForm = (key) => (e) => setForm((old) => ({ ...old, [key]: e.target.value }));
  const submitRequirement = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category || !form.description.trim()) {
      setFormError("Please complete the requirement title, category and description.");
      return;
    }
    const next = {
      id: `REQ-${Date.now()}`,
      ...form,
      responses: 0,
      status: "Pending review",
      createdAt: new Date().toISOString(),
    };
    setRequirements((old) => [next, ...old]);
    setForm({ title: "", category: "", description: "", minBudget: "", maxBudget: "", timeline: "", location: "Remote", deadline: "" });
    setFormError("");
    setShowPostModal(false);
    setTab("requirements");
  };
  const logout = () => {
    logoutUser();
    window.dispatchEvent(new Event("freevance-auth-change"));
    router.push("/");
  };

  if (!user) return <main className="min-h-[70vh] bg-[#f3f4fa] dark:bg-[#0b1428]"/>;

  const activeMore = moreTabs.some((x) => x.id === tab);
  const requirementList = filteredRequirements.length ? (
    <div className="space-y-3">
      {filteredRequirements.map((r) => (
        <article key={r.id} className="rounded-2xl border border-[#e7eaf2] bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-[#111c38] sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-bold text-[#14213d] dark:text-white">{r.title}</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{r.category} · {r.location} · {r.minBudget || "Budget not set"}{r.maxBudget ? ` – ${r.maxBudget}` : ""}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${statusStyles[r.status] || statusStyles["Pending review"]}`}>{r.status}</span>
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{r.description}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-700">
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-1"><MessageSquare size={14}/>{r.responses} responses</span><span className="inline-flex items-center gap-1"><CalendarDays size={14}/>{new Date(r.createdAt).toLocaleDateString()}</span></div>
            <div className="flex gap-2"><button type="button" onClick={() => {}} className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold dark:border-slate-600"><Eye size={13}/> View</button><button type="button" onClick={() => {}} className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold dark:border-slate-600"><Pencil size={13}/> Edit</button></div>
          </div>
        </article>
      ))}
    </div>
  ) : <Empty title="No requirements yet." description="Describe what you need and Freevance will help you find qualified providers." action="Post a Requirement" onAction={() => setShowPostModal(true)}/>;

  return <main className="min-h-screen bg-[#f3f4fa] pb-16 text-[#14213d] dark:bg-[#0b1428] dark:text-white">
    <div className="mx-auto max-w-[1180px] px-4 py-7 sm:px-6 lg:py-9">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Hi, {firstName} <Hand size={22} className="ml-1 inline-block text-primary" /></h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Client dashboard</p></div>
        <button onClick={() => setShowPostModal(true)} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(252,48,48,.25)] transition hover:-translate-y-0.5 hover:brightness-95"><Plus size={17}/> Post a Requirement</button>
      </div>

    
<div className="relative z-40 mb-5">
  <div className="flex flex-wrap gap-2">
    {mainTabs.map(({ id, label: tabLabel }) => (
      <button
        key={id}
        type="button"
        onClick={() => selectTab(id)}
        className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
          tab === id
            ? "border-[#0a2b66] bg-[#0a2b66] text-white"
            : "border-[#e0e5ef] bg-white text-slate-700 hover:border-primary dark:border-slate-700 dark:bg-[#111c38] dark:text-slate-200"
        }`}
      >
        {tabLabel}
      </button>
    ))}

    {/* More dropdown */}
    <div className="relative">
      <button
        type="button"
        onClick={() => setMoreOpen((prev) => !prev)}
        aria-expanded={moreOpen}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
          activeMore
            ? "border-[#0a2b66] bg-[#0a2b66] text-white"
            : "border-[#e0e5ef] bg-white text-slate-700 dark:border-slate-700 dark:bg-[#111c38] dark:text-slate-200"
        }`}
      >
        More
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${
            moreOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {moreOpen && (
        <div className="absolute left-0 top-12 z-[100] w-72 rounded-[22px] border border-slate-100 bg-white p-3 shadow-[0_15px_35px_rgba(20,35,70,0.12)] dark:border-slate-700 dark:bg-[#111c38]">
          {moreTabs.map(({ id, label: tabLabel }) => (
            <button
              key={id}
              type="button"
              onClick={() => selectTab(id)}
              className={`flex w-full items-center rounded-xl px-4 py-3.5 text-left text-base font-semibold transition-colors ${
                tab === id
                  ? "bg-blue-50 text-[#0a2b66] dark:bg-slate-800 dark:text-white"
                  : "text-[#14213d] hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {tabLabel}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
</div>


      {tab === "overview" && <>
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4 sm:gap-4">
          <Stat title="Needs your action" value="0" note="all clear" icon={Bell} tone="text-amber-500"/>
          <Stat title="Open requirements" value={openCount} note="waiting for responses" icon={ClipboardList}/>
          <Stat title="Responses to review" value={responseCount} note={responseCount ? "compare and choose" : "none yet"} icon={MessageSquare} tone="text-violet-500"/>
          <Stat title="Projects in progress" value={activeCount} note="0 completed" icon={BriefcaseBusiness} tone="text-orange-500"/>
        </div>
        <section className="mt-4 rounded-2xl border border-[#e7eaf2] bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-[#111c38] sm:p-5">
          <h2 className="text-base font-bold">What to do next</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Start here: describe what you need and we will find qualified providers.</p>
          <button onClick={() => setShowPostModal(true)} className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white"><Plus size={14}/> Post a Requirement</button>
        </section>
        <section className="mt-4 rounded-2xl border border-[#e7eaf2] bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-[#111c38] sm:p-5">
          <div className="flex items-center justify-between gap-3"><h2 className="text-base font-bold">My requirements and projects</h2><button onClick={() => selectTab("requirements")} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold dark:border-slate-700">View all</button></div>
          <div className="mt-3">{requirements.length ? requirementList : <p className="text-sm text-slate-500 dark:text-slate-400">Nothing yet. Post your first requirement. It takes about 5 minutes.</p>}</div>
        </section>
      </>}

      {tab === "requirements" && <>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold">My Requirements</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage requirements and review incoming responses.</p></div><button onClick={() => setShowPostModal(true)} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white"><Plus size={16}/> Post a Requirement</button></div>
        <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_210px]"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search requirements..." className={`${field} mt-0 pl-9`}/></div><select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)} className={`${field} mt-0`}><option>All</option>{Object.keys(statusStyles).map((x)=><option key={x}>{x}</option>)}</select></div>
        {requirementList}
      </>}

      {tab === "responses" && <Empty title="No responses to review yet." description="When providers respond to your open requirements, you can compare their approach, pricing and timelines here." action="View my requirements" onAction={() => selectTab("requirements")}/>}
      {tab === "projects" && <Empty title="No active projects yet." description="Once you select a provider, your project workspace and delivery progress will appear here." action="View my requirements" onAction={() => selectTab("requirements")}/>}
      {tab === "messages" && <Empty title="No messages yet." description="Messages with providers and project participants will appear here."/>}
      {tab === "payments" && <Empty title="No payments yet." description="Project transactions, invoices and payment status will be available here."/>}
      {activeMore && <Empty title={`${moreTabs.find(x=>x.id===tab)?.label} will appear here`} description="This client dashboard section is part of the project workflow. Its detailed interactions can be implemented next."/>}
    </div>

    {showPostModal && <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#071735]/65 px-3 py-5 backdrop-blur-sm" onMouseDown={(e)=>{if(e.target===e.currentTarget)setShowPostModal(false);}}>
      <div role="dialog" aria-modal="true" aria-labelledby="post-requirement-title" className="relative max-h-[92vh] w-full max-w-[680px] overflow-y-auto rounded-[24px] bg-white p-5 shadow-2xl dark:border dark:border-slate-700 dark:bg-[#111c38] sm:p-7">
        <button onClick={()=>setShowPostModal(false)} aria-label="Close" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200"><X size={18}/></button>
        <h2 id="post-requirement-title" className="pr-10 text-xl font-bold">Post a Requirement</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Tell us what you need. Add the key details to help identify suitable providers.</p>
        <form onSubmit={submitRequirement} className="mt-5 space-y-4">
          <label className={label}>Requirement title<input required value={form.title} onChange={updateForm("title")} placeholder="e.g. Build a responsive business website" className={field}/></label>
          <label className={label}>Main service category<select required value={form.category} onChange={updateForm("category")} className={field}><option value="">Select a category</option>{["Mobile Apps","Web Development","UI/UX Design","Content Writing","Digital Marketing","Data & Analytics","Data Entry","Consulting & Advisory","Operations & Admin Support","Other"].map((v)=><option key={v}>{v}</option>)}</select></label>
          <label className={label}>Describe your requirement<textarea required rows={4} value={form.description} onChange={updateForm("description")} placeholder="Describe the work, expected outcomes and important details..." className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none focus:border-primary dark:border-slate-600 dark:bg-[#172541] dark:text-white"/></label>
          <div className="grid gap-3 sm:grid-cols-2"><label className={label}>Minimum budget<input type="number" min="0" value={form.minBudget} onChange={updateForm("minBudget")} placeholder="e.g. 500" className={field}/></label><label className={label}>Maximum budget<input type="number" min="0" value={form.maxBudget} onChange={updateForm("maxBudget")} placeholder="e.g. 1500" className={field}/></label></div>
          <div className="grid gap-3 sm:grid-cols-2"><label className={label}>Expected timeline<input value={form.timeline} onChange={updateForm("timeline")} placeholder="e.g. 4–6 weeks" className={field}/></label><label className={label}>Work arrangement<select value={form.location} onChange={updateForm("location")} className={field}><option>Remote</option><option>On-site</option><option>Hybrid</option></select></label></div>
          <label className={label}>Response deadline (optional)<input type="date" value={form.deadline} onChange={updateForm("deadline")} className={field}/></label>
          {formError && <p role="alert" className="text-sm font-semibold text-red-600">{formError}</p>}
          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end"><button type="button" onClick={()=>setShowPostModal(false)} className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold dark:border-slate-600">Cancel</button><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white"><Send size={15}/> Submit Requirement</button></div>
          <p className="text-[11px] text-slate-400">Demo UI: this form stores the requirement in component state only; it is not submitted to Freevance or saved across refreshes.</p>
        </form>
      </div>
    </div>}
  </main>;
}
