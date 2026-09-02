"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";

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

/* ---------- feature data with exact badges, titles & shortened descriptions ---------- */

const STAGES = [
  {
    n: "01",
    badge: "01 · Upload Your CV",
    route: "/career/upload_cv/",
    title: "Build your profile",
    description:
      "Upload your CV to auto build your profile and make it opportunity ready.",
    accent: C.el,
    accent2: C.br,
    image: "/assets/academy/talent-cv-intake.png",
  },
  {
    n: "02",
    badge: "02 · Reverse Job Search",
    route: "/talents/reverse-search/",
    title: "Let opportunities find you",
    description:
      "Scan live client pipelines and get discovered by top companies before you apply.",
    accent: C.vio,
    accent2: C.vio2,
    image: "/assets/academy/talent-reverse-search.png",
  },
  {
    n: "03",
    badge: "03 · Talent Academy",
    route: "/ecosystem/academy/",
    title: "Become opportunity ready",
    description:
      "Pinpoint skill gaps with your readiness index and upskill to unlock tier 1 roles.",
    accent: C.teal,
    accent2: C.teal2,
    image: "/assets/academy/talent-academy.png",
  },
  {
    n: "04",
    badge: "04 · Refer & Earn",
    route: "/ecosystem/referrals/",
    title: "Refer talent. Earn together.",
    description:
      "Refer top talent and track your reward payouts from submission to placement.",
    accent: C.amber,
    accent2: C.amber2,
    image: "/assets/academy/talent-refer-earn.png",
  },
];

/* ---------- frameless floating feature item with advanced entrance physics ---------- */

function FeatureItem({
  stage,
  index,
  isVisible,
}: {
  stage: typeof STAGES[number];
  index: number;
  isVisible: boolean;
}) {
  // calculate directional entrance coordinates per quadrant
  const getDirectionClasses = () => {
    if (!isVisible) {
      if (index === 0) return "opacity-0 -translate-x-10 -translate-y-8 scale-95";
      if (index === 1) return "opacity-0 10 -translate-y-8 scale-95";
      if (index === 2) return "opacity-0 -translate-x-10 translate-y-8 scale-95";
      return "opacity-0 translate-x-10 translate-y-8 scale-95";
    }
    return "opacity-100 translate-x-0 translate-y-0 scale-100";
  };

  return (
    <div
      className={`group relative flex flex-col items-center justify-center p-2 sm:p-3 transition-all duration-700 ease-out hover:-translate-y-1.5 ${getDirectionClasses()}`}
      style={
        {
          "--ac": stage.accent,
          "--ac2": stage.accent2,
          transitionDelay: `${200 + index * 120}ms`,
        } as CSSProperties
      }
    >
      {/* TOP: Floating Visual Image */}
      <div className="relative flex h-36 w-full max-w-[280px] items-center justify-center sm:h-40">
        {/* ambient colored halo glow */}
        <div
          className="pointer-events-none absolute inset-0 -top-2 rounded-full blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-90"
          style={{ background: `radial-gradient(ellipse at center, ${stage.accent}25, transparent 65%)` }}
        />

        {/* Feature Image from /assets/academy/ */}
        <div className="relative flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <Image
            src={stage.image}
            alt={stage.title}
            width={280}
            height={160}
            className="h-full w-auto max-w-full object-contain drop-shadow-[0_10px_24px_rgba(10,132,255,0.12)]"
            priority
          />
        </div>
      </div>

      {/* BOTTOM: Step Badge + Title + Short Description */}
      <div className="mt-3 flex flex-col items-center text-center">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 font-mono text-[10px] font-semibold tracking-wider transition-transform duration-200 group-hover:scale-105"
          style={{ background: `${stage.accent}14`, color: stage.accent, border: `1px solid ${stage.accent}28` }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: stage.accent }} />
          {stage.badge}
        </span>

        <Link
          href={stage.route}
          className="mt-2 inline-flex items-center gap-1.5 font-display text-[16px] sm:text-[18px] font-bold text-[#0a1428] transition-colors duration-200 group-hover:text-[var(--ac)]"
        >
          {stage.title}
          <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

        <p className="mt-1.5 max-w-[32ch] sm:max-w-[36ch] text-[12px] sm:text-[12.5px] leading-relaxed text-[#3d4c68]">
          {stage.description}
        </p>
      </div>
    </div>
  );
}

/* ---------- main compact section with Smooth Scroll Entrance Physics & Central Reactor Core ---------- */

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
      className="relative w-full overflow-hidden bg-canvas px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* ambient background lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(188,214,250,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(188,214,250,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-[1180px]">
        {/* header with smooth entrance fade */}
        <div
          className={`mx-auto flex max-w-2xl flex-col items-center text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-3.5 py-1 font-mono text-[10.5px] font-medium tracking-[0.14em] uppercase text-electric shadow-[0_2px_10px_-2px_rgba(10,132,255,0.2)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
            Talent Ecosystem
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-[#0a1428] sm:text-3xl lg:text-[34px]">
            For Candidates,{" "}
            <span className="bg-gradient-to-r from-electric to-electric-bright bg-clip-text text-transparent">
              Not Just Clients
            </span>
          </h2>
          <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-[#3d4c68] sm:text-[15px]">
            A connected 4 pillar career ecosystem. Upload, scan live client pipelines, upskill, and earn referrals.
          </p>
        </div>

        {/* ==================== DESKTOP VIEW (>= lg) ==================== */}
        <div className="relative mx-auto mt-8 hidden max-w-[1020px] lg:block">
          {/* Crafted Harmonic SVG Stream Trajectories in Background */}
          <svg
            viewBox="0 0 1000 520"
            className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Gradients for each sector trajectory fading seamlessly to 0 opacity */}
              <linearGradient id="stream-tl" x1="500" y1="260" x2="220" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#0a84ff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0a84ff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="stream-bl" x1="500" y1="260" x2="220" y2="435" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#a78bfa" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="stream-tr" x1="500" y1="260" x2="780" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#2dd4bf" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#0d9488" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="stream-br" x1="500" y1="260" x2="780" y2="435" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e97e13" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#e97e13" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#e97e13" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Radar Range Rings & Celestial Crosshairs from Core */}
            <circle cx="500" cy="260" r="85" stroke="#bcd6fa" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.6" />
            <circle cx="500" cy="260" r="160" stroke="#bcd6fa" strokeWidth="0.6" strokeDasharray="2 8" opacity="0.4" />
            <line x1="500" y1="170" x2="500" y2="350" stroke="#bcd6fa" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.3" />
            <line x1="410" y1="260" x2="590" y2="260" stroke="#bcd6fa" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.3" />

            {/* TOP-LEFT: CV INTAKE CONDUIT */}
            <path
              d="M 500 260 C 440 260, 390 180, 335 130 C 290 88, 250 85, 220 85"
              stroke="#0a84ff"
              strokeWidth="6"
              strokeOpacity="0.08"
            />
            <path
              d="M 500 260 C 440 260, 390 180, 335 130 C 290 88, 250 85, 220 85"
              stroke="url(#stream-tl)"
              strokeWidth="2.2"
              strokeDasharray="6 6"
              className="te-flow-fast"
            />
            <path
              d="M 500 254 C 442 254, 394 176, 340 126 C 294 84, 252 81, 220 81"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeDasharray="2 8"
              opacity="0.5"
            />
            <g transform="translate(335, 130)">
              <polygon points="0,-4 4,0 0,4 -4,0" fill="#0a84ff" />
              <circle cx="0" cy="0" r="8" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
            </g>

            {/* BOTTOM-LEFT: REVERSE SEARCH CONDUIT */}
            <path
              d="M 500 260 C 440 260, 390 340, 335 390 C 290 432, 250 435, 220 435"
              stroke="#8b5cf6"
              strokeWidth="6"
              strokeOpacity="0.08"
            />
            <path
              d="M 500 260 C 440 260, 390 340, 335 390 C 290 432, 250 435, 220 435"
              stroke="url(#stream-bl)"
              strokeWidth="2.2"
              strokeDasharray="6 6"
              className="te-flow-fast"
            />
            <path
              d="M 500 266 C 442 266, 394 344, 340 394 C 294 436, 252 439, 220 439"
              stroke="#a78bfa"
              strokeWidth="1"
              strokeDasharray="2 8"
              opacity="0.5"
            />
            <g transform="translate(335, 390)">
              <polygon points="0,-4 4,0 0,4 -4,0" fill="#8b5cf6" />
              <circle cx="0" cy="0" r="8" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
            </g>

            {/* TOP-RIGHT: TALENT ACADEMY CONDUIT */}
            <path
              d="M 500 260 C 560 260, 610 180, 665 130 C 710 88, 750 85, 780 85"
              stroke="#0d9488"
              strokeWidth="6"
              strokeOpacity="0.08"
            />
            <path
              d="M 500 260 C 560 260, 610 180, 665 130 C 710 88, 750 85, 780 85"
              stroke="url(#stream-tr)"
              strokeWidth="2.2"
              strokeDasharray="6 6"
              className="te-flow-fast"
            />
            <path
              d="M 500 254 C 558 254, 606 176, 660 126 C 706 84, 748 81, 780 81"
              stroke="#2dd4bf"
              strokeWidth="1"
              strokeDasharray="2 8"
              opacity="0.5"
            />
            <g transform="translate(665, 130)">
              <polygon points="0,-4 4,0 0,4 -4,0" fill="#0d9488" />
              <circle cx="0" cy="0" r="8" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
            </g>

            {/* BOTTOM-RIGHT: REFERRAL EARN CONDUIT */}
            <path
              d="M 500 260 C 560 260, 610 340, 665 390 C 710 432, 750 435, 780 435"
              stroke="#e97e13"
              strokeWidth="6"
              strokeOpacity="0.08"
            />
            <path
              d="M 500 260 C 560 260, 610 340, 665 390 C 710 432, 750 435, 780 435"
              stroke="url(#stream-br)"
              strokeWidth="2.2"
              strokeDasharray="6 6"
              className="te-flow-fast"
            />
            <path
              d="M 500 266 C 558 266, 606 344, 660 394 C 706 436, 748 439, 780 439"
              stroke="#fbbf24"
              strokeWidth="1"
              strokeDasharray="2 8"
              opacity="0.5"
            />
            <g transform="translate(665, 390)">
              <polygon points="0,-4 4,0 0,4 -4,0" fill="#e97e13" />
              <circle cx="0" cy="0" r="8" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
            </g>
          </svg>

          {/* Multi-Tiered Central Reactor Logo Core with Scale Entrance */}
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center transition-all duration-700 ease-out ${
              isVisible ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 -rotate-45"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="group relative flex h-[78px] w-[78px] items-center justify-center rounded-full border border-electric/30 bg-white/95 p-4 shadow-[0_14px_40px_-6px_rgba(10,132,255,0.38)] backdrop-blur-md transition-transform duration-300 hover:scale-105">
              {/* Outer Counter-Rotating Dashed Telemetry Ring */}
              <div className="pointer-events-none absolute inset-[-14px] rounded-full border border-dashed border-electric/35 te-spin-reverse" />
              
              {/* Intermediate Compass Orbit Ring with 4 Sector Nodes */}
              <div className="pointer-events-none absolute inset-[-6px] rounded-full border border-electric/25 te-spin-slow">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#0a84ff] shadow-[0_0_6px_#0a84ff]" />
                <span className="absolute top-1/2 -right-1 -translate-y-1/2 h-2 w-2 rounded-full bg-[#0d9488] shadow-[0_0_6px_#0d9488]" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#e97e13] shadow-[0_0_6px_#e97e13]" />
                <span className="absolute top-1/2 -left-1 -translate-y-1/2 h-2 w-2 rounded-full bg-[#8b5cf6] shadow-[0_0_6px_#8b5cf6]" />
              </div>

              {/* Ambient Colored Radial Aura */}
              <div className="pointer-events-none absolute inset-[-4px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.22),transparent_70%)] blur-sm" />
              
              {/* Pepoltek Icon */}
              <Image
                src="/assets/pepoltek/pepoltek_icon.png"
                alt="Pepoltek Core"
                width={40}
                height={40}
                className="relative z-10 h-auto w-auto object-contain"
              />
            </div>
          </div>

          {/* 2x2 Features Grid */}
          <div className="grid grid-cols-2 gap-x-28 gap-y-12">
            <FeatureItem stage={STAGES[0]} index={0} isVisible={isVisible} />
            <FeatureItem stage={STAGES[2]} index={1} isVisible={isVisible} />
            <FeatureItem stage={STAGES[1]} index={2} isVisible={isVisible} />
            <FeatureItem stage={STAGES[3]} index={3} isVisible={isVisible} />
          </div>
        </div>

        {/* ==================== MOBILE / TABLET VIEW (< lg) ==================== */}
        {/* Continuous Left-Side Rail Architecture with 45° Diamond Icon Box and |---- Branches */}
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

              {/* Ambient glow track */}
              <line x1="16" y1="20" x2="16" y2="980" stroke="url(#m-rail-grad)" strokeWidth="6" opacity="0.12" />
              {/* Primary glowing laser track */}
              <line x1="16" y1="20" x2="16" y2="980" stroke="url(#m-rail-grad)" strokeWidth="2.2" strokeDasharray="6 6" className="te-flow-fast" />
              {/* Parallel echo track */}
              <line x1="12" y1="20" x2="12" y2="980" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 8" opacity="0.4" />
            </svg>
          </div>

          {/* Top 45-Degree Diamond Pepoltek Icon Box */}
          <div className="absolute -top-7 left-3 sm:left-5 -translate-x-1/2 z-20">
            <div className="relative flex h-11 w-11 rotate-45 items-center justify-center rounded-lg border border-electric/40 bg-white/95 shadow-[0_6px_22px_rgba(10,132,255,0.35)] backdrop-blur-md">
              {/* Pulsing diamond halo */}
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

          {/* 4 Feature Items connected via Left Branch Lines (|----) */}
          <div className="flex flex-col gap-10 sm:gap-14 pt-8 pb-8">
            {STAGES.map((stage, idx) => (
              <div key={stage.n} className="relative">
                {/* Horizontal branch conduit (|----) from left rail to feature */}
                <div className="pointer-events-none absolute -left-7 sm:-left-11 top-[38%] -translate-y-1/2 w-7 sm:w-11">
                  <svg viewBox="0 0 44 20" className="h-5 w-full overflow-visible" fill="none">
                    {/* Junction Diamond Node on the rail */}
                    <polygon points="0,10 4,6 8,10 4,14" fill={stage.accent} />
                    <circle cx="4" cy="10" r="7" stroke={stage.accent2} strokeWidth="1" strokeDasharray="2 2" className="te-spin-slow" />
                    {/* Horizontal Branch Line */}
                    <line x1="8" y1="10" x2="40" y2="10" stroke={stage.accent} strokeWidth="2" strokeDasharray="4 4" className="te-flow-fast" />
                    {/* Terminal Landing Pulse */}
                    <circle cx="40" cy="10" r="3.5" fill={stage.accent} />
                    <circle cx="40" cy="10" r="8" stroke={stage.accent2} strokeWidth="1.2" className="te-ping-small" style={{ transformOrigin: "40px 10px" }} />
                  </svg>
                </div>

                {/* The Floating Feature */}
                <FeatureItem stage={stage} index={idx} isVisible={isVisible} />
              </div>
            ))}
          </div>
        </div>

        {/* compact bottom actions strip */}
        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <Link
            href="/career/upload_cv/"
            className="group inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3 font-display text-xs font-semibold text-white shadow-[0_8px_20px_-4px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright"
          >
            Upload CV & Get Matched
            <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link
            href="/talents/reverse-search/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/80 px-5 py-3 font-display text-xs font-semibold text-[#0a1428] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:text-electric"
          >
            Explore Live Pipeline
          </Link>
        </div>
      </div>

      {/* scoped animations */}
      <style>{`
        .te-flow-fast {
          animation: teFlowDash 1.6s linear infinite;
        }
        @keyframes teFlowDash {
          to { stroke-dashoffset: -36; }
        }

        .te-spin-slow {
          animation: teSpin 18s linear infinite;
        }
        @keyframes teSpin {
          to { transform: rotate(360deg); }
        }

        .te-spin-reverse {
          animation: teSpinRev 24s linear infinite;
        }
        @keyframes teSpinRev {
          to { transform: rotate(-360deg); }
        }

        .te-sweep {
          animation: teSweep 4s linear infinite;
        }
        @keyframes teSweep {
          to { transform: rotate(360deg); }
        }

        .te-ping-small {
          animation: tePingSmall 2.2s ease-out infinite;
        }
        @keyframes tePingSmall {
          0% { r: 4.5; opacity: 0.95; }
          100% { r: 18; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
