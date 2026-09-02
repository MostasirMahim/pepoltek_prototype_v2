"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHero from "@/components/main/PageHero";
import {
  CheckCircle,
  Lock,
  Zap,
  Code2,
  Stethoscope,
  Check,
  ArrowRight,
  FileText,
} from "@/components/ui/Icons";

type Sector = "technology" | "healthcare";

const TECH_FIELDS = [
  "Frontend Engineering",
  "Backend Engineering",
  "Full-Stack Engineering",
  "DevOps & Cloud Infrastructure",
  "Data Engineering & AI / MLOps",
  "Systems Architecture",
  "Cybersecurity & DevSecOps",
];

const HEALTH_FIELDS = [
  "Physicians & Medical Specialists",
  "Registered Nurses (Emergency / ICU)",
  "Medical Technicians & Laboratory",
  "Health-Tech & Med-Tech Engineering",
  "Healthcare Administration & Operations",
  "EMR / EHR Operations (Epic / Cerner)",
];

const SENIORITY_TECH = ["Junior", "Mid-Level", "Senior", "Lead / Architect"];
const SENIORITY_HEALTH = ["Clinical Practice", "Advanced Specialist", "Department Lead / Director"];

const VISA_STATUSES = [
  "US Citizen",
  "Permanent Resident (Green Card)",
  "H-1B (Transfer / Cap-Exempt)",
  "OPT / STEM OPT",
  "International Remote Specialist",
];

const ENGAGEMENT_MODELS = [
  "W2 Contract",
  "Corp-to-Corp (C2C)",
  "1099 Independent",
  "Direct Hire",
];

export default function UploadCvPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sector, setSector] = useState<Sector>("technology");
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);

  // Form Fields (Editable after AI Parsing - FR-069)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [domain, setDomain] = useState(TECH_FIELDS[0]);
  const [seniority, setSeniority] = useState(SENIORITY_TECH[1]);
  const [techStack, setTechStack] = useState("React, Node.js, TypeScript, PostgreSQL");
  const [visa, setVisa] = useState(VISA_STATUSES[0]);
  const [engagement, setEngagement] = useState(ENGAGEMENT_MODELS[0]);
  const [certifications, setCertifications] = useState("");

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSectorChange = (s: Sector) => {
    setSector(s);
    if (s === "technology") {
      setDomain(TECH_FIELDS[0]);
      setSeniority(SENIORITY_TECH[1]);
      setTechStack("React, TypeScript, Node.js, PostgreSQL");
    } else {
      setDomain(HEALTH_FIELDS[0]);
      setSeniority(SENIORITY_HEALTH[1]);
      setCertifications("BLS, ACLS, State Medical License");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setParsing(true);

      // Simulate AI Resume Parsing Pipeline (FR-068)
      setTimeout(() => {
        setParsing(false);
        setParsed(true);
        // Pre-fill extracted fields
        setFullName(selected.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
        setEmail("candidate.telemetry@engineer.com");
        setPhone("+1 (555) 014-9281");
      }, 1400);
    }
  };

  const isMissing = (val: string) => attemptedSubmit && !val.trim();

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (!fullName || !email) {
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push(`/register?email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}`);
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-canvas">
      {/* Hero Header */}
      <PageHero
        eyebrow="AI Resume Intake & Parsing"
        title="Upload Your Candidate CV"
        highlightedText="for Confidential Matching"
        description="Our proprietary AI extracts your skills, validates ATS compatibility, and indexes your profile for confidential matching with zero public exposure."
        stats={[
          {
            value: "99.4%",
            label: "Extraction Accuracy",
            icon: <CheckCircle size={20} />,
          },
          {
            value: "0%",
            label: "Public Profile Exposure",
            icon: <Lock size={20} />,
          },
          {
            value: "< 2 Mins",
            label: "Automated Intake",
            icon: <Zap size={20} />,
          },
        ]}
        proofPills={[
          "ATS Resume Parsing",
          "Zero Public Scraper Indexing",
          "Soft-Yellow Data Alerts (FR-070)",
          "Direct Enterprise Shortlists",
        ]}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        {/* Sector Selection (FR-062) */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-3 w-full max-w-md rounded-2xl border border-[#bcd6fa] bg-white/90 p-1.5 shadow-xs">
            <button
              type="button"
              onClick={() => handleSectorChange("technology")}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 font-display text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                sector === "technology"
                  ? "bg-ink text-white shadow-xs"
                  : "text-ink-soft hover:text-ink hover:bg-canvas"
              }`}
            >
              <Code2 size={16} />
              <span>Technology & SDLC</span>
            </button>
            <button
              type="button"
              onClick={() => handleSectorChange("healthcare")}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 font-display text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                sector === "healthcare"
                  ? "bg-ink text-white shadow-xs"
                  : "text-ink-soft hover:text-ink hover:bg-canvas"
              }`}
            >
              <Stethoscope size={16} />
              <span>Healthcare & Clinical</span>
            </button>
          </div>
        </div>

        {/* Upload Box (FR-067) */}
        <div className="mt-8 rounded-3xl border-2 border-dashed border-[#bcd6fa] bg-white p-8 sm:p-12 text-center shadow-xs">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.docx,.rtf"
            className="hidden"
          />

          {parsing ? (
            <div className="py-6 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-electric/10 text-electric border border-electric/30 animate-pulse">
                <svg className="h-8 w-8 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-ink">AI Parsing In Progress</h3>
              <p className="font-mono text-xs text-electric">
                Extracting contact info, verified technology stack & seniority...
              </p>
            </div>
          ) : file ? (
            <div className="py-4 space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-signal/15 text-signal border border-signal/30">
                <Check size={28} />
              </div>
              <div className="font-display text-base font-bold text-ink">{file.name}</div>
              <p className="font-mono text-xs text-signal">
                AI extraction completed. Review and edit parsed telemetry below.
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-mono text-xs text-ink-soft underline hover:text-electric cursor-pointer"
              >
                Upload different file
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-canvas border border-[#bcd6fa] text-electric">
                <FileText size={32} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                Drag and drop your resume here, or browse files
              </h3>
              <p className="mt-1 text-xs font-mono text-mist">
                Supported formats: PDF, DOCX, RTF (Max size: 25MB)
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 font-display text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-electric transition-colors cursor-pointer"
              >
                <span>Select Resume File</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Inline Editable Form (FR-069) with Soft Yellow Treatment (FR-070) */}
        <div className="mt-10 rounded-3xl border border-[#bcd6fa] bg-white p-6 sm:p-10 shadow-[0_15px_45px_-15px_rgba(10,20,40,0.08)]">
          <div className="border-b border-[#bcd6fa]/50 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="font-display text-xl font-bold text-ink">Candidate Telemetry Review</h2>
              <p className="text-xs sm:text-sm text-ink-soft font-normal">
                Verify or edit parsed values. Fields with soft yellow highlights require completion.
              </p>
            </div>
            {parsed && (
              <span className="rounded-full bg-signal/15 border border-signal/30 px-3 py-1 font-mono text-[11px] font-bold text-signal">
                99.4% Parsing Confidence
              </span>
            )}
          </div>

          <form onSubmit={handleFinalSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:outline-hidden focus:ring-2 transition-all font-sans ${
                    isMissing(fullName)
                      ? "border-amber-400 bg-amber-50/50 focus:ring-amber-200"
                      : "border-[#bcd6fa] bg-canvas/40 focus:border-electric focus:bg-white focus:ring-electric/20"
                  }`}
                />
                {isMissing(fullName) && (
                  <p className="mt-1 text-[11px] font-mono text-amber-600">
                    Mandatory field missing from resume. Please input manually.
                  </p>
                )}
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                  Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.chen@engineer.com"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink placeholder-mist focus:outline-hidden focus:ring-2 transition-all font-sans ${
                    isMissing(email)
                      ? "border-amber-400 bg-amber-50/50 focus:ring-amber-200"
                      : "border-[#bcd6fa] bg-canvas/40 focus:border-electric focus:bg-white focus:ring-electric/20"
                  }`}
                />
                {isMissing(email) && (
                  <p className="mt-1 text-[11px] font-mono text-amber-600">
                    Contact email required for identity and interview alerts.
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 012-3456"
                  className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                  Primary Domain (FR-063)
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all cursor-pointer font-sans"
                >
                  {(sector === "technology" ? TECH_FIELDS : HEALTH_FIELDS).map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                  Seniority Level (FR-066)
                </label>
                <select
                  value={seniority}
                  onChange={(e) => setSeniority(e.target.value)}
                  className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all cursor-pointer font-sans"
                >
                  {(sector === "technology" ? SENIORITY_TECH : SENIORITY_HEALTH).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                  Work Authorization / Visa (FR-021)
                </label>
                <select
                  value={visa}
                  onChange={(e) => setVisa(e.target.value)}
                  className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all cursor-pointer font-sans"
                >
                  {VISA_STATUSES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tech Stack or Clinical Certs */}
            <div>
              <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                {sector === "technology"
                  ? "Parsed Technology Stack (Comma separated)"
                  : "Clinical Licenses & Certifications"}
              </label>
              <input
                type="text"
                value={sector === "technology" ? techStack : certifications}
                onChange={(e) =>
                  sector === "technology" ? setTechStack(e.target.value) : setCertifications(e.target.value)
                }
                placeholder={sector === "technology" ? "React, Node, Go, AWS, Docker" : "BLS, ACLS, State Board"}
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/20 transition-all font-sans"
              />
            </div>

            {/* Contract Preference */}
            <div>
              <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                Contract Preference (FR-020)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ENGAGEMENT_MODELS.map((model) => (
                  <button
                    key={model}
                    type="button"
                    onClick={() => setEngagement(model)}
                    className={`py-2 px-2 rounded-xl border text-center font-mono text-xs transition-all cursor-pointer ${
                      engagement === model
                        ? "border-electric bg-electric/10 text-electric font-bold"
                        : "border-[#bcd6fa]/70 bg-canvas/40 text-ink-soft hover:bg-canvas"
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-mist">
                Confidential matching guaranteed. Zero public exposure.
              </span>

              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto rounded-xl bg-ink px-7 py-3 font-display text-sm font-semibold text-white shadow-[0_6px_20px_-4px_rgba(10,20,40,0.4)] hover:bg-electric hover:shadow-[0_8px_24px_-4px_rgba(10,132,255,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {saving ? (
                  <span>Locking Telemetry...</span>
                ) : (
                  <>
                    <span>Save Profile & Create Account</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
