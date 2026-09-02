"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";

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
  skin: "#f4c9a0",
  hair: "#233248",
};

/* ---------- compact floating graphics ---------- */

function GfxUpload() {
  return (
    <svg viewBox="0 0 240 125" className="h-full w-full overflow-visible" fill="none">
      {/* ambient backdrop halo */}
      <circle cx="120" cy="62" r="50" fill="rgba(10,132,255,0.06)" />
      
      {/* main CV paper */}
      <rect x="42" y="16" width="76" height="94" rx="8" fill="#ffffff" stroke={C.line} strokeWidth="1.8" className="te-draw" />
      
      {/* resume lines */}
      <line x1="56" y1="32" x2="88" y2="32" stroke={C.el} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="56" y1="44" x2="104" y2="44" stroke={C.line} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="56" y1="54" x2="98" y2="54" stroke={C.line} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="56" y1="64" x2="92" y2="64" stroke={C.line} strokeWidth="2.5" strokeLinecap="round" />
      
      {/* extracted skill chips on CV */}
      <rect x="56" y="76" width="22" height="12" rx="3" fill="rgba(10,132,255,0.1)" stroke={C.el} strokeWidth="0.8" />
      <text x="67" y="85" textAnchor="middle" fontSize="6.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={C.el}>REACT</text>
      
      <rect x="82" y="76" width="24" height="12" rx="3" fill="rgba(56,189,248,0.1)" stroke={C.br} strokeWidth="0.8" />
      <text x="94" y="85" textAnchor="middle" fontSize="6.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={C.br}>NEXT.JS</text>

      {/* AI scanner HUD box */}
      <g className="te-float">
        <rect x="134" y="24" width="70" height="54" rx="8" fill="#ffffff" stroke={C.el} strokeWidth="1.8" filter="drop-shadow(0 6px 14px rgba(10,132,255,0.18))" />
        <rect x="134" y="24" width="70" height="18" rx="8" fill="rgba(10,132,255,0.08)" />
        <circle cx="144" cy="33" r="2.5" fill={C.el} className="te-blink" />
        <text x="174" y="36" textAnchor="middle" fontSize="7.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={C.el}>AI PARSER</text>
        
        {/* matching rate */}
        <text x="144" y="56" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="800" fill={C.ink}>98.4%</text>
        <text x="144" y="67" fontSize="6.5" fontFamily="'JetBrains Mono', monospace" fontWeight="500" fill={C.soft}>AUTO-FILL</text>
        <circle cx="188" cy="58" r="8" fill="rgba(22,163,74,0.12)" stroke="#16a34a" strokeWidth="1.2" />
        <path d="M185 58l2 2 4-4" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* laser connection beam */}
      <line x1="118" y1="42" x2="134" y2="42" stroke={C.br} strokeWidth="1.8" strokeDasharray="3 3" className="te-flow-fast" />
      <line x1="118" y1="62" x2="134" y2="62" stroke={C.el} strokeWidth="1.8" strokeDasharray="3 3" className="te-flow-fast" />

      {/* upload floating action tag */}
      <g className="te-bounce">
        <rect x="76" y="94" width="46" height="18" rx="9" fill={C.el} filter="drop-shadow(0 4px 8px rgba(10,132,255,0.35))" />
        <path d="M92 105 L92 99 M89 102 L92 99 L95 102" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="107" y="106" textAnchor="middle" fontSize="6.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill="#fff">UPLOAD</text>
      </g>
    </svg>
  );
}

function GfxReverse() {
  return (
    <svg viewBox="0 0 240 125" className="h-full w-full overflow-visible" fill="none">
      {/* radar concentric rings */}
      <circle cx="120" cy="62" r="54" stroke="rgba(139,92,246,0.15)" strokeWidth="1" strokeDasharray="3 4" className="te-spin-slow" style={{ transformOrigin: "120px 62px" }} />
      <circle cx="120" cy="62" r="38" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
      <circle cx="120" cy="62" r="22" stroke="rgba(139,92,246,0.4)" strokeWidth="1.2" />

      {/* radar sweep ray */}
      <g style={{ transformOrigin: "120px 62px" }} className="te-sweep">
        <path d="M120 62 L120 8 A54 54 0 0 1 168 38 Z" fill="url(#te-radar-grad-2-bk)" opacity="0.4" />
      </g>
      <defs>
        <radialGradient id="te-radar-grad-2-bk" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={C.vio} stopOpacity="0.4" />
          <stop offset="100%" stopColor={C.vio2} stopOpacity="0.0" />
        </radialGradient>
      </defs>

      {/* central secure candidate node */}
      <circle cx="120" cy="62" r="14" fill="#ffffff" stroke={C.vio} strokeWidth="2.2" filter="drop-shadow(0 4px 10px rgba(139,92,246,0.28))" />
      <circle cx="120" cy="58" r="4.2" fill={C.skin} />
      <path d="M113 70c0-3.5 3-5.5 7-5.5s7 2 7 5.5" stroke={C.vio} strokeWidth="1.5" strokeLinecap="round" />
      
      {/* lock privacy shield badge */}
      <g className="te-float">
        <rect x="127" y="46" width="12" height="11" rx="2.5" fill={C.vio} />
        <path d="M130 46v-2.5a3 3 0 0 1 6 0V46" stroke={C.vio} strokeWidth="1.2" />
        <circle cx="133" cy="51.5" r="1" fill="#fff" />
      </g>

      {/* floating live opportunity pills */}
      <g className="te-float" style={{ animationDelay: "0.2s" }}>
        <rect x="22" y="24" width="62" height="22" rx="6" fill="#ffffff" stroke={C.el} strokeWidth="1.2" filter="drop-shadow(0 4px 10px rgba(10,132,255,0.14))" />
        <circle cx="31" cy="35" r="2.5" fill={C.el} className="te-blink" />
        <text x="37" y="38" fontSize="7.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={C.ink}>Cloud Arch</text>
        <line x1="84" y1="35" x2="108" y2="52" stroke={C.el} strokeWidth="1.2" strokeDasharray="3 3" className="te-flow-fast" opacity="0.6" />
      </g>

      <g className="te-float" style={{ animationDelay: "0.7s" }}>
        <rect x="156" y="20" width="64" height="22" rx="6" fill="#ffffff" stroke={C.teal} strokeWidth="1.2" filter="drop-shadow(0 4px 10px rgba(13,148,136,0.14))" />
        <circle cx="165" cy="31" r="2.5" fill={C.teal} className="te-blink" />
        <text x="171" y="34" fontSize="7.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={C.ink}>Lead React</text>
        <line x1="156" y1="34" x2="132" y2="54" stroke={C.teal} strokeWidth="1.2" strokeDasharray="3 3" className="te-flow-fast" opacity="0.6" />
      </g>

      <g className="te-float" style={{ animationDelay: "1.1s" }}>
        <rect x="150" y="80" width="68" height="22" rx="6" fill="#ffffff" stroke={C.amber} strokeWidth="1.2" filter="drop-shadow(0 4px 10px rgba(233,126,19,0.14))" />
        <circle cx="159" cy="91" r="2.5" fill={C.amber} className="te-blink" />
        <text x="165" y="94" fontSize="7.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={C.ink}>AI Eng $180k</text>
        <line x1="150" y1="88" x2="130" y2="72" stroke={C.amber} strokeWidth="1.2" strokeDasharray="3 3" className="te-flow-fast" opacity="0.6" />
      </g>
    </svg>
  );
}

function GfxAcademy() {
  return (
    <svg viewBox="0 0 240 125" className="h-full w-full overflow-visible" fill="none">
      {/* readiness speed gauge */}
      <g className="te-float">
        <path d="M50 82 A38 38 0 0 1 126 82" stroke="rgba(13,148,136,0.18)" strokeWidth="6" strokeLinecap="round" />
        <path d="M50 82 A38 38 0 0 1 118 52" stroke={C.teal} strokeWidth="6" strokeLinecap="round" className="te-draw" />
        <text x="88" y="74" textAnchor="middle" fontSize="14" fontFamily="'JetBrains Mono', monospace" fontWeight="800" fill={C.teal}>94%</text>
        <text x="88" y="84" textAnchor="middle" fontSize="6" fontFamily="'JetBrains Mono', monospace" fontWeight="600" fill={C.soft}>READINESS</text>
      </g>

      {/* skill progression meters */}
      <g className="te-float" style={{ animationDelay: "0.3s" }}>
        <rect x="134" y="20" width="88" height="76" rx="8" fill="#ffffff" stroke={C.teal} strokeWidth="1.4" filter="drop-shadow(0 4px 12px rgba(13,148,136,0.16))" />
        <text x="142" y="32" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={C.teal}>CURATED TRACK</text>
        
        {/* skill 1 */}
        <text x="142" y="44" fontSize="6.5" fontFamily="Inter, sans-serif" fontWeight="600" fill={C.ink}>System Design</text>
        <rect x="142" y="47" width="72" height="5" rx="2.5" fill="rgba(13,148,136,0.14)" />
        <rect x="142" y="47" width="62" height="5" rx="2.5" fill={C.teal} />

        {/* skill 2 */}
        <text x="142" y="60" fontSize="6.5" fontFamily="Inter, sans-serif" fontWeight="600" fill={C.ink}>AWS / Kubernetes</text>
        <rect x="142" y="63" width="72" height="5" rx="2.5" fill="rgba(13,148,136,0.14)" />
        <rect x="142" y="63" width="56" height="5" rx="2.5" fill={C.teal2} />

        {/* skill 3 */}
        <text x="142" y="76" fontSize="6.5" fontFamily="Inter, sans-serif" fontWeight="600" fill={C.ink}>HIPAA & Security</text>
        <rect x="142" y="79" width="72" height="5" rx="2.5" fill="rgba(13,148,136,0.14)" />
        <rect x="142" y="79" width="68" height="5" rx="2.5" fill={C.teal} />
      </g>

      {/* tier up badge */}
      <g className="te-bounce">
        <rect x="52" y="94" width="72" height="18" rx="9" fill={C.teal} filter="drop-shadow(0 4px 8px rgba(13,148,136,0.35))" />
        <polygon points="63,103 67,99 71,103 67,107" fill="#fff" />
        <text x="92" y="106" textAnchor="middle" fontSize="6.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill="#fff">TIER-1 UNLOCKED</text>
      </g>
    </svg>
  );
}

function GfxReferral() {
  return (
    <svg viewBox="0 0 240 125" className="h-full w-full overflow-visible" fill="none">
      {/* transparent payout ledger card */}
      <rect x="36" y="18" width="108" height="84" rx="8" fill="#ffffff" stroke={C.amber} strokeWidth="1.6" filter="drop-shadow(0 6px 14px rgba(233,126,19,0.15))" />
      <rect x="36" y="18" width="108" height="18" rx="8" fill="rgba(233,126,19,0.08)" />
      <text x="44" y="30" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={C.amber}>PAYOUT LEDGER</text>
      
      {/* ledger item 1 */}
      <circle cx="46" cy="46" r="3" fill="#16a34a" />
      <text x="53" y="48" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="600" fill={C.ink}>Marcus V. · Placed</text>
      <text x="136" y="48" textAnchor="end" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill="#16a34a">+$2,400</text>

      {/* ledger item 2 */}
      <circle cx="46" cy="62" r="3" fill={C.amber} />
      <text x="53" y="64" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="600" fill={C.ink}>Elena R. · Interview</text>
      <text x="136" y="64" textAnchor="end" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={C.amber}>$1,200 (Hold)</text>

      {/* ledger item 3 */}
      <circle cx="46" cy="78" r="3" fill={C.soft} />
      <text x="53" y="80" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="600" fill={C.soft}>David K. · Sourced</text>
      <text x="136" y="80" textAnchor="end" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={C.soft}>Active</text>

      <line x1="44" y1="88" x2="136" y2="88" stroke={C.line} strokeWidth="1" strokeDasharray="2 2" />

      {/* referral network mini graph on right */}
      <g className="te-float">
        <circle cx="182" cy="40" r="13" fill="#ffffff" stroke={C.amber} strokeWidth="2" filter="drop-shadow(0 4px 10px rgba(233,126,19,0.25))" />
        <circle cx="182" cy="36" r="4" fill={C.skin} />
        <path d="M175 48c0-3 3-5 7-5s7 2 7 5" stroke={C.amber} strokeWidth="1.4" strokeLinecap="round" />
        
        {/* referral branch nodes */}
        <line x1="182" y1="53" x2="162" y2="80" stroke={C.amber} strokeWidth="1.4" strokeDasharray="3 3" className="te-flow-fast" />
        <line x1="182" y1="53" x2="204" y2="80" stroke={C.amber2} strokeWidth="1.4" strokeDasharray="3 3" className="te-flow-fast" />

        <circle cx="162" cy="82" r="9" fill="#ffffff" stroke={C.amber} strokeWidth="1.4" />
        <circle cx="162" cy="79" r="2.8" fill={C.skin} />
        <path d="M157 87c0-2 2-3.5 5-3.5s5 1.5 5 3.5" stroke={C.amber} strokeWidth="1" strokeLinecap="round" />

        <circle cx="204" cy="82" r="9" fill="#ffffff" stroke={C.amber2} strokeWidth="1.4" />
        <circle cx="204" cy="79" r="2.8" fill={C.skin} />
        <path d="M199 87c0-2 2-3.5 5-3.5s5 1.5 5 3.5" stroke={C.amber2} strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* instant payout coin */}
      <g className="te-bounce" style={{ animationDelay: "0.5s" }}>
        <circle cx="182" cy="100" r="11" fill={C.amber} filter="drop-shadow(0 4px 8px rgba(233,126,19,0.4))" />
        <text x="182" y="104.5" textAnchor="middle" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="800" fill="#fff">$</text>
      </g>
    </svg>
  );
}

/* ---------- data ---------- */

const STAGES = [
  {
    n: "01",
    tag: "INTAKE",
    route: "/career/upload_cv/",
    title: "Upload Your CV",
    accent: C.el,
    accent2: C.br,
    Gfx: GfxUpload,
  },
  {
    n: "02",
    tag: "DISCOVERY",
    route: "/talents/reverse-search/",
    title: "Reverse Job Search",
    accent: C.vio,
    accent2: C.vio2,
    Gfx: GfxReverse,
  },
  {
    n: "03",
    tag: "ACADEMY",
    route: "/ecosystem/academy/",
    title: "Talent Academy",
    accent: C.teal,
    accent2: C.teal2,
    Gfx: GfxAcademy,
  },
  {
    n: "04",
    tag: "REFERRALS",
    route: "/ecosystem/referrals/",
    title: "Refer & Earn",
    accent: C.amber,
    accent2: C.amber2,
    Gfx: GfxReferral,
  },
];

/* ---------- central fiber optic spine component ---------- */

function FiberOpticSpine() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between py-2">
      {/* background spine container */}
      <svg viewBox="0 0 140 480" className="h-full w-full overflow-visible" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="fiber-c1-bk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a84ff" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0a84ff" />
          </linearGradient>
          <linearGradient id="fiber-c2-bk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="fiber-c3-bk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="50%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <linearGradient id="fiber-c4-bk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e97e13" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#e97e13" />
          </linearGradient>
        </defs>

        {/* glass conduit channel background */}
        <rect x="44" y="10" width="52" height="460" rx="26" fill="#ffffff" stroke="#bcd6fa" strokeWidth="1.2" opacity="0.8" />
        <rect x="48" y="14" width="44" height="452" rx="22" fill="rgba(10,132,255,0.03)" />

        {/* 4 vertical glowing fiber optic cables */}
        {/* Fiber 1: Electric Blue */}
        <line x1="56" y1="20" x2="56" y2="460" stroke="rgba(10,132,255,0.2)" strokeWidth="3" />
        <line x1="56" y1="20" x2="56" y2="460" stroke="url(#fiber-c1-bk)" strokeWidth="2" strokeDasharray="6 8" className="te-fiber-pulse-1" />

        {/* Fiber 2: Violet */}
        <line x1="65" y1="20" x2="65" y2="460" stroke="rgba(139,92,246,0.2)" strokeWidth="3" />
        <line x1="65" y1="20" x2="65" y2="460" stroke="url(#fiber-c2-bk)" strokeWidth="2" strokeDasharray="8 10" className="te-fiber-pulse-2" />

        {/* Fiber 3: Teal */}
        <line x1="75" y1="20" x2="75" y2="460" stroke="rgba(13,148,136,0.2)" strokeWidth="3" />
        <line x1="75" y1="20" x2="75" y2="460" stroke="url(#fiber-c3-bk)" strokeWidth="2" strokeDasharray="6 8" className="te-fiber-pulse-3" />

        {/* Fiber 4: Amber */}
        <line x1="84" y1="20" x2="84" y2="460" stroke="rgba(233,126,19,0.2)" strokeWidth="3" />
        <line x1="84" y1="20" x2="84" y2="460" stroke="url(#fiber-c4-bk)" strokeWidth="2" strokeDasharray="7 9" className="te-fiber-pulse-4" />

        {/* Branch connector lines leading to the 4 floating features */}
        {/* Top-Left: to Item 01 */}
        <path d="M56 100 C38 100, 15 110, -20 110" fill="none" stroke="#0a84ff" strokeWidth="2" strokeDasharray="4 4" className="te-flow-fast" />
        <circle cx="56" cy="100" r="4.5" fill="#0a84ff" />
        <circle cx="56" cy="100" r="8" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="te-ping-small" style={{ transformOrigin: "56px 100px" }} />
        <circle cx="-20" cy="110" r="4" fill="#0a84ff" />

        {/* Bottom-Left: to Item 02 */}
        <path d="M65 370 C45 370, 15 360, -20 360" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" className="te-flow-fast" />
        <circle cx="65" cy="370" r="4.5" fill="#8b5cf6" />
        <circle cx="65" cy="370" r="8" fill="none" stroke="#a78bfa" strokeWidth="1.5" className="te-ping-small" style={{ transformOrigin: "65px 370px" }} />
        <circle cx="-20" cy="360" r="4" fill="#8b5cf6" />

        {/* Top-Right: to Item 03 */}
        <path d="M75 100 C92 100, 125 110, 160 110" fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 4" className="te-flow-fast" />
        <circle cx="75" cy="100" r="4.5" fill="#0d9488" />
        <circle cx="75" cy="100" r="8" fill="none" stroke="#2dd4bf" strokeWidth="1.5" className="te-ping-small" style={{ transformOrigin: "75px 100px" }} />
        <circle cx="160" cy="110" r="4" fill="#0d9488" />

        {/* Bottom-Right: to Item 04 */}
        <path d="M84 370 C105 370, 130 360, 160 360" fill="none" stroke="#e97e13" strokeWidth="2" strokeDasharray="4 4" className="te-flow-fast" />
        <circle cx="84" cy="370" r="4.5" fill="#e97e13" />
        <circle cx="84" cy="370" r="8" fill="none" stroke="#fbbf24" strokeWidth="1.5" className="te-ping-small" style={{ transformOrigin: "84px 370px" }} />
        <circle cx="160" cy="360" r="4" fill="#e97e13" />

        {/* Center Nexus Hub Core */}
        <g transform="translate(70, 240)">
          {/* rotating outer orbit */}
          <circle cx="0" cy="0" r="26" fill="#ffffff" stroke="#bcd6fa" strokeWidth="1.5" filter="drop-shadow(0 6px 16px rgba(10,132,255,0.25))" />
          <circle cx="0" cy="0" r="22" fill="none" stroke="#0a84ff" strokeWidth="1.5" strokeDasharray="4 4" className="te-spin-slow" />
          
          {/* core center pulse */}
          <circle cx="0" cy="0" r="14" fill="url(#fiber-c1-bk)" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="#38bdf8" strokeWidth="2" className="te-ping" />
          
          {/* center nexus icon */}
          <circle cx="0" cy="0" r="4" fill="#ffffff" />
          <path d="M-6 0 L6 0 M0 -6 L0 6" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/* ---------- frameless floating feature item (No Card Box / Pure Floating Visualization + Title) ---------- */

function FeatureItem({ stage, side }: { stage: typeof STAGES[number]; side: "left" | "right" }) {
  return (
    <div
      className="group relative flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1"
      style={
        {
          "--ac": stage.accent,
          "--ac2": stage.accent2,
        } as CSSProperties
      }
    >
      {/* connecting dock socket indicator on inner side (desktop) */}
      <div
        className={`pointer-events-none absolute top-[44%] hidden h-3.5 w-3.5 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--ac)]/40 bg-white shadow-sm lg:flex ${
          side === "left" ? "-right-3" : "-left-3"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full te-blink" style={{ background: stage.accent }} />
      </div>

      {/* TOP: Floating Visual Graphic */}
      <div className="relative flex h-32 w-full max-w-[290px] items-center justify-center sm:h-36">
        {/* ambient colored halo glow */}
        <div
          className="pointer-events-none absolute inset-0 -top-2 rounded-full blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-90"
          style={{ background: `radial-gradient(ellipse at center, ${stage.accent}25, transparent 65%)` }}
        />

        {/* SVG illustration */}
        <stage.Gfx />
      </div>

      {/* BOTTOM: Step Tag + Title */}
      <div className="mt-2.5 flex flex-col items-center text-center">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase transition-transform duration-200 group-hover:scale-105"
          style={{ background: `${stage.accent}14`, color: stage.accent, border: `1px solid ${stage.accent}28` }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: stage.accent }} />
          {stage.n} · {stage.tag}
        </span>

        <Link
          href={stage.route}
          className="mt-1.5 inline-flex items-center gap-1.5 font-display text-[16px] sm:text-[18px] font-bold text-[#0a1428] transition-colors duration-200 group-hover:text-[var(--ac)]"
        >
          {stage.title}
          <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ---------- main compact section ---------- */

export default function TalentEcosystem() {
  return (
    <section id="talent-ecosystem" className="relative w-full overflow-hidden bg-canvas px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* ambient background lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.07),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(188,214,250,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(188,214,250,0.18)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-[1200px]">
        {/* header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.08] px-3.5 py-1 font-mono text-[10.5px] font-medium tracking-[0.14em] uppercase text-[#8b5cf6]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8b5cf6] shadow-[0_0_6px_rgba(139,92,246,0.6)]" />
            Talent Ecosystem
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-[#0a1428] sm:text-3xl lg:text-[34px]">
            For Candidates,{" "}
            <span className="bg-gradient-to-r from-[#0a84ff] via-[#8b5cf6] to-[#0d9488] bg-clip-text text-transparent">
              Not Just Clients
            </span>
          </h2>
          <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-[#3d4c68] sm:text-[15px]">
            A connected 4-pillar career ecosystem. Upload, scan live client pipelines, upskill, and earn referrals.
          </p>
        </div>

        {/* 3-Column Compact Frameless Floating Architecture (Left 2 Features | Center Fiber Spine | Right 2 Features) */}
        <div className="relative mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_120px_1fr] xl:grid-cols-[1fr_140px_1fr] lg:items-center">
          {/* Left Column (Items 01 & 02) */}
          <div className="flex flex-col justify-around gap-6 sm:gap-8">
            <FeatureItem stage={STAGES[0]} side="left" />
            <FeatureItem stage={STAGES[1]} side="left" />
          </div>

          {/* Center Column: Fiber Optic Spine (Desktop) */}
          <div className="hidden lg:flex items-center justify-center">
            <FiberOpticSpine />
          </div>

          {/* Right Column (Items 03 & 04) */}
          <div className="flex flex-col justify-around gap-6 sm:gap-8">
            <FeatureItem stage={STAGES[2]} side="right" />
            <FeatureItem stage={STAGES[3]} side="right" />
          </div>
        </div>

        {/* compact bottom actions strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
        /* Fiber optic pulse flows */
        .te-fiber-pulse-1 { animation: teFiberFlow 2.2s linear infinite; }
        .te-fiber-pulse-2 { animation: teFiberFlow 2.8s linear infinite; }
        .te-fiber-pulse-3 { animation: teFiberFlow 2.5s linear infinite; }
        .te-fiber-pulse-4 { animation: teFiberFlow 3.1s linear infinite; }

        @keyframes teFiberFlow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -56; }
        }

        .te-flow-fast {
          animation: teFlowDash 1.4s linear infinite;
        }
        @keyframes teFlowDash {
          to { stroke-dashoffset: -28; }
        }

        .te-spin-slow {
          animation: teSpin 12s linear infinite;
        }
        @keyframes teSpin {
          to { transform: rotate(360deg); }
        }

        .te-sweep {
          animation: teSweep 4s linear infinite;
        }
        @keyframes teSweep {
          to { transform: rotate(360deg); }
        }

        .te-ping-small {
          animation: tePingSmall 2s ease-out infinite;
        }
        @keyframes tePingSmall {
          0% { r: 4.5; opacity: 0.9; }
          100% { r: 14; opacity: 0; }
        }

        .te-ping {
          animation: tePingRing 2.2s ease-out infinite;
        }
        @keyframes tePingRing {
          0% { r: 14; opacity: 0.8; }
          100% { r: 36; opacity: 0; }
        }

        .te-float {
          animation: teFloat 3s ease-in-out infinite;
        }
        @keyframes teFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .te-bounce {
          animation: teBounce 1.8s ease-in-out infinite;
        }
        @keyframes teBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .te-blink {
          animation: teBlink 1.8s ease-in-out infinite;
        }
        @keyframes teBlink {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
