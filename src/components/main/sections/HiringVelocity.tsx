"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";

/* ---------- 6 Standardized Regional Overlap Rows ---------- */
const REGION_ZONES = [
  {
    name: "North America (Onshore)",
    detail: "US & Canada (PST / MST / CST / EST)",
    start: 13,
    end: 21,
    hours: "8h",
    coverage: "Synchronous 4-6h Overlap",
    badge: "Onshore",
  },
  {
    name: "LATAM (Nearshore)",
    detail: "Mexico, Colombia, Brazil, Argentina",
    start: 12,
    end: 20,
    hours: "8h",
    coverage: "Synchronous 5-7h Overlap",
    badge: "Nearshore",
  },
  {
    name: "UK & Western Europe",
    detail: "United Kingdom (GMT/BST) & Western Europe (CET)",
    start: 8,
    end: 17,
    hours: "9h",
    coverage: "Guaranteed 5-8h Overlap",
    badge: "Onshore / Nearshore",
  },
  {
    name: "CEE & Eastern Europe",
    detail: "Central & Eastern Europe (EET/CEST)",
    start: 7,
    end: 16,
    hours: "9h",
    coverage: "Guaranteed 6-8h Overlap",
    badge: "Nearshore",
  },
  {
    name: "Middle East & GCC Region",
    detail: "UAE, Saudi Arabia, Qatar (GST/AST)",
    start: 5,
    end: 14,
    hours: "9h",
    coverage: "Guaranteed 6-8h Overlap",
    badge: "GCC Delivery",
  },
  {
    name: "South Asia / APAC Hub",
    detail: "Bangladesh (BST), India (IST) & APAC Delivery Pod",
    start: 3,
    end: 19,
    hours: "16h",
    coverage: "24/7 Follow-the-Sun Core",
    badge: "Primary Hub",
  },
];

/* ---------- Master Stack Categories & Tech Tags ---------- */
interface StackCategory {
  id: string;
  name: string;
  tags: string[];
}

const STACK_CATEGORIES: StackCategory[] = [
  {
    id: "fullstack",
    name: "Full Stack Systems",
    tags: ["Next.js 15", "TypeScript", "React.js", "Node.js", "Vue.js", "Python + React"],
  },
  {
    id: "backend",
    name: "Distributed Backend",
    tags: ["Go (Golang)", "Python (FastAPI)", "Java / Spring Boot", "PHP / Laravel", ".NET", "Microservices", "Kafka"],
  },
  {
    id: "frontend",
    name: "Frontend Architecture",
    tags: ["React.js", "Next.js 15", "Vue.js", "TypeScript", "Angular", "Tailwind CSS", "Web Performance"],
  },
  {
    id: "devops",
    name: "Cloud, DevOps & Security",
    tags: ["AWS", "Kubernetes (K8s)", "Docker", "Terraform (IaC)", "CI/CD", "Zero-Trust", "SOC 2"],
  },
  {
    id: "data_ai",
    name: "Database & AI/Data Eng",
    tags: ["PostgreSQL", "Redis", "pgvector (RAG)", "GraphQL", "MongoDB", "Data Engineering"],
  },
  {
    id: "qa",
    name: "Quality Assurance (QA)",
    tags: ["Automation QA (Playwright/Cypress)", "Manual Triage", "Performance & Load Testing"],
  },
  {
    id: "health_it",
    name: "Healthcare IT & Clinical",
    tags: ["NHS Interoperability", "FHIR v4 / HL7", "HIPAA Title II", "Epic / Cerner EMR", "Telehealth"],
  },
  {
    id: "sales_ops",
    name: "Sales, Admin & HR Ops",
    tags: ["B2B Field Sales", "Revenue Ops", "Fractional HR", "Employee SOPs", "KPI Frameworks"],
  },
];

const SENIORITY_TIERS = ["Junior", "Mid-Level", "Senior", "Lead / Architect"] as const;
type Seniority = typeof SENIORITY_TIERS[number];

const SOURCING_REGIONS = [
  { id: "apac", name: "South Asia / APAC Hub", mult: 1.0 },
  { id: "latam_cee", name: "Nearshore (LATAM / CEE)", mult: 1.35 },
  { id: "onshore", name: "Onshore (US / UK / GCC)", mult: 2.1 },
];

/* Base Monthly Rates per Tier for APAC */
const BASE_RATES: Record<Seniority, number> = {
  Junior: 1920,
  "Mid-Level": 4000,
  Senior: 7200,
  "Lead / Architect": 10400,
};

/* Estimated Annual Market Compensation for Agency Placement Fee Computation */
const ANNUAL_MARKET_SALARY: Record<Seniority, number> = {
  Junior: 65000,
  "Mid-Level": 95000,
  Senior: 135000,
  "Lead / Architect": 165000,
};

function formatMoney(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function HiringVelocity() {
  /* State for active stack modules */
  const [selectedStackId, setSelectedStackId] = useState<string>("fullstack");
  const [headcount, setHeadcount] = useState<number>(2);
  const [seniority, setSeniority] = useState<Seniority>("Senior");
  const [regionId, setRegionId] = useState<string>("apac");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Next.js 15",
    "TypeScript",
    "Node.js",
  ]);

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const activeCategory = STACK_CATEGORIES.find((s) => s.id === selectedStackId) || STACK_CATEGORIES[0];
  const activeRegion = SOURCING_REGIONS.find((r) => r.id === regionId) || SOURCING_REGIONS[0];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  /* Financial Calculations */
  const calc = useMemo(() => {
    // Pepoltek monthly cost
    const ratePerSpecialist = BASE_RATES[seniority] * activeRegion.mult;
    const dedicatedSourcerFee = 1280;
    const monthlyDeploymentCost = ratePerSpecialist * headcount + dedicatedSourcerFee;

    // Traditional Agency Placement Fee (20% contingency fee on annual base)
    const annualBaseSalary = ANNUAL_MARKET_SALARY[seniority];
    const traditionalAgencyPlacementFee = annualBaseSalary * 0.20 * headcount;

    // Net upfront savings
    const netFirstMonthSavings = Math.max(0, traditionalAgencyPlacementFee - monthlyDeploymentCost);

    return {
      ratePerSpecialist,
      monthlyDeploymentCost,
      traditionalAgencyPlacementFee,
      netFirstMonthSavings,
    };
  }, [headcount, seniority, activeRegion]);

  const hourTicks = [0, 4, 8, 12, 16, 20, 24];

  return (
    <section
      id="calculator-section"
      className="relative w-full bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.09),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(188,214,250,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(188,214,250,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-4 py-1 font-mono text-[10.5px] font-semibold tracking-[0.16em] uppercase text-electric shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
            24/7 Global Delivery &amp; RPO Cost Engine
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[40px] leading-[1.12]">
            Deploy Locally, Source Globally: Timezone Coverage &amp; RPO Engine
          </h2>

          <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-ink-soft max-w-2xl">
            Guaranteed daily operational overlap across global hubs. Configure your custom squad across stacks, seniority tiers, and regions to compare real-time savings against traditional recruiting agencies.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
          {/* LEFT: 24/7 Global Delivery & Timezone Overlap Engine (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl border border-[#bcd6fa]/80 bg-white/90 p-6 sm:p-7 shadow-[0_20px_50px_-24px_rgba(10,132,255,0.22)] backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#bcd6fa]/50 pb-4">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-electric">
                    Operational Overlap
                  </span>
                  <h3 className="mt-0.5 font-display text-lg font-bold text-ink">
                    24/7 Global Delivery Matrix
                  </h3>
                </div>
                <span className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold text-signal">
                  <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
                  Live Sync
                </span>
              </div>

              {/* 24-Hour Timeline Bar Scale */}
              <div className="mt-5 mb-2 ml-[110px] flex justify-between font-mono text-[10px] text-mist">
                {hourTicks.map((t) => (
                  <span key={t}>{String(t).padStart(2, "0")}h</span>
                ))}
              </div>

              {/* Region Rows */}
              <div className="flex flex-col gap-3">
                {REGION_ZONES.map((zone, idx) => {
                  const leftPct = (zone.start / 24) * 100;
                  const widthPct = ((zone.end - zone.start) / 24) * 100;
                  return (
                    <div key={zone.name} className="flex flex-col gap-1 rounded-xl bg-canvas/60 p-2.5 border border-[#bcd6fa]/40">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-[12.5px] font-bold text-ink">
                          {zone.name}
                        </span>
                        <span className="font-mono text-[9px] font-semibold uppercase text-electric">
                          {zone.coverage}
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-mist truncate">
                        {zone.detail}
                      </div>

                      {/* Overlap Progress Track */}
                      <div className="relative h-6 w-full overflow-hidden rounded-md bg-white border border-[#bcd6fa]/70 mt-1">
                        {/* Hour marker guides */}
                        {hourTicks.slice(1, -1).map((t) => (
                          <span
                            key={t}
                            className="absolute top-0 h-full w-px bg-[#bcd6fa]/30"
                            style={{ left: `${(t / 24) * 100}%` }}
                          />
                        ))}
                        {/* Synchronous Band */}
                        <div
                          className="absolute top-0.5 bottom-0.5 rounded-sm bg-gradient-to-r from-electric to-electric-bright flex items-center justify-center"
                          style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                        >
                          <span className="font-mono text-[9px] font-bold text-white tracking-wider">
                            {zone.hours} live
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Guarantee Card */}
              <div className="mt-6 rounded-xl border border-electric/30 bg-electric/[0.06] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-electric text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display text-[13px] font-bold text-ink">
                      4 to 6 Hours Guaranteed Daily Overlap
                    </h4>
                    <p className="mt-0.5 text-xs text-ink-soft leading-relaxed">
                      Every squad schedule is calibrated to overlap synchronously with your local core business hours for live standups and pull-request triage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Comparison Benchmarks Grid */}
            <div className="rounded-3xl border border-[#bcd6fa]/80 bg-white/90 p-6 shadow-[0_16px_40px_-20px_rgba(10,132,255,0.18)] backdrop-blur-md">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-electric">
                Agency vs. Pepoltek
              </span>
              <h3 className="mt-1 font-display text-lg font-bold text-ink">
                Velocity &amp; Performance Benchmarks
              </h3>

              <div className="mt-4 divide-y divide-[#bcd6fa]/50">
                <div className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-sans text-ink-soft">Average Time-to-Deploy</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="line-through text-mist">45-60 Days</span>
                    <span className="font-bold text-electric">2 to 7 Days</span>
                  </div>
                </div>
                <div className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-sans text-ink-soft">Client HR Hours Reclaimed</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-mist">5-10 hrs</span>
                    <span className="font-bold text-signal">40+ hrs / hire</span>
                  </div>
                </div>
                <div className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-sans text-ink-soft">Placement Fee Model</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="line-through text-mist">20-25% One-Time</span>
                    <span className="font-bold text-electric">Flat Monthly</span>
                  </div>
                </div>
                <div className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-sans text-ink-soft">Technical Vetting Depth</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-mist">Resume Forward</span>
                    <span className="font-bold text-electric">100% Code Audited</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Flexible RPO Squad Builder & Cost Engine (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-3xl border border-[#bcd6fa] bg-gradient-to-b from-white via-[#f7faff] to-[#eef4fd] p-6 sm:p-8 shadow-[0_30px_70px_-25px_rgba(10,132,255,0.3)] backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#bcd6fa]/60 pb-5">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-electric">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                    Modular Calculator
                  </span>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-ink">
                    Configure Your Squad &amp; Sourcing Pod
                  </h3>
                </div>

                <div className="font-mono text-xs text-mist text-right">
                  <span>Engine v2.4</span>
                </div>
              </div>

              {/* 1. Stack Category Selector (Modular Cards) */}
              <div className="mt-6">
                <label className="block font-mono text-[10.5px] font-bold uppercase tracking-wider text-mist mb-2.5">
                  Select Stack Discipline
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {STACK_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedStackId(cat.id);
                        setSelectedTags(cat.tags.slice(0, 3));
                      }}
                      className={`rounded-xl p-3 text-left transition-all cursor-pointer ${
                        selectedStackId === cat.id
                          ? "bg-electric text-white shadow-[0_8px_20px_-6px_rgba(10,132,255,0.6)]"
                          : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric/50 hover:text-ink"
                      }`}
                    >
                      <div className="font-display text-[12px] font-bold leading-tight">
                        {cat.name}
                      </div>
                      <div className={`mt-1 font-mono text-[9px] ${selectedStackId === cat.id ? "text-white/80" : "text-mist"}`}>
                        {cat.tags.length} technologies
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Headcount & Region Controls */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Headcount Stepper */}
                <div className="rounded-2xl border border-[#bcd6fa] bg-white p-4">
                  <span className="block font-mono text-[10.5px] font-bold uppercase tracking-wider text-mist">
                    Headcount Required
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setHeadcount((prev) => Math.max(1, prev - 1))}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#bcd6fa] bg-canvas font-mono text-base font-bold text-ink hover:bg-electric hover:text-white transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-display text-2xl font-extrabold text-ink min-w-[2rem] text-center">
                        {headcount}
                      </span>
                      <button
                        onClick={() => setHeadcount((prev) => Math.min(20, prev + 1))}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#bcd6fa] bg-canvas font-mono text-base font-bold text-ink hover:bg-electric hover:text-white transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-mono text-xs text-mist">
                      {headcount === 1 ? "Specialist" : "Specialists"}
                    </span>
                  </div>
                </div>

                {/* Sourcing Region Selector */}
                <div className="rounded-2xl border border-[#bcd6fa] bg-white p-4">
                  <span className="block font-mono text-[10.5px] font-bold uppercase tracking-wider text-mist">
                    Sourcing Region
                  </span>
                  <select
                    value={regionId}
                    onChange={(e) => setRegionId(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-[#bcd6fa] bg-white px-3 py-2 font-display text-xs sm:text-[13px] font-bold text-ink focus:border-electric focus:outline-none cursor-pointer"
                  >
                    {SOURCING_REGIONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Seniority Tiers */}
              <div className="mt-6">
                <label className="block font-mono text-[10.5px] font-bold uppercase tracking-wider text-mist mb-2.5">
                  Seniority Tier
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SENIORITY_TIERS.map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSeniority(tier)}
                      className={`rounded-xl py-2.5 px-3 font-display text-xs font-bold transition-all cursor-pointer ${
                        seniority === tier
                          ? "bg-electric text-white shadow-[0_6px_16px_-4px_rgba(10,132,255,0.6)]"
                          : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric/50"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Granular Technology Tag Selectors */}
              <div className="mt-6">
                <label className="block font-mono text-[10.5px] font-bold uppercase tracking-wider text-mist mb-2.5">
                  Target Technologies ({selectedTags.length} selected)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {activeCategory.tags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-electric/15 text-electric border border-electric font-semibold"
                            : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric/40"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Real-Time Financial Quote & Savings Box */}
              <div className="mt-8 rounded-2xl border border-electric/40 bg-white p-5 sm:p-6 shadow-[0_16px_40px_-15px_rgba(10,132,255,0.2)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#bcd6fa]/50">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-mist">
                      Traditional Agency Placement Cost
                    </span>
                    <div className="mt-1 font-display text-2xl font-extrabold text-mist line-through">
                      {formatMoney(calc.traditionalAgencyPlacementFee)}
                    </div>
                    <span className="font-mono text-[9.5px] text-mist">
                      One-time 20% contingency fee
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-electric font-bold">
                      Pepoltek Dedicated RPO Cost
                    </span>
                    <div className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-ink">
                      {formatMoney(calc.monthlyDeploymentCost)}
                      <span className="font-mono text-xs font-normal text-mist"> / month</span>
                    </div>
                    <span className="font-mono text-[9.5px] text-signal font-semibold">
                      Includes dedicated recruiter + full compliance
                    </span>
                  </div>
                </div>

                {/* Net Upfront Placement Savings Highlight */}
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-signal/[0.08] border border-signal/30 rounded-xl p-3.5">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-signal">
                      Client Value Benchmark
                    </span>
                    <p className="mt-0.5 text-xs font-semibold text-ink leading-snug">
                      Saves {formatMoney(calc.netFirstMonthSavings)} in upfront contingency fees while cutting time-to-fill from 45 days to 7 days.
                    </p>
                  </div>
                  <span className="rounded-full bg-signal text-white px-2.5 py-1 font-mono text-[10px] font-bold whitespace-nowrap">
                    65% Lower Cost
                  </span>
                </div>

                {/* Action CTA */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-electric px-6 py-3.5 font-display text-sm font-bold text-white shadow-[0_12px_28px_-6px_rgba(10,132,255,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright cursor-pointer"
                  >
                    Generate RPO Proposal &amp; Schedule Review
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Review Modal */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-electric/40 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsQuoteOpen(false)}
              className="absolute top-5 right-5 text-mist hover:text-ink font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <span className="font-mono text-xs font-bold uppercase tracking-wider text-electric">
              Pepoltek Instant Proposal
            </span>
            <h3 className="mt-1 font-display text-xl font-extrabold text-ink">
              Configured Squad Breakdown
            </h3>

            <div className="mt-4 rounded-xl border border-[#bcd6fa] bg-canvas p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-mist">Stack Discipline:</span>
                <span className="font-bold text-ink">{activeCategory.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Headcount:</span>
                <span className="font-bold text-ink">{headcount} Specialists</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Seniority:</span>
                <span className="font-bold text-ink">{seniority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Sourcing Region:</span>
                <span className="font-bold text-ink">{activeRegion.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Selected Technologies:</span>
                <span className="font-bold text-ink truncate max-w-[200px]">{selectedTags.join(", ")}</span>
              </div>
              <div className="border-t border-[#bcd6fa] pt-2 flex justify-between font-bold text-sm">
                <span>Monthly Investment:</span>
                <span className="text-electric">{formatMoney(calc.monthlyDeploymentCost)} / mo</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href="/contact"
                className="w-full text-center rounded-xl bg-electric py-3 font-display text-sm font-bold text-white shadow-md hover:bg-electric-bright transition-colors"
              >
                Schedule Executive Review Call
              </a>
              <button
                onClick={() => setIsQuoteOpen(false)}
                className="w-full rounded-xl border border-[#bcd6fa] py-2.5 font-display text-xs font-semibold text-ink hover:bg-canvas"
              >
                Modify Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
