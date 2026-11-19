"use client";

import { useState } from "react";
import LoginModal from "@/Component/LoginModal";

export default function PostRequirementPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <main className="min-h-[calc(100vh-320px)] bg-bgWhite px-4 py-14 transition-colors duration-300 dark:bg-slate-950 sm:py-16">
        <div className="mx-auto flex min-h-[220px] w-full max-w-[1545px] flex-col items-center justify-center rounded-[24px] border border-slate-400 bg-white px-5 py-8 text-center shadow-[0_15px_45px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900 sm:min-h-[220px] sm:px-8">

          <h1 className="text-xl font-bold tracking-tight text-black dark:text-white sm:text-xl">
            Sign in to post a requirement
          </h1>

          <p className="mt-3 text-base text-slate-500 dark:text-slate-300 sm:text-lg">
            Log in to continue
          </p>

          <button
            type="button"
            onClick={() => setIsLoginOpen(true)}
            className="btn-style mt-5"
          >
            Log in / Sign up
          </button>
        </div>
      </main>

      {/* Login / Signup Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSendCode={async (email) => {
          console.log("Send OTP to:", email);

          // Connect your email OTP API here.
        }}
      />
    </>
  );
}