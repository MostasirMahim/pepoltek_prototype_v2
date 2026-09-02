"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Strength checks
  const hasLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const strengthScore = [hasLength, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (strengthScore < 3 || !passwordsMatch) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    }, 800);
  };

  return (
    <div className="w-full rounded-2xl border border-[#bcd6fa] bg-white/95 p-7 sm:p-9 shadow-[0_12px_40px_-15px_rgba(10,20,40,0.1)] backdrop-blur-md">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-[11px] font-mono font-semibold text-electric uppercase tracking-widest">
          <span>Credential Re-encryption</span>
        </div>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          Set New Password
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-ink-soft">
          Ensure your new password complies with enterprise security policies.
        </p>
      </div>

      {success ? (
        <div className="rounded-xl border border-signal/30 bg-signal/10 p-5 text-center text-signal space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-signal text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="font-display text-sm font-bold text-ink">Password Updated Successfully</div>
          <p className="text-xs text-ink-soft">Redirecting to login portal...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all"
            />
          </div>

          {/* Real-time Strength Meter */}
          <div className="space-y-2 rounded-xl border border-[#bcd6fa]/50 bg-canvas/30 p-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-mist">Password Strength</span>
              <span
                className={`font-bold ${
                  strengthScore <= 1
                    ? "text-red-500"
                    : strengthScore <= 3
                    ? "text-amber-500"
                    : "text-signal"
                }`}
              >
                {strengthScore <= 1 ? "Weak" : strengthScore <= 3 ? "Medium" : "Enterprise Grade"}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`rounded-full transition-all duration-300 ${
                    step <= strengthScore
                      ? strengthScore <= 1
                        ? "bg-red-500"
                        : strengthScore <= 3
                        ? "bg-amber-500"
                        : "bg-signal"
                      : "bg-[#bcd6fa]/40"
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-mono text-ink-soft">
              <div className={`flex items-center gap-1.5 ${hasLength ? "text-signal" : "text-mist"}`}>
                <span>{hasLength ? "✓" : "○"}</span> 8+ Characters
              </div>
              <div className={`flex items-center gap-1.5 ${hasUpper ? "text-signal" : "text-mist"}`}>
                <span>{hasUpper ? "✓" : "○"}</span> Uppercase Letter
              </div>
              <div className={`flex items-center gap-1.5 ${hasNumber ? "text-signal" : "text-mist"}`}>
                <span>{hasNumber ? "✓" : "○"}</span> Number (0-9)
              </div>
              <div className={`flex items-center gap-1.5 ${hasSymbol ? "text-signal" : "text-mist"}`}>
                <span>{hasSymbol ? "✓" : "○"}</span> Special Symbol
              </div>
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:outline-hidden focus:ring-2 transition-all ${
                confirmPassword && !passwordsMatch
                  ? "border-red-400 bg-red-50/20 focus:ring-red-200"
                  : "border-[#bcd6fa] bg-canvas/40 focus:border-electric focus:bg-white focus:ring-electric/20"
              }`}
            />
            {confirmPassword && !passwordsMatch && (
              <p className="mt-1 text-[11px] font-mono text-red-500">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || strengthScore < 3 || !passwordsMatch}
            className="mt-2 w-full rounded-xl bg-ink py-3 font-display text-sm font-semibold text-white shadow-[0_6px_20px_-4px_rgba(10,20,40,0.4)] transition-all hover:bg-electric hover:shadow-[0_8px_24px_-4px_rgba(10,132,255,0.5)] active:scale-[0.99] disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Updating Password...</span>
              </>
            ) : (
              <span>Confirm & Lock Password →</span>
            )}
          </button>
        </form>
      )}

      <div className="mt-6 text-center">
        <Link href="/login" className="text-xs font-medium text-ink-soft hover:text-ink transition-colors">
          ← Cancel and sign in with existing password
        </Link>
      </div>
    </div>
  );
}
