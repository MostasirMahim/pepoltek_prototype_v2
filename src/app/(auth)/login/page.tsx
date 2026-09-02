"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Authenticate candidate and route to Candidate Workspace
    setTimeout(() => {
      setLoading(false);
      router.push("/candidate/dashboard");
    }, 600);
  };

  return (
    <div className="w-full rounded-2xl border border-[#bcd6fa] bg-white/95 p-7 sm:p-9 shadow-[0_12px_40px_-15px_rgba(10,20,40,0.1)] backdrop-blur-md">
      {/* Top Badge & Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-[11px] font-mono font-semibold text-electric uppercase tracking-widest">
          <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
          <span>Candidate Talent Access</span>
        </div>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          Candidate Portal
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-ink-soft">
          Sign in to access your profile telemetry, ATS scores, application sprints, and Talent Academy.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
            Candidate Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex.chen@engineer.com"
            className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-electric hover:underline transition-all"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-mist hover:text-ink transition-colors cursor-pointer"
            >
              {showPassword ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-ink-soft">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded-md border-[#bcd6fa] text-electric focus:ring-electric/20 accent-electric"
            />
            <span>Remember this device</span>
          </label>

          <span className="font-mono text-[11px] text-mist">
            Node: <strong className="text-signal font-semibold">Ready</strong>
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-ink py-3 font-display text-sm font-semibold text-white shadow-[0_6px_20px_-4px_rgba(10,20,40,0.4)] transition-all hover:bg-electric hover:shadow-[0_8px_24px_-4px_rgba(10,132,255,0.5)] active:scale-[0.99] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Verifying Profile...</span>
            </>
          ) : (
            <span>Sign In to Candidate Workspace →</span>
          )}
        </button>
      </form>

      {/* Alternative Social SSO */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#bcd6fa]/50" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-mist">Or continue with</span>
        <div className="h-px flex-1 bg-[#bcd6fa]/50" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => router.push("/candidate/dashboard")}
          className="flex items-center justify-center gap-2 rounded-xl border border-[#bcd6fa] bg-white py-2.5 px-3 font-display text-xs font-semibold text-ink shadow-xs transition-all hover:border-electric hover:bg-canvas/30 cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Google SSO</span>
        </button>

        <button
          type="button"
          onClick={() => router.push("/candidate/dashboard")}
          className="flex items-center justify-center gap-2 rounded-xl border border-[#bcd6fa] bg-white py-2.5 px-3 font-display text-xs font-semibold text-ink shadow-xs transition-all hover:border-electric hover:bg-canvas/30 cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>GitHub</span>
        </button>
      </div>

      {/* Switch to Register */}
      <div className="mt-7 text-center text-xs text-ink-soft">
        New candidate?{" "}
        <Link
          href="/register"
          className="font-semibold text-electric hover:underline transition-all"
        >
          Create Candidate Profile & Upload CV
        </Link>
      </div>

      {/* Subtle Client Notice */}
      <div className="mt-4 border-t border-[#bcd6fa]/40 pt-3 text-center">
        <p className="text-[11px] text-mist">
          Looking to hire talent?{" "}
          <Link href="/contact" className="text-electric hover:underline font-medium">
            Request 2 to 7-day deployment
          </Link>
        </p>
      </div>
    </div>
  );
}
