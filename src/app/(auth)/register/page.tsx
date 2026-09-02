"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Sector = "technology" | "healthcare";

const TECH_DOMAINS = [
  "Frontend Engineering",
  "Backend Engineering",
  "Full-Stack Engineering",
  "DevOps & Cloud Infrastructure",
  "Data Engineering & AI / MLOps",
  "Systems Architecture",
  "Cybersecurity & DevSecOps",
];

const HEALTHCARE_DOMAINS = [
  "Physicians & Medical Specialists",
  "Registered Nurses (Emergency / ICU)",
  "Medical Technicians & Laboratory",
  "Health-Tech & Med-Tech Engineering",
  "Healthcare Administration & Operations",
  "EMR / EHR Specialists (Epic / Cerner)",
];

const TECH_SENIORITIES = ["Junior", "Mid-Level", "Senior", "Lead / Architect"];
const HEALTH_SENIORITIES = ["Clinical Practice", "Advanced Specialist", "Department Lead / Director"];

const VISA_STATUSES = [
  "US Citizen",
  "Permanent Resident (Green Card)",
  "H-1B (Transfer / Cap-Exempt)",
  "OPT / STEM OPT",
  "International Remote Specialist",
];

const ENGAGEMENT_PREFERENCES = [
  "W2 Contract",
  "Corp-to-Corp (C2C)",
  "1099 Independent",
  "Direct Hire",
];

export default function RegisterPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [sector, setSector] = useState<Sector>("technology");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState(TECH_DOMAINS[0]);
  const [seniority, setSeniority] = useState(TECH_SENIORITIES[1]);
  const [visaStatus, setVisaStatus] = useState(VISA_STATUSES[0]);
  const [engagement, setEngagement] = useState(ENGAGEMENT_PREFERENCES[0]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Soft-yellow field validation tracking (SRS FR-070)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Handle Sector Change
  const handleSectorChange = (s: Sector) => {
    setSector(s);
    if (s === "technology") {
      setDomain(TECH_DOMAINS[0]);
      setSeniority(TECH_SENIORITIES[1]);
    } else {
      setDomain(HEALTHCARE_DOMAINS[0]);
      setSeniority(HEALTH_SENIORITIES[1]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "application/rtf",
      ];
      if (
        validTypes.includes(file.type) ||
        file.name.endsWith(".pdf") ||
        file.name.endsWith(".docx") ||
        file.name.endsWith(".rtf")
      ) {
        setUploadedFile(file);
      } else {
        alert("Please upload a supported format: PDF, DOCX, or RTF.");
      }
    }
  };

  const isFieldMissing = (val: string) => attemptedSubmit && !val.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (!fullName || !email || !password || !agreeTerms) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    }, 700);
  };

  return (
    <div className="w-full rounded-2xl border border-[#bcd6fa] bg-white/95 p-7 sm:p-9 shadow-[0_12px_40px_-15px_rgba(10,20,40,0.1)] backdrop-blur-md">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-[11px] font-mono font-semibold text-electric uppercase tracking-widest">
          <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
          <span>Talent Onboarding Node</span>
        </div>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          Candidate Registration
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-ink-soft">
          Create your profile, unlock AI telemetry scoring, and join pre-vetted project pods.
        </p>
      </div>

      {/* Sector Selection (SRS FR-062) */}
      <div className="mb-6">
        <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft mb-2">
          Select Your Primary Workforce Track
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleSectorChange("technology")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              sector === "technology"
                ? "border-electric bg-electric/5 ring-2 ring-electric/20 text-ink"
                : "border-[#bcd6fa]/70 bg-canvas/40 text-ink-soft hover:bg-canvas"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-bold text-ink">Technology & SDLC</span>
              <span className="text-base">💻</span>
            </div>
            <div className="font-mono text-[10px] text-mist mt-0.5">Software, Cloud & AI</div>
          </button>

          <button
            type="button"
            onClick={() => handleSectorChange("healthcare")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              sector === "healthcare"
                ? "border-teal-500 bg-teal-50/50 ring-2 ring-teal-500/20 text-ink"
                : "border-[#bcd6fa]/70 bg-canvas/40 text-ink-soft hover:bg-canvas"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-bold text-ink">Healthcare & Clinical</span>
              <span className="text-base">🏥</span>
            </div>
            <div className="font-mono text-[10px] text-mist mt-0.5">Clinical, EMR & Nursing</div>
          </button>
        </div>
      </div>

      {/* Optional CV Upload Fast-Track (SRS FR-067 & FR-068) */}
      <div className="mb-6 rounded-xl border border-dashed border-[#bcd6fa] bg-canvas/30 p-3.5 text-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.docx,.rtf"
          className="hidden"
        />
        {uploadedFile ? (
          <div className="flex items-center justify-between rounded-lg border border-signal/30 bg-signal/10 px-3 py-2 text-xs">
            <div className="flex items-center gap-2 text-ink font-medium truncate">
              <svg className="h-4 w-4 text-signal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate">{uploadedFile.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setUploadedFile(null)}
              className="text-xs text-red-500 hover:underline font-mono ml-2 shrink-0 cursor-pointer"
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xs font-medium text-ink">
              Fast-track with resume upload (Optional)
            </p>
            <p className="text-[11px] text-mist mt-0.5">
              Supports PDF, DOCX, or RTF for instant AI parsing
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-[#bcd6fa] bg-white px-3 py-1.5 font-display text-xs font-semibold text-electric shadow-2xs hover:bg-canvas transition-colors cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Browse CV File</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
            Full Legal Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Alex Chen"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:outline-hidden focus:ring-2 transition-all ${
              isFieldMissing(fullName)
                ? "border-amber-400 bg-amber-50/50 focus:ring-amber-200"
                : "border-[#bcd6fa] bg-canvas/40 focus:border-electric focus:bg-white focus:ring-electric/20"
            }`}
          />
          {isFieldMissing(fullName) && (
            <p className="mt-1 text-[11px] font-mono text-amber-600">
              Please provide your name to generate candidate telemetry.
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
            Candidate Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex.chen@engineer.com"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:outline-hidden focus:ring-2 transition-all ${
              isFieldMissing(email)
                ? "border-amber-400 bg-amber-50/50 focus:ring-amber-200"
                : "border-[#bcd6fa] bg-canvas/40 focus:border-electric focus:bg-white focus:ring-electric/20"
            }`}
          />
          {isFieldMissing(email) && (
            <p className="mt-1 text-[11px] font-mono text-amber-600">
              A valid email address is required for identity verification.
            </p>
          )}
        </div>

        {/* Domain Selection (SRS FR-063 & FR-065) */}
        <div>
          <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
            Primary Specialization / Domain
          </label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all cursor-pointer"
          >
            {(sector === "technology" ? TECH_DOMAINS : HEALTHCARE_DOMAINS).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Seniority & Visa Status Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
              Experience Level
            </label>
            <select
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
              className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all cursor-pointer"
            >
              {(sector === "technology" ? TECH_SENIORITIES : HEALTH_SENIORITIES).map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
              Work Authorization
            </label>
            <select
              value={visaStatus}
              onChange={(e) => setVisaStatus(e.target.value)}
              className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all cursor-pointer"
            >
              {VISA_STATUSES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contract Preference (SRS FR-020) */}
        <div>
          <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
            Preferred Contract Model
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {ENGAGEMENT_PREFERENCES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setEngagement(p)}
                className={`py-2 px-1 rounded-lg border text-center font-mono text-[11px] transition-all cursor-pointer ${
                  engagement === p
                    ? "border-electric bg-electric/10 text-electric font-semibold"
                    : "border-[#bcd6fa]/60 bg-canvas/30 text-ink-soft hover:bg-canvas"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
            Create Password (Min 8 Characters) <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:outline-hidden focus:ring-2 transition-all ${
              isFieldMissing(password)
                ? "border-amber-400 bg-amber-50/50 focus:ring-amber-200"
                : "border-[#bcd6fa] bg-canvas/40 focus:border-electric focus:bg-white focus:ring-electric/20"
            }`}
          />
        </div>

        {/* Terms agreement */}
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
              <a href="#terms" className="text-electric hover:underline font-medium">
                Talent Terms of Service
              </a>{" "}
              and allow Pepoltek to perform confidential profile matching.
            </span>
          </label>
        </div>

        {/* Submit */}
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
              <span>Creating Talent Profile...</span>
            </>
          ) : (
            <span>Create Candidate Profile & Verify →</span>
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
