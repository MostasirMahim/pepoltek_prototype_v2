"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AccountTrack = "candidate-tech" | "candidate-healthcare" | "recruiter";

export default function RegisterPage() {
  const router = useRouter();
  const [track, setTrack] = useState<AccountTrack>("candidate-tech");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyOrTitle, setCompanyOrTitle] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Navigate to verification page with email parameter
      router.push(`/verify?email=${encodeURIComponent(email || "user@example.com")}`);
    }, 700);
  };

  return (
    <div className="w-full rounded-2xl border border-[#bcd6fa] bg-white/95 p-7 sm:p-9 shadow-[0_12px_40px_-15px_rgba(10,20,40,0.1)] backdrop-blur-md">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-[11px] font-mono font-semibold text-signal uppercase tracking-widest">
          <span>Sprint Onboarding</span>
        </div>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          Create Pepoltek Account
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-ink-soft">
          Join pre-vetted talent pods or deploy enterprise engineering teams in 7 days.
        </p>
      </div>

      {/* Account Type Selection */}
      <div className="mb-6">
        <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft mb-2">
          Select Your Primary Track
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setTrack("candidate-tech")}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              track === "candidate-tech"
                ? "border-electric bg-electric/5 ring-2 ring-electric/20 text-ink"
                : "border-[#bcd6fa]/70 bg-canvas/40 text-ink-soft hover:bg-canvas"
            }`}
          >
            <div className="font-display text-xs font-bold text-ink">Software Tech</div>
            <div className="font-mono text-[10px] text-mist">Join Pods</div>
          </button>

          <button
            type="button"
            onClick={() => setTrack("candidate-healthcare")}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              track === "candidate-healthcare"
                ? "border-electric bg-electric/5 ring-2 ring-electric/20 text-ink"
                : "border-[#bcd6fa]/70 bg-canvas/40 text-ink-soft hover:bg-canvas"
            }`}
          >
            <div className="font-display text-xs font-bold text-ink">Healthcare</div>
            <div className="font-mono text-[10px] text-mist">Clinical Rota</div>
          </button>

          <button
            type="button"
            onClick={() => setTrack("recruiter")}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              track === "recruiter"
                ? "border-electric bg-electric/5 ring-2 ring-electric/20 text-ink"
                : "border-[#bcd6fa]/70 bg-canvas/40 text-ink-soft hover:bg-canvas"
            }`}
          >
            <div className="font-display text-xs font-bold text-ink">Hiring Team</div>
            <div className="font-mono text-[10px] text-mist">Deploy Pods</div>
          </button>
        </div>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Dr. Sarah Jenkins / Alex Chen"
            className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all"
          />
        </div>

        <div>
          <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
            Work Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company-or-domain.com"
            className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all"
          />
        </div>

        <div>
          <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
            {track === "recruiter" ? "Organization / Company Name" : "Primary Specialization / Role"}
          </label>
          <input
            type="text"
            required
            value={companyOrTitle}
            onChange={(e) => setCompanyOrTitle(e.target.value)}
            placeholder={
              track === "recruiter"
                ? "e.g. Apex Health Systems / FinTech Pods"
                : track === "candidate-tech"
                ? "e.g. Senior Full-Stack Node/React Architect"
                : "e.g. NHS Registered Critical Care Specialist"
            }
            className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all"
          />
        </div>

        <div>
          <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
            Create Password
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters with numbers & symbols"
            className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all"
          />
        </div>

        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-ink-soft leading-tight">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded-md border-[#bcd6fa] text-electric focus:ring-electric/20 accent-electric shrink-0"
            />
            <span>
              I agree to the{" "}
              <a href="#terms" className="text-electric hover:underline">
                Master Services & Pod Delivery Terms
              </a>{" "}
              and compliance telemetry policies.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !agreeTerms}
          className="mt-2 w-full rounded-xl bg-ink py-3 font-display text-sm font-semibold text-white shadow-[0_6px_20px_-4px_rgba(10,20,40,0.4)] transition-all hover:bg-electric hover:shadow-[0_8px_24px_-4px_rgba(10,132,255,0.5)] active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Generating Secure Profile...</span>
            </>
          ) : (
            <span>Proceed to 2-Factor Verification →</span>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="mt-7 text-center text-xs text-ink-soft">
        Already registered on Pepoltek?{" "}
        <Link href="/login" className="font-semibold text-electric hover:underline transition-all">
          Sign In Here
        </Link>
      </div>
    </div>
  );
}
