"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardTopRightShape } from "@/components/ui/CardCornerShapes";
import { AnimatedChevrons } from "@/components/ui/AnimatedChevrons";

/* ---------- palette ---------- */
const C = {
  ink: "#0a1428",
  soft: "#3d4c68",
  el: "#0a84ff",
  br: "#38bdf8",
  vio: "#8b5cf6",
  vio2: "#a78bfa",
  teal: "#0d9488",
  teal2: "#2dd4bf",
  amber: "#e97e13",
  amber2: "#fbbf24",
  line: "#bcd6fa",
};

/* ---------- crafted live UI micro-mockups per Audit Spec 4 ---------- */

function ResumeScanningGraphic() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden p-2.5">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#bcd6fa]/40 pb-1">
        <div className="flex items-center gap-1.5">
          <svg className="h-3 w-3 text-electric shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="font-mono text-[8.5px] font-semibold text-ink truncate">candidate_resume.pdf</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded bg-signal/10 px-1.5 py-0.2 font-mono text-[7.5px] font-bold uppercase text-signal shrink-0">
          <span className="h-1 w-1 rounded-full bg-signal" /> Parsed
        </span>
      </div>

      {/* Laser Scanline */}
      <div className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-electric to-transparent te-scanline shadow-[0_0_8px_#0a84ff]" />

      {/* Structured Parsed Fields */}
      <div className="space-y-1 py-0.5">
        <div className="flex items-center justify-between rounded border border-[#bcd6fa]/40 bg-white/90 px-1.5 py-0.5">
          <span className="font-mono text-[7.5px] text-mist">Role Target:</span>
          <span className="font-mono text-[8px] font-bold text-ink truncate">Staff Backend Architect</span>
        </div>
        <div className="flex items-center justify-between rounded border border-[#bcd6fa]/40 bg-white/90 px-1.5 py-0.5">
          <span className="font-mono text-[7.5px] text-mist">Stack:</span>
          <span className="font-mono text-[8px] font-bold text-electric truncate">Node.js · Go · Redis</span>
        </div>
        <div className="flex items-center justify-between rounded border border-signal/30 bg-signal/[0.06] px-1.5 py-0.5">
          <span className="font-mono text-[7.5px] text-signal font-semibold">ATS Compatibility:</span>
          <span className="font-mono text-[8px] font-extrabold text-signal">98% Match</span>
        </div>
      </div>
    </div>
  );
}

function RadarMatchGraphic() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden p-2.5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#8b5cf6]/20 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6] shadow-[0_0_6px_#8b5cf6] shrink-0" />
          <span className="font-mono text-[8.5px] font-semibold text-ink">Client Pipelines</span>
        </div>
        <span className="font-mono text-[7.5px] font-bold text-[#8b5cf6] uppercase shrink-0">Live Scan</span>
      </div>

      {/* Radar sweep + Matches */}
      <div className="relative flex flex-1 items-center justify-between gap-1.5 py-0.5">
        {/* Candidate Node */}
        <div className="flex flex-col items-center shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#8b5cf6]/40 bg-white shadow-sm font-display text-[9.5px] font-extrabold text-[#8b5cf6]">
            YOU
          </div>
          <span className="font-mono text-[6.5px] text-mist mt-0.5">Verified</span>
        </div>

        {/* Animated Connecting Beam */}
        <div className="relative flex-1 flex items-center justify-center min-w-[32px]">
          <div className="w-full h-[1.5px] bg-gradient-to-r from-[#8b5cf6] via-electric to-[#8b5cf6] opacity-75" />
          <span className="absolute rounded-full border border-[#8b5cf6]/30 bg-white px-1 font-mono text-[6px] font-bold text-[#8b5cf6]">
            LINKED
          </span>
        </div>

        {/* Live Requisition Results */}
        <div className="flex flex-col gap-1 text-right min-w-0">
          <div className="rounded border border-electric/30 bg-white px-1.5 py-0.5 shadow-sm">
            <div className="font-mono text-[7.5px] font-bold text-ink truncate">Tier 1 Cloud Client</div>
            <div className="font-mono text-[7px] font-bold text-electric">96% Direct Match</div>
          </div>
          <div className="rounded border border-[#8b5cf6]/30 bg-white px-1.5 py-0.5 shadow-sm">
            <div className="font-mono text-[7.5px] font-bold text-ink truncate">Global Health-Tech</div>
            <div className="font-mono text-[7px] font-bold text-[#8b5cf6]">94% Direct Match</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadinessGaugeGraphic() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden p-2.5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#0d9488]/20 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488] shadow-[0_0_6px_#0d9488] shrink-0" />
          <span className="font-mono text-[8.5px] font-semibold text-ink">Skills Diagnostic</span>
        </div>
        <span className="font-mono text-[7.5px] font-bold text-[#0d9488] uppercase shrink-0">Accredited</span>
      </div>

      {/* Gauge and Metric Snippet */}
      <div className="flex items-center justify-between gap-2 py-0.5">
        {/* Radial Gauge */}
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90">
            <circle cx="22" cy="22" r="17" fill="none" stroke="#ccfbf1" strokeWidth="3.5" />
            <circle
              cx="22"
              cy="22"
              r="17"
              fill="none"
              stroke="#0d9488"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={106.8}
              strokeDashoffset={106.8 * (1 - 0.88)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-[11px] font-extrabold text-ink leading-none">88%</span>
            <span className="font-mono text-[5.5px] uppercase tracking-wider text-mist">Readiness</span>
          </div>
        </div>

        {/* Verification badges */}
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <div className="flex items-center justify-between rounded border border-[#0d9488]/30 bg-white px-1.5 py-0.5">
            <span className="font-mono text-[7px] text-mist truncate">System Design:</span>
            <span className="font-mono text-[7.5px] font-bold text-[#0d9488]">Level 4 PASS</span>
          </div>
          <div className="flex items-center justify-between rounded border border-[#0d9488]/30 bg-white px-1.5 py-0.5">
            <span className="font-mono text-[7px] text-mist truncate">Deployment:</span>
            <span className="font-mono text-[7.5px] font-extrabold text-electric">Tier 1 Unlocked</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BountyLedgerGraphic() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden p-2.5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e97e13]/20 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e97e13] shadow-[0_0_6px_#e97e13] shrink-0" />
          <span className="font-mono text-[8.5px] font-semibold text-ink">Bounty Payout Ledger</span>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[7.5px] font-bold text-[#e97e13] uppercase shrink-0">
          Confirmed
        </span>
      </div>

      {/* Main Payout Alert */}
      <div className="py-0.5">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-sm font-extrabold text-ink leading-tight">+ $500.00</span>
          <span className="font-mono text-[7px] font-bold text-signal uppercase tracking-wider">Direct Wire</span>
        </div>
        <div className="mt-1 flex items-center justify-between rounded border border-[#e97e13]/30 bg-white px-1.5 py-0.5 text-[7px]">
          <span className="font-mono text-mist">Referral:</span>
          <span className="font-mono font-bold text-ink truncate">Alex M. · Placed (Sprint 4)</span>
        </div>
        <div className="mt-0.5 flex items-center gap-1 font-mono text-[6.5px] text-signal font-semibold">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="truncate">Reward confirmed and sent to linked account</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- 4 Pillars Data aligned with Audit Spec 4 in natural reading order ---------- */

const STAGES = [
  {
    n: "01",
    badge: "Resume Intake",
    route: "/career/upload_cv/",
    title: "AI Resume Intake & Parsing",
    actionLabel: "Upload CV & Parse",
    description:
      "Upload your CV and let our AI engine instantly parse, refine, and structure your experience into a top-tier ATS-friendly profile.",
    accent: C.el,
    accent2: C.br,
    renderGraphic: () => <ResumeScanningGraphic />,
  },
  {
    n: "02",
    badge: "Reverse Search",
    route: "/talents/reverse-search/",
    title: "Reverse Job Search Engine",
    actionLabel: "Explore Live Pipelines",
    description:
      "Stop applying into the void. Scan live client pipelines and get discovered by top enterprises based on your verified tech stack and clinical credentials.",
    accent: C.vio,
    accent2: C.vio2,
    renderGraphic: () => <RadarMatchGraphic />,
  },
  {
    n: "03",
    badge: "Talent Academy",
    route: "/ecosystem/academy/",
    title: "Talent Academy & Technical Vetting",
    actionLabel: "Start Skills Diagnostic",
    description:
      "Pinpoint skill gaps with our technical diagnostic exams. Upskill through enterprise-accredited modules to unlock Tier 1 rates and priority deployment sprints.",
    accent: C.teal,
    accent2: C.teal2,
    renderGraphic: () => <ReadinessGaugeGraphic />,
  },
  {
    n: "04",
    badge: "Referral Bounty",
    route: "/ecosystem/referrals/",
    title: "Referral Bounty Network",
    actionLabel: "Refer a Specialist",
    description:
      "Monetize your professional network. Refer top-tier engineers or clinical specialists and track your reward payouts from submission to successful placement.",
    accent: C.amber,
    accent2: C.amber2,
    renderGraphic: () => <BountyLedgerGraphic />,
  },
];

/* ---------- Standard Compact Pillar Card with Unified Design Alignment ---------- */

function FeatureItem({
  stage,
  index,
  isVisible,
}: {
  stage: typeof STAGES[number];
  index: number;
  isVisible: boolean;
}) {
  const getDirectionClasses = () => {
    if (!isVisible) {
      if (index === 0) return "opacity-0 -translate-x-6 -translate-y-6 scale-95";
      if (index === 1) return "opacity-0 translate-x-6 -translate-y-6 scale-95";
      if (index === 2) return "opacity-0 -translate-x-6 translate-y-6 scale-95";
      return "opacity-0 translate-x-6 translate-y-6 scale-95";
    }
    return "opacity-100 translate-x-0 translate-y-0 scale-100";
  };

  return (
    <Link
      href={stage.route}
      className={`cursor-target group relative flex flex-col justify-between w-full overflow-hidden rounded-2xl border border-[#bcd6fa]/80 bg-white/95 p-4 sm:p-5 shadow-[0_12px_32px_-16px_rgba(10,132,255,0.18)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-electric hover:shadow-[0_22px_48px_-12px_rgba(10,132,255,0.28)] ${getDirectionClasses()}`}
      style={
        {
          "--ac": stage.accent,
          "--ac2": stage.accent2,
          transitionDelay: `${150 + index * 80}ms`,
        } as CSSProperties
      }
    >
      {/* Delicate Organic Corner Watermark */}
      <CardTopRightShape
        variant={index}
        size={80}
        color={stage.accent}
        className="pointer-events-none absolute right-0 top-0 opacity-25 transition-opacity duration-300 group-hover:opacity-70"
      />

      {/* Top Header inside Card */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-[#bcd6fa]/40 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-bold text-electric">
            [{stage.n}]
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-transform duration-200 group-hover:scale-105"
            style={{ background: `${stage.accent}14`, color: stage.accent, border: `1px solid ${stage.accent}28` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: stage.accent }} />
            {stage.badge}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[8.5px] font-semibold text-signal uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
          Active
        </span>
      </div>

      {/* Title & Short Description inside Card */}
      <div className="relative z-10 mt-2.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-[15px] sm:text-[16px] font-bold text-ink leading-snug transition-colors duration-200 group-hover:text-[var(--ac)]">
            {stage.title}
          </h3>
          <svg className="h-3.5 w-3.5 shrink-0 text-electric transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        <p className="mt-1 text-[11.5px] sm:text-[12px] leading-relaxed text-ink-soft line-clamp-2">
          {stage.description}
        </p>
      </div>

      {/* Middle: Embedded Live UI Micro-Mockup Window */}
      <div className="relative z-10 mt-3 h-[116px] w-full overflow-hidden rounded-xl border border-[#bcd6fa]/60 bg-gradient-to-b from-white to-[#f4f8fe] shadow-inner transition-transform duration-300 group-hover:scale-[1.01]">
        {stage.renderGraphic()}
      </div>

      {/* Bottom Action inside Card */}
      <div className="relative z-10 mt-3 flex items-center justify-between border-t border-[#bcd6fa]/40 pt-2 font-mono text-[11px]">
        <span className="font-bold transition-colors" style={{ color: stage.accent }}>
          {stage.actionLabel} →
        </span>
        <span className="text-[9px] text-mist uppercase tracking-wider group-hover:text-electric transition-colors">
          Direct Route ↗
        </span>
      </div>
    </Link>
  );
}

/* ---------- main section with Architected Nexus Connection Plan ---------- */

export default function TalentEcosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="talent-ecosystem"
      className="relative w-full overflow-hidden bg-canvas-alt border-y border-[#bcd6fa]/35 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      {/* ambient background lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(188,214,250,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(188,214,250,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-[1180px]">
        {/* header with smooth entrance fade */}
        <div
          className={`mx-auto flex max-w-3xl flex-col items-center text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-3.5 py-1 font-mono text-[10.5px] font-medium tracking-[0.14em] uppercase text-electric shadow-[0_2px_10px_-2px_rgba(10,132,255,0.2)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
            Candidate Talent Network
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#0a1428] sm:text-4xl lg:text-[38px] leading-[1.12] line-clamp-2 text-balance">
            The Global{" "}
            <span className="text-electric">
              Talent Ecosystem
            </span>
          </h2>
          <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-[#3d4c68] sm:text-[16px]">
            Upload your resume, leverage AI to build an ATS-ready profile, and let enterprise opportunities find you.
          </p>
        </div>

        {/* ==================== DESKTOP VIEW (>= lg) ==================== */}
        <div className="relative mx-auto mt-12 hidden max-w-[1040px] lg:block">
          {/* 2x2 Features Grid: Standardized, Compact, and Aligned */}
          <div className="grid grid-cols-2 gap-x-32 gap-y-16">
            <FeatureItem stage={STAGES[0]} index={0} isVisible={isVisible} />
            <FeatureItem stage={STAGES[1]} index={1} isVisible={isVisible} />
            <FeatureItem stage={STAGES[2]} index={2} isVisible={isVisible} />
            <FeatureItem stage={STAGES[3]} index={3} isVisible={isVisible} />
          </div>

          {/* Central Nexus System: Fixed-Ratio Center Bridge Anchored Exactly to the 4 Card Corners */}
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-20 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ width: "300px", height: "220px" }}
          >
            {/* SVG Laser Conduit Tracks Connecting Center to the 4 Inner Corners with Sub-Pixel Precision */}
            <svg
              viewBox="0 0 300 220"
              className="absolute inset-0 h-full w-full overflow-visible"
              fill="none"
            >
              <defs>
                {/* Gradients tailored to each conduit */}
                <linearGradient id="nexus-tl" x1="150" y1="110" x2="86" y2="78" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="nexus-tr" x1="150" y1="110" x2="214" y2="78" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="nexus-bl" x1="150" y1="110" x2="86" y2="142" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="nexus-br" x1="150" y1="110" x2="214" y2="142" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#e97e13" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.85" />
                </linearGradient>
              </defs>

              {/* Concentric Telemetry Radar Rings */}
              <circle cx="150" cy="110" r="42" stroke="#bcd6fa" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.6" />
              <circle cx="150" cy="110" r="28" stroke="#bcd6fa" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.35" />

              {/* CONDUIT 1: Center -> Card 1 (Top-Left) Inner Corner (86, 78) */}
              <line x1="150" y1="110" x2="86" y2="78" stroke="#0a84ff" strokeWidth="5" strokeOpacity="0.12" />
              <line x1="150" y1="110" x2="86" y2="78" stroke="url(#nexus-tl)" strokeWidth="2" strokeDasharray="4 4" className="te-flow-fast" />
              {/* Card 1 Docking Terminal Node */}
              <polygon points="86,74 90,78 86,82 82,78" fill="#0a84ff" />
              <circle cx="86" cy="78" r="5" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
              <circle cx="86" cy="78" r="8" stroke="#0a84ff" strokeWidth="1" className="te-ping-small" style={{ transformOrigin: "86px 78px" }} />

              {/* CONDUIT 2: Center -> Card 2 (Top-Right) Inner Corner (214, 78) */}
              <line x1="150" y1="110" x2="214" y2="78" stroke="#8b5cf6" strokeWidth="5" strokeOpacity="0.12" />
              <line x1="150" y1="110" x2="214" y2="78" stroke="url(#nexus-tr)" strokeWidth="2" strokeDasharray="4 4" className="te-flow-fast" />
              {/* Card 2 Docking Terminal Node */}
              <polygon points="214,74 218,78 214,82 210,78" fill="#8b5cf6" />
              <circle cx="214" cy="78" r="5" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
              <circle cx="214" cy="78" r="8" stroke="#8b5cf6" strokeWidth="1" className="te-ping-small" style={{ transformOrigin: "214px 78px" }} />

              {/* CONDUIT 3: Center -> Card 3 (Bottom-Left) Inner Corner (86, 142) */}
              <line x1="150" y1="110" x2="86" y2="142" stroke="#0d9488" strokeWidth="5" strokeOpacity="0.12" />
              <line x1="150" y1="110" x2="86" y2="142" stroke="url(#nexus-bl)" strokeWidth="2" strokeDasharray="4 4" className="te-flow-fast" />
              {/* Card 3 Docking Terminal Node */}
              <polygon points="86,138 90,142 86,146 82,142" fill="#0d9488" />
              <circle cx="86" cy="142" r="5" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
              <circle cx="86" cy="142" r="8" stroke="#0d9488" strokeWidth="1" className="te-ping-small" style={{ transformOrigin: "86px 142px" }} />

              {/* CONDUIT 4: Center -> Card 4 (Bottom-Right) Inner Corner (214, 142) */}
              <line x1="150" y1="110" x2="214" y2="142" stroke="#e97e13" strokeWidth="5" strokeOpacity="0.12" />
              <line x1="150" y1="110" x2="214" y2="142" stroke="url(#nexus-br)" strokeWidth="2" strokeDasharray="4 4" className="te-flow-fast" />
              {/* Card 4 Docking Terminal Node */}
              <polygon points="214,138 218,142 214,146 210,142" fill="#e97e13" />
              <circle cx="214" cy="142" r="5" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
              <circle cx="214" cy="142" r="8" stroke="#e97e13" strokeWidth="1" className="te-ping-small" style={{ transformOrigin: "214px 142px" }} />
            </svg>

            {/* Central High-Tech Logo Core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
              <div className="group relative flex h-[68px] w-[68px] items-center justify-center rounded-full border border-electric/30 bg-white/95 p-3.5 shadow-[0_12px_36px_-6px_rgba(10,132,255,0.35)] backdrop-blur-md transition-transform duration-300 hover:scale-105">
                {/* Outer Counter-Rotating Dashed Telemetry Ring */}
                <div className="pointer-events-none absolute inset-[-12px] rounded-full border border-dashed border-electric/35 te-spin-reverse" />
                
                {/* Intermediate Compass Orbit Ring with 4 Sector Colored Nodes */}
                <div className="pointer-events-none absolute inset-[-5px] rounded-full border border-electric/25 te-spin-slow">
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#0a84ff] shadow-[0_0_6px_#0a84ff]" />
                  <span className="absolute top-1/2 -right-1 -translate-y-1/2 h-2 w-2 rounded-full bg-[#8b5cf6] shadow-[0_0_6px_#8b5cf6]" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#e97e13] shadow-[0_0_6px_#e97e13]" />
                  <span className="absolute top-1/2 -left-1 -translate-y-1/2 h-2 w-2 rounded-full bg-[#0d9488] shadow-[0_0_6px_#0d9488]" />
                </div>

                {/* Ambient Colored Radial Aura */}
                <div className="pointer-events-none absolute inset-[-3px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.2),transparent_70%)] blur-sm" />
                
                {/* Pepoltek Icon */}
                <Image
                  src="/assets/pepoltek/pepoltek_icon.png"
                  alt="Pepoltek Core"
                  width={34}
                  height={34}
                  className="relative z-10 h-auto w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ==================== MOBILE / TABLET VIEW (< lg) ==================== */}
        <div className="relative mx-auto mt-12 max-w-[540px] pl-10 sm:pl-16 pr-2 lg:hidden">
          {/* Continuous Left-Side Vertical Rail SVG Spine */}
          <div className="pointer-events-none absolute left-3 sm:left-5 top-0 bottom-0 w-8">
            <svg viewBox="0 0 32 1000" className="h-full w-full overflow-visible" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient id="m-rail-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a84ff" />
                  <stop offset="33%" stopColor="#8b5cf6" />
                  <stop offset="66%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#e97e13" />
                </linearGradient>
              </defs>

              <line x1="16" y1="20" x2="16" y2="980" stroke="url(#m-rail-grad)" strokeWidth="6" opacity="0.12" />
              <line x1="16" y1="20" x2="16" y2="980" stroke="url(#m-rail-grad)" strokeWidth="2.2" strokeDasharray="6 6" className="te-flow-fast" />
              <line x1="12" y1="20" x2="12" y2="980" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 8" opacity="0.4" />
            </svg>
          </div>

          {/* Top 45-Degree Diamond Pepoltek Icon Box */}
          <div className="absolute -top-7 left-3 sm:left-5 -translate-x-1/2 z-20">
            <div className="relative flex h-11 w-11 rotate-45 items-center justify-center rounded-lg border border-electric/40 bg-white/95 shadow-[0_6px_22px_rgba(10,132,255,0.35)] backdrop-blur-md">
              <div className="pointer-events-none absolute inset-[-5px] rounded-lg border border-dashed border-electric/40 te-spin-slow" />
              <div className="pointer-events-none absolute inset-[-2px] rounded-lg bg-[radial-gradient(circle,rgba(10,132,255,0.2),transparent_70%)] blur-sm" />
              <Image
                src="/assets/pepoltek/pepoltek_icon.png"
                alt="Pepoltek Icon"
                width={22}
                height={22}
                className="-rotate-45 object-contain"
              />
            </div>
          </div>

          {/* Bottom 45-Degree Diamond Terminal Anchor */}
          <div className="absolute -bottom-6 left-3 sm:left-5 -translate-x-1/2 z-20">
            <div className="relative flex h-8 w-8 rotate-45 items-center justify-center rounded-md border border-[#e97e13]/40 bg-white/95 shadow-[0_4px_16px_rgba(233,126,19,0.3)]">
              <div className="h-2.5 w-2.5 rounded-full bg-[#e97e13] -rotate-45 shadow-[0_0_6px_#e97e13]" />
            </div>
          </div>

          {/* 4 Standardized Feature Cards connected via Left Branch Lines (|----) */}
          <div className="flex flex-col gap-8 sm:gap-10 pt-8 pb-8">
            {STAGES.map((stage, idx) => (
              <div key={stage.n} className="relative">
                {/* Horizontal branch conduit (|----) from left rail to card */}
                <div className="pointer-events-none absolute -left-7 sm:-left-11 top-[24px] -translate-y-1/2 w-7 sm:w-11">
                  <svg viewBox="0 0 44 20" className="h-5 w-full overflow-visible" fill="none">
                    <polygon points="0,10 4,6 8,10 4,14" fill={stage.accent} />
                    <circle cx="4" cy="10" r="7" stroke={stage.accent2} strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
                    <line x1="8" y1="10" x2="40" y2="10" stroke={stage.accent} strokeWidth="2" strokeDasharray="4 4" className="te-flow-fast" />
                    <circle cx="40" cy="10" r="3.5" fill={stage.accent} />
                    <circle cx="40" cy="10" r="8" stroke={stage.accent2} strokeWidth="1.2" className="te-ping-small" style={{ transformOrigin: "40px 10px" }} />
                  </svg>
                </div>

                {/* The Unified Feature Card */}
                <FeatureItem stage={stage} index={idx} isVisible={isVisible} />
              </div>
            ))}
          </div>
        </div>

        {/* compact bottom actions strip */}
        <div
          className={`mt-12 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <Link
            href="/career/upload_cv/"
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-ink px-6 py-3 font-display text-sm font-bold text-white shadow-[0_8px_20px_-4px_rgba(10,20,40,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric hover:shadow-[0_12px_28px_-6px_rgba(10,132,255,0.5)] active:translate-y-0 cursor-pointer"
          >
            <span>Upload CV &amp; Parse Profile</span>
            <AnimatedChevrons size={13} count={3} />
          </Link>
          <Link
            href="/talents/reverse-search/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/80 px-5 py-3 font-display text-xs font-semibold text-[#0a1428] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:text-electric"
          >
            Explore Live Pipelines
          </Link>
        </div>
      </div>

      {/* scoped animations */}
      <style>{`
        .te-flow-fast {
          animation: teFlowDash 1.6s linear infinite;
        }
        @keyframes teFlowDash {
          from { stroke-dashoffset: 16; }
          to { stroke-dashoffset: 0; }
        }
        .te-spin-slow {
          animation: teSpin 12s linear infinite;
          transform-origin: center;
        }
        .te-spin-reverse {
          animation: teSpinRev 16s linear infinite;
          transform-origin: center;
        }
        @keyframes teSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes teSpinRev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .te-ping-small {
          animation: tePing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes tePing {
          0% { transform: scale(0.8); opacity: 0.8; }
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }
        .te-scanline {
          animation: teScanlineAnim 2.6s ease-in-out infinite;
        }
        @keyframes teScanlineAnim {
          0%, 100% { top: 22px; opacity: 0.3; }
          50% { top: 82px; opacity: 0.95; }
        }
        @media (prefers-reduced-motion: reduce) {
          .te-flow-fast, .te-spin-slow, .te-spin-reverse, .te-ping-small, .te-scanline {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
