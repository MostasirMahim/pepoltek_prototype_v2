"use client";

import { useState } from "react";

const ASSESSMENTS = [
  {
    id: "ASM-881",
    title: "Next.js 15 App Router & Server Actions Mastery",
    category: "Software Tech",
    duration: "45 Mins",
    status: "Completed",
    score: "98%",
    badgeEarned: "App Router Tier 1 Lead",
    date: "Completed Aug 2026",
  },
  {
    id: "ASM-742",
    title: "Distributed Systems & Real-time WebSockets",
    category: "Architecture",
    duration: "60 Mins",
    status: "Completed",
    score: "96%",
    badgeEarned: "System Reliability Pro",
    date: "Completed Aug 2026",
  },
  {
    id: "ASM-920",
    title: "NHS Healthcare Interoperability & FHIR v4",
    category: "Healthcare IT",
    duration: "35 Mins",
    status: "Available",
    score: null,
    badgeEarned: "NHS Clinical Tech Specialist",
    date: "Pending Start",
  },
  {
    id: "ASM-955",
    title: "Cloud Native Kubernetes Pod Scaling",
    category: "DevOps",
    duration: "50 Mins",
    status: "Available",
    score: null,
    badgeEarned: "K8s Pod Lead Certified",
    date: "Pending Start",
  },
];

export default function CandidateAssessmentsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Benchmark Assessments & Badges</h1>
          <p className="text-xs sm:text-sm text-ink-soft">
            Pass live automated coding benchmarks to unlock higher pod rates and priority client matching.
          </p>
        </div>
        <div className="rounded-xl border border-electric/30 bg-electric/10 px-3.5 py-1.5 font-mono text-xs font-bold text-electric">
          2 Badges Active • Top 2% Percentile
        </div>
      </div>

      {/* Grid of Assessments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ASSESSMENTS.map((asm) => (
          <div
            key={asm.id}
            className="rounded-2xl border border-[#bcd6fa] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-electric">{asm.id}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold ${
                    asm.status === "Completed"
                      ? "bg-signal/10 text-signal border border-signal/20"
                      : "bg-canvas text-ink-soft border border-[#bcd6fa]/50"
                  }`}
                >
                  {asm.status}
                </span>
              </div>

              <h2 className="mt-2 font-display text-base font-bold text-ink">{asm.title}</h2>
              <div className="mt-1 flex items-center gap-3 text-xs text-mist font-mono">
                <span>📂 {asm.category}</span>
                <span>⏱ {asm.duration}</span>
              </div>

              <div className="mt-3 rounded-xl border border-[#bcd6fa]/50 bg-canvas/30 p-3 text-xs">
                <span className="font-mono text-[10px] uppercase text-mist">Badge Unlocked:</span>
                <p className="font-display font-semibold text-ink mt-0.5">{asm.badgeEarned}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#bcd6fa]/30 pt-3">
              {asm.score ? (
                <div>
                  <span className="font-mono text-xs text-mist">Score: </span>
                  <strong className="font-mono text-sm font-bold text-signal">{asm.score}</strong>
                </div>
              ) : (
                <span className="text-xs font-mono text-mist">Ready for Sprint Test</span>
              )}

              {asm.status === "Completed" ? (
                <button className="rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3.5 py-1.5 font-display text-xs font-semibold text-ink hover:bg-canvas transition-colors cursor-pointer">
                  View Certificate
                </button>
              ) : (
                <button className="rounded-xl bg-ink px-4 py-1.5 font-display text-xs font-semibold text-white hover:bg-electric transition-colors cursor-pointer shadow-xs">
                  Launch Assessment →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
