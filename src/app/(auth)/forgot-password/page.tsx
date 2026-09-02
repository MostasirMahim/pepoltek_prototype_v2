"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full rounded-2xl border border-[#bcd6fa] bg-white/95 p-7 sm:p-9 shadow-[0_12px_40px_-15px_rgba(10,20,40,0.1)] backdrop-blur-md">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-electric/30 bg-electric/10 text-electric">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          Reset Password
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-ink-soft">
          Enter your registered work email to receive a secure recovery magic link.
        </p>
      </div>

      {submitted ? (
        <div className="space-y-5">
          <div className="rounded-xl border border-signal/30 bg-signal/10 p-5 text-center text-signal">
            <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-signal text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="font-display text-sm font-bold text-ink">Recovery Link Dispatched</div>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              We have dispatched a time-sensitive reset link to <strong className="text-ink font-mono">{email}</strong>. Check your inbox and spam folder.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/reset-password"
              className="w-full rounded-xl bg-ink py-2.5 text-center font-display text-xs font-semibold text-white transition-all hover:bg-electric shadow-xs"
            >
              Proceed to New Password Setup (Demo)
            </Link>
            <Link
              href="/login"
              className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 py-2.5 text-center font-display text-xs font-semibold text-ink transition-all hover:bg-white"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
              Account Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@domain.com"
              className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full rounded-xl bg-ink py-3 font-display text-sm font-semibold text-white shadow-[0_6px_20px_-4px_rgba(10,20,40,0.4)] transition-all hover:bg-electric hover:shadow-[0_8px_24px_-4px_rgba(10,132,255,0.5)] active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Dispatching Security Token...</span>
              </>
            ) : (
              <span>Send Recovery Instructions →</span>
            )}
          </button>

          <div className="pt-2 text-center">
            <Link href="/login" className="text-xs font-medium text-ink-soft hover:text-ink transition-colors">
              ← Return to account sign in
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
