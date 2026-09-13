"use client";

import React, { useState, useMemo, useEffect } from "react";

/* ==========================================================================
   WIDGET 1: 24/7 GLOBAL DELIVERY & TIMEZONE OVERLAP ENGINE
   Standardized 6 Client & Delivery Regions per Audit Spec Section 2.B
   ========================================================================== */
const REGION_ZONES = [
  {
    name: "North America (Onshore)",
    detail: "United States & Canada (PST / MST / CST / EST)",
    start: 13,
    end: 21,
    hours: "8h",
    coverage: "4 to 6h Guaranteed Overlap",
    badge: "Onshore",
  },
  {
    name: "LATAM (Nearshore)",
    detail: "Mexico, Colombia, Brazil, Argentina",
    start: 12,
    end: 20,
    hours: "8h",
    coverage: "5 to 7h Synchronous Overlap",
    badge: "Nearshore",
  },
  {
    name: "UK & Western Europe (Onshore/Nearshore)",
    detail: "United Kingdom (GMT/BST) & Western Europe (CET/CEST)",
    start: 8,
    end: 17,
    hours: "9h",
    coverage: "5 to 8h Guaranteed Overlap",
    badge: "Onshore / Nearshore",
  },
  {
    name: "CEE & Eastern Europe (Nearshore)",
    detail: "Central & Eastern Europe (EET/CEST)",
    start: 7,
    end: 16,
    hours: "9h",
    coverage: "6 to 8h Guaranteed Overlap",
    badge: "Nearshore",
  },
  {
    name: "Middle East & GCC Region",
    detail: "UAE, Saudi Arabia, Qatar (GST/AST)",
    start: 5,
    end: 14,
    hours: "9h",
    coverage: "6 to 8h Guaranteed Overlap",
    badge: "GCC Delivery",
  },
  {
    name: "Primary Delivery Hub (South Asia / APAC)",
    detail: "Bangladesh (BST), India (IST), & APAC Delivery Pod",
    start: 3,
    end: 19,
    hours: "16h",
    coverage: "24/7 Follow-the-Sun Core",
    badge: "Primary Hub",
  },
];

/* ==========================================================================
   WIDGET 2: EXHAUSTIVE STACK & TECHNOLOGY MASTER LIST
   Directly from Audit Spec Section 3.C
   ========================================================================== */
interface StackCategory {
  id: string;
  name: string;
  shortName: string;
  tags: string[];
}

const ALL_STACK_CATEGORIES: StackCategory[] = [
  {
    id: "fullstack",
    name: "Full Stack Systems",
    shortName: "Full Stack",
    tags: ["Next.js 15", "TypeScript", "React.js", "Node.js", "Vue.js / Nuxt", "Laravel + Vue", "Python + React"],
  },
  {
    id: "backend",
    name: "Distributed Backend",
    shortName: "Backend",
    tags: ["Go (Golang)", "Python (FastAPI/Django)", "PHP / Laravel", "Java / Spring Boot", "Rust", "C# / .NET", "Microservices", "Kafka", "WebSockets"],
  },
  {
    id: "frontend",
    name: "Frontend Architecture",
    shortName: "Frontend",
    tags: ["React.js", "Next.js 15", "Vue.js", "TypeScript", "Angular", "Tailwind CSS", "Web Performance Optimization"],
  },
  {
    id: "devops",
    name: "Cloud, DevOps & Security",
    shortName: "Cloud & DevOps",
    tags: ["AWS", "Cloud Native Kubernetes (K8s)", "Docker", "Terraform (IaC)", "CI/CD Pipelines", "Zero-Trust Architecture", "SOC 2 Compliance"],
  },
  {
    id: "data_ai",
    name: "Database & AI/Data Eng",
    shortName: "Database & AI",
    tags: ["PostgreSQL", "Redis", "pgvector / Vector DBs (RAG Architecture)", "GraphQL", "MongoDB", "MySQL", "Data Engineering"],
  },
  {
    id: "qa",
    name: "Quality Assurance (QA)",
    shortName: "Quality Assurance",
    tags: ["Automation QA (Cypress/Playwright/Selenium)", "Manual Triage", "Performance & Load Testing"],
  },
  {
    id: "health_it",
    name: "Healthcare IT & Clinical",
    shortName: "Healthcare IT",
    tags: ["NHS Clinical Interoperability", "FHIR v4 / HL7", "HIPAA Title II", "PCI DSS", "EMR/EHR (Epic/Cerner)", "Acute Triage"],
  },
  {
    id: "sales_ops",
    name: "Sales, Admin & HR Ops",
    shortName: "Sales & HR Ops",
    tags: ["B2B Field Sales", "Revenue Ops", "Admin Leadership", "Fractional HR", "Employee SOPs", "KPI Frameworks"],
  },
];

/* Categorized Master Technology Library for the Custom Modern Popover */
const TECH_LIBRARY_GROUPS = [
  {
    title: "Frontend & Full Stack",
    items: ["Next.js 15", "React.js", "TypeScript", "Node.js", "Vue.js", "Angular", "Tailwind CSS", "Python + React"],
  },
  {
    title: "Backend & Systems",
    items: ["Go (Golang)", "Python (FastAPI)", "Java / Spring Boot", "PHP / Laravel", "C# / .NET", "Microservices", "Kafka", "WebSockets"],
  },
  {
    title: "Cloud, DevOps & Security",
    items: ["AWS", "Kubernetes (K8s)", "Docker", "Terraform (IaC)", "CI/CD Pipelines", "Zero-Trust", "SOC 2 Compliance"],
  },
  {
    title: "Database & AI/Data Eng",
    items: ["PostgreSQL", "Redis", "pgvector (RAG)", "GraphQL", "Snowflake", "MongoDB", "Data Engineering"],
  },
  {
    title: "Healthcare & Compliance",
    items: ["NHS Interoperability", "FHIR v4 / HL7", "HIPAA Title II", "EMR/EHR (Epic/Cerner)", "PCI DSS", "Clinical Credentialing"],
  },
  {
    title: "Sales, Operations & HR",
    items: ["B2B Field Sales", "Revenue Ops", "Fractional HR", "Employee SOPs", "KPI Frameworks"],
  },
];

/* ==========================================================================
   SENIORITY TIERS & RATE PARAMETERS
   Hardcoded Rates from Audit Spec Section 5.A
   ========================================================================== */
interface SeniorityOption {
  id: string;
  name: string;
  shortName: string;
  marketSalary: number;
  experience: string;
}

const ALL_SENIORITY_TIERS: SeniorityOption[] = [
  { id: "Junior", name: "Junior Specialist", shortName: "Junior", marketSalary: 50000, experience: "1 to 2 yrs exp" },
  { id: "Mid-Level", name: "Mid-Level Engineer", shortName: "Mid-Level", marketSalary: 80000, experience: "3 to 5 yrs exp" },
  { id: "Senior", name: "Senior Specialist", shortName: "Senior", marketSalary: 120000, experience: "5 to 8 yrs exp" },
  { id: "Lead / Architect", name: "Lead / Systems Architect", shortName: "Lead", marketSalary: 150000, experience: "8+ yrs exp" },
  { id: "Staff Engineer", name: "Staff Engineer", shortName: "Staff Eng", marketSalary: 175000, experience: "10+ yrs exp" },
  { id: "Principal Architect", name: "Principal Architect", shortName: "Principal", marketSalary: 200000, experience: "Enterprise Architecture" },
  { id: "Engineering Director", name: "Engineering Director", shortName: "Director", marketSalary: 225000, experience: "Org Tech Leadership" },
  { id: "Fractional CTO", name: "Fractional CTO / Advisor", shortName: "Frac. CTO", marketSalary: 250000, experience: "Executive Technical Strategy" },
];

/* Published Monthly Rates per Region from Section 5.A */
const REGIONAL_RATES: Record<string, Record<string, number>> = {
  apac: {
    Junior: 1920,             // $12/hr
    "Mid-Level": 4000,        // $25/hr
    Senior: 7200,             // $45/hr
    "Lead / Architect": 10400,// $65/hr
    "Staff Engineer": 12500,
    "Principal Architect": 14800,
    "Engineering Director": 17500,
    "Fractional CTO": 19000,
  },
  nearshore: {
    Junior: 3200,             // $20/hr
    "Mid-Level": 5600,        // $35/hr
    Senior: 9600,             // $60/hr
    "Lead / Architect": 13600,// $85/hr
    "Staff Engineer": 15800,
    "Principal Architect": 18200,
    "Engineering Director": 21000,
    "Fractional CTO": 23500,
  },
  onshore: {
    Junior: 5200,
    "Mid-Level": 8800,        // $55/hr
    Senior: 15200,            // $95/hr
    "Lead / Architect": 17600,// $110/hr
    "Staff Engineer": 20500,
    "Principal Architect": 23800,
    "Engineering Director": 27000,
    "Fractional CTO": 30000,
  },
  gcc: {
    Junior: 2800,
    "Mid-Level": 5200,
    Senior: 9200,
    "Lead / Architect": 12800,
    "Staff Engineer": 15000,
    "Principal Architect": 17500,
    "Engineering Director": 20000,
    "Fractional CTO": 22500,
  },
  dach: {
    Junior: 4500,
    "Mid-Level": 7800,
    Senior: 13500,
    "Lead / Architect": 16000,
    "Staff Engineer": 18500,
    "Principal Architect": 21500,
    "Engineering Director": 24500,
    "Fractional CTO": 27500,
  },
  hybrid: {
    Junior: 2400,
    "Mid-Level": 4800,
    Senior: 8400,
    "Lead / Architect": 11800,
    "Staff Engineer": 14000,
    "Principal Architect": 16500,
    "Engineering Director": 19000,
    "Fractional CTO": 21000,
  },
};

/* Sourcing Regions Configuration */
interface SourcingRegion {
  id: string;
  name: string;
  shortName: string;
  overlap: string;
}

const ALL_SOURCING_REGIONS: SourcingRegion[] = [
  { id: "apac", name: "Offshore (South Asia / APAC Hub)", shortName: "APAC Hub", overlap: "16h Overlap, Primary Hub" },
  { id: "nearshore", name: "Nearshore (LATAM / CEE)", shortName: "Nearshore LATAM", overlap: "5 to 7h Synchronous Overlap" },
  { id: "onshore", name: "Onshore (US / UK / GCC)", shortName: "Onshore (US/UK)", overlap: "Full Local Day Coverage" },
  { id: "gcc", name: "Middle East & GCC Region", shortName: "GCC Region", overlap: "6 to 8h Synchronous Overlap" },
  { id: "dach", name: "DACH & Western Europe", shortName: "DACH / West", overlap: "Full European Business Overlap" },
  { id: "hybrid", name: "Global Follow-the-Sun Hybrid", shortName: "Global Hybrid", overlap: "24-Hour Continuous Sprints" },
];

/* Dedicated Virtual Recruiter / Sourcer Add-On from Section 5.A */
const DEDICATED_SOURCER_FEE = 1280; // $8/hr | $1,280/mo

/* Headcount presets */
const HEADCOUNT_PRESETS = [1, 2, 5];
const HEADCOUNT_EXTENDED = [8, 10, 15, 20, 25, 35, 50];

/* Comparison Benchmarks from Audit Spec Section 4 */
const BENCHMARK_METRICS = [
  {
    label: "Average Time-to-Deploy",
    agency: "45 to 60 Days",
    pepoltek: "2 to 7 Days",
    value: "85% Faster Pipeline Velocity",
  },
  {
    label: "Client HR Hours Reclaimed",
    agency: "5 to 10 Hours / Hire",
    pepoltek: "40+ Hours / Hire Saved",
    value: "Full Pre-Screening & Vetting",
  },
  {
    label: "Placement Cost Model",
    agency: "20% to 25% Contingency Fee",
    pepoltek: "Flat Monthly Subscription / Sprint",
    value: "Up to 65% Cost-per-Hire Reduction",
  },
  {
    label: "Candidate Vetting Standard",
    agency: "Standard Resume Forwarding",
    pepoltek: "Hard-Coded Code & HR Audits",
    value: "100% Pre-Screened & Verified",
  },
];

function formatMoney(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

/* ==========================================================================
   COMPACT HARDWARE CALCULATOR FRAME (Clean Titanium Bezel, No Blur Glare)
   ========================================================================== */
function DeviceFrame({ children }: { children: React.ReactNode }) {
  const edgeTicks = Array.from({ length: 9 });
  return (
    <div id="calculator-device-anchor" className="relative w-full">
      {/* Clean, static hardware bezel without blurry or moving bluish shadows */}
      <div
        id="calculator-outer-bezel"
        className="relative rounded-[1.2rem] bg-[linear-gradient(150deg,#f9fbff,#e9f1fb_45%,#f2f6fe)] p-1.5 shadow-[0_12px_28px_-10px_rgba(10,20,40,0.12)] ring-1 ring-[#bcd6fa]/80 transition-all"
      >
        {/* Inner dark casing border */}
        <div className="relative rounded-[1rem] bg-[#0a1428] p-[2.5px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border border-[#1b2a45]">
          {/* Top Titlebar / OS Header */}
          <div className="flex items-center justify-between px-2.5 py-1 bg-[#0a1428]">
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              <span className="h-1.5 w-1.5 rounded-full bg-electric-bright/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            </div>
            <span className="font-mono text-[8px] font-medium tracking-[0.24em] text-white uppercase opacity-90">
              PEPOLTEK · OS RPO CALCULATOR v2.4
            </span>
            <div className="flex items-center gap-1">
              <span className="h-1 w-3.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-electric-bright shadow-[0_0_4px_rgba(56,189,248,0.8)]" />
            </div>
          </div>

          {/* Calculator Screen Surface */}
          <div className="relative overflow-visible rounded-[0.8rem] bg-[linear-gradient(165deg,#fcfdff_0%,#f4f8fe_100%)]">
            {children}
          </div>
        </div>

        {/* Calibrated Edge Ticks on sides */}
        <div className="pointer-events-none absolute -left-[1px] top-1/2 flex -translate-y-1/2 flex-col gap-1.5">
          {edgeTicks.map((_, i) => (
            <span
              key={i}
              className={`h-px ${i % 3 === 0 ? "w-1.5 bg-electric/60" : "w-1 bg-[#9ec1f0]"}`}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-[1px] top-1/2 flex -translate-y-1/2 flex-col items-end gap-1.5">
          {edgeTicks.map((_, i) => (
            <span
              key={i}
              className={`h-px ${i % 3 === 0 ? "w-1.5 bg-electric/60" : "w-1 bg-[#9ec1f0]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN SECTION COMPONENT
   ========================================================================== */
export default function HiringVelocity() {
  /* Active squad configuration state */
  const [selectedStackId, setSelectedStackId] = useState<string>("fullstack");
  const [headcount, setHeadcount] = useState<number>(2);
  const [seniorityId, setSeniorityId] = useState<string>("Senior");
  const [regionId, setRegionId] = useState<string>("apac");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Next.js 15",
    "TypeScript",
    "Node.js",
  ]);

  /* Custom dropdown state (No default OS selects) */
  const [openDropdown, setOpenDropdown] = useState<"stack" | "seniority" | "region" | "headcount" | "tech" | null>(null);

  /* Proposal Modal state */
  const [isProposalOpen, setIsProposalOpen] = useState<boolean>(false);

  /* Close dropdowns and modal on click outside or ESC */
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".custom-dropdown-container")) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setIsProposalOpen(false);
      }
    };
    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const activeCategory = ALL_STACK_CATEGORIES.find((s) => s.id === selectedStackId) || ALL_STACK_CATEGORIES[0];
  const activeSeniority = ALL_SENIORITY_TIERS.find((t) => t.id === seniorityId) || ALL_SENIORITY_TIERS[2];
  const activeRegion = ALL_SOURCING_REGIONS.find((r) => r.id === regionId) || ALL_SOURCING_REGIONS[0];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  /* Mathematical calculation logic directly from Audit Spec Section 5.B */
  const calc = useMemo(() => {
    // 1. Regional monthly rate per role
    const ratesForRegion = REGIONAL_RATES[regionId] || REGIONAL_RATES.apac;
    const ratePerSpecialist = ratesForRegion[seniorityId] || 7200;

    // 2. Pepoltek Dedicated RPO Cost = Sum(Role Headcount * Regional Monthly Rate) + Dedicated Recruiter Fee
    const monthlyDeploymentCost = ratePerSpecialist * headcount + DEDICATED_SOURCER_FEE;

    // 3. Traditional Agency Cost = Sum(Selected Roles Annual Salary * 0.20 Placement Fee)
    const annualBaseSalary = activeSeniority.marketSalary;
    const traditionalAgencyPlacementFee = annualBaseSalary * 0.20 * headcount;

    // 4. Calculated Net Client Savings = Traditional Agency Cost - Pepoltek RPO Cost
    const netFirstMonthSavings = Math.max(0, traditionalAgencyPlacementFee - monthlyDeploymentCost);

    return {
      ratePerSpecialist,
      monthlyDeploymentCost,
      traditionalAgencyPlacementFee,
      netFirstMonthSavings,
    };
  }, [headcount, seniorityId, regionId, activeSeniority]);

  const hourTicks = [0, 4, 8, 12, 16, 20, 24];

  /* Identify active custom/other selections */
  const isOtherStack = !["fullstack", "backend", "frontend"].includes(selectedStackId);
  const isOtherSeniority = !["Junior", "Mid-Level", "Senior"].includes(seniorityId);
  const isOtherRegion = !["apac", "nearshore"].includes(regionId);
  const isOtherHeadcount = !HEADCOUNT_PRESETS.includes(headcount);

  return (
    <section
      id="calculator-section"
      className="relative w-full bg-canvas-alt border-y border-[#bcd6fa]/35 px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      {/* Background Ambience (Clean static grid) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:linear-gradient(rgba(188,214,250,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(188,214,250,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-electric/25 bg-electric/[0.08] px-3.5 py-1 font-sans text-xs font-semibold text-electric shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-electric" />
            24/7 Global Delivery &amp; RPO Cost Engine
          </div>

          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-[36px] leading-[1.15] text-balance">
            Deploy Locally, Source Globally
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-soft max-w-2xl">
            Guaranteed daily operational overlap across global hubs. Configure your custom squad across stacks, seniority tiers, and regions to compare real-time savings against traditional recruiting.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left 7 cols, Right 5 cols (Compact Handheld Calculator Width) */}
        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7 items-start">
          {/* LEFT: 24/7 Global Delivery & Timezone Overlap Engine (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {/* Delivery Matrix Card */}
            <div className="rounded-2xl border border-[#bcd6fa]/70 bg-white/95 p-4 sm:p-5 shadow-[0_20px_50px_-24px_rgba(10,132,255,0.2)] backdrop-blur-md">
              {/* Header with Motive & Purpose */}
              <div className="border-b border-[#bcd6fa]/40 pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-sans text-xs font-semibold text-electric">
                    Operational Overlap Motive
                  </span>
                  <span className="flex items-center gap-1.5 font-sans text-xs font-medium text-signal">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                    Guaranteed Live Collaboration
                  </span>
                </div>
                <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-ink">
                  24/7 Global Delivery &amp; Timezone Overlap Engine
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-ink-soft">
                  <strong className="text-ink font-semibold">Our Purpose:</strong> Working with global talent should never mean waiting 12 hours for answers. Every Pepoltek squad guarantees a minimum 4 to 6 hours of synchronous daily overlap inside your business hours for live standups, instant Slack pairing, and same-day PR triage. While you sleep, our 24/7 delivery core advances codebases around the clock.
                </p>
              </div>

              {/* Visual Legend Key (Readable Regular Font) */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-canvas/70 px-3.5 py-2 border border-[#bcd6fa]/40 font-sans text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-6 rounded bg-gradient-to-r from-electric to-electric-bright shadow-[0_0_8px_rgba(10,132,255,0.4)]" />
                  <span className="text-ink font-medium">Guaranteed Live Synchronous Overlap (4 to 6h Standups &amp; PR Triage)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-6 rounded bg-[#eef4fd] ring-1 ring-inset ring-[#bcd6fa]/80" />
                  <span className="text-mist font-normal">24-Hour Follow-the-Sun Sourcing &amp; Delivery Track</span>
                </div>
              </div>

              {/* Matrix Ruler & Rows with horizontal scroll protection on mobile */}
              <div className="mt-3.5 overflow-x-auto no-scrollbar">
                <div className="min-w-[500px] sm:min-w-0">
                  {/* 24-Hour Timeline Bar Scale - Offset matches left label width */}
                  <div className="mb-2 ml-[165px] sm:ml-[185px] flex justify-between font-sans text-[10px] font-medium text-mist">
                    {hourTicks.map((t) => (
                      <span key={t}>{String(t).padStart(2, "0")}h</span>
                    ))}
                  </div>

                  {/* Region Rows: Left 2 Lines & Coverage Up on Bar Side */}
                  <div className="flex flex-col gap-3">
                    {REGION_ZONES.map((zone, i) => {
                      const leftPct = (zone.start / 24) * 100;
                      const widthPct = ((zone.end - zone.start) / 24) * 100;
                      const countryDetail = zone.detail.includes("(")
                        ? zone.detail.slice(0, zone.detail.indexOf("(")).trim()
                        : zone.detail;
                      const timezoneDetail = zone.detail.includes("(")
                        ? zone.detail.slice(zone.detail.indexOf("("))
                        : "";

                      return (
                        <div
                          key={zone.name}
                          className="flex items-center"
                          style={{ animation: "pt-rise .5s ease both", animationDelay: `${i * 60}ms` }}
                        >
                          {/* Left Column: Exactly 2 Lines (Region Name + Countries) */}
                          <div className="w-[165px] sm:w-[185px] shrink-0 pr-3">
                            <div className="font-sans text-[12.5px] sm:text-[13px] font-bold text-ink leading-tight truncate">
                              {zone.name}
                            </div>
                            <div className="font-sans text-[10.5px] sm:text-[11px] text-mist leading-tight mt-0.5 truncate">
                              {countryDetail}
                            </div>
                          </div>

                          {/* Right Column: Coverage Upper, Timeline Bar Lower */}
                          <div className="flex-1 flex flex-col justify-center">
                            {/* Coverage condition above the bar */}
                            <div className="flex items-center justify-between font-sans text-[10.5px] sm:text-[11px] mb-1 leading-none">
                              <span className="font-semibold text-electric">
                                {zone.coverage}
                              </span>
                              <span className="text-mist text-[10px] font-sans hidden sm:inline">
                                {timezoneDetail ? timezoneDetail.replace(/[()]/g, "") : `${zone.hours} live window`}
                              </span>
                            </div>

                            {/* Timeline Bar Track */}
                            <div className="relative h-6 sm:h-7 w-full overflow-hidden rounded-md bg-[#eef4fd] ring-1 ring-inset ring-[#bcd6fa]/70">
                              {/* Hour marker guide lines */}
                              {hourTicks.slice(1, -1).map((t) => (
                                <span
                                  key={t}
                                  className="absolute top-0 h-full w-px bg-[#bcd6fa]/50"
                                  style={{ left: `${(t / 24) * 100}%` }}
                                />
                              ))}

                              {/* Radiant Active Synchronous Overlap Bar */}
                              <div
                                className="absolute top-1/2 h-5 sm:h-5.5 -translate-y-1/2 rounded-[5px] shadow-[0_0_18px_-2px_rgba(10,132,255,0.45)] overflow-hidden transition-all duration-300"
                                style={{
                                  left: `${leftPct}%`,
                                  width: `${widthPct}%`,
                                  background: "linear-gradient(90deg, var(--color-electric), var(--color-electric-bright))",
                                }}
                              >
                                <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-sans text-[9.5px] sm:text-[10px] font-bold text-white tracking-wide">
                                  {zone.hours} live
                                </span>
                                <span
                                  className="pointer-events-none absolute inset-y-0 w-1/3 bg-white/35 blur-[2px]"
                                  style={{ animation: `pt-sweep 3.4s ${i * 0.4}s ease-in-out infinite` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3 Value Motive Pillars (Making the Goal Instantly Understood by Visitors) */}
              <div className="mt-4 pt-3 border-t border-[#bcd6fa]/40 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-lg bg-canvas/60 p-2 border border-[#bcd6fa]/40">
                  <div className="flex items-center gap-1.5 font-display text-[11px] font-bold text-ink">
                    <span className="h-2 w-2 rounded-full bg-electric" />
                    Live Daily Standups
                  </div>
                  <p className="mt-0.5 text-[10px] text-ink-soft leading-tight">
                    Engineers join your morning standup rituals in real time. Zero waiting.
                  </p>
                </div>

                <div className="rounded-lg bg-canvas/60 p-2 border border-[#bcd6fa]/40">
                  <div className="flex items-center gap-1.5 font-display text-[11px] font-bold text-ink">
                    <span className="h-2 w-2 rounded-full bg-signal" />
                    Zero Lag PR Reviews
                  </div>
                  <p className="mt-0.5 text-[10px] text-ink-soft leading-tight">
                    Pull requests and blockers triaged same day, eliminating 12-hour delays.
                  </p>
                </div>

                <div className="rounded-lg bg-canvas/60 p-2 border border-[#bcd6fa]/40">
                  <div className="flex items-center gap-1.5 font-display text-[11px] font-bold text-ink">
                    <span className="h-2 w-2 rounded-full bg-electric-bright" />
                    Follow-the-Sun Sprints
                  </div>
                  <p className="mt-0.5 text-[10px] text-ink-soft leading-tight">
                    South Asian pods keep shipping code while your onshore team rests.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Actual Hardware Calculator Console (5 cols, Handheld Width) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px]">
              <DeviceFrame>
                <div className="p-3 sm:p-3.5 space-y-2.5">
                  {/* 1. TOP DIGITAL LCD DISPLAY READOUT (Section 5.B Math Output) */}
                  <div className="rounded-lg bg-[#0a1428] p-2 sm:p-2.5 text-white border border-[#1d2d48] shadow-inner">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1">
                      <div className="flex items-center gap-1 font-mono text-[8.5px] text-electric-bright font-bold tracking-wider uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                        PEPOLTEK RPO INVESTMENT
                      </div>
                      <span className="font-mono text-[8.5px] text-white/50">
                        {headcount} {headcount === 1 ? "Role" : "Roles"} · {activeRegion.shortName}
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-baseline justify-between gap-1.5">
                      <div>
                        <div className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-baseline gap-1">
                          {formatMoney(calc.monthlyDeploymentCost)}
                          <span className="font-mono text-[10.5px] font-normal text-white/60">/ mo</span>
                        </div>
                        <div className="font-mono text-[8px] text-electric-bright/90 mt-0.5">
                          Base: {formatMoney(calc.ratePerSpecialist)} + $1,280 sourcer
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono text-[8.5px] text-white/50 line-through">
                          Agency: {formatMoney(calc.traditionalAgencyPlacementFee)}
                        </div>
                        <div className="font-mono text-[10px] font-bold text-signal flex items-center justify-end gap-1 mt-0.5">
                          <span>Saves: {formatMoney(calc.netFirstMonthSavings)}</span>
                          <span className="rounded bg-signal/20 px-1 py-0.2 text-[8px]">65%</span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Output Copy directly from Section 5.B.3 */}
                    <div className="mt-1.5 pt-1 border-t border-white/10 font-mono text-[8.5px] text-white/80 leading-tight flex items-center gap-1">
                      <span className="text-signal font-bold">✓</span>
                      <span className="truncate">
                        Saves {formatMoney(calc.netFirstMonthSavings)} upfront (2 to 7 day deploy).
                      </span>
                    </div>
                  </div>

                  {/* 2. OPTION 1: STACK DISCIPLINE (Takes 2 Rows in a 2x2 Grid so buttons show FULL text) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-mono text-[9px] font-bold uppercase tracking-wider text-mist">
                        1. Stack Discipline
                      </label>
                      <span className="font-mono text-[9px] text-ink font-semibold truncate max-w-[190px]">
                        {activeCategory.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 w-full">
                      {/* Button 1: Full Stack */}
                      <button
                        onClick={() => {
                          setSelectedStackId("fullstack");
                          setSelectedTags(ALL_STACK_CATEGORIES[0].tags.slice(0, 3));
                        }}
                        className={`rounded-md py-1.5 px-2 text-center font-display text-[11px] font-bold transition-all cursor-pointer ${
                          selectedStackId === "fullstack"
                            ? "bg-electric text-white shadow-sm"
                            : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric hover:text-ink"
                        }`}
                      >
                        Full Stack Systems
                      </button>

                      {/* Button 2: Backend */}
                      <button
                        onClick={() => {
                          setSelectedStackId("backend");
                          setSelectedTags(ALL_STACK_CATEGORIES[1].tags.slice(0, 3));
                        }}
                        className={`rounded-md py-1.5 px-2 text-center font-display text-[11px] font-bold transition-all cursor-pointer ${
                          selectedStackId === "backend"
                            ? "bg-electric text-white shadow-sm"
                            : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric hover:text-ink"
                        }`}
                      >
                        Distributed Backend
                      </button>

                      {/* Button 3: Frontend */}
                      <button
                        onClick={() => {
                          setSelectedStackId("frontend");
                          setSelectedTags(ALL_STACK_CATEGORIES[2].tags.slice(0, 3));
                        }}
                        className={`rounded-md py-1.5 px-2 text-center font-display text-[11px] font-bold transition-all cursor-pointer ${
                          selectedStackId === "frontend"
                            ? "bg-electric text-white shadow-sm"
                            : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric hover:text-ink"
                        }`}
                      >
                        Frontend Architecture
                      </button>

                      {/* Slot 4: Modern Popover Selector for Remaining Stacks */}
                      <div className="relative custom-dropdown-container">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(openDropdown === "stack" ? null : "stack");
                          }}
                          className={`w-full h-full rounded-md py-1.5 px-2 text-center font-display text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isOtherStack
                              ? "bg-electric text-white border-electric shadow-sm"
                              : "bg-white text-ink-soft border-[#bcd6fa] hover:border-electric hover:text-ink"
                          }`}
                        >
                          <span className="truncate">
                            {isOtherStack ? activeCategory.shortName : "+ Other Stacks"}
                          </span>
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className={`shrink-0 transition-transform duration-200 ${openDropdown === "stack" ? "rotate-180" : ""}`}
                          >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        {/* Modern Floating Panel */}
                        {openDropdown === "stack" && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-full mt-1.5 right-0 z-50 w-60 rounded-xl bg-white border border-[#bcd6fa] shadow-[0_16px_36px_-10px_rgba(10,20,40,0.22)] p-1.5 backdrop-blur-md"
                          >
                            <div className="px-2 py-1 border-b border-[#bcd6fa]/40 mb-1 font-mono text-[9px] font-bold uppercase tracking-wider text-mist">
                              Select Specialization
                            </div>
                            <div className="max-h-52 overflow-y-auto thin-scrollbar space-y-0.5">
                              {ALL_STACK_CATEGORIES.slice(3).map((cat) => {
                                const isSelected = selectedStackId === cat.id;
                                return (
                                  <button
                                    key={cat.id}
                                    onClick={() => {
                                      setSelectedStackId(cat.id);
                                      setSelectedTags(cat.tags.slice(0, 3));
                                      setOpenDropdown(null);
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                                      isSelected
                                        ? "bg-electric/10 text-electric font-bold"
                                        : "text-ink hover:bg-canvas"
                                    }`}
                                  >
                                    <span>{cat.name}</span>
                                    {isSelected && <span className="text-electric font-bold">✓</span>}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3. OPTION 2: SENIORITY TIER (Takes 2 Rows in a 2x2 Grid so buttons show FULL text) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-mono text-[9px] font-bold uppercase tracking-wider text-mist">
                        2. Seniority Tier
                      </label>
                      <span className="font-mono text-[9px] text-ink font-semibold">
                        {activeSeniority.name} ({activeSeniority.experience})
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 w-full">
                      {/* Button 1: Junior */}
                      <button
                        onClick={() => setSeniorityId("Junior")}
                        className={`rounded-md py-1.5 px-2 text-center font-display text-[11px] font-bold transition-all cursor-pointer ${
                          seniorityId === "Junior"
                            ? "bg-electric text-white shadow-sm"
                            : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric hover:text-ink"
                        }`}
                      >
                        Junior Specialist
                      </button>

                      {/* Button 2: Mid-Level */}
                      <button
                        onClick={() => setSeniorityId("Mid-Level")}
                        className={`rounded-md py-1.5 px-2 text-center font-display text-[11px] font-bold transition-all cursor-pointer ${
                          seniorityId === "Mid-Level"
                            ? "bg-electric text-white shadow-sm"
                            : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric hover:text-ink"
                        }`}
                      >
                        Mid-Level Engineer
                      </button>

                      {/* Button 3: Senior */}
                      <button
                        onClick={() => setSeniorityId("Senior")}
                        className={`rounded-md py-1.5 px-2 text-center font-display text-[11px] font-bold transition-all cursor-pointer ${
                          seniorityId === "Senior"
                            ? "bg-electric text-white shadow-sm"
                            : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric hover:text-ink"
                        }`}
                      >
                        Senior Specialist
                      </button>

                      {/* Slot 4: Modern Popover Selector for Lead & Executive Tiers */}
                      <div className="relative custom-dropdown-container">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(openDropdown === "seniority" ? null : "seniority");
                          }}
                          className={`w-full h-full rounded-md py-1.5 px-2 text-center font-display text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isOtherSeniority
                              ? "bg-electric text-white border-electric shadow-sm"
                              : "bg-white text-ink-soft border-[#bcd6fa] hover:border-electric hover:text-ink"
                          }`}
                        >
                          <span className="truncate">
                            {isOtherSeniority ? activeSeniority.shortName : "Lead & More"}
                          </span>
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className={`shrink-0 transition-transform duration-200 ${openDropdown === "seniority" ? "rotate-180" : ""}`}
                          >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        {/* Modern Floating Panel */}
                        {openDropdown === "seniority" && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-full mt-1.5 right-0 z-50 w-64 rounded-xl bg-white border border-[#bcd6fa] shadow-[0_16px_36px_-10px_rgba(10,20,40,0.22)] p-1.5 backdrop-blur-md"
                          >
                            <div className="px-2 py-1 border-b border-[#bcd6fa]/40 mb-1 font-mono text-[9px] font-bold uppercase tracking-wider text-mist">
                              Select Seniority Tier
                            </div>
                            <div className="max-h-52 overflow-y-auto thin-scrollbar space-y-0.5">
                              {ALL_SENIORITY_TIERS.slice(3).map((tier) => {
                                const isSelected = seniorityId === tier.id;
                                return (
                                  <button
                                    key={tier.id}
                                    onClick={() => {
                                      setSeniorityId(tier.id);
                                      setOpenDropdown(null);
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                                      isSelected
                                        ? "bg-electric/10 text-electric font-bold"
                                        : "text-ink hover:bg-canvas"
                                    }`}
                                  >
                                    <div>
                                      <div>{tier.name}</div>
                                      <div className="font-mono text-[9px] text-mist">{formatMoney(REGIONAL_RATES.apac[tier.id] || 10400)} / mo base</div>
                                    </div>
                                    {isSelected && <span className="text-electric font-bold">✓</span>}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 4. OPTION 3: SOURCING REGION (Single Row 3 Columns with Modern Popover) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-mono text-[9px] font-bold uppercase tracking-wider text-mist">
                        3. Sourcing Region
                      </label>
                      <span className="font-mono text-[9px] text-ink font-semibold truncate max-w-[170px]">
                        {activeRegion.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 w-full">
                      {/* Button 1: APAC */}
                      <button
                        onClick={() => setRegionId("apac")}
                        className={`rounded-md py-1.5 px-2 text-center font-display text-[11px] font-bold transition-all cursor-pointer ${
                          regionId === "apac"
                            ? "bg-electric text-white shadow-sm"
                            : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric hover:text-ink"
                        }`}
                      >
                        APAC Hub
                      </button>

                      {/* Button 2: Nearshore */}
                      <button
                        onClick={() => setRegionId("nearshore")}
                        className={`rounded-md py-1.5 px-2 text-center font-display text-[11px] font-bold transition-all cursor-pointer ${
                          regionId === "nearshore"
                            ? "bg-electric text-white shadow-sm"
                            : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric hover:text-ink"
                        }`}
                      >
                        Nearshore LATAM
                      </button>

                      {/* Slot 3: Modern Popover for Onshore & Extended Regions */}
                      <div className="relative custom-dropdown-container">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(openDropdown === "region" ? null : "region");
                          }}
                          className={`w-full h-full rounded-md py-1.5 px-2 text-center font-display text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            isOtherRegion
                              ? "bg-electric text-white border-electric shadow-sm"
                              : "bg-white text-ink-soft border-[#bcd6fa] hover:border-electric hover:text-ink"
                          }`}
                        >
                          <span className="truncate">
                            {isOtherRegion ? activeRegion.shortName : "Onshore & More"}
                          </span>
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className={`shrink-0 transition-transform duration-200 ${openDropdown === "region" ? "rotate-180" : ""}`}
                          >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        {/* Modern Floating Panel */}
                        {openDropdown === "region" && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-full mt-1.5 right-0 z-50 w-60 rounded-xl bg-white border border-[#bcd6fa] shadow-[0_16px_36px_-10px_rgba(10,20,40,0.22)] p-1.5 backdrop-blur-md"
                          >
                            <div className="px-2 py-1 border-b border-[#bcd6fa]/40 mb-1 font-mono text-[9px] font-bold uppercase tracking-wider text-mist">
                              Select Sourcing Region
                            </div>
                            <div className="max-h-52 overflow-y-auto thin-scrollbar space-y-0.5">
                              {ALL_SOURCING_REGIONS.slice(2).map((reg) => {
                                const isSelected = regionId === reg.id;
                                return (
                                  <button
                                    key={reg.id}
                                    onClick={() => {
                                      setRegionId(reg.id);
                                      setOpenDropdown(null);
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                                      isSelected
                                        ? "bg-electric/10 text-electric font-bold"
                                        : "text-ink hover:bg-canvas"
                                    }`}
                                  >
                                    <span>{reg.name}</span>
                                    {isSelected && <span className="text-electric font-bold">✓</span>}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 5. OPTION 4: SQUAD HEADCOUNT (Single Row with Stepper & Modern Popover) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-mono text-[9px] font-bold uppercase tracking-wider text-mist">
                        4. Squad Headcount
                      </label>
                      <span className="font-mono text-[9px] text-ink font-semibold">
                        {headcount} {headcount === 1 ? "Specialist" : "Specialists"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 w-full">
                      {/* Stepper block */}
                      <div className="flex items-center rounded-md border border-[#bcd6fa] bg-white p-0.5 shrink-0">
                        <button
                          onClick={() => setHeadcount((prev) => Math.max(1, prev - 1))}
                          className="h-6 w-6 flex items-center justify-center rounded bg-canvas font-mono text-xs font-bold text-ink hover:bg-electric hover:text-white transition-colors cursor-pointer"
                          title="Decrease count"
                        >
                          -
                        </button>
                        <span className="font-display text-xs font-extrabold text-ink min-w-[1.8rem] text-center">
                          {headcount}
                        </span>
                        <button
                          onClick={() => setHeadcount((prev) => Math.min(50, prev + 1))}
                          className="h-6 w-6 flex items-center justify-center rounded bg-canvas font-mono text-xs font-bold text-ink hover:bg-electric hover:text-white transition-colors cursor-pointer"
                          title="Increase count"
                        >
                          +
                        </button>
                      </div>

                      {/* Quick Presets */}
                      {HEADCOUNT_PRESETS.map((count) => (
                        <button
                          key={count}
                          onClick={() => setHeadcount(count)}
                          className={`flex-1 rounded-md py-1.5 px-1 text-center font-display text-[11px] font-bold transition-all cursor-pointer ${
                            headcount === count
                              ? "bg-electric text-white shadow-sm"
                              : "bg-white text-ink-soft border border-[#bcd6fa] hover:border-electric"
                          }`}
                        >
                          {count}x
                        </button>
                      ))}

                      {/* Modern Dropdown for Extended Headcount */}
                      <div className="relative flex-1 custom-dropdown-container">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(openDropdown === "headcount" ? null : "headcount");
                          }}
                          className={`w-full rounded-md py-1.5 px-1.5 text-center font-display text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            isOtherHeadcount
                              ? "bg-electric text-white border-electric shadow-sm"
                              : "bg-white text-ink-soft border-[#bcd6fa] hover:border-electric hover:text-ink"
                          }`}
                        >
                          <span>{isOtherHeadcount ? `${headcount}x` : "8x+"}</span>
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className={`shrink-0 transition-transform duration-200 ${openDropdown === "headcount" ? "rotate-180" : ""}`}
                          >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        {/* Modern Floating Panel */}
                        {openDropdown === "headcount" && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-full mt-1.5 right-0 z-50 w-44 rounded-xl bg-white border border-[#bcd6fa] shadow-[0_16px_36px_-10px_rgba(10,20,40,0.22)] p-1.5 backdrop-blur-md"
                          >
                            <div className="px-2 py-1 border-b border-[#bcd6fa]/40 mb-1 font-mono text-[9px] font-bold uppercase tracking-wider text-mist">
                              Extended Squad Size
                            </div>
                            <div className="max-h-48 overflow-y-auto thin-scrollbar space-y-0.5">
                              {HEADCOUNT_EXTENDED.map((num) => (
                                <button
                                  key={num}
                                  onClick={() => {
                                    setHeadcount(num);
                                    setOpenDropdown(null);
                                  }}
                                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                                    headcount === num
                                      ? "bg-electric/10 text-electric font-bold"
                                      : "text-ink hover:bg-canvas"
                                  }`}
                                >
                                  <span>{num} Specialists</span>
                                  {headcount === num && <span className="text-electric font-bold">✓</span>}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 6. OPTION 5: TARGET TECHNOLOGIES (Modern Popover + No Duplicate Chevrons + No +1) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-mono text-[9px] font-bold uppercase tracking-wider text-mist">
                        5. Target Technologies ({selectedTags.length} active)
                      </label>
                      <span className="font-mono text-[8px] text-mist">
                        Click tag to remove
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 w-full">
                      {/* Active tag chips */}
                      <div className="flex flex-wrap items-center gap-1 flex-1 min-w-0">
                        {selectedTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className="rounded px-2 py-1 font-mono text-[10px] font-semibold bg-electric/15 text-electric border border-electric/50 hover:bg-red-50 hover:text-red-600 hover:border-red-400 transition-all cursor-pointer whitespace-nowrap"
                            title={`Click to remove ${tag}`}
                          >
                            {tag} ×
                          </button>
                        ))}
                      </div>

                      {/* Modern + Add Tech Popover Trigger (Single Clean Chevron, No Extra Characters) */}
                      <div className="relative shrink-0 custom-dropdown-container">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(openDropdown === "tech" ? null : "tech");
                          }}
                          className={`rounded-md py-1.5 px-3 text-center font-display text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                            openDropdown === "tech"
                              ? "bg-electric text-white border-electric"
                              : "bg-white text-ink-soft border-[#bcd6fa] hover:border-electric hover:text-ink"
                          }`}
                        >
                          <span>+ Add Tech</span>
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className={`shrink-0 transition-transform duration-200 ${openDropdown === "tech" ? "rotate-180" : ""}`}
                          >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        {/* Modern Categorized Floating Tech Library */}
                        {openDropdown === "tech" && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute bottom-full mb-1.5 right-0 z-50 w-72 sm:w-80 rounded-xl bg-white border border-[#bcd6fa] shadow-[0_20px_45px_-10px_rgba(10,20,40,0.25)] p-2 backdrop-blur-md"
                          >
                            <div className="flex items-center justify-between px-1.5 pb-1.5 border-b border-[#bcd6fa]/40 mb-1.5">
                              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-electric">
                                Master Tech Library
                              </span>
                              <button
                                onClick={() => setOpenDropdown(null)}
                                className="text-mist hover:text-ink font-bold text-xs p-0.5 cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="max-h-60 overflow-y-auto thin-scrollbar space-y-2 pr-1">
                              {TECH_LIBRARY_GROUPS.map((group) => (
                                <div key={group.title}>
                                  <div className="font-display text-[10px] font-bold text-ink mb-1">
                                    {group.title}
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {group.items.map((tech) => {
                                      const isSelected = selectedTags.includes(tech);
                                      return (
                                        <button
                                          key={tech}
                                          onClick={() => toggleTag(tech)}
                                          className={`rounded px-1.5 py-0.5 font-mono text-[9.5px] transition-all cursor-pointer ${
                                            isSelected
                                              ? "bg-electric text-white font-bold"
                                              : "bg-canvas text-ink-soft border border-[#bcd6fa]/60 hover:border-electric hover:text-ink"
                                          }`}
                                        >
                                          {isSelected ? "✓ " : "+ "}
                                          {tech}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 7. ACTION BUTTON from Audit Spec Section 5.C */}
                  <div className="pt-1">
                    <button
                      onClick={() => setIsProposalOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-electric py-2.5 px-3 font-display text-xs font-bold text-white shadow-[0_6px_16px_-4px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright cursor-pointer"
                    >
                      Generate RPO Proposal &amp; Schedule Review
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </DeviceFrame>
            </div>
          </div>
        </div>

        {/* =====================================================================
            FULL-WIDTH: Cost & Velocity Comparison Grid from Audit Spec Section 4
            Superb Standard Graphically Crafted Benchmark Card
            ===================================================================== */}
        <div id="cost-velocity-comparison" className="mt-8 sm:mt-10 w-full">
          <div className="rounded-2xl sm:rounded-3xl border border-[#bcd6fa]/80 bg-white/95 p-5 sm:p-7 lg:p-8 shadow-[0_20px_50px_-20px_rgba(10,132,255,0.16)] backdrop-blur-md">
            {/* Header with Verified Benchmark Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#bcd6fa]/40 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-3.5 py-1 font-sans text-xs font-semibold text-electric">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
                  Agency vs. Pepoltek Performance Benchmark
                </div>
                <h3 className="mt-2 font-display text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-ink">
                  Cost &amp; Velocity Comparison Grid
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-ink-soft max-w-3xl leading-relaxed">
                  Comparing placement friction, sourcing velocity, and candidate qualification between legacy 20% to 25% contingency headhunters and Pepoltek dedicated global RPO model.
                </p>
              </div>
            </div>

            {/* 4 Standard Graphically Crafted Benchmark Cards with 4 Unique Corporate Visualizations */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* CARD 1: Average Time-to-Deploy (Velocity S-Curve Chart) */}
              <div className="group relative flex flex-col justify-between rounded-xl border border-[#bcd6fa]/70 bg-[linear-gradient(170deg,#ffffff_0%,#f6faff_100%)] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-electric/80 hover:shadow-[0_12px_28px_-8px_rgba(10,132,255,0.22)]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] font-semibold text-mist uppercase tracking-wider">
                      Speed to Ship
                    </span>
                  </div>

                  <h4 className="mt-1.5 font-display text-base font-extrabold text-ink">
                    Average Time-to-Deploy
                  </h4>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    Days required from role opening to live engineer commit.
                  </p>

                  {/* GRAPH 1: Corporate Velocity S-Curve SVG Chart */}
                  <div className="mt-3.5 rounded-lg bg-canvas/70 p-2 border border-[#bcd6fa]/40">
                    <svg viewBox="0 0 240 68" className="w-full h-16 sm:h-[68px] overflow-visible">
                      <defs>
                        <linearGradient id="pepoltekVelArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#0a84ff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Calibrated grid lines */}
                      <line x1="10" y1="14" x2="230" y2="14" stroke="#bcd6fa" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.6" />
                      <line x1="10" y1="36" x2="230" y2="36" stroke="#bcd6fa" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.6" />
                      <line x1="10" y1="56" x2="230" y2="56" stroke="#bcd6fa" strokeWidth="1" opacity="0.8" />

                      {/* X-axis labels */}
                      <text x="12" y="66" fill="#8ba0ba" fontSize="7.5" fontFamily="sans-serif">Day 0</text>
                      <text x="50" y="66" fill="#0a84ff" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">Day 2-7</text>
                      <text x="185" y="66" fill="#8ba0ba" fontSize="7.5" fontFamily="sans-serif">Day 45-60</text>

                      {/* Agency Delayed Drag Curve */}
                      <path
                        d="M 12 56 Q 80 54 130 50 T 225 18"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="1.75"
                        strokeDasharray="3 3"
                      />
                      <circle cx="225" cy="18" r="3" fill="#f87171" />
                      <text x="155" y="27" fill="#ef4444" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Agency: 60d</text>

                      {/* Pepoltek Velocity Curve with Area Fill */}
                      <path
                        d="M 12 56 Q 30 14 55 14 L 225 14 L 225 56 Z"
                        fill="url(#pepoltekVelArea)"
                      />
                      <path
                        d="M 12 56 Q 30 14 55 14 L 225 14"
                        fill="none"
                        stroke="#0a84ff"
                        strokeWidth="2.5"
                      />
                      {/* Active glowing node */}
                      <circle cx="55" cy="14" r="4" fill="#0a84ff" stroke="#ffffff" strokeWidth="1.5" />
                      <circle cx="55" cy="14" r="7" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.7" />
                      <text x="40" y="9" fill="#0a84ff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">✓ 2 to 7 Days</text>
                    </svg>

                    {/* Comparative Legend Footer */}
                    <div className="mt-1 flex items-center justify-between text-[10.5px] font-sans pt-1 border-t border-[#bcd6fa]/30">
                      <span className="text-mist">Agency: <span className="line-through">45 to 60 Days</span></span>
                      <span className="font-bold text-electric">Pepoltek: 2 to 7 Days</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#bcd6fa]/40 flex items-center gap-1.5 text-[11px] font-semibold text-signal">
                  <span>✓</span>
                  <span>85% Faster Pipeline Velocity</span>
                </div>
              </div>

              {/* CARD 2: Client HR Hours Reclaimed (Workload Allocation Bar Chart) */}
              <div className="group relative flex flex-col justify-between rounded-xl border border-[#bcd6fa]/70 bg-[linear-gradient(170deg,#ffffff_0%,#f6faff_100%)] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-electric/80 hover:shadow-[0_12px_28px_-8px_rgba(10,132,255,0.22)]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] font-semibold text-mist uppercase tracking-wider">
                      Overhead Reclaimed
                    </span>
                  </div>

                  <h4 className="mt-1.5 font-display text-base font-extrabold text-ink">
                    Client HR Hours Reclaimed
                  </h4>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    Internal engineering lead time spent reviewing unqualified CVs.
                  </p>

                  {/* GRAPH 2: Corporate Workload Allocation Chart */}
                  <div className="mt-3.5 rounded-lg bg-canvas/70 p-2 border border-[#bcd6fa]/40">
                    <svg viewBox="0 0 240 68" className="w-full h-16 sm:h-[68px] overflow-visible">
                      <defs>
                        <linearGradient id="pepoltekHrBar" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#0a84ff" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>

                      {/* Calibrated Hour Ticks */}
                      <line x1="50" y1="12" x2="50" y2="56" stroke="#bcd6fa" strokeWidth="1" opacity="0.8" />
                      <line x1="105" y1="12" x2="105" y2="56" stroke="#bcd6fa" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.5" />
                      <line x1="165" y1="12" x2="165" y2="56" stroke="#bcd6fa" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.5" />
                      <line x1="225" y1="12" x2="225" y2="56" stroke="#bcd6fa" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.5" />

                      <text x="50" y="65" fill="#8ba0ba" fontSize="7" textAnchor="middle" fontFamily="sans-serif">0h</text>
                      <text x="105" y="65" fill="#8ba0ba" fontSize="7" textAnchor="middle" fontFamily="sans-serif">15h</text>
                      <text x="165" y="65" fill="#8ba0ba" fontSize="7" textAnchor="middle" fontFamily="sans-serif">30h</text>
                      <text x="225" y="65" fill="#8ba0ba" fontSize="7" textAnchor="middle" fontFamily="sans-serif">45h</text>

                      {/* Agency Heavy Burden Row */}
                      <text x="4" y="24" fill="#64748b" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Agency</text>
                      <rect x="50" y="16" width="168" height="11" rx="3" fill="#cbd5e1" />
                      <text x="214" y="25" fill="#475569" fontSize="7" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">45h Overhead</text>

                      {/* Pepoltek Reclaimed Row */}
                      <text x="4" y="46" fill="#0a84ff" fontSize="7.5" fontWeight="700" fontFamily="sans-serif">Pepoltek</text>
                      <rect x="50" y="38" width="18" height="11" rx="3" fill="url(#pepoltekHrBar)" />
                      <text x="73" y="47" fill="#0a84ff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">4h</text>

                      {/* Reclaimed Hours Bracket */}
                      <rect x="70" y="38" width="148" height="11" rx="3" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" />
                      <text x="144" y="46.5" fill="#059669" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 40+ Hours Reclaimed</text>
                    </svg>

                    {/* Comparative Legend Footer */}
                    <div className="mt-1 flex items-center justify-between text-[10.5px] font-sans pt-1 border-t border-[#bcd6fa]/30">
                      <span className="text-mist">Agency: <span className="line-through">5 to 10h / Hire</span></span>
                      <span className="font-bold text-electric">Pepoltek: 40+ Hours Saved</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#bcd6fa]/40 flex items-center gap-1.5 text-[11px] font-semibold text-signal">
                  <span>✓</span>
                  <span>Full Pre-Screening &amp; Vetting</span>
                </div>
              </div>

              {/* CARD 3: Placement Cost Model (Corporate Donut / Pie Chart) */}
              <div className="group relative flex flex-col justify-between rounded-xl border border-[#bcd6fa]/70 bg-[linear-gradient(170deg,#ffffff_0%,#f6faff_100%)] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-electric/80 hover:shadow-[0_12px_28px_-8px_rgba(10,132,255,0.22)]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] font-semibold text-mist uppercase tracking-wider">
                      Cost Efficiency
                    </span>
                  </div>

                  <h4 className="mt-1.5 font-display text-base font-extrabold text-ink">
                    Placement Cost Model
                  </h4>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    Recruitment commercial structure and upfront placement penalty.
                  </p>

                  {/* GRAPH 3: Corporate Donut / Pie Chart (65% Client Savings vs Flat RPO Base) */}
                  <div className="mt-3.5 rounded-lg bg-canvas/70 p-2 border border-[#bcd6fa]/40">
                    <svg viewBox="0 0 240 68" className="w-full h-16 sm:h-[68px] overflow-visible">
                      <defs>
                        <linearGradient id="donutSavingsGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#0a84ff" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>

                      {/* Calibrated Background Track */}
                      <circle cx="38" cy="34" r="21" fill="none" stroke="#e2e8f0" strokeWidth="9" />

                      {/* 35% Flat Sourcing Base Arc */}
                      <circle
                        cx="38"
                        cy="34"
                        r="21"
                        fill="none"
                        stroke="#93c5fd"
                        strokeWidth="9"
                        strokeDasharray="43.18 131.95"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        transform="rotate(144 38 34)"
                      />

                      {/* 65% Client Savings Arc */}
                      <circle
                        cx="38"
                        cy="34"
                        r="21"
                        fill="none"
                        stroke="url(#donutSavingsGrad)"
                        strokeWidth="9"
                        strokeDasharray="82.77 131.95"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        transform="rotate(-90 38 34)"
                      />

                      {/* Center Core Display */}
                      <circle cx="38" cy="34" r="14.5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.75" />
                      <text x="38" y="32" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0a1428" fontFamily="sans-serif">
                        65%
                      </text>
                      <text x="38" y="39.5" textAnchor="middle" fontSize="5" fontWeight="700" fill="#059669" letterSpacing="0.4" fontFamily="sans-serif">
                        SAVED
                      </text>

                      {/* Active Pulse Ring on Peak */}
                      <circle cx="53" cy="20" r="2.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />

                      {/* Financial Comparison Panels */}
                      {/* Row 1: Pepoltek Model */}
                      <rect x="74" y="10" width="158" height="23" rx="4" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="0.8" />
                      <circle cx="83" cy="21.5" r="3" fill="#10b981" />
                      <text x="91" y="18.5" fill="#065f46" fontSize="7.2" fontWeight="bold" fontFamily="sans-serif">Pepoltek Flat Sprints</text>
                      <text x="91" y="27" fill="#059669" fontSize="5.8" fontFamily="sans-serif">Zero placement markup</text>
                      <text x="226" y="23" textAnchor="end" fill="#059669" fontSize="8" fontWeight="800" fontFamily="sans-serif">65% Less</text>

                      {/* Row 2: Legacy Agency Model */}
                      <rect x="74" y="37" width="158" height="23" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
                      <circle cx="83" cy="48.5" r="3" fill="#ef4444" />
                      <text x="91" y="45.5" fill="#475569" fontSize="7.2" fontWeight="600" fontFamily="sans-serif">Agency Contingency</text>
                      <text x="91" y="54" fill="#94a3b8" fontSize="5.8" fontFamily="sans-serif">20% to 25% upfront fee</text>
                      <text x="226" y="50" textAnchor="end" fill="#dc2626" fontSize="7.5" fontWeight="700" fontFamily="sans-serif">+25% Fee</text>
                    </svg>

                    {/* Comparative Legend Footer */}
                    <div className="mt-1 flex items-center justify-between text-[10.5px] font-sans pt-1 border-t border-[#bcd6fa]/30">
                      <span className="text-mist">Agency: <span className="line-through">20% to 25% Fee</span></span>
                      <span className="font-bold text-electric">Pepoltek: Flat Monthly Sprint</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#bcd6fa]/40 flex items-center gap-1.5 text-[11px] font-semibold text-signal">
                  <span>✓</span>
                  <span>Up to 65% Cost-per-Hire Reduction</span>
                </div>
              </div>

              {/* CARD 4: Candidate Vetting Standard (4-Stage Technical Qualification Pipeline) */}
              <div className="group relative flex flex-col justify-between rounded-xl border border-[#bcd6fa]/70 bg-[linear-gradient(170deg,#ffffff_0%,#f6faff_100%)] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-electric/80 hover:shadow-[0_12px_28px_-8px_rgba(10,132,255,0.22)]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] font-semibold text-mist uppercase tracking-wider">
                      Technical Rigor
                    </span>
                  </div>

                  <h4 className="mt-1.5 font-display text-base font-extrabold text-ink">
                    Candidate Vetting Standard
                  </h4>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    Evaluation depth before candidate profiles reach client inbox.
                  </p>

                  {/* GRAPH 4: 4-Stage Vetting Pipeline Graphic */}
                  <div className="mt-3.5 rounded-lg bg-canvas/70 p-2 border border-[#bcd6fa]/40">
                    <svg viewBox="0 0 240 68" className="w-full h-16 sm:h-[68px] overflow-visible">
                      {/* Stage 1 Node */}
                      <g transform="translate(18, 11)">
                        <rect x="-14" y="0" width="48" height="23" rx="4" fill="#eef4fd" stroke="#0a84ff" strokeWidth="1.2" />
                        <text x="10" y="10.5" fill="#0a1428" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. Live Git</text>
                        <text x="10" y="18.5" fill="#0a84ff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Top 15%</text>
                      </g>

                      {/* Conduit 1-2 */}
                      <line x1="53" y1="22.5" x2="72" y2="22.5" stroke="#0a84ff" strokeWidth="2" strokeDasharray="3 1.5" />

                      {/* Stage 2 Node */}
                      <g transform="translate(76, 11)">
                        <rect x="-3" y="0" width="48" height="23" rx="4" fill="#eef4fd" stroke="#0a84ff" strokeWidth="1.2" />
                        <text x="21" y="10.5" fill="#0a1428" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. Architect</text>
                        <text x="21" y="18.5" fill="#0a84ff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Top 8%</text>
                      </g>

                      {/* Conduit 2-3 */}
                      <line x1="122" y1="22.5" x2="139" y2="22.5" stroke="#0a84ff" strokeWidth="2" strokeDasharray="3 1.5" />

                      {/* Stage 3 Node */}
                      <g transform="translate(142, 11)">
                        <rect x="-2" y="0" width="44" height="23" rx="4" fill="#eef4fd" stroke="#0a84ff" strokeWidth="1.2" />
                        <text x="20" y="10.5" fill="#0a1428" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. Agile Fit</text>
                        <text x="20" y="18.5" fill="#0a84ff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Top 3%</text>
                      </g>

                      {/* Conduit 3-4 */}
                      <line x1="185" y1="22.5" x2="200" y2="22.5" stroke="#10b981" strokeWidth="2" />

                      {/* Stage 4 Finalist Badge */}
                      <g transform="translate(202, 11)">
                        <rect x="-1" y="0" width="38" height="23" rx="4" fill="#10b981" />
                        <text x="18" y="10.5" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DEPLOY</text>
                        <text x="18" y="18.5" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100%</text>
                      </g>

                      {/* Agency Comparison Row Below */}
                      <line x1="10" y1="49" x2="230" y2="49" stroke="#e2e8f0" strokeWidth="1" />
                      <rect x="10" y="42" width="105" height="14" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
                      <text x="62" y="52" fill="#64748b" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif">Agency: Resume Forwarding</text>
                      <text x="180" y="52" fill="#dc2626" fontSize="6.5" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">✕ Zero Technical Audits</text>
                    </svg>

                    {/* Comparative Legend Footer */}
                    <div className="mt-1 flex items-center justify-between text-[10.5px] font-sans pt-1 border-t border-[#bcd6fa]/30">
                      <span className="text-mist">Agency: <span className="line-through">Resume Forwarding</span></span>
                      <span className="font-bold text-electric">Pepoltek: Code &amp; HR Audits</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#bcd6fa]/40 flex items-center gap-1.5 text-[11px] font-semibold text-signal">
                  <span>✓</span>
                  <span>100% Pre-Screened &amp; Verified</span>
                </div>
              </div>
            </div>

            {/* Bottom Summary Ticker: 4 Pillars at a glance */}
            <div className="mt-6 pt-5 border-t border-[#bcd6fa]/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-ink-soft font-sans">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal font-bold text-[11px]">✓</span>
                <span><strong className="text-ink">2 to 7 Days</strong> average deployment speed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal font-bold text-[11px]">✓</span>
                <span><strong className="text-ink">40+ Hours Saved</strong> per hire in client HR time</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal font-bold text-[11px]">✓</span>
                <span><strong className="text-ink">Flat Monthly RPO</strong> with zero placement penalty</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal font-bold text-[11px]">✓</span>
                <span><strong className="text-ink">100% Pre-Screened</strong> production-grade code</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          INSTANT PROPOSAL REVIEW MODAL
          Pre-filled with configured roles, stack selections, time overlap
          guarantees, and side-by-side cost comparisons per Audit Spec Section 5.C
          ===================================================================== */}
      {isProposalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-electric/40 bg-white p-5 shadow-2xl animate-[ds-rise_0.2s_ease-out]">
            <button
              onClick={() => setIsProposalOpen(false)}
              className="absolute top-4 right-4 text-mist hover:text-ink font-bold text-base cursor-pointer"
            >
              ✕
            </button>

            <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-electric">
              Pepoltek Instant Proposal
            </span>
            <h3 className="mt-0.5 font-display text-lg font-extrabold text-ink">
              Configured Squad &amp; RPO Breakdown
            </h3>

            {/* Configured Details */}
            <div className="mt-3 rounded-xl border border-[#bcd6fa] bg-canvas p-3 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-mist">Stack Discipline:</span>
                <span className="font-bold text-ink">{activeCategory.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Headcount:</span>
                <span className="font-bold text-ink">{headcount} Specialists</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Seniority Tier:</span>
                <span className="font-bold text-ink">{activeSeniority.name} ({activeSeniority.experience})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Sourcing Region:</span>
                <span className="font-bold text-ink">{activeRegion.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Timezone Overlap:</span>
                <span className="font-bold text-electric">4 to 6 Hours Guaranteed Daily Overlap</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Active Technologies:</span>
                <span className="font-bold text-ink truncate max-w-[220px]">{selectedTags.join(", ")}</span>
              </div>

              {/* Side-by-Side Cost Comparison */}
              <div className="border-t border-[#bcd6fa] pt-2 mt-2 space-y-1">
                <div className="flex justify-between text-mist">
                  <span>Traditional Agency Contingency (20%):</span>
                  <span className="line-through">{formatMoney(calc.traditionalAgencyPlacementFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm">
                  <span>Pepoltek Dedicated RPO Cost:</span>
                  <span className="text-electric">{formatMoney(calc.monthlyDeploymentCost)} / mo</span>
                </div>
                <div className="flex justify-between font-bold text-xs text-signal pt-0.5">
                  <span>Net Upfront Placement Savings:</span>
                  <span>Saves {formatMoney(calc.netFirstMonthSavings)} (65% reduction)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <a
                href="/contact"
                className="w-full text-center rounded-xl bg-electric py-2.5 font-display text-xs sm:text-sm font-bold text-white shadow-md hover:bg-electric-bright transition-colors"
              >
                Schedule Executive Review Call
              </a>
              <button
                onClick={() => setIsProposalOpen(false)}
                className="w-full rounded-xl border border-[#bcd6fa] py-1.5 font-display text-xs font-semibold text-ink hover:bg-canvas cursor-pointer"
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
