"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu, X, Sun, Moon, ChevronDown, LayoutDashboard, UserRound,
  Globe, ClipboardCheck, FileText, Bell, LogOut, BriefcaseBusiness,
  Mail, Search
} from "lucide-react";
import freevance from "@/assets/freevance-logo.png";
import freevanceDark from "@/assets/freevance_footer.png";
import LanguageDropdown from "./LanguageDropdown";
import LoginModal from "@/Component/LoginModal";
import { getCurrentUser, logoutUser } from "@/lib/demoAuth";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Talent", href: "/talents" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  // { label: "Skills", href: "/skills" },
];

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginRole, setLoginRole] = useState("freelancer");
  const [currentUser, setCurrentUser] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

 
useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = savedTheme === "dark" || (!savedTheme && prefersDark);

  setIsDark(dark);
  document.documentElement.classList.toggle("dark", dark);
  setCurrentUser(getCurrentUser());

  const syncSession = () => setCurrentUser(getCurrentUser());

  // Open login modal from other pages
  const handleOpenLogin = (event) => {
    const role = event.detail?.role || "freelancer";

    setLoginRole(role);
    setIsLoginOpen(true);
    setMenuOpen(false);
  };

  window.addEventListener("storage", syncSession);
  window.addEventListener("freevance-auth-change", syncSession);
  window.addEventListener("freevance:open-login", handleOpenLogin);

  return () => {
    window.removeEventListener("storage", syncSession);
    window.removeEventListener("freevance-auth-change", syncSession);
    window.removeEventListener("freevance:open-login", handleOpenLogin);
  };
}, []);


  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const openLogin = (role) => {
    setLoginRole(role);
    setIsLoginOpen(true);
    setMenuOpen(false);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsLoginOpen(false);
    window.dispatchEvent(new Event("freevance-auth-change"));
    router.push(user.role === "client" ? "/client/dashboard" : "/freelancer/dashboard");
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setAccountMenuOpen(false);
    setMenuOpen(false);
    window.dispatchEvent(new Event("freevance-auth-change"));
    router.push("/");
  };

  const initials = (currentUser?.name || currentUser?.email || "U")
    .split(/[ @]/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");

  
const accountLinks = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    action: () =>
      router.push(
        currentUser?.role === "client"
          ? "/client/dashboard"
          : "/freelancer/dashboard"
      ),
  },
  {
    label: "My profile",
    icon: UserRound,
    action: () => router.push("/freelancer/dashboard?tab=profile"),
  },
  {
    label: "Public profile",
    icon: Globe,
    action: () => router.push("/provider-profile"),
  },
  {
    label: "Skill tests",
    icon: ClipboardCheck,
    action: () => router.push("/skills"),
  },
  {
    label: "Terms & policies",
    icon: FileText,
    action: () => router.push("/terms"),
  },
  {
    label: "Notifications",
    icon: Bell,
    action: () => router.push("/freelancer/dashboard?tab=notifications"),
  },
];


  return (
    <header className="sticky top-0 z-[120] h-[72px] border-b border-slate-100 bg-white text-[#1b2437] shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white">
      <nav className="mx-auto flex h-full max-w-[1490px] items-center justify-between px-4 sm:px-6">
        <div className="hidden items-center gap-5 lg:flex xl:gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-md font-medium text-slate-700 transition hover:text-primary dark:text-slate-200">
              {link.label}
            </Link>
          ))}
          {currentUser && (
            <Link href={currentUser.role === "client" ? "/client/dashboard" : "/freelancer/dashboard"} className="text-sm font-bold text-[#0a2b66] hover:text-primary dark:text-white">
              Dashboard
            </Link>
          )}
        </div>

        <Link href="/" aria-label="Freevance home" className="shrink-0">
          <Image src={isDark ? freevanceDark : freevance} alt="Freevance" className="h-16 w-40 object-contain" priority />
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageDropdown />
          <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {currentUser ? (
            <>
              <Link href="/projects" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(252,48,48,.2)] hover:-translate-y-0.5">
                Opportunities
              </Link>
              <div className="relative">
                <button type="button" onClick={() => setAccountMenuOpen((v) => !v)} aria-expanded={accountMenuOpen} className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#123b83] to-primary text-sm font-bold text-white">
                  {initials}
                </button>
                {accountMenuOpen && (
                  <div className="absolute right-0 top-12 z-[100] w-64 rounded-2xl border border-slate-100 bg-white p-3 shadow-2xl dark:border-slate-700 dark:bg-[#111c38]">
                    <div className="border-b border-slate-100 px-3 pb-3 dark:border-slate-700">
                      <p className="font-bold text-slate-900 dark:text-white">{currentUser.name || "Welcome"}</p>
                      <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{currentUser.email}</p>
                    </div>
                    <div className="py-2">
                      {accountLinks.map(({ label, icon: Icon, action }) => (
                        <button key={label} type="button" onClick={() => { action(); setAccountMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
                          <Icon size={17} /> {label}
                        </button>
                      ))}
                      <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-primary hover:bg-red-50 dark:hover:bg-slate-800">
                        <LogOut size={17} /> Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button type="button" onClick={() => openLogin("freelancer")} className="rounded-full border border-primary px-4 py-2.5 text-sm font-semibold text-primary hover:bg-red-50 dark:hover:bg-slate-800">Freelancer Login</button>
              <button type="button" onClick={() => openLogin("client")} className="btn-style">Client Login</button>
            </>
          )}
        </div>

        <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((v) => !v)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden dark:border-slate-700">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full z-[120] w-full 
          border-t border-slate-200 bg-white 
          px-4 pb-5 pt-4 shadow-xl dark:border-slate-800 
          dark:bg-slate-950 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">{link.label}</Link>)}
            {currentUser && <Link href={currentUser.role === "client" ? "/client/dashboard" : "/freelancer/dashboard"} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-bold text-primary hover:bg-slate-100 dark:hover:bg-slate-800">Dashboard</Link>}            
          <div className="mt-2 flex w-full min-w-0 items-center justify-between gap-3 border-t border-slate-200 px-1 pt-4 dark:border-slate-800">
            <div className="relative z-[200] min-w-0 flex-1">
              <LanguageDropdown />
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"
            >
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
          </div>

            {currentUser ? (
             
            <div className="mt-3 grid w-full min-w-0 grid-cols-2 gap-3">
              <Link
                href={
                    currentUser?.role === "client"
                      ? "/client/dashboard"
                      : "/freelancer/dashboard?tab=profile"
                  }
                onClick={() => setMenuOpen(false)}
                className="flex min-w-0 w-full items-center justify-center whitespace-nowrap rounded-full border border-slate-200 px-3 py-3 text-center text-sm font-semibold dark:border-slate-700"
              >
                My Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex min-w-0 w-full items-center justify-center whitespace-nowrap rounded-full bg-primary px-3 py-3 text-sm font-bold text-white"
              >
                Log out
              </button>
            </div>

            ) : (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => openLogin("freelancer")} className="rounded-full border border-primary px-3 py-3 text-sm font-semibold text-primary">Freelancer Login</button>
                <button type="button" onClick={() => openLogin("client")} className="btn-style">Client Login</button>
              </div>
            )}
          </div>
        </div>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} role={loginRole} onSuccess={handleLoginSuccess} />
    </header>
  );
}
