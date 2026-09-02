"use client";

import React from "react";
import Link from "next/link";
import CursorGrid from "@/components/CursorGrid";
import { ArrowRight } from "@/components/ui/Icons";

interface StatItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ActionItem {
  label: string;
  href: string;
  primary?: boolean;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlightedText?: string;
  description: string;
  stats?: StatItem[];
  actions?: ActionItem[];
  proofPills?: string[];
}

export default function PageHero({
  eyebrow,
  title,
  highlightedText,
  description,
  stats = [],
  actions = [],
  proofPills = [],
}: PageHeroProps) {
  return (
    <div className="relative w-full overflow-hidden bg-canvas border-b border-[#bcd6fa]/40 pt-10 pb-14 sm:pt-14 sm:pb-18 lg:pt-16 lg:pb-20">
      {/* Background Volumetric Radiance */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute right-[-5%] top-[5%] h-[480px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.14)_0%,rgba(56,189,248,0.06)_50%,transparent_70%)] blur-3xl" />
        <div className="absolute left-[-10%] bottom-[-10%] h-[380px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.08)_0%,transparent_65%)] blur-3xl" />
      </div>

      {/* Ambient Grid Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
        <CursorGrid
          cellSize={60}
          color="#0a84ff"
          radius={160}
          falloff="smooth"
          holdTime={400}
          fadeDuration={700}
          lineWidth={1.1}
          maxOpacity={0.65}
          fillOpacity={0.04}
          gridOpacity={0.035}
          cellRadius={5}
          clickPulse
          pulseSpeed={600}
          ambient={true}
          ambientDensity={0.2}
          ambientMaxAlpha={0.3}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Main Copy Side */}
          <div className={`${stats.length > 0 ? "lg:col-span-8" : "lg:col-span-10 max-w-3xl"}`}>
            {/* Pulsating Eyebrow */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-electric/30 bg-white/80 px-3.5 py-1 backdrop-blur-xs shadow-2xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-electric shadow-[0_0_8px_2px_rgba(10,132,255,0.6)]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                {eyebrow}
              </span>
            </div>

            {/* Headline with Sora + Highlight */}
            <h1 className="mt-4 sm:mt-5 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.16]">
              <span className="block text-ink">{title}</span>
              {highlightedText && (
                <span className="relative inline-block mt-1 sm:mt-1.5 pb-2.5 sm:pb-3">
                  <span className="bg-gradient-to-r from-electric via-[#2563eb] to-electric-bright bg-clip-text text-transparent">
                    {highlightedText}
                  </span>
                  {/* Exact hand-drawn pen curve matching Hero component */}
                  <svg
                    className="pointer-events-none absolute -bottom-2.5 left-0 w-full overflow-visible sm:-bottom-3"
                    viewBox="0 0 340 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 3 13 C 50 3, 120 17, 190 6.5 C 245 4, 290 14, 337 4.5"
                      stroke="url(#hero-pen-underline-page)"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient id="hero-pen-underline-page" x1="0" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#0a1428" />
                        <stop offset="55%" stopColor="#0a84ff" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              )}
            </h1>

            {/* Subtitle in clean, natural Inter text (NOT thick monospace) */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-ink-soft font-normal leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* CTA Buttons */}
            {actions.length > 0 && (
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                {actions.map((act) =>
                  act.primary ? (
                    <Link
                      key={act.label}
                      href={act.href}
                      className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 font-display text-xs sm:text-sm font-bold text-white shadow-[0_8px_24px_-6px_rgba(10,20,40,0.4)] transition-all hover:-translate-y-0.5 hover:bg-electric hover:shadow-[0_12px_28px_-6px_rgba(10,132,255,0.5)] active:translate-y-0 cursor-pointer"
                    >
                      <span>{act.label}</span>
                      <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <Link
                      key={act.label}
                      href={act.href}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/90 px-5 py-3 font-display text-xs sm:text-sm font-semibold text-ink shadow-2xs backdrop-blur-xs transition-all hover:border-electric/60 hover:bg-white hover:text-electric cursor-pointer"
                    >
                      <span>{act.label}</span>
                      <span className="text-electric">→</span>
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          {/* Right Telemetry Cards with Spread Alignment Pattern */}
          {stats.length > 0 && (
            <div className="lg:col-span-4 flex flex-col gap-3.5 sm:gap-4">
              {stats.map((st, i) => {
                const spreadTransforms = [
                  "-rotate-1 sm:-rotate-1.5 -translate-x-1 sm:-translate-x-2",
                  "rotate-0 translate-x-1 sm:translate-x-2",
                  "rotate-1 sm:rotate-1.5 translate-x-2 sm:translate-x-4",
                ];

                return (
                  <div
                    key={st.label}
                    className={`flex items-center gap-4 rounded-2xl border border-[#bcd6fa] bg-white/95 p-4 sm:p-5 shadow-[0_10px_32px_-12px_rgba(10,132,255,0.18)] backdrop-blur-md transition-all duration-200 hover:border-electric/70 hover:shadow-md ${spreadTransforms[i % 3]}`}
                  >
                    {st.icon && (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-electric/25 bg-electric/10 text-electric shadow-2xs">
                        {st.icon}
                      </div>
                    )}
                    <div>
                      <div className="font-display text-2xl font-extrabold text-ink">{st.value}</div>
                      <div className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                        {st.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Proof Pills Ribbon */}
        {proofPills.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-[#bcd6fa]/40 pt-5">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-mist mr-2">
              Verified Specs:
            </span>
            {proofPills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#bcd6fa]/60 bg-white/70 px-3 py-1 font-mono text-[11px] font-medium text-ink-soft backdrop-blur-2xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                {pill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
