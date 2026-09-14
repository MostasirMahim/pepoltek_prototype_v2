"use client";

import React from "react";
import Link from "next/link";

/* ==========================================================================
   COMMERCIAL ENGAGEMENT MODELS MASTER DATA
   ========================================================================== */
interface CommercialModel {
  tag: string;
  name: string;
  category: string;
  categoryType: "executive" | "squads" | "compliance";
  desc: string;
  metric: string;
  metricLabel: string;
  termsLabel: string;
  rateTerms: string;
  guarantee: string;
  featured?: boolean;
  accent: "blue" | "green" | "purple";
  bullets: string[];
}

const COMMERCIAL_MODELS: CommercialModel[] = [
  {
    tag: "01",
    name: "Direct Hire Placement",
    category: "EXECUTIVE & SPECIALIST",
    categoryType: "executive",
    desc: "Contingency & retained hiring for senior engineering, product, and clinical leaders.",
    metric: "12%",
    metricLabel: "CFTT FEE",
    termsLabel: "COMPLETION TIME",
    rateTerms: "Standard 15% to 20% first-year comp...",
    guarantee: "90-Day Candidate Replacement Guarantee",
    accent: "blue",
    bullets: [
      "Rigorous technical code audits and credentialing",
      "Executive panel interviews and evaluations",
      "Offer negotiation and compensation benchmarking",
    ],
  },
  {
    tag: "02",
    name: "Staff Augmentation",
    category: "TALENT / INTEGRATED SQUADS",
    categoryType: "squads",
    desc: "Dedicated engineering and healthcare pods, embedded in your sprint workflow.",
    metric: "2 wk",
    metricLabel: "MIN. HIRE",
    termsLabel: "DURATION",
    rateTerms: "Transparent monthly or hourly sprint ba...",
    guarantee: "2-Week Risk-Free Trial (50% of tournament fee)",
    featured: true,
    accent: "green",
    bullets: [
      "Pre-vetted engineering and clinical specialists",
      "Guaranteed 4 to 6 hour daily operational overlap",
      "Immediate sprint deployment in 2 to 7 days",
    ],
  },
  {
    tag: "03",
    name: "Employer of Record (EOR)",
    category: "GLOBAL PAYROLL & COMPLIANCE",
    categoryType: "compliance",
    desc: "Hire across 15+ countries with complete payroll, tax, and labor compliance.",
    metric: "15+",
    metricLabel: "COUNTRIES",
    termsLabel: "COMPLIANCE TERMS",
    rateTerms: "Localized payroll, benefits, and tax withholding...",
    guarantee: "100% Statutory Compliance Ownership",
    accent: "purple",
    bullets: [
      "Localized employment contracts and IP protection",
      "Automated multi-currency salary disbursements",
      "Statutory health, pension, and local benefits",
    ],
  },
];

/* Helper Icon Components */
function CategoryIcon({ type }: { type: CommercialModel["categoryType"] }) {
  if (type === "executive") {
    return (
      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  }
  if (type === "squads") {
    return (
      <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }
  return (
    <svg className="w-3.5 h-3.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MainModelIcon({ accent }: { accent: CommercialModel["accent"] }) {
  if (accent === "blue") {
    return (
      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#0070f3] to-[#00b4d8] flex items-center justify-center text-white shadow-md shadow-sky-500/25 shrink-0">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="8" />
          <line x1="12" y1="2" x2="12" y2="6" strokeLinecap="round" />
          <line x1="12" y1="18" x2="12" y2="22" strokeLinecap="round" />
          <line x1="2" y1="12" x2="6" y2="12" strokeLinecap="round" />
          <line x1="18" y1="12" x2="22" y2="12" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (accent === "green") {
    return (
      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#059669] to-[#10b981] flex items-center justify-center text-white shadow-md shadow-emerald-500/25 shrink-0">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white shadow-md shadow-purple-500/25 shrink-0">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    </div>
  );
}

/* ==========================================================================
   PRIMARY EXPORT: BLUSH SURFACE + COMMERCIAL_BG.PNG SHAPES DESIGN
   ========================================================================== */
export default function CommercialTerms() {
  return (
    <section
      id="commercial-terms"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-[#f3f8ff] to-[#e8f1fd] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
    >
      {/* Bottom Atmosphere Wave Graphic */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 w-full select-none z-0">
        <img
          src="/backgrounds/commercial_wave.png"
          alt=""
          className="w-full h-24 sm:h-32 object-cover object-bottom opacity-75"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Decorative Dot Matrix Grids near the bottom corners */}
        <div className="pointer-events-none absolute bottom-2 left-2 hidden sm:grid grid-cols-4 gap-2.5 opacity-35 z-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#0080ff]" />
          ))}
        </div>
        <div className="pointer-events-none absolute bottom-2 right-2 hidden sm:grid grid-cols-4 gap-2.5 opacity-35 z-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#0080ff]" />
          ))}
        </div>

        {/* Section Header */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-sky-50/90 px-4 py-1 font-sans text-xs font-bold text-sky-600 shadow-sm backdrop-blur-sm tracking-wider uppercase">
            <span className="text-sky-500 text-[10px]">✦</span>
            <span>Commercial Engagement Terms</span>
            <span className="text-sky-500 text-[10px]">✦</span>
          </div>

          {/* Main Heading */}
          <h2 className="mt-3.5 font-display text-2xl sm:text-3xl lg:text-[36px] font-extrabold tracking-tight leading-[1.15] text-balance">
            <span className="text-[#0066ff]">Flexible</span>{" "}
            <span className="text-[#0a1428]">Commercial Models &amp; Risk-Free Guarantees</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl text-center leading-relaxed">
            Terms engineered to de-risk every hire. Three transparent engagement models with backed replacement and trial guarantees.
          </p>
        </div>

        {/* 3-Column Light Card Grid */}
        <div className="relative z-10 mt-8 sm:mt-10 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 items-stretch">
          {COMMERCIAL_MODELS.map((model) => {
            const isBlue = model.accent === "blue";
            const isGreen = model.accent === "green";
            const isPurple = model.accent === "purple";

            return (
              <div
                key={model.tag}
                className={`relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-5 sm:p-6 backdrop-blur-md bg-white/95 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  isGreen
                    ? "border-2 border-[#10b981]/90 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.22)]"
                    : isBlue
                    ? "border border-sky-200/90 shadow-[0_20px_50px_-15px_rgba(14,165,233,0.16)]"
                    : "border border-purple-200/90 shadow-[0_20px_50px_-15px_rgba(139,92,246,0.16)]"
                }`}
              >
                <div>
                  {/* Top Row: Model Tag & Category */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full font-sans text-[11px] font-bold tracking-wide ${
                        isBlue
                          ? "bg-[#e0f2fe] text-[#0284c7]"
                          : isGreen
                          ? "bg-[#dcfce7] text-[#059669]"
                          : "bg-[#ede9fe] text-[#7c3aed]"
                      }`}
                    >
                      Model {model.tag}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <CategoryIcon type={model.categoryType} />
                      <span
                        className={`font-sans text-[10px] font-bold uppercase tracking-wider ${
                          isBlue
                            ? "text-slate-600"
                            : isGreen
                            ? "text-[#059669]"
                            : "text-[#7c3aed]"
                        }`}
                      >
                        {model.category}
                      </span>
                    </div>
                  </div>

                  {/* Main Title & Description Row */}
                  <div className="mt-4 flex items-start gap-3">
                    <MainModelIcon accent={model.accent} />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-tight tracking-tight">
                        {model.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed min-h-[32px]">
                        {model.desc}
                      </p>
                    </div>
                  </div>

                  {/* Split Commercial Terms & Highlight Metric Row */}
                  <div className="mt-4 flex items-stretch gap-2">
                    {/* Left Box: Terms */}
                    <div
                      className={`flex-1 rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2 border min-w-0 ${
                        isBlue
                          ? "bg-[#f0f9ff]/90 border-[#bae6fd]"
                          : isGreen
                          ? "bg-[#f0fdf4]/90 border-[#bbf7d0]"
                          : "bg-[#faf5ff]/90 border-[#e9d5ff]"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <svg
                          className={`w-4 h-4 shrink-0 ${
                            isBlue ? "text-[#0284c7]" : isGreen ? "text-[#059669]" : "text-[#7c3aed]"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <div className="min-w-0">
                          <span className="block font-sans text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-none">
                            {model.termsLabel}
                          </span>
                          <p className="mt-1 text-[11px] sm:text-xs font-semibold text-slate-700 truncate leading-tight">
                            {model.rateTerms}
                          </p>
                        </div>
                      </div>
                      <span className="text-slate-400 text-xs font-bold shrink-0 ml-1">›</span>
                    </div>

                    {/* Right Box: Highlight Metric */}
                    <div
                      className={`rounded-xl px-3 py-2 flex flex-col items-center justify-center shrink-0 min-w-[72px] sm:min-w-[76px] text-center border ${
                        isBlue
                          ? "bg-[#e0f2fe]/95 border-[#bae6fd]"
                          : isGreen
                          ? "bg-[#dcfce7]/95 border-[#bbf7d0]"
                          : "bg-[#ede9fe]/95 border-[#e9d5ff]"
                      }`}
                    >
                      <div
                        className={`font-display text-base sm:text-lg font-extrabold leading-none ${
                          isBlue
                            ? "text-[#0284c7]"
                            : isGreen
                            ? "text-[#059669]"
                            : "text-[#7c3aed]"
                        }`}
                      >
                        {model.metric}
                      </div>
                      <div
                        className={`mt-1 font-sans text-[8.5px] uppercase tracking-wider font-bold leading-none ${
                          isBlue
                            ? "text-[#0284c7]"
                            : isGreen
                            ? "text-[#059669]"
                            : "text-[#7c3aed]"
                        }`}
                      >
                        {model.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Full-Width Risk-Free Guarantee Pill */}
                  <div
                    className={`mt-2.5 rounded-xl px-3.5 py-2 flex items-center justify-between gap-2 border ${
                      isBlue
                        ? "bg-[#f0f9ff] border-[#bae6fd]"
                        : isGreen
                        ? "bg-[#f0fdf4] border-[#bbf7d0]"
                        : "bg-[#faf5ff] border-[#e9d5ff]"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <svg
                        className={`w-4 h-4 shrink-0 ${
                          isBlue ? "text-[#0284c7]" : isGreen ? "text-[#059669]" : "text-[#7c3aed]"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span
                        className={`font-sans text-[11px] sm:text-xs font-semibold truncate ${
                          isBlue
                            ? "text-[#0284c7]"
                            : isGreen
                            ? "text-[#059669]"
                            : "text-[#7c3aed]"
                        }`}
                      >
                        {model.guarantee}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold shrink-0 ${
                        isBlue
                          ? "text-[#0284c7]/70"
                          : isGreen
                          ? "text-[#059669]/70"
                          : "text-[#7c3aed]/70"
                      }`}
                    >
                      ›
                    </span>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    {model.bullets.map((b) => (
                      <div key={b} className="flex items-center gap-2 text-[11.5px] sm:text-xs text-slate-700 leading-snug">
                        <span
                          className={`font-bold text-xs shrink-0 ${
                            isBlue
                              ? "text-[#0070f3]"
                              : isGreen
                              ? "text-[#059669]"
                              : "text-[#7c3aed]"
                          }`}
                        >
                          ✓
                        </span>
                        <span className="truncate">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Row */}
        <div className="relative z-10 mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0066ff] to-[#00d4aa] px-7 py-3 font-display text-xs sm:text-sm font-bold text-white shadow-[0_10px_25px_-5px_rgba(0,102,255,0.4)] transition-all duration-200 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Request Commercial Proposal</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 rounded-full border border-sky-300/80 bg-white/95 px-7 py-3 font-display text-xs sm:text-sm font-bold text-[#0a2540] shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:border-sky-400 hover:shadow-md cursor-pointer"
          >
            <svg className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>View Contract Frameworks</span>
            <span className="transition-transform group-hover:translate-x-1 text-sky-600">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Retained legacy dark component for archival/reference */
export function CommercialTermsDark() {
  return null;
}
