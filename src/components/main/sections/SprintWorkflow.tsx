"use client";

import React, { useState } from "react";
import Link from "next/link";

interface SprintStage {
  num: string;
  days: string;
  name: string;
  short: string;
  sla: string;
  process: string;
  deliverables: string[];
  mockup: {
    title: string;
    candidate?: string;
    score?: string;
    highlights: { label: string; val: string }[];
    statusBadge: string;
  };
}

const SPRINT_STAGES: SprintStage[] = [
  {
    num: "01",
    days: "Day 1",
    name: "Strategic Discovery & Role Alignment",
    short: "Discovery",
    sla: "Turnaround within 12 Hours",
    process:
      "Business Analysts and HR strategists conduct a deep-dive alignment session to map technical stack requirements, clinical credentials, compensation bands, and operational SLAs.",
    deliverables: [
      "Role Taxonomy & Stack Architecture Spec",
      "Global Sourcing Strategy Document",
      "Benchmark Target Profile Matrix",
    ],
    mockup: {
      title: "Role Architecture & Taxonomy Brief",
      highlights: [
        { label: "Target Discipline", val: "Full Stack Systems Engineer" },
        { label: "Core Requirements", val: "Next.js 15, TypeScript, Kafka" },
        { label: "Overlap SLA", val: "Minimum 5h Daily Sync" },
        { label: "Target Start Window", val: "Day 7 Deployment" },
      ],
      statusBadge: "Brief Approved",
    },
  },
  {
    num: "02",
    days: "Days 2 to 3",
    name: "AI Market Mapping & Talent Curation",
    short: "Mapping",
    sla: "Target 50+ Qualified Profiles",
    process:
      "Proprietary AI-HRMS engines execute boolean logic and specialized X-Ray searches across global hubs to surface passive, high-intent professionals matching exact technical and clinical criteria.",
    deliverables: [
      "ATS-Ready Tracking Sheet",
      "Pre-Parsed Sourcing Pipeline (50+ Profiles)",
      "Availability & Timezone Verification Log",
    ],
    mockup: {
      title: "AI Talent Intelligence Pipeline",
      highlights: [
        { label: "Active Profiles Scanned", val: "1,240 Engineers" },
        { label: "Curated Shortlist", val: "54 Qualified Profiles" },
        { label: "Availability Index", val: "100% Verified Live" },
        { label: "Timezone Coverage", val: "APAC / LATAM / EU" },
      ],
      statusBadge: "Pipeline Streamed",
    },
  },
  {
    num: "03",
    days: "Days 4 to 5",
    name: "AI Video Screening & Specialist Hard-Vetting",
    short: "Vetting",
    sla: "100% Specialist Audited",
    process:
      "Candidates complete automated AI video interviewing followed by direct domain specialist evaluations. Software engineers audit code repositories; clinical specialists verify active state licenses.",
    deliverables: [
      "Standardized Evaluation Scorecards",
      "Code Repository & System Design Audit Logs",
      "AI Video Explainer Summaries & Behavioral Ratings",
    ],
    mockup: {
      title: "Candidate Evaluation Scorecard",
      candidate: "Alex Morgan · Senior Systems Architect",
      score: "94 / 100",
      highlights: [
        { label: "Code Quality Benchmark", val: "96 / 100 [Pass]" },
        { label: "System Design Audit", val: "Kafka Backpressure Safe" },
        { label: "AI Video Triage", val: "Verified · 90s Technical Explainer" },
        { label: "Behavioral Score", val: "HEXACO 92% · OCEAN 88%" },
      ],
      statusBadge: "Audit Sealed",
    },
  },
  {
    num: "04",
    days: "Days 6 to 7",
    name: "Panel Interview Orchestration & Feedback",
    short: "Orchestration",
    sla: "Interview Sync within 48 Hours",
    process:
      "Dedicated recruiters coordinate interview calendar sync, provide comprehensive pre-interview candidate briefing decks to your hiring panel, and aggregate feedback in real time.",
    deliverables: [
      "Client Panel Scheduling Deck",
      "Candidate Technical Briefing Dossiers",
      "Real-Time Panel Feedback Aggregation Matrix",
    ],
    mockup: {
      title: "Panel Orchestration & Briefing Dossier",
      highlights: [
        { label: "Panel Round 1", val: "Live Architecture Triage" },
        { label: "Calendar Synchronization", val: "Direct ATS Calendar Sync" },
        { label: "Dossier Delivered", val: "Complete Code & Background Log" },
        { label: "Feedback SLA", val: "Turnaround within 4 Hours" },
      ],
      statusBadge: "Interview Scheduled",
    },
  },
  {
    num: "05",
    days: "Post-Sprint",
    name: "Deployment, Onboarding & 30/60/90 Day Ramp",
    short: "Deployment",
    sla: "Day 7 Specialist Start",
    process:
      "Legal operations finalize engagement agreements (W2, C2C, 1099, or EOR), facilitate remote workstation setup, and execute structured 30, 60, and 90-day retention and performance checkpoints.",
    deliverables: [
      "Fully Executed Service Agreements",
      "Workforce Onboarding SOP Checklist",
      "30 / 60 / 90 Day Milestone Review Protocols",
    ],
    mockup: {
      title: "Ramp & Retention Verification",
      highlights: [
        { label: "Engagement Structure", val: "Turnkey Squad / C2C / EOR" },
        { label: "Day 1 Setup", val: "Repos, Slack, Hardware Ready" },
        { label: "Ramp Milestone 30", val: "First Sprint Delivery Check" },
        { label: "Replacement Warranty", val: "Full 90-Day Guarantee" },
      ],
      statusBadge: "Specialist Active",
    },
  },
];

export default function SprintWorkflow() {
  const [activeStage, setActiveStage] = useState(2); // default to Vetting stage
  const current = SPRINT_STAGES[activeStage];

  return (
    <section
      id="sprint-workflow"
      className="relative w-full bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[850px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.07),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-4 py-1 font-mono text-[10.5px] font-semibold tracking-[0.16em] uppercase text-electric shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
            7-Day RPO Deployment Sprint
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[40px] leading-[1.12]">
            7 Days from Technical Brief to Deployed Specialist
          </h2>

          <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-ink-soft max-w-2xl">
            A transparent 5-stage orchestration workflow powered by AI video screening and domain specialist verification. Frictionless, interactive, and built for rapid enterprise execution.
          </p>
        </div>

        {/* 5-Stage Interactive Tabs Bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {SPRINT_STAGES.map((st, i) => {
            const isActive = activeStage === i;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setActiveStage(i)}
                className={`group flex items-center gap-2.5 rounded-2xl border px-4 py-3 sm:px-5 sm:py-3.5 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-electric bg-white shadow-[0_10px_25px_-6px_rgba(10,132,255,0.3)] ring-1 ring-electric"
                    : "border-[#bcd6fa]/70 bg-white/70 hover:border-electric/50 hover:bg-white text-ink-soft"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-electric text-white shadow-sm"
                      : "bg-canvas text-ink-soft group-hover:bg-electric/10 group-hover:text-electric"
                  }`}
                >
                  {st.num}
                </span>
                <div className="text-left">
                  <div className={`font-display text-xs sm:text-[13px] font-bold ${isActive ? "text-ink" : "text-ink-soft"}`}>
                    {st.short}
                  </div>
                  <div className="font-mono text-[10px] text-mist">
                    {st.days}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Content & Deliverable Mockup Grid */}
        <div className="mt-10 rounded-3xl border border-[#bcd6fa] bg-white/90 p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_-20px_rgba(10,132,255,0.18)] backdrop-blur-md">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left Column: Stage Details & Process Specs (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric font-display text-sm font-extrabold text-white shadow-md">
                    {current.num}
                  </span>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-electric">
                      {current.days} · {current.sla}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-ink leading-snug">
                      {current.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-ink-soft">
                  {current.process}
                </p>

                {/* Stage Deliverables List */}
                <div className="mt-6 space-y-2.5">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-mist">
                    Stage Verified Deliverables
                  </span>
                  {current.deliverables.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-xl border border-[#bcd6fa]/50 bg-canvas/60 px-3.5 py-2 text-xs sm:text-sm font-medium text-ink"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-signal shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Bar & Next Stage Navigator */}
              <div className="mt-8 flex items-center justify-between border-t border-[#bcd6fa]/50 pt-5">
                <span className="font-mono text-xs text-mist">
                  Stage {activeStage + 1} of {SPRINT_STAGES.length}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
                    disabled={activeStage === 0}
                    className="rounded-lg border border-[#bcd6fa] px-3 py-1.5 font-mono text-xs font-semibold text-ink disabled:opacity-30 hover:bg-canvas transition-colors cursor-pointer"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStage((prev) => Math.min(SPRINT_STAGES.length - 1, prev + 1))}
                    disabled={activeStage === SPRINT_STAGES.length - 1}
                    className="rounded-lg bg-electric px-3 py-1.5 font-mono text-xs font-semibold text-white disabled:opacity-30 hover:bg-electric-bright transition-colors cursor-pointer"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Real-Time B2B Deliverable Mockup (6 cols) */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-[#0b1d3a] bg-[#0a1428] p-6 sm:p-7 shadow-[0_24px_60px_-15px_rgba(10,20,40,0.8)] text-white">
                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    <span className="ml-2 font-mono text-xs text-white/50">
                      deliverable_audit_v2.log
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/15 px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-signal">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                    {current.mockup.statusBadge}
                  </span>
                </div>

                {/* Mockup Body */}
                <div className="mt-5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-electric-bright">
                    Stage Deliverable Snapshot
                  </span>
                  <h4 className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
                    {current.mockup.title}
                  </h4>

                  {current.mockup.candidate && (
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-white/5 p-2.5 border border-white/10">
                      <span className="font-sans text-xs text-white/80">
                        {current.mockup.candidate}
                      </span>
                      {current.mockup.score && (
                        <span className="font-mono text-xs font-bold text-signal bg-signal/15 px-2 py-0.5 rounded">
                          {current.mockup.score}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Highlights Grid */}
                  <div className="mt-4 space-y-2.5">
                    {current.mockup.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs"
                      >
                        <span className="font-mono text-white/50">{h.label}</span>
                        <span className="font-mono font-semibold text-white">{h.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Terminal Benchmark Badge */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono text-white/60">
                    <span>SLA Verified by Dedicated Recruiter</span>
                    <span className="text-electric-bright">100% Audit Sealed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="#calculator-section"
            className="group inline-flex items-center gap-2 rounded-xl bg-electric px-7 py-3.5 font-display text-sm font-bold text-white shadow-[0_10px_25px_-5px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright"
          >
            Start Your 7-Day Sprint
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/80 px-6 py-3.5 font-display text-sm font-semibold text-[#0a1428] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:text-electric"
          >
            Schedule Briefing Call
          </Link>
        </div>
      </div>
    </section>
  );
}
