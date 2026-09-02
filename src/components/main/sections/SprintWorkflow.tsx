"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/* ---------- design tokens ---------- */
const S = {
  ink:  "#0a1428",
  soft: "#3d4c68",
  el:   "#0a84ff",
  br:   "#38bdf8",
  line: "#bcd6fa",
};

/* ---------- per-step SVG graphics ---------- */

function GfxDiscovery() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <rect x="46" y="30" width="120" height="150" rx="10" fill="#fff" stroke={S.line} strokeWidth="2" className="wf-draw" />
      {[62, 82, 102, 122].map((y, i) => (
        <line key={y} x1="64" y1={y} x2={i % 2 ? 132 : 148} y2={y} stroke={S.line} strokeWidth="4" strokeLinecap="round" className="wf-draw" />
      ))}
      <line x1="64" y1="142" x2="120" y2="142" stroke={S.br} strokeWidth="4" strokeLinecap="round" className="wf-draw" />
      <g className="wf-float">
        <circle cx="168" cy="118" r="34" fill="rgba(10,132,255,0.08)" stroke={S.el} strokeWidth="4" className="wf-draw" />
        <line x1="192" y1="142" x2="214" y2="164" stroke={S.el} strokeWidth="6" strokeLinecap="round" className="wf-draw" />
        <path d="M154 118l10 10 18-20" fill="none" stroke={S.br} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
      </g>
    </svg>
  );
}

function GfxMapping() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <circle cx="130" cy="112" r="72" fill="rgba(10,132,255,0.06)" stroke={S.line} strokeWidth="2" className="wf-draw" />
      <ellipse cx="130" cy="112" rx="72" ry="26" fill="none" stroke={S.line} strokeWidth="1.6" className="wf-draw" />
      <ellipse cx="130" cy="112" rx="30" ry="72" fill="none" stroke={S.line} strokeWidth="1.6" className="wf-draw" />
      <g style={{ transformOrigin: "130px 112px" }} className="wf-spin">
        <path d="M130 112 L130 40 A72 72 0 0 1 196 96 Z" fill="rgba(56,189,248,0.18)" />
      </g>
      {[[92, 78], [172, 92], [110, 150], [180, 148]].map(([x, y], i) => (
        <g key={i} className="wf-float" style={{ animationDelay: `${i * 0.3}s` }}>
          <circle cx={x} cy={y} r="6" fill={i === 1 ? S.br : S.el} />
          <circle cx={x} cy={y} r="6" fill="none" stroke={S.el} strokeWidth="2" className="wf-ping" style={{ transformOrigin: `${x}px ${y}px` }} />
        </g>
      ))}
    </svg>
  );
}

function GfxVetting() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <rect x="34" y="42" width="150" height="120" rx="10" fill={S.ink} className="wf-draw" />
      <circle cx="48" cy="56" r="3" fill="#ff5f57" />
      <circle cx="60" cy="56" r="3" fill="#febc2e" />
      <circle cx="72" cy="56" r="3" fill="#28c840" />
      {[78, 96, 114, 132].map((y, i) => (
        <line key={y} x1="50" y1={y} x2={[120, 150, 100, 138][i]} y2={y} stroke={i === 3 ? S.br : "#2c4670"} strokeWidth="5" strokeLinecap="round" className="wf-draw" />
      ))}
      <g className="wf-float">
        <path d="M196 70c-14-10-40-6-40 10 0 24 22 36 40 44 18-8 40-20 40-44 0-16-26-20-40-10z" fill="rgba(10,132,255,0.1)" stroke={S.el} strokeWidth="4" className="wf-draw" />
        <path d="M180 122l10 10 20-24" fill="none" stroke={S.br} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
      </g>
    </svg>
  );
}

function GfxInterview() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      {[[46, S.el], [150, S.br]].map(([x, c], i) => (
        <g key={i} className="wf-reveal">
          <rect x={x as number} y="52" width="64" height="90" rx="10" fill="#fff" stroke={S.line} strokeWidth="2" className="wf-draw" />
          <circle cx={(x as number) + 32} cy="82" r="14" fill="rgba(10,132,255,0.12)" stroke={c as string} strokeWidth="3" className="wf-draw" />
          <path d={`M${(x as number) + 12} 128c0-14 9-22 20-22s20 8 20 22`} fill="none" stroke={c as string} strokeWidth="3" className="wf-draw" />
        </g>
      ))}
      <path d="M118 82c12-8 20-8 30 0" fill="none" stroke={S.el} strokeWidth="3" strokeDasharray="3 4" className="wf-draw" />
      <path d="M148 112c-12 8-20 8-30 0" fill="none" stroke={S.br} strokeWidth="3" strokeDasharray="3 4" className="wf-draw" />
      <g className="wf-float">
        <rect x="100" y="150" width="60" height="46" rx="6" fill="#fff" stroke={S.el} strokeWidth="3" className="wf-draw" />
        <line x1="100" y1="162" x2="160" y2="162" stroke={S.el} strokeWidth="3" className="wf-draw" />
        <circle cx="130" cy="180" r="6" fill={S.br} />
      </g>
    </svg>
  );
}

function GfxClose() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <g className="wf-float">
        <path d="M60 96l30-16 24 12 22-10 34 18" fill="none" stroke={S.el} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
        <path d="M90 80l6 30M114 92l4 26M136 82l6 28" stroke={S.br} strokeWidth="5" strokeLinecap="round" className="wf-draw" />
      </g>
      <line x1="46" y1="164" x2="214" y2="164" stroke={S.line} strokeWidth="3" className="wf-draw" />
      {["30", "60", "90"].map((d, i) => {
        const x = 70 + i * 60;
        return (
          <g key={d} className="wf-reveal">
            <circle cx={x} cy={164} r="12" fill="#fff" stroke={S.el} strokeWidth="3" />
            <circle cx={x} cy={164} r="4" fill={S.el} />
            <text x={x} y="196" textAnchor="middle" fontSize="13" fontFamily="'JetBrains Mono', monospace" fill={S.soft}>{d}</text>
          </g>
        );
      })}
    </svg>
  );
}

function GfxSuccess() {
  return (
    <svg viewBox="0 0 260 240" className="h-full w-full">
      {[[40, 40, S.br], [220, 60, S.el], [56, 180, S.el], [210, 190, S.br], [130, 24, S.el]].map(([x, y, c], i) => (
        <rect key={i} x={x as number} y={y as number} width="8" height="8" rx="2" fill={c as string} className="wf-float" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.25}s` }} />
      ))}
      <g className="wf-float">
        <circle cx="130" cy="118" r="60" fill="rgba(10,132,255,0.08)" stroke={S.el} strokeWidth="4" className="wf-draw" />
        <circle cx="130" cy="118" r="46" fill="none" stroke={S.br} strokeWidth="2" strokeDasharray="4 6" className="wf-spin" style={{ transformOrigin: "130px 118px" }} />
        <path d="M104 118l16 16 34-40" fill="none" stroke={S.el} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
      </g>
      <path d="M110 168l-10 40 30-18 30 18-10-40" fill="rgba(56,189,248,0.25)" stroke={S.el} strokeWidth="3" className="wf-draw" />
    </svg>
  );
}

/* ---------- data ---------- */

const STEPS = [
  { n: "01", title: "Technical & Compliance Discovery", short: "Discovery", body: "Stack analysis, clinical mapping, culture alignment, and success profiling.",                           Gfx: GfxDiscovery },
  { n: "02", title: "Market Mapping",                   short: "Mapping",   body: "Instant candidate screening and passive sourcing via proprietary talent intelligence.",                    Gfx: GfxMapping   },
  { n: "03", title: "Hard-Coded Vetting",               short: "Vetting",   body: "Code validation, system design review, BEI/HEXACO/OCEAN behavioral assessment.",                          Gfx: GfxVetting   },
  { n: "04", title: "Interview Orchestration",           short: "Interview", body: "Frictionless panel scheduling, structured briefings, and feedback loops.",                                Gfx: GfxInterview },
  { n: "05", title: "Close & Integration",               short: "Close",     body: "Offer negotiation, resignation coaching, and 30/60/90-day onboarding check-ins.",                         Gfx: GfxClose     },
];

// Horizontal carousel: 5 steps + 1 success panel
const PANEL_COUNT = STEPS.length + 1; // 6

/* ---------- candidate cartoon ---------- */

function CandidateFigure({ pose }: { pose: "run" | "sit" | "wave" }) {
  const skin  = "#f4c9a0";
  const suit  = "#12213c";
  const shirt = "#eaf2ff";
  const tie   = "#0a84ff";
  const hair  = "#233248";
  const ls    = { transformBox: "fill-box", transformOrigin: "top center" } as const;

  if (pose === "wave") return (
    <svg viewBox="0 0 44 70" className="h-full w-full overflow-visible" fill="none">
      <path d="M17 44 L15 62" stroke={suit} strokeWidth="5" strokeLinecap="round" />
      <path d="M27 44 L29 62" stroke={suit} strokeWidth="5" strokeLinecap="round" />
      <path d="M14 22 Q22 18 30 22 L28 44 Q22 47 16 44 Z" fill={suit} />
      <path d="M19 22 L22 25 L25 22 Z" fill={shirt} />
      <path d="M22 24 L20.4 28 L22 35 L23.6 28 Z" fill={tie} />
      {/* left arm relaxed */}
      <path d="M15 27 L10 36" stroke={suit} strokeWidth="4" strokeLinecap="round" />
      {/* right arm waving */}
      <path d="M29 25 L36 14" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-wave-arm" />
      <circle cx="37" cy="12" r="3.5" fill={skin} className="wf-wave-arm" />
      <circle cx="22" cy="13" r="6.5" fill={skin} />
      <path d="M15.5 13 A6.5 6.5 0 0 1 28.5 13 Q22 8 15.5 13 Z" fill={hair} />
      <path d="M19 16 Q22 19 25 16" fill="none" stroke={suit} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="19.5" cy="13.5" r="1" fill={suit} />
      <circle cx="24.5" cy="13.5" r="1" fill={suit} />
    </svg>
  );

  if (pose === "run") return (
    <svg viewBox="0 0 44 62" className="h-full w-full overflow-visible" fill="none">
      <g className="wf-runner">
        <path d="M22 38 L15 54" stroke={suit} strokeWidth="5" strokeLinecap="round" className="wf-leg-a" style={ls} />
        <path d="M22 38 L29 53" stroke={suit} strokeWidth="5" strokeLinecap="round" className="wf-leg-b" style={ls} />
        <path d="M14 22 Q22 18 30 22 L28 40 Q22 43 16 40 Z" fill={suit} />
        <path d="M19 22 L22 25 L25 22 Z" fill={shirt} />
        <path d="M22 24 L20.4 28 L22 35 L23.6 28 Z" fill={tie} />
        <path d="M15 25 L9 31"  stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-arm-a" style={ls} />
        <path d="M29 25 L35 30" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-arm-b" style={ls} />
        <circle cx="22" cy="13" r="6.5" fill={skin} />
        <path d="M15.5 13 A6.5 6.5 0 0 1 28.5 13 Q22 8 15.5 13 Z" fill={hair} />
        <circle cx="24.6" cy="13" r="1" fill={suit} />
      </g>
    </svg>
  );

  return (
    <svg viewBox="0 0 44 62" className="h-full w-full overflow-visible" fill="none">
      <g className="wf-sitter">
        <rect x="9"  y="47" width="26" height="3"    rx="1.5" fill={tie} />
        <rect x="12" y="35" width="20" height="12.5" rx="1.5" fill="#cfe0f7" stroke={tie} strokeWidth="1.4" />
        <line x1="16" y1="39" x2="28" y2="39" stroke={tie} strokeWidth="1" strokeLinecap="round" />
        <line x1="16" y1="42" x2="24" y2="42" stroke={tie} strokeWidth="1" strokeLinecap="round" />
        <path d="M18 44 L18 55" stroke={suit} strokeWidth="5" strokeLinecap="round" />
        <path d="M26 44 L26 55" stroke={suit} strokeWidth="5" strokeLinecap="round" />
        <path d="M22 39 L16 44 M22 39 L28 44" stroke={suit} strokeWidth="5" strokeLinecap="round" />
        <path d="M15 22 Q22 18 29 22 L27 40 Q22 42 17 40 Z" fill={suit} />
        <path d="M19 22 L22 25 L25 22 Z" fill={shirt} />
        <path d="M22 24 L20.6 28 L22 34 L23.4 28 Z" fill={tie} />
        <path d="M16 26 L21 34" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-type"         style={ls} />
        <path d="M28 26 L23 34" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-type wf-type-2" style={ls} />
        <g className="wf-nod" style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}>
          <circle cx="22" cy="13" r="6.5" fill={skin} />
          <path d="M15.5 13 A6.5 6.5 0 0 1 28.5 13 Q22 8 15.5 13 Z" fill={hair} />
          <circle cx="22" cy="13" r="1" fill={suit} />
        </g>
      </g>
    </svg>
  );
}

/* ---------- overview orbital visual ---------- */

function OverviewVisual({ onSelectStep }: { onSelectStep?: (index: number) => void }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    { a: -90, l: "01", label: "Discovery" },
    { a: -18, l: "02", label: "Mapping"   },
    { a:  54, l: "03", label: "Vetting"   },
    { a: 126, l: "04", label: "Interview" },
    { a: 198, l: "05", label: "Close"     },
  ];
  const R = 88, cx = 150, cy = 155;

  return (
    <svg viewBox="0 0 300 310" className="h-full w-full select-none">
      <defs>
        <radialGradient id="ov-core" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0a84ff" />
        </radialGradient>
      </defs>

      {/* outer guide ring */}
      <circle cx={cx} cy={cy} r={R + 28} fill="none" stroke="#bcd6fa" strokeWidth="1" opacity="0.35" />

      {/* orbit ring spinning */}
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke="#bcd6fa"
        strokeWidth="1.5"
        strokeDasharray="3 7"
        className="wf-spin"
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* step nodes */}
      {nodes.map((n, idx) => {
        const rad = (n.a * Math.PI) / 180;
        const x = cx + R * Math.cos(rad);
        const y = cy + R * Math.sin(rad);
        const isActive = idx === activeStep;

        return (
          <g
            key={n.l}
            className="cursor-pointer"
            onClick={() => onSelectStep?.(idx)}
          >
            {/* spoke line from center */}
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={isActive ? "#0a84ff" : "#bcd6fa"}
              strokeWidth={isActive ? "1.8" : "1.2"}
              strokeDasharray={isActive ? "none" : "3 3"}
              style={{ transition: "stroke 0.8s ease, stroke-width 0.8s ease" }}
            />

            {/* Subtle, smooth ripple pulse on ACTIVE step — transparent background, no solid blue */}
            {isActive && (
              <g>
                <circle cx={x} cy={y} r="21" fill="none" stroke="#0a84ff" strokeWidth="1.8">
                  <animate attributeName="r" values="21;38" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0" dur="2.6s" repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r="21" fill="none" stroke="#38bdf8" strokeWidth="1.2">
                  <animate attributeName="r" values="21;38" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
                </circle>
              </g>
            )}

            {/* Node circle — clean white background (no solid blue fill) */}
            <circle
              cx={x}
              cy={y}
              r="21"
              fill="#ffffff"
              stroke={isActive ? "#0a84ff" : "#bcd6fa"}
              strokeWidth={isActive ? "2.6" : "1.8"}
              style={{ transition: "stroke 0.6s ease, stroke-width 0.6s ease" }}
            />

            {/* Node step number */}
            <text
              x={x}
              y={y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="700"
              fill={isActive ? "#0a84ff" : "#5a6e8c"}
              style={{ transition: "fill 0.6s ease" }}
            >
              {n.l}
            </text>

            {/* Node label */}
            <text
              x={x}
              y={y + 31}
              textAnchor="middle"
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight={isActive ? "700" : "500"}
              fill={isActive ? "#0a84ff" : "#6b7a95"}
              style={{ transition: "fill 0.6s ease, font-weight 0.6s ease" }}
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Center 7-day avatar with sprint.png — clean ambient backing */}
      <circle cx={cx} cy={cy} r="48" fill="rgba(10,132,255,0.03)" />
      <circle
        cx={cx}
        cy={cy}
        r="54"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        className="wf-spin"
        style={{ transformOrigin: `${cx}px ${cy}px`, animationDirection: "reverse" }}
      />
      <image
        href="/assets/sprint.png"
        x={cx - 55}
        y={cy - 57}
        width={110}
        height={110}
        preserveAspectRatio="xMidYMid meet"
        className="cursor-pointer drop-shadow-[0_8px_20px_rgba(10,132,255,0.35)] transition-transform duration-200 hover:scale-105"
        onClick={() => onSelectStep?.(0)}
      />
    </svg>
  );
}

/* ---------- main component ---------- */

export default function SprintWorkflow() {
  // refs for the HORIZONTAL carousel only (steps 1-6)
  const rootRef            = useRef<HTMLDivElement>(null);
  const pinRef             = useRef<HTMLDivElement>(null);   // the pinned wrapper for steps
  const trackRef           = useRef<HTMLDivElement>(null);
  const railRef            = useRef<HTMLDivElement>(null);
  const avatarRef          = useRef<HTMLDivElement>(null);
  const movingRef          = useRef(false);
  const lastScrollTimeRef  = useRef<number>(Date.now());
  const isAutoScrollingRef = useRef<boolean>(false);

  const [active, setActive] = useState(0);
  const [moving, setMoving] = useState(false);

  /* ── jump to a specific panel inside the carousel ── */
  const jumpToPanel = (panelIndex: number) => {
    // Try via ScrollTrigger (most accurate once GSAP is running)
    const st = ScrollTrigger.getById("sprint-st");
    if (st) {
      const target = st.start + (panelIndex / (PANEL_COUNT - 1)) * (st.end - st.start);
      isAutoScrollingRef.current = true;
      lastScrollTimeRef.current  = Date.now();
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }
    // Fallback: scroll to top of the pinned section
    if (pinRef.current) {
      window.scrollTo({ top: pinRef.current.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      const track    = trackRef.current!;
      const distance = () => track.scrollWidth - window.innerWidth;

      const setAvatar = gsap.quickSetter(avatarRef.current!, "x", "px");
      const railW     = () => railRef.current?.offsetWidth ?? 0;

      const setMove = (m: boolean) => {
        if (movingRef.current !== m) { movingRef.current = m; setMoving(m); }
      };

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          id: "sprint-st",
          trigger: pinRef.current!,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (PANEL_COUNT - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            setAvatar(self.progress * railW());
            const curr = Math.min(PANEL_COUNT - 1, Math.round(self.progress * (PANEL_COUNT - 1)));
            setActive(curr);
            setMove(Math.abs(self.getVelocity()) > 12);
            if (!isAutoScrollingRef.current) lastScrollTimeRef.current = Date.now();
          },
          onSnapComplete: () => { setMove(false); isAutoScrollingRef.current = false; },
          onScrubComplete: () => { setMove(false); isAutoScrollingRef.current = false; },
        },
      });

      /* per-panel reveals + svg draw */
      gsap.utils.toArray<HTMLElement>(".wf-panel").forEach((panel) => {
        const reveals = panel.querySelectorAll(".wf-reveal");
        if (reveals.length) {
          gsap.from(reveals, {
            y: 44, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 78%", toggleActions: "play none none reverse" },
          });
        }
        panel.querySelectorAll<SVGGeometryElement>(".wf-draw").forEach((el) => {
          let len = 0;
          try { len = el.getTotalLength(); } catch { len = 0; }
          if (!len) return;
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(el, {
            strokeDashoffset: 0, duration: 1, ease: "power1.inOut",
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 72%", toggleActions: "play none none reverse" },
          });
        });
      });

      /* graphic parallax */
      gsap.utils.toArray<HTMLElement>(".wf-gfx").forEach((g) => {
        gsap.fromTo(g, { xPercent: 14 }, {
          xPercent: -14, ease: "none",
          scrollTrigger: { trigger: g, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });

      /* idle animations (not scroll-bound) */
      gsap.to(".wf-float", { y: -8, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.15 });
      gsap.to(".wf-spin",  { rotation: 360, transformOrigin: "center", duration: 8, ease: "none", repeat: -1 });
      gsap.fromTo(".wf-ping", { scale: 1, opacity: 0.8 }, { scale: 2.6, opacity: 0, duration: 1.8, ease: "power1.out", repeat: -1, stagger: 0.2 });

      /* auto-advance when idle inside the sprint section */
      const autoInterval = setInterval(() => {
        const st = ScrollTrigger.getById("sprint-st");
        if (!st || !st.isActive) return;
        const now = Date.now();
        if (now - lastScrollTimeRef.current >= 3400) {
          const curr   = Math.min(PANEL_COUNT - 1, Math.round(st.progress * (PANEL_COUNT - 1)));
          const next   = (curr + 1) % PANEL_COUNT;
          const target = st.start + (next / (PANEL_COUNT - 1)) * (st.end - st.start);
          isAutoScrollingRef.current = true;
          lastScrollTimeRef.current  = now;
          window.scrollTo({ top: target, behavior: "smooth" });
        }
      }, 1000);

      const id = setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => { clearTimeout(id); clearInterval(autoInterval); };
    },
    { scope: rootRef }
  );

  /* ── step HUD labels for the 6 carousel panels ── */
  const hudLabels = ["Step 01", "Step 02", "Step 03", "Step 04", "Step 05", "Live"];

  return (
    <section ref={rootRef} className="relative w-full bg-canvas">

      {/* ══════════════════════════════════════════════════
          SLIDE 0 — OVERVIEW (normal scroll, NOT pinned)
          Visitor scrolls freely past this. Entering the
          sprint carousel requires an intentional click.
      ══════════════════════════════════════════════════ */}
      <div className="relative flex h-screen w-full items-center overflow-hidden px-6 sm:px-16 lg:px-24">

        {/* ambient */}
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(10,132,255,0.1)_1px,transparent_1.4px)] [background-size:26px_26px]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_62%)] blur-2xl" />

        {/* main grid */}
        <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">

          {/* LEFT — copy */}
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.08] px-4 py-1 font-mono text-[10px] font-500 tracking-[0.14em] uppercase text-electric backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
              5-Step Execution Workflow
            </div>

            <h2 className="font-display text-4xl font-800 leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[52px]">
              One Candidate,<br />
              <span className="text-electric">Five Orchestrated Steps.</span>
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:text-[17px]">
              From technical brief to a fully onboarded specialist in{" "}
              <strong className="text-ink">7 days flat</strong> — vetted in-house,
              compliance-ready, and supported through the 30/60/90-day ramp.
            </p>

            {/* step badge grid — each click enters the carousel at that step */}
            <div className="mt-7 grid grid-cols-5 gap-2">
              {STEPS.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => jumpToPanel(i)}
                  className="group flex flex-col items-center gap-1.5 rounded-xl border border-[#cddcf3] bg-white/70 px-2 py-3 text-center backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:shadow-[0_8px_20px_-6px_rgba(10,132,255,0.22)] cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric/10 font-mono text-[11px] font-800 text-electric transition-all duration-200 group-hover:bg-electric group-hover:text-white">
                    {s.n}
                  </span>
                  <span className="font-mono text-[9px] font-600 leading-tight text-ink-soft group-hover:text-electric">
                    {s.short}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-5 font-mono text-[11px] tracking-[0.12em] uppercase text-[#8a9bbf]">
              Click a step above — or meet our guide in the corner →
            </p>
          </div>

          {/* RIGHT — orbital visual */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[440px] rounded-[2rem] border border-[#bcd6fa]/60 bg-white/60 p-6 shadow-[0_40px_90px_-40px_rgba(10,132,255,0.5)] backdrop-blur-md lg:block">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-50 [background-image:radial-gradient(rgba(10,132,255,0.1)_1px,transparent_1.4px)] [background-size:22px_22px]" />
            <OverviewVisual onSelectStep={(idx) => jumpToPanel(idx)} />
          </div>
        </div>

        {/* ── bottom-right waving character CTA ── */}
        <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-2 sm:bottom-10 sm:right-10">
          {/* speech bubble */}
          <button
            type="button"
            onClick={() => jumpToPanel(0)}
            className="wf-bubble relative mr-2 cursor-pointer text-left transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none"
            aria-label="Explore the sprint - Click to start"
          >
            <div className="rounded-xl border border-electric/30 bg-white/90 px-3.5 py-2 shadow-[0_8px_24px_-6px_rgba(10,132,255,0.25)] backdrop-blur-md transition-all hover:border-electric hover:shadow-[0_8px_24px_-4px_rgba(10,132,255,0.38)]">
              <p className="font-mono text-[11px] font-600 leading-tight text-ink">Explore the sprint</p>
              <p className="mt-0.5 font-mono text-[10px] font-semibold text-electric">Click me →</p>
            </div>
            <div className="absolute -bottom-2 right-5 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/90" />
          </button>
          {/* waving figure */}
          <button
            type="button"
            onClick={() => jumpToPanel(0)}
            className="group flex h-[72px] w-[52px] cursor-pointer items-end justify-center focus:outline-none"
            aria-label="Start the sprint journey"
          >
            <div className="h-full w-full drop-shadow-[0_6px_12px_rgba(10,132,255,0.4)] transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1">
              <CandidateFigure pose="wave" />
            </div>
          </button>
        </div>
      </div>
      {/* END SLIDE 0 — page scrolls naturally past here */}


      {/* ══════════════════════════════════════════════════
          SLIDES 1-6 — PINNED HORIZONTAL CAROUSEL
          Visitor only reaches this block if they scroll
          past the overview OR click into a specific step.
          The ScrollTrigger pins this block and scrubs
          through all 6 panels step-by-step.
      ══════════════════════════════════════════════════ */}
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">

        {/* ambient */}
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(10,132,255,0.1)_1px,transparent_1.4px)] [background-size:26px_26px]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_62%)] blur-2xl" />

        {/* section badge */}
        <div className="pointer-events-none absolute left-5 top-6 z-20 sm:left-10 sm:top-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.08] px-4 py-1 font-mono text-[10px] font-500 tracking-[0.14em] uppercase text-electric backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
            5-Step Execution Workflow · 7-Day Sprint
          </div>
        </div>

        {/* horizontal track */}
        <div ref={trackRef} className="flex h-full will-change-transform">

          {/* step panels 01–05 */}
          {STEPS.map((step, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={step.n} className="wf-panel relative flex h-full w-screen shrink-0 items-center px-6 sm:px-16 lg:px-24">
                <div className={`relative grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative">
                    <span className="pointer-events-none absolute -left-2 top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[30vw] font-800 leading-none text-electric/[0.06] lg:-left-6 lg:text-[13rem]">
                      {step.n}
                    </span>
                    <div className="wf-reveal flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric font-display text-lg font-800 text-white shadow-[0_10px_24px_-8px_rgba(10,132,255,0.7)]">
                        {step.n}
                      </span>
                      <span className="h-px w-14 bg-gradient-to-r from-electric to-transparent" />
                      <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#6b7a95]">Step {step.n} / 05</span>
                    </div>
                    <h3 className="wf-reveal mt-5 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-800 leading-tight tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="wf-reveal mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                      {step.body}
                    </p>
                  </div>
                  <div className="wf-reveal wf-gfx relative mx-auto aspect-[13/11] w-full max-w-[420px] rounded-3xl border border-[#bcd6fa]/60 bg-white/70 p-6 shadow-[0_30px_70px_-34px_rgba(10,132,255,0.4)] backdrop-blur-md">
                    <step.Gfx />
                  </div>
                </div>
              </div>
            );
          })}

          {/* success panel */}
          <div className="wf-panel relative flex h-full w-screen shrink-0 items-center px-6 sm:px-16 lg:px-24">
            <div className="relative grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
              <div className="relative">
                <div className="wf-reveal inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-4 py-1 font-mono text-[11px] font-600 tracking-[0.16em] uppercase text-electric">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" /> Onboarded
                </div>
                <h3 className="wf-reveal mt-5 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-800 leading-tight tracking-tight text-ink">
                  Deployed, retained,<br />
                  <span className="text-electric">productive.</span>
                </h3>
                <p className="wf-reveal mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                  Seven days from brief to a fully integrated specialist — vetted in-house, compliance-ready, and supported through the 30/60/90-day ramp.
                </p>
                <div className="wf-reveal mt-7 flex flex-wrap gap-3">
                  <a href="#" className="group inline-flex items-center gap-2 rounded-xl bg-electric px-7 py-3.5 font-display text-sm font-600 text-white shadow-[0_10px_25px_-5px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright hover:shadow-[0_14px_30px_-5px_rgba(56,189,248,0.5)]">
                    Start a 7-day sprint
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/80 px-6 py-3.5 font-display text-sm font-600 text-ink backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:text-electric">
                    See the vetting rubric
                  </a>
                </div>
              </div>
              <div className="wf-reveal wf-gfx relative mx-auto aspect-[13/11] w-full max-w-[420px] rounded-3xl border border-[#bcd6fa]/60 bg-white/70 p-6 shadow-[0_30px_70px_-34px_rgba(10,132,255,0.4)] backdrop-blur-md">
                <GfxSuccess />
              </div>
            </div>
          </div>
        </div>

        {/* ── bottom progress HUD (always visible inside carousel) ── */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 sm:px-10 sm:pb-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-[#6b7a95]">
              <span className="inline-flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${moving ? "bg-electric-bright" : "bg-electric"}`} />
                Candidate journey · {moving ? "in transit" : "in analysis"}
              </span>
              <span className="text-electric">{Math.round((active / (PANEL_COUNT - 1)) * 100)}% complete</span>
            </div>
            <div ref={railRef} className="relative h-1.5 w-full rounded-full bg-[#d6e3f7]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-electric to-electric-bright transition-[width] duration-150"
                style={{ width: `${(active / (PANEL_COUNT - 1)) * 100}%` }}
              />
              {hudLabels.map((label, i) => {
                const done = i <= active;
                return (
                  <button
                    key={i}
                    onClick={() => jumpToPanel(i)}
                    className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                    style={{ left: `${(i / (PANEL_COUNT - 1)) * 100}%` }}
                    aria-label={`Jump to ${label}`}
                  >
                    <span className={`block h-3 w-3 rounded-full border-2 transition-all duration-200 group-hover:scale-125 ${done ? "border-electric bg-electric" : "border-[#b9cdec] bg-white group-hover:border-electric"}`} />
                    <span className={`absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.1em] uppercase transition-colors duration-200 ${i === active ? "font-semibold text-electric" : "text-[#9aabc6] group-hover:text-electric"}`}>
                      {label}
                    </span>
                  </button>
                );
              })}
              {!moving && (
                <span
                  className="wf-stop pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-electric"
                  style={{ left: `${(active / (PANEL_COUNT - 1)) * 100}%` }}
                />
              )}
              <div ref={avatarRef} className="absolute bottom-1/2 left-0">
                <div className="-translate-x-1/2 translate-y-[3px]">
                  <div className={`h-[54px] w-[38px] origin-bottom drop-shadow-[0_6px_10px_rgba(10,132,255,0.35)] ${moving ? "wf-bob" : ""}`}>
                    <CandidateFigure pose={moving ? "run" : "sit"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END CAROUSEL */}

      <style>{`
        /* bubble float */
        .wf-bubble { animation: wf-bubble-float 2.4s ease-in-out infinite; }
        @keyframes wf-bubble-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

        /* bob */
        .wf-bob { animation: wf-bob 0.5s ease-in-out infinite; }
        @keyframes wf-bob { 0%,100% { transform: translateY(0) rotate(-1.5deg); } 50% { transform: translateY(-3px) rotate(1.5deg); } }

        /* runner limbs */
        .wf-leg-a { animation: wf-swingA 0.42s ease-in-out infinite; }
        .wf-leg-b { animation: wf-swingB 0.42s ease-in-out infinite; }
        .wf-arm-a { animation: wf-swingB 0.42s ease-in-out infinite; }
        .wf-arm-b { animation: wf-swingA 0.42s ease-in-out infinite; }
        @keyframes wf-swingA { 0%,100% { transform: rotate(24deg); }  50% { transform: rotate(-24deg); } }
        @keyframes wf-swingB { 0%,100% { transform: rotate(-24deg); } 50% { transform: rotate(24deg);  } }

        /* seated analyst */
        .wf-nod { animation: wf-nod 2.4s ease-in-out infinite; }
        @keyframes wf-nod { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(6deg); } }
        .wf-type   { animation: wf-type 0.5s ease-in-out infinite; }
        .wf-type-2 { animation-delay: 0.25s; }
        @keyframes wf-type { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-8deg); } }

        /* waving arm */
        .wf-wave-arm {
          transform-box: fill-box;
          transform-origin: bottom center;
          animation: wf-wave 1.2s ease-in-out infinite;
        }
        @keyframes wf-wave {
          0%,100% { transform: rotate(0deg);   }
          25%      { transform: rotate(22deg);  }
          75%      { transform: rotate(-12deg); }
        }

        /* stoppage pulse */
        .wf-stop { animation: wf-stop 1.4s ease-out infinite; }
        @keyframes wf-stop {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.9; }
          100% { transform: translate(-50%,-50%) scale(3.4); opacity: 0;   }
        }
      `}</style>
    </section>
  );
}
