"use client";

import { useState } from "react";

type Sector = "tech" | "healthcare";

interface ParsedResumeData {
  fullName: string;
  email: string;
  phone: string;
  sector: Sector;
  primaryDomain: string;
  experienceLevel: string;
  skills: string;
  visaStatus: string;
  clinicalRegNumber?: string;
  hourlyExpectation: string;
  isMissingData: boolean;
}

export default function CandidateResumeUploadPage() {
  const [sector, setSector] = useState<Sector>("tech");
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setIsParsing(true);

      // Simulate AI Parsing extraction
      setTimeout(() => {
        setIsParsing(false);
        if (sector === "tech") {
          setParsedData({
            fullName: "Alex Morgan",
            email: "alex.morgan@engineer.com",
            phone: "+44 7911 123456",
            sector: "tech",
            primaryDomain: "Full Stack & Distributed Systems",
            experienceLevel: "Lead/Architect",
            skills: "Next.js 15, TypeScript, Node.js, Redis, Kafka, Docker",
            visaStatus: "UK Citizen / Global Remote",
            hourlyExpectation: "$95/hr",
            isMissingData: true, // Missing visa document attachment
          });
        } else {
          setParsedData({
            fullName: "Dr. Rachel Higgins",
            email: "rachel.higgins@clinical.co.uk",
            phone: "+44 7922 654321",
            sector: "healthcare",
            primaryDomain: "Critical Care / ICU Clinical Specialist",
            experienceLevel: "Department Lead/Director",
            skills: "Critical Care, NHS Band 8, Clinical Governance, EMR Interoperability",
            visaStatus: "UK Citizen",
            clinicalRegNumber: "GMC-7492019",
            hourlyExpectation: "£85/hr",
            isMissingData: true,
          });
        }
      }, 1100);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">CV / Resume Intake & AI Parser</h1>
        <p className="text-xs sm:text-sm text-ink-soft">
          Upload your resume in PDF, DOCX, or RTF format. Our AI parser will extract your experience, skills, and certifications into a structured dossier.
        </p>
      </div>

      {/* Step 1: Sector Track Selection */}
      <div className="rounded-2xl border border-[#bcd6fa] bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <h2 className="font-display text-base font-bold text-ink">1. Select Specialization Track</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSector("tech")}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              sector === "tech"
                ? "border-electric bg-electric/5 ring-2 ring-electric/20 text-ink"
                : "border-[#bcd6fa]/70 bg-canvas/30 text-ink-soft hover:bg-canvas"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold text-ink">Software & Engineering Track</span>
              <span className="font-mono text-xs font-bold text-electric">POD SDLC</span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              Frontend, Backend, DevOps/Cloud, AI/ML, Architecture, Cybersecurity.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSector("healthcare")}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              sector === "healthcare"
                ? "border-electric bg-electric/5 ring-2 ring-electric/20 text-ink"
                : "border-[#bcd6fa]/70 bg-canvas/30 text-ink-soft hover:bg-canvas"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold text-ink">Healthcare & Clinical Staffing</span>
              <span className="font-mono text-xs font-bold text-signal">NHS ROTA</span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              Physicians, Band 7/8 Registered Nurses, EMR Operations, Clinical Triage.
            </p>
          </button>
        </div>
      </div>

      {/* Step 2: Upload Area */}
      <div className="rounded-2xl border border-dashed border-[#bcd6fa] bg-white p-8 text-center shadow-xs">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/10 text-electric">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <h3 className="font-display text-base font-bold text-ink">Drag & drop your resume file</h3>
        <p className="mt-1 text-xs text-ink-soft">
          Supported file formats: <strong className="font-mono">PDF, DOCX, RTF</strong> (Max 15MB)
        </p>

        <label className="mt-4 inline-flex items-center justify-center rounded-xl bg-ink px-5 py-2.5 font-display text-xs font-semibold text-white shadow-xs hover:bg-electric transition-colors cursor-pointer">
          <span>Choose File from Computer</span>
          <input
            type="file"
            accept=".pdf,.docx,.rtf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {file && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-canvas px-3 py-1 font-mono text-xs font-semibold text-ink border border-[#bcd6fa]/60">
            <span>📄 {file.name}</span>
            <span className="text-mist">({(file.size / 1024).toFixed(1)} KB)</span>
          </div>
        )}

        {isParsing && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-electric">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>AI Parser extracting entities, tech stack, and experience...</span>
          </div>
        )}
      </div>

      {/* Step 3: Parsed Data Review Form with soft-yellow missing field visual indicator (FR-070) */}
      {parsedData && (
        <form onSubmit={handleFormSubmit} className="rounded-2xl border border-[#bcd6fa] bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#bcd6fa]/40 pb-4">
            <div>
              <h2 className="font-display text-base font-bold text-ink">2. Review & Refine Extracted Data</h2>
              <p className="text-xs text-ink-soft">
                Verify the parsed details before final ingestion into the Pepoltek talent engine.
              </p>
            </div>
            <div className="rounded-md bg-amber-50 border border-amber-300 px-3 py-1 font-mono text-[11px] text-amber-800">
              ⚡ Soft-Yellow = Missing/Action Required
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={parsedData.fullName}
                onChange={(e) => setParsedData({ ...parsedData, fullName: e.target.value })}
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft mb-1">
                Work Email
              </label>
              <input
                type="email"
                required
                value={parsedData.email}
                onChange={(e) => setParsedData({ ...parsedData, email: e.target.value })}
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft mb-1">
                Phone Number
              </label>
              <input
                type="text"
                required
                value={parsedData.phone}
                onChange={(e) => setParsedData({ ...parsedData, phone: e.target.value })}
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft mb-1">
                Experience Tier
              </label>
              <select
                value={parsedData.experienceLevel}
                onChange={(e) => setParsedData({ ...parsedData, experienceLevel: e.target.value })}
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric font-medium"
              >
                {sector === "tech" ? (
                  <>
                    <option>Junior (1-3 yrs)</option>
                    <option>Mid-Level (3-5 yrs)</option>
                    <option>Senior (5-8 yrs)</option>
                    <option>Lead/Architect (8+ yrs)</option>
                  </>
                ) : (
                  <>
                    <option>Clinical Practice (Band 5/6)</option>
                    <option>Advanced Specialist (Band 7)</option>
                    <option>Department Lead/Director (Band 8+)</option>
                  </>
                )}
              </select>
            </div>

            {sector === "healthcare" && (
              <div className="bg-amber-50/50 border border-amber-300 rounded-xl p-3">
                <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-900 mb-1">
                  GMC / NMC Registration Number (Mandatory)
                </label>
                <input
                  type="text"
                  required
                  value={parsedData.clinicalRegNumber || ""}
                  onChange={(e) => setParsedData({ ...parsedData, clinicalRegNumber: e.target.value })}
                  placeholder="e.g. GMC-7492019"
                  className="w-full rounded-lg border border-amber-300 bg-white p-2 text-sm text-ink focus:border-electric"
                />
              </div>
            )}

            <div className="bg-amber-50/50 border border-amber-300 rounded-xl p-3">
              <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-900 mb-1">
                Work Authorization & Visa Status (Action Required)
              </label>
              <select
                value={parsedData.visaStatus}
                onChange={(e) => setParsedData({ ...parsedData, visaStatus: e.target.value })}
                className="w-full rounded-lg border border-amber-300 bg-white p-2 text-sm text-ink focus:border-electric font-medium"
              >
                <option>UK Citizen / Indefinite Leave</option>
                <option>US Citizen / Green Card</option>
                <option>H-1B Visa</option>
                <option>OPT / STEM OPT</option>
                <option>International Remote Contractor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft mb-1">
              Extracted Skills & Tech Taxonomy
            </label>
            <input
              type="text"
              required
              value={parsedData.skills}
              onChange={(e) => setParsedData({ ...parsedData, skills: e.target.value })}
              className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric"
            />
          </div>

          {submitted ? (
            <div className="rounded-xl border border-signal/30 bg-signal/10 p-4 text-center text-signal font-semibold text-xs">
              ✓ Candidate Profile successfully indexed into Talent Matching System!
            </div>
          ) : (
            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="rounded-xl bg-ink px-6 py-2.5 font-display text-xs font-semibold text-white hover:bg-electric transition-colors shadow-xs cursor-pointer"
              >
                Confirm & Sync to Talent Ecosystem →
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
