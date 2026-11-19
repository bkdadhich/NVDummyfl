
"use client";

import { useState } from "react";
import { X, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import {
  generateDemoOtp,
  verifyDemoOtp,
  findUserByEmail,
  createUser,
  loginUser,
} from "@/lib/demoAuth";

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
  role = "freelancer",
}) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [providerType, setProviderType] = useState("Individual");
  const [joiningAs, setJoiningAs] = useState(role === "client" ? "reciever" : "provider");
  const [capabilities, setCapabilities] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const resetModal = () => {
    setStep("email");
    setEmail("");
    setOtp("");
    setDemoOtp("");
    setName("");
    setCountry("India");
    setCategory("Web Development");
    setProviderType("Individual");
    setJoiningAs(role === "client" ? "reciever" : "provider");
    setCapabilities("");
    setTermsAccepted(false);
    setError("");
    setLoading(false);
    onClose();
  };

  const handleSendCode = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const code = generateDemoOtp(normalizedEmail);

      // Demo only: show the OTP on screen for local testing.
      setDemoOtp(code);
      setStep("otp");
    } catch {
      setError("Unable to generate the code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the six-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = verifyDemoOtp(email, otp);

      if (!result.success) {
        setError(result.message);
        return;
      }

      const existingUser = findUserByEmail(email);

      if (existingUser) {
        if (existingUser.role !== role) {
          setError(
            `This email is registered as a ${existingUser.role}. Please use the correct login option.`
          );
          return;
        }

        loginUser(existingUser);
        onSuccess?.(existingUser);
        resetModal();
        return;
      }

      // New account: continue to profile setup.
      setStep("profile");
    } catch {
      setError("Unable to verify the code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    setError("");
    setOtp("");
    setLoading(true);

    try {
      const code = generateDemoOtp(email);
      setDemoOtp(code);
    } catch {
      setError("Unable to generate a new code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!country.trim()) {
      setError("Please enter your country.");
      return;
    }
    if (!category) {
      setError("Please select your main service category.");
      return;
    }
    if (!termsAccepted) {
      setError("Please accept the Terms and Privacy Policy to continue.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const accountRole = joiningAs === "provider" ? "freelancer" : "client";

      const user = createUser({
        email,
        name: name.trim(),
        country,
        category,
        role: accountRole,
        joiningAs,
        providerType: joiningAs === "provider" ? providerType : "Client",
        capabilities: capabilities.split(",").map((item) => item.trim()).filter(Boolean),
        termsAccepted,
      });

      loginUser(user);
      onSuccess?.(user);
      resetModal();
    } catch {
      setError("Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setError("");
    setStep(step === "profile" ? "otp" : "email");
  };

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#071735]/75 px-4 py-6 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) resetModal();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className={`relative w-full ${step === "profile" ? "max-h-[92vh] overflow-hidden" : ""} ${step === "otp" ? "max-w-[580px] rounded-[30px] p-7 sm:p-8" : step === "profile" ? "max-w-[580px] rounded-[22px] p-6 sm:p-8" : "max-w-[485px] rounded-[26px] p-6 sm:p-7"} border border-white/70 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-colors duration-300 dark:border-slate-700 dark:bg-[#111c38]`}
      >
        <button
          type="button"
          onClick={resetModal}
          aria-label="Close login popup"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f2f7] text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <X size={17} />
        </button>

        {step === "email" && (
        <div className="pr-8">
          <div className="mb-3 flex items-center gap-2">
            {step !== "email" && (
              <button
                type="button"
                onClick={goBack}
                aria-label="Go back"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
              >
                <ArrowLeft size={16} />
              </button>
            )}

            <h2
              id="login-modal-title"
              className="text-xl font-bold tracking-tight text-[#172747] dark:text-white sm:text-[21px]"
            >
              {step === "email" && "Welcome to Freevance 👋"}
              {step === "otp" && "Verify your email"}
              {step === "profile" && "Complete your profile"}
            </h2>
          </div>

          <p className="text-sm leading-6 text-slate-500 dark:text-slate-300 sm:text-[15px]">
            {step === "email" &&
              "Enter your email. We'll generate a 6-digit demo code for you."}
            {step === "otp" &&
              `Enter the six-digit code generated for ${email}.`}
            {step === "profile" &&
              "A few details will help us set up your freelancer account."}
          </p>
        </div>
        )}

        {step === "email" && (
          <form onSubmit={handleSendCode} className="mt-5">
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm font-bold text-[#26344f] dark:text-slate-200"
            >
              Email
            </label>

            <div className="rounded-[19px] border-2 border-[#ff7777] p-[3px] transition focus-within:border-[#ff3037] focus-within:shadow-[0_0_0_3px_rgba(255,48,55,0.15)]">
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@company.com"
                className="h-[52px] w-full rounded-[14px] border border-[#ff3037] bg-white px-3 text-base text-slate-800 outline-none placeholder:text-slate-400 dark:border-slate-600 dark:bg-[#172541] dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 flex min-h-[49px] w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(252,48,48,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e62929] disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
            >
              <Mail size={17} />
              {loading ? "Generating..." : "Send code"}
            </button>
          </form>
        )}

        {step === "otp" && (
        <div className="relative">
          {/* Heading */}
          <div className="mb-6">
            <h2 id="login-modal-title" className="text-2xl font-bold text-[#14213d]">
              Check your email <span>✉️</span>
            </h2>

            <p className="mt-3 text-base leading-6 text-[#64748b]">
              Code sent to{" "}
              <span className="font-semibold text-[#52617f]">
                {email}
              </span>
              . Valid for 10 minutes.
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-5">
            <label className="mb-2 block text-base font-semibold text-[#454967]">
              6-digit code
            </label>

            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                setError("");
              }}
              placeholder="• • • • • •"
              className="h-[88px] w-full rounded-[20px] border-2 border-[#ff3037] bg-white px-4 text-center text-3xl font-semibold tracking-[12px] text-[#14213d] outline-none ring-4 ring-[#ff3037]/30 transition placeholder:text-[#777] focus:border-[#ff3037] focus:ring-4 focus:ring-[#ff3037]/30"
            />
          </div>

          {/* Verify Button */}
          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={loading}
            className="flex h-[58px] w-full items-center justify-center rounded-full bg-[#ff3037] text-lg font-bold text-white shadow-[0_10px_24px_rgba(255,48,55,0.25)] transition hover:-translate-y-0.5 hover:bg-[#e62930] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Verify
          </button>

          {/* Secondary Actions */}
          <div className="mt-3 flex gap-4">
            <button
              type="button"
              onClick={() => {
                setOtp("");
                setStep("email");
                setError("");
              }}
              className="flex h-[60px] flex-1 items-center justify-center rounded-full border-2 border-[#e2e8f0] bg-white px-3 text-base font-bold text-[#14213d] transition hover:border-[#ff3037] hover:bg-[#fff5f5] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Change email
            </button>

            <button
              type="button"
              onClick={handleResendCode}
              disabled={loading}
              className="flex h-[60px] flex-1 items-center justify-center rounded-full border-2 border-[#e2e8f0] bg-white px-3 text-base font-bold text-[#14213d] transition hover:border-[#ff3037] hover:bg-[#fff5f5] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Resend code
            </button>
          </div>
        </div>
      )}

        {step === "profile" && (
          <form onSubmit={handleCreateAccount} className="mt-1 max-h-[82vh] space-y-3 overflow-y-auto pr-1">
            <div className="sticky top-0 z-10 -mx-1 bg-white px-1 pb-2 pt-1 dark:bg-[#111c38]">
              <h2 className="text-xl font-bold tracking-tight text-[#172747] dark:text-white">Create your account</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Takes about 2 minutes</p>
            </div>

            <div>
              <label htmlFor="profile-name" className="mb-1.5 block text-xs font-semibold text-[#454967] dark:text-slate-200">Full name</label>
              <input id="profile-name" required value={name} onChange={(e) => { setName(e.target.value); setError(""); }} placeholder="Your full name"
                className="h-11 w-full rounded-xl border border-[#dce2ee] bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#ff3037] focus:ring-2 focus:ring-[#ff3037]/20 dark:border-slate-600 dark:bg-[#172541] dark:text-white" />
            </div>

            <div>
              <label htmlFor="joining-as" className="mb-1.5 block text-xs font-semibold text-[#454967] dark:text-slate-200">I am joining as</label>
              <select
                id="joining-as"
                value={joiningAs}
                onChange={(e) => {
                  setJoiningAs(e.target.value);
                  setError("");
                }}
                className="h-11 w-full cursor-pointer appearance-auto rounded-xl border border-[#dce2ee] bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#ff3037] focus:ring-2 focus:ring-[#ff3037]/20 dark:border-slate-600 dark:bg-[#172541] dark:text-white"
              >
                <option value="provider">I provide services (Provider)</option>
                <option value="reciever">I need services (Client / Service Reciever)</option>
              </select>
            </div>

            <div>
              <label htmlFor="profile-country" className="mb-1.5 block text-xs font-semibold text-[#454967] dark:text-slate-200">Country</label>
              <input id="profile-country" required value={country} onChange={(e) => { setCountry(e.target.value); setError(""); }} placeholder="e.g. United States"
                className="h-11 w-full rounded-xl border border-[#dce2ee] bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#ff3037] focus:ring-2 focus:ring-[#ff3037]/20 dark:border-slate-600 dark:bg-[#172541] dark:text-white" />
            </div>

            {joiningAs === "provider" && (
            <div>
              <label htmlFor="provider-type" className="mb-1.5 block text-xs font-semibold text-[#454967] dark:text-slate-200">Provider type</label>
              <select id="provider-type" value={providerType} onChange={(e) => setProviderType(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#dce2ee] bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#ff3037] dark:border-slate-600 dark:bg-[#172541] dark:text-white">
                <option>Individual</option><option>Agency</option><option>Company</option><option>Consultant</option><option>Vendor / Subcontractor</option>
              </select>
            </div>
            )}

            <div>
              <label htmlFor="profile-category" className="mb-1.5 block text-xs font-semibold text-[#454967] dark:text-slate-200">Main service category</label>
              <select id="profile-category" required value={category} onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#dce2ee] bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#ff3037] dark:border-slate-600 dark:bg-[#172541] dark:text-white">
                <option value="">Select a category</option>
                <option>Mobile Apps</option><option>Web Development</option><option>UI/UX Design</option><option>Content Writing</option><option>Digital Marketing</option><option>Data &amp; Analytics</option><option>Data Entry</option><option>Consulting &amp; Advisory</option><option>Operations &amp; Admin Support</option><option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="profile-capabilities" className="mb-1.5 block text-xs font-semibold text-[#454967] dark:text-slate-200">Capabilities / specialties (comma separated)</label>
              <input id="profile-capabilities" value={capabilities} onChange={(e) => setCapabilities(e.target.value)} placeholder="React, Figma, SEO"
                className="h-11 w-full rounded-xl border border-[#dce2ee] bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#ff3037] dark:border-slate-600 dark:bg-[#172541] dark:text-white" />
            </div>

            <label className="flex cursor-pointer items-start gap-2 pt-1 text-xs leading-5 text-[#454967] dark:text-slate-200">
              <input type="checkbox" checked={termsAccepted} onChange={(e) => { setTermsAccepted(e.target.checked); setError(""); }} className="mt-1 h-4 w-4 shrink-0 accent-[#ff3037]" />
              <span>I agree to the <a href="/terms" target="_blank" rel="noreferrer" className="font-semibold text-[#ed1b2f] hover:underline">Terms</a> and <a href="/privacy" target="_blank" rel="noreferrer" className="font-semibold text-[#ed1b2f] hover:underline">Privacy Policy</a>.</span>
            </label>

            <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center rounded-full bg-[#ed1b2f] px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(237,27,47,0.22)] transition hover:-translate-y-0.5 hover:bg-[#d91529] disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        )}

        {error && (
          <p role="alert" className="mt-3 text-xs font-medium text-red-500">
            {error}
          </p>
        )}
      </div>

      {/* Demo OTP notification — positioned above the blurred backdrop */}
      {step === "otp" && demoOtp && (
        <div className="fixed right-5 top-5 z-[100001] rounded-[18px] bg-[#0754b5] px-6 py-4 text-base font-semibold text-white shadow-xl sm:right-5 sm:top-5">
          DEMO MODE — your code is {demoOtp}
        </div>
      )}
    </div>
  );
}
