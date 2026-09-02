"use client";

import Link from "next/link";

const RECENT_PLATFORM_EVENTS = [
  {
    time: "2 mins ago",
    type: "POD_DEPLOYED",
    text: "Pod #842 (FinTech Ledger) marked active by Client: Global Capital Markets",
    tag: "Deployment",
  },
  {
    time: "14 mins ago",
    type: "COMPLIANCE_APPROVED",
    text: "Dr. Rachel Higgins DBS & GMC enhanced registration re-verified automatically",
    tag: "Compliance",
  },
  {
    time: "45 mins ago",
    type: "ESCROW_FUNDED",
    text: "Apex Health Systems deposited $48,500 into Sprint Escrow Vault",
    tag: "Finance",
  },
  {
    time: "1 hour ago",
    type: "CANDIDATE_ONBOARDED",
    text: "Alex Morgan completed Next.js 15 Benchmark with 98% percentile score",
    tag: "Talent",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-electric/40 bg-electric/20 px-3 py-0.5 text-[11px] font-mono text-electric-bright">
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
              <span>PEPOLTEK GLOBAL PLATFORM TELEMETRY</span>
            </div>
            <h1 className="mt-2.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Platform Mission Control
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-400">
              Universal oversight for candidate pipelines, enterprise recruiter requisitions, pod SLA performance, and compliance escrow.
            </p>
          </div>

          <div className="flex shrink-0 gap-2.5">
            <Link
              href="/admin/users"
              className="rounded-xl bg-electric px-4 py-2.5 font-display text-xs font-semibold text-white shadow-xs hover:bg-electric-bright transition-all"
            >
              Manage Users & Roles
            </Link>
            <Link
              href="/admin/pods-management"
              className="rounded-xl border border-[#1b2b4d] bg-[#060b14] px-4 py-2.5 font-display text-xs font-semibold text-gray-300 hover:text-white transition-all"
            >
              Global Pod Registry
            </Link>
          </div>
        </div>
      </div>

      {/* Global Platform KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-5 shadow-xs">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-wider">Total Platform Volume</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-white">$1.84M</span>
            <span className="text-xs font-semibold text-signal">+18.4%</span>
          </div>
          <div className="mt-2 text-[11px] text-gray-400">Escrow & Milestone throughput</div>
        </div>

        <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-5 shadow-xs">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-wider">Active Deployed Pods</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-electric">48</span>
            <span className="text-xs font-mono text-gray-400">Pods</span>
          </div>
          <div className="mt-2 text-[11px] text-signal font-semibold">100% SLA compliance</div>
        </div>

        <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-5 shadow-xs">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-wider">Pre-Vetted Talent Pool</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-white">1,240</span>
          </div>
          <div className="mt-2 text-[11px] text-gray-400">740 IT • 500 Healthcare</div>
        </div>

        <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-5 shadow-xs">
          <div className="font-mono text-xs text-gray-400 uppercase tracking-wider">Compliance Health Score</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-signal">99.8%</span>
          </div>
          <div className="mt-2 text-[11px] text-gray-400">Zero active audit flags</div>
        </div>
      </div>

      {/* Split: Sector Balance & Live Platform Events */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sector Balance / Pod Health (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-base font-bold text-white">Sector Allocation & Active Sprints</h2>
                <p className="text-xs text-gray-400">Dual-sector distribution across software engineering and clinical healthcare.</p>
              </div>
              <span className="font-mono text-xs text-electric-bright">48 Total Pods</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-[#1b2b4d] bg-[#060b14] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-white">Enterprise Software Tech</span>
                  <span className="font-mono text-xs font-bold text-electric">58%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#1b2b4d] overflow-hidden">
                  <div className="h-full rounded-full bg-electric w-[58%]" />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-1">
                  <span>28 Active Pods</span>
                  <span>Avg Sprint: 7.0 Days</span>
                </div>
              </div>

              <div className="rounded-xl border border-[#1b2b4d] bg-[#060b14] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-white">Healthcare & Clinical Rotas</span>
                  <span className="font-mono text-xs font-bold text-signal">42%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#1b2b4d] overflow-hidden">
                  <div className="h-full rounded-full bg-signal w-[42%]" />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-1">
                  <span>20 Active Pods</span>
                  <span>100% NHS & DBS Cleared</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Admin Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/admin/users"
              className="rounded-xl border border-[#1b2b4d] bg-[#0a1428] p-4 text-left hover:border-electric transition-colors group"
            >
              <div className="font-display text-xs font-bold text-white group-hover:text-electric transition-colors">
                Role & RBAC Security →
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Configure candidate, recruiter and pod lead permissions.</p>
            </Link>

            <Link
              href="/admin/compliance"
              className="rounded-xl border border-[#1b2b4d] bg-[#0a1428] p-4 text-left hover:border-electric transition-colors group"
            >
              <div className="font-display text-xs font-bold text-white group-hover:text-electric transition-colors">
                Compliance Audits →
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Review DBS, Right-to-work, and GMC verification logs.</p>
            </Link>

            <Link
              href="/admin/finance"
              className="rounded-xl border border-[#1b2b4d] bg-[#0a1428] p-4 text-left hover:border-electric transition-colors group"
            >
              <div className="font-display text-xs font-bold text-white group-hover:text-electric transition-colors">
                Escrow Settlement →
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Release milestone payments and review client margins.</p>
            </Link>
          </div>
        </div>

        {/* Real-time Platform Audit Log (1 col) */}
        <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-white">Live Platform Events</h2>
            <span className="font-mono text-[10px] text-signal font-semibold">STREAM ACTIVE</span>
          </div>

          <div className="space-y-3">
            {RECENT_PLATFORM_EVENTS.map((event, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#1b2b4d] bg-[#060b14] p-3 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#1b2b4d] px-2 py-0.5 font-mono text-[10px] font-bold text-electric-bright">
                    {event.tag}
                  </span>
                  <span className="font-mono text-[10px] text-gray-500">{event.time}</span>
                </div>
                <p className="text-gray-300 text-[11px] pt-1">{event.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
