"use client";

import React from "react";
import Link from "next/link";

const COMMERCIAL_MODELS = [
  {
    tag: "01",
    name: "Direct Hire & Permanent Placement",
    badge: "Contingency / Retained",
    fee: "Standard 15% to 20% first-year annual compensation.",
    highlight: "Market entry rate: 12% for initial 3 hires.",
    guarantee: "90-Day Placement Replacement Guarantee.",
    metric: "12%",
    metricLabel: "Entry Rate",
    bullets: [
      "Rigorous technical & clinical screening",
      "Executive panel interview orchestration",
      "Offer negotiation & resignation coaching",
    ],
  },
  {
    tag: "02",
    name: "IT & Healthcare Staff Augmentation",
    badge: "Turnkey Squads",
    fee: "Transparent hourly or monthly billing per deployed specialist.",
    highlight: "10% rate reduction on 6-month squad commitments.",
    guarantee: "2-Week Risk-Free Trial: $0 billed if benchmarks fail.",
    metric: "2 wk",
    metricLabel: "Risk-Free Trial",
    featured: true,
    bullets: [
      "Pre-vetted engineering & clinical specialists",
      "Guaranteed 4-6 hour daily operational overlap",
      "Immediate sprint deployment in 2 to 7 days",
    ],
  },
  {
    tag: "03",
    name: "Employer of Record (EOR) & Payroll",
    badge: "Global Infrastructure",
    fee: "Complete localized payroll, tax withholding, and labor compliance.",
    highlight: "Single global contract across 15+ operating countries.",
    guarantee: "Full compliance ownership with zero legal entity setup.",
    metric: "15+",
    metricLabel: "Countries",
    bullets: [
      "Localized employment contracts & IP protection",
      "Automated multi-currency salary disbursement",
      "Statutory benefits & localized health coverage",
    ],
  },
];

export default function CommercialTerms() {
  return (
    <section
      id="commercial-terms"
      className="relative w-full bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Banner Shell */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-[#0a1428] via-[#0d2247] to-[#0a4d9c] p-7 sm:p-10 lg:p-14 shadow-[0_40px_100px_-30px_rgba(10,20,40,0.65)]">
          {/* Subtle Ambient Grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1.4px)] [background-size:26px_26px]" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.3),transparent_65%)] blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.35),transparent_65%)] blur-3xl" />

          {/* Header */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-bright" />
              Commercial Engagement Terms
            </div>

            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.12]">
              Flexible Commercial Models &amp; Risk-Free Guarantees
            </h2>

            <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
              Terms engineered to de-risk every hire. Compare our three core engagement structures side-by-side with backed replacement and trial guarantees.
            </p>
          </div>

          {/* 3-Column Permanent Side-by-Side Flex/Grid Layout (No Tabs) */}
          <div className="relative z-10 mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {COMMERCIAL_MODELS.map((model) => (
              <div
                key={model.tag}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 ${
                  model.featured
                    ? "border-2 border-electric-bright bg-white/[0.14] shadow-[0_20px_50px_-15px_rgba(56,189,248,0.4)]"
                    : "border border-white/15 bg-white/[0.08] hover:border-white/30"
                }`}
              >
                {/* Featured Tag */}
                {model.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-electric-bright px-3.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink shadow-md">
                    Most Popular Sourcing Model
                  </div>
                )}

                <div>
                  {/* Top Row: Tag, Badge & Metric */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-electric-bright">
                        Model {model.tag}
                      </span>
                      <span className="ml-2 rounded-md bg-white/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-white/80">
                        {model.badge}
                      </span>
                      <h3 className="mt-2 font-display text-lg sm:text-xl font-bold text-white leading-snug">
                        {model.name}
                      </h3>
                    </div>

                    <div className="shrink-0 rounded-xl border border-white/20 bg-electric/25 px-3 py-2 text-center">
                      <div className="font-display text-2xl font-extrabold text-white leading-none">
                        {model.metric}
                      </div>
                      <div className="mt-1 font-mono text-[8.5px] uppercase tracking-wider text-white/70">
                        {model.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Fee & Guarantee Specs */}
                  <div className="mt-6 space-y-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-white/60">
                        Fee Structure
                      </span>
                      <p className="mt-1 text-xs sm:text-[13px] font-medium text-white/90 leading-snug">
                        {model.fee}
                      </p>
                    </div>

                    <div className="rounded-xl border border-electric-bright/30 bg-electric/15 p-3">
                      <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-electric-bright font-semibold">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                        Risk-Free Guarantee
                      </div>
                      <p className="mt-1 text-xs sm:text-[13px] font-semibold text-white leading-snug">
                        {model.guarantee}
                      </p>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                    {model.bullets.map((b) => (
                      <div key={b} className="flex items-center gap-2 text-xs text-white/80">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-electric-bright shrink-0">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Highlight */}
                <div className="mt-6 pt-3 border-t border-white/10 text-[11.5px] text-white/75 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-electric-bright shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>{model.highlight}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Row */}
          <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-display text-sm font-bold text-ink shadow-[0_12px_30px_-8px_rgba(255,255,255,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95"
            >
              Request Commercial Proposal
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-display text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50"
            >
              View Contract Frameworks
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
