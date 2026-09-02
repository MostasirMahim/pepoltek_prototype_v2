"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/main/PageHero";
import {
  Lock,
  CheckCircle,
  Clock,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Database,
  Building2,
} from "@/components/ui/Icons";

const SAMPLE_PIPELINES = [
  {
    id: "pipe-01",
    clientIndustry: "FinTech & Banking Infrastructure",
    role: "Senior Distributed Systems Architect",
    stack: ["Go", "Kubernetes", "Kafka", "PostgreSQL"],
    timezone: "4 hours live overlap with US Eastern",
    compensation: "$95k to $140k / yr (or $65-$95 / hr C2C)",
    matchScore: 96,
    visaRequired: "W2 / C2C / International Remote",
    status: "Active Sprint Hiring",
  },
  {
    id: "pipe-02",
    clientIndustry: "Telehealth & Hospital Networks",
    role: "Full-Stack Health-Tech Engineer",
    stack: ["React", "Node.js", "FHIR / HL7", "HIPAA Vault"],
    timezone: "6 hours live overlap with GMT / London",
    compensation: "$85k to $120k / yr",
    matchScore: 92,
    visaRequired: "Remote / UK DBS Cleared",
    status: "Active Sprint Hiring",
  },
  {
    id: "pipe-03",
    clientIndustry: "Venture-Backed AI Platform",
    role: "Senior RAG & AI Data Engineer",
    stack: ["Python", "pgvector", "LangChain", "FastAPI"],
    timezone: "Full synchronous Pacific / Americas overlap",
    compensation: "$110k to $160k / yr (W2 or C2C)",
    matchScore: 89,
    visaRequired: "OPT / STEM OPT / USC / H-1B Transfer",
    status: "Interviewing Now",
  },
];

export default function ReverseSearchPage() {
  const [authorizedId, setAuthorizedId] = useState<string | null>(null);

  const handleAuthorize = (id: string) => {
    setAuthorizedId(id);
  };

  return (
    <div className="relative min-h-screen bg-canvas">
      {/* Hero Header */}
      <PageHero
        eyebrow="Candidate-First Reverse Search"
        title="Let Top Employers Apply"
        highlightedText="to Hire You"
        description="Stop firing cold resumes into applicant black holes. With Pepoltek Reverse Job Search, your profile stays 100% private while our engine evaluates live enterprise hiring pipelines and notifies you of high-affinity matches."
        stats={[
          {
            value: "0%",
            label: "Public Exposure (FR-061)",
            icon: <Lock size={20} />,
          },
          {
            value: "1-Click",
            label: "Candidate Pitch Consent",
            icon: <CheckCircle size={20} />,
          },
          {
            value: "2 to 7 Days",
            label: "Client Panel Turnaround",
            icon: <Clock size={20} />,
          },
        ]}
        actions={[
          {
            label: "Upload CV to Scan Live",
            href: "/career/upload_cv",
            primary: true,
          },
          {
            label: "Explore Talent Academy",
            href: "/ecosystem/academy",
          },
        ]}
        proofPills={[
          "Zero Public Scraper Indexing",
          "Algorithmic Skill & Timezone Fit",
          "Candidate-First Consent Model",
          "W2 & C2C Verified Budgets",
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        {/* Comparison: Legacy Job Board vs Pepoltek Reverse Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-red-200 bg-white p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-red-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600">
                <X size={12} />
              </span>
              <span>The Legacy Job Board Model</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-ink">Public Profile Exposure & Resume Spreading</h3>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-ink-soft font-normal leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 mt-0.5">
                  <X size={10} />
                </span>
                <span>Your contact info and CV are indexed publicly and scraped by spam agencies.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 mt-0.5">
                  <X size={10} />
                </span>
                <span>You apply to 50+ portals without knowing if real humans will ever review your stack.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 mt-0.5">
                  <X size={10} />
                </span>
                <span>Recruitment latency stretches to 45+ days with zero status feedback.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-signal/40 bg-white p-6 sm:p-8 shadow-xs ring-1 ring-signal/15">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-signal">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-signal/15 text-signal">
                <Check size={12} />
              </span>
              <span>The Pepoltek Reverse Search (FR-061)</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-ink">Guaranteed Zero Exposure & One-Click Pitch</h3>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-ink-soft font-normal leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal mt-0.5">
                  <Check size={11} />
                </span>
                <span>Complete privacy: Your identity remains hidden until you explicitly authorize a pitch.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal mt-0.5">
                  <Check size={11} />
                </span>
                <span>Real-time pipeline scanning against active enterprise budgets and verified sponsors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal mt-0.5">
                  <Check size={11} />
                </span>
                <span>Sprint turnaround: Direct client interview panel scheduled in 2 to 7 days.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Pipeline Scanner Demonstration (FR-058 & FR-059) */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-electric uppercase tracking-widest font-semibold">
                Live Matching Engine Demonstration
              </div>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink">
                Simulated Live Client Pipelines
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft font-normal">
                How active enterprise pipelines appear in your candidate workspace.
              </p>
            </div>

            <Link
              href="/career/upload_cv"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 font-display text-xs font-bold text-white hover:bg-electric transition-colors"
            >
              <span>Upload CV to Scan Live</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            {SAMPLE_PIPELINES.map((pipe) => {
              const isPitchAuthorized = authorizedId === pipe.id;

              return (
                <div
                  key={pipe.id}
                  className="rounded-3xl border border-[#bcd6fa] bg-white p-6 sm:p-7 shadow-xs hover:border-electric/60 hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-electric/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-electric uppercase">
                        {pipe.status}
                      </span>
                      <span className="font-mono text-xs text-mist">•</span>
                      <span className="font-mono text-xs text-ink-soft">{pipe.clientIndustry}</span>
                      <span className="font-mono text-xs text-mist">•</span>
                      <span className="font-mono text-xs text-signal font-semibold">
                        {pipe.matchScore}% Algorithmic Affinity
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-ink">{pipe.role}</h3>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {pipe.stack.map((s) => (
                        <span key={s} className="rounded bg-canvas px-2.5 py-1 font-mono text-xs text-ink font-medium">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Clean readable Inter text for schedule and compensation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-ink-soft font-normal">
                      <div>
                        Schedule: <strong className="text-ink font-semibold">{pipe.timezone}</strong>
                      </div>
                      <div>
                        Compensation: <strong className="text-ink font-semibold">{pipe.compensation}</strong>
                      </div>
                    </div>
                  </div>

                  {/* One-Click Pitch Action (FR-060) */}
                  <div className="shrink-0 text-left lg:text-right border-t lg:border-t-0 border-[#bcd6fa]/40 pt-4 lg:pt-0">
                    {isPitchAuthorized ? (
                      <div className="rounded-xl border border-signal/40 bg-signal/10 px-5 py-3 text-center">
                        <div className="font-mono text-xs font-bold text-signal flex items-center justify-center gap-1.5">
                          <Check size={14} />
                          <span>Pitch Authorized</span>
                        </div>
                        <div className="text-[11px] font-mono text-ink-soft mt-0.5">
                          Brief sent to hiring manager
                        </div>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          onClick={() => handleAuthorize(pipe.id)}
                          className="w-full sm:w-auto rounded-xl bg-electric px-5 py-3 font-display text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-electric-bright transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                        >
                          <span>Authorize One-Click Pitch</span>
                          <ArrowRight size={14} />
                        </button>
                        <div className="mt-1.5 font-mono text-[10px] text-mist">
                          Requires candidate consent before exposure
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* The 4-Step Reverse Workflow */}
        <div className="mt-16 rounded-3xl border border-[#bcd6fa] bg-ink text-white p-8 sm:p-12 shadow-xl">
          <div className="font-mono text-xs text-electric-bright uppercase tracking-widest font-semibold">
            The Reverse Search Sequence
          </div>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
            From Profile Ingestion to Client Offer
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "01", t: "Ingest & Encrypt", d: "Upload your CV. Data is parsed and anonymized with zero public search engine indexing." },
              { n: "02", t: "Pipeline Scanning", d: "The engine scans active client squads for skill, timezone, and compensation matches." },
              { n: "03", t: "One-Click Pitch", d: "Review the matching brief and authorize disclosure to that specific hiring manager." },
              { n: "04", t: "Interview & Deploy", d: "Complete the technical panel and begin productive sprint deployment in 2 to 7 days." },
            ].map((step) => (
              <div key={step.n} className="border-l-2 border-electric pl-4 py-1">
                <div className="font-mono text-xs text-electric-bright font-bold">{step.n}</div>
                <div className="font-display text-base font-bold text-white mt-1">{step.t}</div>
                <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed font-normal">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
