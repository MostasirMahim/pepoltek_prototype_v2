"use client";

import React from "react";

/* =====================================================================
   FULL-WIDTH: Cost & Velocity Comparison Grid from Audit Spec Section 4
   Superb Standard Graphically Crafted Benchmark Card
   ===================================================================== */
export default function PerformanceBenchmark() {
  return (
    <div id="cost-velocity-comparison" className="mt-10 sm:mt-12 w-full">
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
  );
}
