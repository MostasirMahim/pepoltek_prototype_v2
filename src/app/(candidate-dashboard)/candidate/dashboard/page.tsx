"use client";

import { useState } from "react";
import Link from "next/link";

const ACTIVE_SPRINT_PIPELINES = [
  {
    id: "POD-842",
    title: "FinTech High-Frequency Ledger Pod",
    role: "Lead React & TypeScript Architect",
    client: "Global Capital Markets",
    stage: "Technical Sprint Review",
    stageIndex: 3, // out of 4
    rate: "$95/hr",
    duration: "6 Months Rolling",
    startDate: "Within 4 Days",
    tag: "High Match 99%",
  },
  {
    id: "POD-719",
    title: "Healthcare EHR Compliance Pod",
    role: "Senior Backend Node / FHIR Specialist",
    client: "CarePulse NHS Trust",
    stage: "Client Introduction Call",
    stageIndex: 2,
    rate: "£75/hr",
    duration: "12 Months",
    startDate: "Next Monday",
    tag: "Priority Sprint",
  },
  {
    id: "POD-904",
    title: "Cloud Migration & Kubernetes Pod",
    role: "DevOps & Platform Pod Member",
    client: "AeroTech SaaS",
    stage: "Application Screened",
    stageIndex: 1,
    rate: "$88/hr",
    duration: "3 Months",
    startDate: "Immediate",
    tag: "Instant Deploy",
  },
];

const UPCOMING_INTERVIEWS = [
  {
    pod: "FinTech Ledger Pod",
    date: "Today, 3:30 PM BST",
    type: "Live Architecture Deep-Dive (45 min)",
    interviewer: "Marcus Vance (Pod Lead)",
    status: "Confirmed",
  },
  {
    pod: "CarePulse NHS Rota",
    date: "Tomorrow, 11:00 AM BST",
    type: "Compliance & Security Review",
    interviewer: "Dr. Rachel Higgins (Clinical Director)",
    status: "Link Ready",
  },
];

export default function CandidateDashboardPage() {
  const [filterStage, setFilterStage] = useState("all");

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Welcome & Velocity Status */}
      <div className="relative overflow-hidden rounded-2xl border border-electric/30 bg-gradient-to-r from-ink via-[#0d1f3d] to-ink p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-electric/40 bg-electric/20 px-3 py-0.5 text-[11px] font-mono text-electric-bright">
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
              <span>CANDIDATE SPRINT STATUS: ACTIVE VETTING LEVEL 4</span>
            </div>
            <h1 className="mt-2.5 font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, Alex Morgan
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-300 max-w-xl">
              You are currently shortlisted for <strong className="text-white">3 active enterprise pods</strong> with an average 7-day deployment sprint velocity.
            </p>
          </div>

          <div className="flex shrink-0 gap-2.5">
            <Link
              href="/candidate/applications"
              className="inline-flex items-center justify-center rounded-xl bg-electric px-4 py-2.5 font-display text-xs font-semibold text-white shadow-xs transition-all hover:bg-electric-bright"
            >
              View Active Pods
            </Link>
            <Link
              href="/candidate/profile"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 font-display text-xs font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/20"
            >
              Update Skills
            </Link>
          </div>
        </div>

        {/* Decorative Grid Mesh */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#bcd6fa] bg-white p-5 shadow-xs">
          <div className="font-mono text-xs text-mist uppercase tracking-wider">Skill Match Rate</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-ink">98.4%</span>
            <span className="text-xs font-semibold text-signal">+3.2%</span>
          </div>
          <div className="mt-2 text-[11px] text-ink-soft">Top 2% in Node & TypeScript</div>
        </div>

        <div className="rounded-2xl border border-[#bcd6fa] bg-white p-5 shadow-xs">
          <div className="font-mono text-xs text-mist uppercase tracking-wider">Active Pod Invites</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-ink">3</span>
            <span className="rounded-md bg-electric/10 px-1.5 py-0.5 text-[10px] font-mono font-bold text-electric">Sprint Ready</span>
          </div>
          <div className="mt-2 text-[11px] text-ink-soft">2 Client reviews pending</div>
        </div>

        <div className="rounded-2xl border border-[#bcd6fa] bg-white p-5 shadow-xs">
          <div className="font-mono text-xs text-mist uppercase tracking-wider">Target Pod Rate</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-ink">$85 to $105</span>
            <span className="text-xs text-mist">/ hr</span>
          </div>
          <div className="mt-2 text-[11px] text-ink-soft">Escrow-backed payout</div>
        </div>

        <div className="rounded-2xl border border-[#bcd6fa] bg-white p-5 shadow-xs">
          <div className="font-mono text-xs text-mist uppercase tracking-wider">Compliance Status</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-signal">VERIFIED</span>
          </div>
          <div className="mt-2 text-[11px] text-ink-soft">IP & Background Check Clear</div>
        </div>
      </div>

      {/* Main Split: Active Pod Applications & Upcoming Interviews */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Pod Applications */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Active Pod Deployments</h2>
            <Link
              href="/candidate/applications"
              className="font-mono text-xs font-semibold text-electric hover:underline"
            >
              View Full Pipeline ({ACTIVE_SPRINT_PIPELINES.length}) →
            </Link>
          </div>

          <div className="space-y-3.5">
            {ACTIVE_SPRINT_PIPELINES.map((pod) => (
              <div
                key={pod.id}
                className="group rounded-2xl border border-[#bcd6fa] bg-white p-5 shadow-xs transition-all hover:border-electric/70 hover:shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#bcd6fa]/30 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-electric">{pod.id}</span>
                      <span className="rounded-full bg-signal/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-signal">
                        {pod.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-ink group-hover:text-electric transition-colors">
                      {pod.title}
                    </h3>
                  </div>
                  <div className="text-right sm:text-right">
                    <div className="font-display text-sm font-bold text-ink">{pod.rate}</div>
                    <div className="font-mono text-[10px] text-mist">{pod.duration}</div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-ink-soft">
                    Role: <strong className="text-ink font-medium">{pod.role}</strong> • Client: <span className="font-medium text-ink">{pod.client}</span>
                  </div>
                  <div className="font-mono text-[11px] text-mist">
                    Deployment: <span className="font-semibold text-ink">{pod.startDate}</span>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="mt-4 pt-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-mist mb-1.5">
                    <span>Current Stage: <strong className="text-electric font-bold">{pod.stage}</strong></span>
                    <span>Step {pod.stageIndex} of 4</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-1.5 bg-canvas rounded-full overflow-hidden">
                    {[1, 2, 3, 4].map((s) => (
                      <div
                        key={s}
                        className={`h-full rounded-full ${
                          s <= pod.stageIndex ? "bg-electric" : "bg-[#bcd6fa]/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Upcoming Interviews & Quick Actions */}
        <div className="space-y-6">
          {/* Upcoming Schedule */}
          <div className="rounded-2xl border border-[#bcd6fa] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-ink">Upcoming Sprints & Calls</h2>
              <span className="font-mono text-[10px] uppercase tracking-wider text-mist">Live Schedule</span>
            </div>

            <div className="space-y-3">
              {UPCOMING_INTERVIEWS.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#bcd6fa]/60 bg-canvas/40 p-3.5 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-ink">{item.pod}</span>
                    <span className="rounded-full bg-signal/10 px-2 py-0.5 text-[10px] font-mono font-bold text-signal">
                      {item.status}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-electric font-semibold">{item.date}</div>
                  <div className="text-ink-soft">{item.type}</div>
                  <div className="text-[11px] text-mist">Interviewer: {item.interviewer}</div>
                  <button className="mt-2 w-full rounded-lg bg-ink py-1.5 font-display text-[11px] font-semibold text-white hover:bg-electric transition-colors cursor-pointer">
                    Join Video Pod Room →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Skill Boost */}
          <div className="rounded-2xl border border-electric/30 bg-gradient-to-br from-white to-canvas p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-electric text-white text-xs font-bold">
                ★
              </span>
              <h3 className="font-display text-sm font-bold text-ink">Earn Pod Verification Badge</h3>
            </div>
            <p className="text-xs text-ink-soft">
              Take the 15-minute Next.js 15 & System Architecture live benchmark to fast-track your direct placement.
            </p>
            <Link
              href="/candidate/assessments"
              className="block w-full rounded-xl border border-electric bg-white py-2 text-center font-display text-xs font-semibold text-electric hover:bg-electric hover:text-white transition-all shadow-xs"
            >
              Start Benchmark Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
