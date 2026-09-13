"use client";

import React, { useState, useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { MagicBento, ParticleCard } from "@/components/ui/MagicBento";

/* ---------- in-view hook ---------- */
function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          if (once) io.disconnect();
        } else if (!once) setSeen(false);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return { ref, seen };
}

/* ---------- animated number counter ---------- */
function Counter({
  to,
  seen,
  prefix = "",
  suffix = "",
}: {
  to: number;
  seen: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return (
    <span>
      {prefix}
      {val.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* ---------- delivery pod regions: 7 global time zones encircling the pod ---------- */
interface PodRegion {
  id: string;
  country: string;
  label: string;
  tz: string;
  x: number;
  y: number;
  arcPath: string;
  labelY: number;
  tzY: number;
  isTop: boolean;
}

const POD_REGIONS: PodRegion[] = [
  {
    id: "usa",
    country: "USA",
    label: "N. America",
    tz: "EST (UTC-5)",
    x: 14,
    y: 13,
    arcPath: "M14 13 Q30 20 50 31",
    labelY: 5.5,
    tzY: 7.8,
    isTop: true,
  },
  {
    id: "eu",
    country: "Europe",
    label: "Europe",
    tz: "CET (UTC+1)",
    x: 38,
    y: 11,
    arcPath: "M38 11 Q44 20 50 31",
    labelY: 4,
    tzY: 6.2,
    isTop: true,
  },
  {
    id: "gcc",
    country: "GCC",
    label: "GCC",
    tz: "GST (UTC+4)",
    x: 62,
    y: 11,
    arcPath: "M62 11 Q56 20 50 31",
    labelY: 4,
    tzY: 6.2,
    isTop: true,
  },
  {
    id: "apac",
    country: "APAC",
    label: "APAC",
    tz: "JST (UTC+9)",
    x: 86,
    y: 13,
    arcPath: "M86 13 Q70 20 50 31",
    labelY: 5.5,
    tzY: 7.8,
    isTop: true,
  },
  {
    id: "latam",
    country: "LATAM",
    label: "LATAM",
    tz: "BRT (UTC-3)",
    x: 22,
    y: 49,
    arcPath: "M22 49 Q34 40 50 31",
    labelY: 57,
    tzY: 59.2,
    isTop: false,
  },
  {
    id: "india",
    country: "India",
    label: "India",
    tz: "IST (UTC+5:30)",
    x: 50,
    y: 53,
    arcPath: "M50 53 Q50 42 50 31",
    labelY: 61,
    tzY: 63.2,
    isTop: false,
  },
  {
    id: "singapore",
    country: "Singapore",
    label: "Singapore",
    tz: "SGT (UTC+8)",
    x: 78,
    y: 49,
    arcPath: "M78 49 Q66 40 50 31",
    labelY: 57,
    tzY: 59.2,
    isTop: false,
  },
];


/* ---------- dual sector data ---------- */
interface TrainingModule {
  title: string;
  body: string;
}

interface SectorTrack {
  id: "tech" | "health";
  label: string;
  sub: string;
  badge: string;
  acc: string;
  acc2: string;
  emblem: "code" | "health";
  readinessTitle: string;
  readinessDesc: string;
  modules: TrainingModule[];
  essentialTags: string[];
}

const SECTOR_TRACKS: SectorTrack[] = [
  {
    id: "tech",
    label: "Technology & SDLC",
    sub: "Capabilities",
    badge: "SDLC",
    acc: "#0a84ff",
    acc2: "#38bdf8",
    emblem: "code",
    readinessTitle: "Training & upskilling modules",
    readinessDesc: "Curated by in-house software engineers before any developer profile ships.",
    modules: [
      {
        title: "Technical Onboarding & Secure SDLC Bootcamps",
        body: "14-day intensive repository orientation, code quality reviews, architecture alignment, and automated AI interview screening.",
      },
      {
        title: "Enterprise Readiness & Timezone Collaboration",
        body: "Daily standup etiquette, BEI alignment, and synchronous 4 to 6 hours daily workflow training for global engineers.",
      },
    ],
    essentialTags: [
      "Next.js 15",
      "React",
      "TypeScript",
      "Go & Python",
      "AWS & K8s",
      "Zero-Trust",
      "W2 / C2C / 1099",
      "Visa Support",
    ],
  },
  {
    id: "health",
    label: "Healthcare & Clinical",
    sub: "Capabilities",
    badge: "CLINICAL",
    acc: "#0d9488",
    acc2: "#2dd4bf",
    emblem: "health",
    readinessTitle: "Clinical readiness & compliance",
    readinessDesc: "Curated by clinical operations directors and compliance leads before patient engagement.",
    modules: [
      {
        title: "HIPAA & Regulatory Compliance Upskilling",
        body: "Remote patient data security protocols, EMR/EHR safety frameworks (Epic, Cerner, FHIR v4), and BAA clearance certifications.",
      },
      {
        title: "Clinical Facility Readiness & Credentialing",
        body: "Facility credentialing logs, active medical license checks, and OIG/SAM background exclusion verification.",
      },
    ],
    essentialTags: [
      "Physicians & RNs",
      "ICU & Emergency",
      "Telehealth Ops",
      "Epic & Cerner",
      "FHIR v4 / HL7",
      "HIPAA Title II",
      "BAA Clearance",
      "Pre-Credentialed",
    ],
  },
];

/* ---------- animated emblem graphic ---------- */
function Emblem({ kind }: { kind: "code" | "health" }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      {/* rotating dashed orbital rings */}
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="var(--acc)"
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity="0.5"
        className="ds-spin-slow"
        style={{ transformOrigin: "60px 60px" }}
      />
      <circle
        cx="60"
        cy="60"
        r="40"
        fill="none"
        stroke="var(--acc2)"
        strokeWidth="1.2"
        strokeDasharray="1 7"
        className="ds-spin-rev"
        style={{ transformOrigin: "60px 60px" }}
      />
      <circle cx="60" cy="60" r="30" fill="color-mix(in srgb, var(--acc) 10%, transparent)" />
      <circle
        cx="60"
        cy="60"
        r="30"
        fill="none"
        stroke="var(--acc)"
        strokeWidth="1"
      />
      {/* orbiting node */}
      <g className="ds-spin-slow" style={{ transformOrigin: "60px 60px" }}>
        <circle cx="60" cy="8" r="3" fill="var(--acc2)" />
      </g>
      {/* center glyph */}
      {kind === "code" ? (
        <g stroke="var(--acc)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M50 50l-9 10 9 10" />
          <path d="M70 50l9 10-9 10" />
          <path d="M64 46l-8 28" stroke="var(--acc2)" />
        </g>
      ) : (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M60 44c-6-8-20-5-20 6 0 9 13 16 20 22 7-6 20-13 20-22 0-11-14-14-20-6z"
            stroke="var(--acc)"
            strokeWidth="2.4"
          />
          <path d="M50 62h6l3-6 4 10 3-4h4" stroke="var(--acc2)" strokeWidth="2.2" />
        </g>
      )}
    </svg>
  );
}

/* ---------- country flag badge renderer (no blue dots, authentic vector country icons) ---------- */
function CountryBadge({ r, i }: { r: PodRegion; i: number }) {
  const clipId = `flag-clip-${r.id}`;
  return (
    <g key={r.id}>
      {/* Crisp white bezel ring */}
      <circle cx={r.x} cy={r.y} r="3.7" fill="#ffffff" stroke="#bcd6fa" strokeWidth="0.35" />


      {/* Authentic Country Flag Vector clipped to circle */}
      <g clipPath={`url(#${clipId})`}>
        {r.id === "usa" && (
          <g transform={`translate(${r.x}, ${r.y})`}>
            <rect x="-3.8" y="-3.8" width="7.6" height="7.6" fill="#e11d48" />
            <rect x="-3.8" y="-2.6" width="7.6" height="1.1" fill="#ffffff" />
            <rect x="-3.8" y="-0.4" width="7.6" height="1.1" fill="#ffffff" />
            <rect x="-3.8" y="1.8" width="7.6" height="1.1" fill="#ffffff" />
            <rect x="-3.8" y="-3.8" width="4" height="4" fill="#1e3a8a" />
            <circle cx="-2.6" cy="-2.6" r="0.45" fill="#ffffff" />
            <circle cx="-1.2" cy="-2.6" r="0.45" fill="#ffffff" />
            <circle cx="-1.9" cy="-1.3" r="0.45" fill="#ffffff" />
            <circle cx="-3.2" cy="-1.3" r="0.45" fill="#ffffff" />
          </g>
        )}

        {r.id === "eu" && (
          <g transform={`translate(${r.x}, ${r.y})`}>
            <rect x="-3.8" y="-3.8" width="7.6" height="7.6" fill="#003399" />
            <circle cx="0" cy="-2.1" r="0.38" fill="#fbbf24" />
            <circle cx="1.5" cy="-1.5" r="0.38" fill="#fbbf24" />
            <circle cx="2.1" cy="0" r="0.38" fill="#fbbf24" />
            <circle cx="1.5" cy="1.5" r="0.38" fill="#fbbf24" />
            <circle cx="0" cy="2.1" r="0.38" fill="#fbbf24" />
            <circle cx="-1.5" cy="1.5" r="0.38" fill="#fbbf24" />
            <circle cx="-2.1" cy="0" r="0.38" fill="#fbbf24" />
            <circle cx="-1.5" cy="-1.5" r="0.38" fill="#fbbf24" />
          </g>
        )}

        {r.id === "gcc" && (
          <g transform={`translate(${r.x}, ${r.y})`}>
            <rect x="-3.8" y="-3.8" width="7.6" height="2.6" fill="#15803d" />
            <rect x="-3.8" y="-1.2" width="7.6" height="2.5" fill="#ffffff" />
            <rect x="-3.8" y="1.3" width="7.6" height="2.6" fill="#0f172a" />
            <rect x="-3.8" y="-3.8" width="2.4" height="7.6" fill="#dc2626" />
          </g>
        )}

        {r.id === "apac" && (
          <g transform={`translate(${r.x}, ${r.y})`}>
            <rect x="-3.8" y="-3.8" width="7.6" height="7.6" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.8" fill="#dc2626" />
          </g>
        )}

        {r.id === "latam" && (
          <g transform={`translate(${r.x}, ${r.y})`}>
            <rect x="-3.8" y="-3.8" width="7.6" height="7.6" fill="#16a34a" />
            <polygon points="0,-2.6 2.8,0 0,2.6 -2.8,0" fill="#eab308" />
            <circle cx="0" cy="0" r="1.3" fill="#1e40af" />
            <path d="M-1.1 0.2 Q0 -0.4 1.1 -0.1" stroke="#ffffff" strokeWidth="0.35" fill="none" />
          </g>
        )}

        {r.id === "india" && (
          <g transform={`translate(${r.x}, ${r.y})`}>
            <rect x="-3.8" y="-3.8" width="7.6" height="2.6" fill="#ea580c" />
            <rect x="-3.8" y="-1.2" width="7.6" height="2.5" fill="#ffffff" />
            <rect x="-3.8" y="1.3" width="7.6" height="2.6" fill="#15803d" />
            <circle cx="0" cy="0" r="1.0" fill="none" stroke="#1e3a8a" strokeWidth="0.3" />
            <circle cx="0" cy="0" r="0.3" fill="#1e3a8a" />
          </g>
        )}

        {r.id === "singapore" && (
          <g transform={`translate(${r.x}, ${r.y})`}>
            <rect x="-3.8" y="-3.8" width="7.6" height="3.8" fill="#dc2626" />
            <rect x="-3.8" y="0" width="7.6" height="3.8" fill="#ffffff" />
            <circle cx="-1.5" cy="-1.8" r="1.1" fill="#ffffff" />
            <circle cx="-1.1" cy="-1.8" r="0.95" fill="#dc2626" />
            <circle cx="-0.2" cy="-2.3" r="0.2" fill="#ffffff" />
            <circle cx="0.4" cy="-1.9" r="0.2" fill="#ffffff" />
            <circle cx="0.2" cy="-1.2" r="0.2" fill="#ffffff" />
            <circle cx="-0.4" cy="-1.3" r="0.2" fill="#ffffff" />
          </g>
        )}
      </g>

      {/* Front glass rim */}
      <circle cx={r.x} cy={r.y} r="3.6" fill="none" stroke="#0a84ff" strokeWidth="0.35" opacity="0.6" />

      {/* Region label */}
      <text
        x={r.x}
        y={r.labelY}
        textAnchor="middle"
        fontSize="2.4"
        fill="#0a1428"
        fontFamily="var(--font-sora), sans-serif"
        fontWeight="700"
      >
        {r.label}
      </text>
      {/* Timezone sub-label */}
      <text
        x={r.x}
        y={r.tzY}
        textAnchor="middle"
        fontSize="1.7"
        fill="#0a84ff"
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontWeight="600"
        opacity="0.9"
      >
        {r.tz}
      </text>
    </g>
  );
}

/* ---------- compact sector track card (Tech & Healthcare) with Bento hover styling ---------- */
function SectorCard({ track }: { track: SectorTrack }) {
  const trackStyle = {
    ["--acc" as string]: track.acc,
    ["--acc2" as string]: track.acc2,
  } as CSSProperties;

  const glowColor = track.id === "tech" ? "10, 132, 255" : "13, 148, 136";

  return (
    <ParticleCard
      glowColor={glowColor}
      particleCount={8}
      enableStars={true}
      enableBorderGlow={true}
      clickEffect={true}
      className={`group cursor-target relative flex flex-col justify-between h-full gap-2.5 sm:gap-3.5 overflow-hidden rounded-2xl border border-[#bcd6fa]/65 bg-white/80 p-4 sm:p-5 lg:p-5.5 shadow-[0_12px_32px_-20px_rgba(10,20,40,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 ${
        track.id === "tech"
          ? "hover:border-electric/70 hover:shadow-[0_24px_50px_-15px_rgba(10,132,255,0.3)]"
          : "hover:border-teal-500/70 hover:shadow-[0_24px_50px_-15px_rgba(13,148,136,0.3)]"
      }`}
      style={trackStyle}
    >
      {/* Top ambient glow bar on hover */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          track.id === "tech"
            ? "bg-gradient-to-b from-electric/[0.08] to-transparent"
            : "bg-gradient-to-b from-teal-500/[0.08] to-transparent"
        }`}
      />
      {/* Diagonal shine sweep on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
      {/* Subtle dot matrix grid */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(10,132,255,0.1)_1px,transparent_1.4px)] [background-size:18px_18px]" />

      {/* Dark Workforce Readiness Emblem Card Header */}
      <div className="relative z-10 flex items-center gap-3.5 sm:gap-4 overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--acc)_30%,transparent)] bg-[linear-gradient(140deg,#0a1428,#111f38)] p-3.5 sm:p-4 shadow-sm">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-xl [background:radial-gradient(circle,color-mix(in_srgb,var(--acc)_45%,transparent),transparent_70%)]" />

        <div className="relative h-12 w-12 sm:h-13 sm:w-13 lg:h-14 lg:w-14 shrink-0">
          <Emblem kind={track.emblem} />
        </div>

        <div className="relative min-w-0 flex-1">
          <h3 className="font-display text-[14.5px] sm:text-base lg:text-[17px] font-bold leading-snug text-white">
            {track.readinessTitle}
          </h3>
          <p className="mt-1 text-xs sm:text-[12px] lg:text-[13px] leading-relaxed text-[#aebfda]">
            {track.readinessDesc}
          </p>
        </div>
      </div>

      {/* 2 Numbered Training Modules */}
      <div className="relative z-10 flex flex-col gap-2 sm:gap-2.5">
        {track.modules.map((m, i) => (
          <div
            key={m.title}
            className="group/mod relative flex items-start gap-3 rounded-xl border border-[color-mix(in_srgb,var(--acc)_22%,transparent)] bg-white/90 p-2.5 sm:p-3 lg:p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          >
            <span className="mt-0.5 flex h-5 w-5 sm:h-5.5 sm:w-5.5 shrink-0 items-center justify-center rounded-md bg-[var(--acc)] font-mono text-[10px] sm:text-[10.5px] font-bold text-white shadow-sm">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="font-display text-[12.5px] sm:text-[13.5px] font-bold text-[#0a1428] leading-snug transition-colors duration-200 group-hover/mod:text-[var(--acc)]">
                {m.title}
              </h4>
              <p className="mt-0.5 text-[11px] sm:text-[11.5px] leading-relaxed text-[#3d4c68]">
                {m.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Essential Capability Tags Strip */}
      <div className="relative z-10 rounded-xl border border-[#bcd6fa]/50 bg-white/70 px-3 py-2 sm:py-2.5 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#6b7a95] mr-1">
            Stack:
          </span>
          {track.essentialTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[color-mix(in_srgb,var(--acc)_18%,transparent)] bg-[color-mix(in_srgb,var(--acc)_6%,transparent)] px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[9.5px] sm:text-[10.5px] font-medium text-[#0a1428]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </ParticleCard>
  );
}

export default function SpecialistDeliveryTracks() {

  const statsView = useInView<HTMLDivElement>();

  return (
    <section
      id="specialist-tracks"
      className="relative w-full overflow-hidden bg-canvas-alt px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
    >
      {/* Ambient volumetric background light aura */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[960px] -translate-x-1/2 rounded-full blur-3xl opacity-70 [background:radial-gradient(ellipse_at_center,rgba(10,132,255,0.12),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-4 py-1 font-mono text-[10.5px] font-semibold tracking-[0.16em] uppercase text-electric shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
            Delivery Pods &amp; Specialist Execution
          </div>

          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#0a1428] sm:text-4xl lg:text-[40px] leading-[1.14] line-clamp-2 text-balance">
            In-House Delivery Pod Breakdown
          </h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[#3d4c68] sm:text-base">
            High velocity talent engineering pods, strict technical vetting, and proven executive scaling execution across two regulated worlds.
          </p>
        </div>

        {/* Unified MagicBento Grid for all 4 cards (2 Left + 2 Right) */}
        <MagicBento
          glowColor="10, 132, 255"
          spotlightRadius={480}
          enableBorderGlow={true}
          enableStars={true}
          enableSpotlight={true}
          clickEffect={true}
          enableTilt={false}
          enableMagnetism={false}
          className="mt-8 sm:mt-10"
        >
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6 xl:gap-7 items-stretch">
            {/* ================================================================= */}
            {/* ROW 1 LEFT: Card 1 (Pod Network)                                  */}
            {/* ================================================================= */}
            <div className="order-1 lg:order-1 lg:col-span-5 flex flex-col">
              <ParticleCard
                glowColor="10, 132, 255"
                particleCount={10}
                enableStars={true}
                enableBorderGlow={true}
                clickEffect={true}
                className="group cursor-target relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-[#bcd6fa]/65 bg-white/85 p-4 sm:p-5 shadow-[0_12px_32px_-20px_rgba(10,132,255,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-electric/70 hover:shadow-[0_24px_50px_-15px_rgba(10,132,255,0.32)]"
              >
                {/* Top ambient glow bar on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-electric/[0.08] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Diagonal shine sweep on hover */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                {/* Dot matrix grid */}
                <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(10,132,255,0.12)_1px,transparent_1.4px)] [background-size:18px_18px]" />

                <div className="relative z-10 mb-2.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#6b7a95]">
                      Active talent pipeline
                    </div>
                    <div className="mt-0.5 font-display text-base sm:text-lg font-bold text-[#0a1428]">
                      Global talent time zones, one delivery core
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-electric/25 bg-electric/[0.08] px-2.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.12em] uppercase text-electric">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
                    Streaming
                  </span>
                </div>

                {/* Animated SVG Network Map: 7 Time Zones circular orbit with country flag badges */}
                <svg viewBox="0 0 100 66" className="relative z-10 w-full max-h-[250px] sm:max-h-[270px] overflow-visible my-auto" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="dp-line-v2" x1="0" x2="1">
                      <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#0a84ff" stopOpacity="0.9" />
                    </linearGradient>
                    <radialGradient id="dp-core-v2" cx="0.5" cy="0.5" r="0.5">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0a84ff" />
                    </radialGradient>

                    {/* SVG circular clip paths for authentic country badges */}
                    {POD_REGIONS.map((r) => (
                      <clipPath key={r.id} id={`flag-clip-${r.id}`}>
                        <circle cx={r.x} cy={r.y} r="3.6" />
                      </clipPath>
                    ))}
                  </defs>

                  {/* Concentric Radar / Orbital Rings around central POD */}
                  <circle
                    cx="50"
                    cy="31"
                    r="13"
                    fill="none"
                    stroke="#0a84ff"
                    strokeWidth="0.35"
                    strokeDasharray="1.5 2.5"
                    opacity="0.3"
                  />
                  <circle
                    cx="50"
                    cy="31"
                    r="24"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.3"
                    strokeDasharray="1 3.5"
                    opacity="0.25"
                  />

                  {/* Arced connector lines from each country node to the central pod */}
                  {POD_REGIONS.map((r, i) => (
                    <path
                      key={r.id}
                      d={r.arcPath}
                      fill="none"
                      stroke="url(#dp-line-v2)"
                      strokeWidth="0.65"
                      strokeDasharray="2 2"
                      className="dp-dash"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}

                  {/* Central POD Core at (50, 31) - clean static ring without scaling animation */}
                  <circle cx="50" cy="31" r="5.8" fill="url(#dp-core-v2)" />
                  <circle cx="50" cy="31" r="5.8" fill="none" stroke="#38bdf8" strokeWidth="0.6" />
                  <text
                    x="50"
                    y="32.2"
                    textAnchor="middle"
                    fontSize="2.4"
                    fill="#fff"
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight="700"
                  >
                    POD
                  </text>

                  {/* 7 Global Country Nodes (Top 4 + Bottom 3 circular arrangement) */}
                  {POD_REGIONS.map((r, i) => (
                    <CountryBadge key={r.id} r={r} i={i} />
                  ))}
                </svg>

                {/* 3 Telemetry Stats */}
                <div className="relative z-10 mt-2.5 grid grid-cols-3 gap-2 border-t border-[#bcd6fa]/50 pt-2.5">
                  {[
                    { k: "18+", l: "Active pods" },
                    { k: "7", l: "Time zones covered" },
                    { k: "24/7", l: "Live sourcing" },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <div className="font-display text-lg font-extrabold text-electric">{s.k}</div>
                      <div className="mt-0.5 font-mono text-[9px] tracking-[0.08em] uppercase text-[#6b7a95]">{s.l}</div>
                    </div>
                  ))}
                </div>
              </ParticleCard>
            </div>

            {/* ================================================================= */}
            {/* ROW 1 RIGHT: Card 3 (Tech Track)                                  */}
            {/* ================================================================= */}
            <div className="order-3 lg:order-2 lg:col-span-7 flex flex-col">
              <SectorCard track={SECTOR_TRACKS[0]} />
            </div>

            {/* ================================================================= */}
            {/* ROW 2 LEFT: Card 2 (Roles & Milestones)                            */}
            {/* ================================================================= */}
            <div className="order-2 lg:order-3 lg:col-span-5 flex flex-col">
              <ParticleCard
                glowColor="10, 132, 255"
                particleCount={8}
                enableStars={true}
                enableBorderGlow={true}
                clickEffect={true}
                className="group cursor-target relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-[#bcd6fa]/65 bg-white/85 p-4 sm:p-5 shadow-[0_12px_32px_-20px_rgba(10,132,255,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-electric/70 hover:shadow-[0_24px_50px_-15px_rgba(10,132,255,0.3)]"
              >
                {/* Top ambient glow bar on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-electric/[0.08] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Diagonal shine sweep on hover */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                {/* Dot matrix grid */}
                <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(10,132,255,0.12)_1px,transparent_1.4px)] [background-size:18px_18px]" />

                <div ref={statsView.ref} className="relative z-10 flex flex-col justify-between h-full gap-3">
                  <div>
                    <div className="font-mono text-[9px] font-semibold tracking-[0.14em] uppercase text-[#6b7a95]">
                      Dedicated Specialist Execution Pods
                    </div>
                  </div>

                  {/* 3 Core Specialist Roles in a Full-Width Column Stack (1-Line Text) */}
                  <div className="flex flex-col gap-2.5 my-auto">
                    {/* Role 1 */}
                    <div className="rounded-xl border border-[#bcd6fa]/50 bg-white/85 p-2.5 sm:p-3 transition-all duration-200 hover:border-electric/60 hover:bg-white hover:shadow-sm">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="h-2 w-2 rounded-full bg-electric shrink-0" />
                          <h4 className="font-display text-[12px] sm:text-[12.5px] font-bold text-[#0a1428] truncate">
                            Technical &amp; Clinical
                          </h4>
                        </div>
                        <span className="shrink-0 font-mono text-[8.5px] font-semibold text-electric bg-electric/[0.08] px-2 py-0.5 rounded">
                          Active Sourcing
                        </span>
                      </div>
                      <p className="mt-1 text-[10.5px] sm:text-[11px] leading-none text-[#4b5b78] truncate">
                        Global sourcing across 7 time zones and 4 continents.
                      </p>
                    </div>

                    {/* Role 2 */}
                    <div className="rounded-xl border border-[#bcd6fa]/50 bg-white/85 p-2.5 sm:p-3 transition-all duration-200 hover:border-[#38bdf8]/60 hover:bg-white hover:shadow-sm">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="h-2 w-2 rounded-full bg-[#38bdf8] shrink-0" />
                          <h4 className="font-display text-[12px] sm:text-[12.5px] font-bold text-[#0a1428] truncate">
                            Business Analysts
                          </h4>
                        </div>
                        <span className="shrink-0 font-mono text-[8.5px] font-semibold text-[#0284c7] bg-[#38bdf8]/10 px-2 py-0.5 rounded">
                          Role Scoping
                        </span>
                      </div>
                      <p className="mt-1 text-[10.5px] sm:text-[11px] leading-none text-[#4b5b78] truncate">
                        Requirements mapping, compensation bands, and hiring SLAs.
                      </p>
                    </div>

                    {/* Role 3 */}
                    <div className="rounded-xl border border-[#bcd6fa]/50 bg-white/85 p-2.5 sm:p-3 transition-all duration-200 hover:border-electric/60 hover:bg-white hover:shadow-sm">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="h-2 w-2 rounded-full bg-electric shrink-0" />
                          <h4 className="font-display text-[12px] sm:text-[12.5px] font-bold text-[#0a1428] truncate">
                            In-House Engineers
                          </h4>
                        </div>
                        <span className="shrink-0 font-mono text-[8.5px] font-semibold text-electric bg-electric/[0.08] px-2 py-0.5 rounded">
                          Code Vetting
                        </span>
                      </div>
                      <p className="mt-1 text-[10.5px] sm:text-[11px] leading-none text-[#4b5b78] truncate">
                        Hard-coded technical validation, AI interviews, and system audits.
                      </p>
                    </div>
                  </div>

                  {/* Executive Scaling Milestones Strip: Unbroken 1-Line Readouts */}
                  <div className="mt-auto pt-3 border-t border-[#bcd6fa]/50 grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="font-display text-xl sm:text-2xl font-extrabold text-electric leading-none whitespace-nowrap shrink-0">
                        <Counter to={1000} seen={statsView.seen} suffix="+" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#0a1428] truncate">
                          Employees Scaled
                        </div>
                        <div className="text-[10px] text-[#6b7a95] truncate">
                          98% retention / 36 mo
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="font-display text-xl sm:text-2xl font-extrabold text-[#0a1428] leading-none whitespace-nowrap shrink-0">
                        <Counter to={10} seen={statsView.seen} prefix="$" suffix="M+" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#0a1428] truncate">
                          Revenue Driven
                        </div>
                        <div className="text-[10px] text-[#6b7a95] truncate">
                          Enterprise Brand Tier
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ParticleCard>
            </div>

            {/* ================================================================= */}
            {/* ROW 2 RIGHT: Card 4 (Healthcare Track)                            */}
            {/* ================================================================= */}
            <div className="order-4 lg:order-4 lg:col-span-7 flex flex-col">
              <SectorCard track={SECTOR_TRACKS[1]} />
            </div>
          </div>
        </MagicBento>
      </div>


      {/* Scoped CSS animations */}
      <style>{`
        @keyframes dpDash { to { stroke-dashoffset: -8; } }
        .dp-dash { animation: dpDash 1.6s linear infinite; }
        .ds-spin-slow { animation: dsSpin 22s linear infinite; }
        .ds-spin-rev { animation: dsSpin 16s linear infinite reverse; }
        @keyframes dsSpin { to { transform: rotate(360deg); } }
        @keyframes ds-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}
