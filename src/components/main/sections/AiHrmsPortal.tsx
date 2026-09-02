"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ---------- in-view trigger (replays animations per entry) ---------- */
function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setSeen(e.isIntersecting),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/* ---------- count-up ---------- */
function CountUp({
  to,
  dur = 900,
  suffix = "",
  decimals = 0,
  play,
}: {
  to: number;
  dur?: number;
  suffix?: string;
  decimals?: number;
  play: boolean;
}) {
  const [v, setV] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (!play) {
      setV(0);
      return;
    }
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [play, to, dur]);
  return (
    <>
      {v.toFixed(decimals)}
      {suffix}
    </>
  );
}

/* ---------- radial gauge ---------- */
function Gauge({
  value,
  label,
  sub,
  play,
  delay = 0,
}: {
  value: number;
  label: string;
  sub: string;
  play: boolean;
  delay?: number;
}) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - (play ? value / 100 : 0));
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[92px] w-[92px]">
        <svg viewBox="0 0 84 84" className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id="hrms-g" x1="0" y1="0" x2="84" y2="84" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0a84ff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <circle cx="42" cy="42" r={r} fill="none" stroke="#d6e3f7" strokeWidth="7" />
          <circle
            cx="42"
            cy="42"
            r={r}
            fill="none"
            stroke="url(#hrms-g)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={off}
            style={{ transition: `stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-xl font-800 text-ink">
            <CountUp to={value} play={play} dur={1100} />
          </span>
          <span className="font-mono text-[8px] text-mist">/100</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="font-display text-[13px] font-700 text-ink">{label}</div>
        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-mist">{sub}</div>
      </div>
    </div>
  );
}

/* ---------- data ---------- */
const TABS = [
  { id: 0, k: "01", label: "Natural Language Query" },
  { id: 1, k: "02", label: "System Design Audit Logs" },
  { id: 2, k: "03", label: "Behavioral Video Scorecards" },
];

const CANDIDATES = [
  { init: "PN", name: "Priya Nair", role: "Senior Backend Engineer · 7y Node.js", score: 94, visa: "H-1B", visaTone: "el", tz: "GMT+5:30 · 4h overlap", model: "C2C ready" },
  { init: "MR", name: "Marco Ruiz", role: "Staff Node.js Engineer · 8y", score: 91, visa: "OPT / STEM", visaTone: "br", tz: "GMT−3 · 6h overlap", model: "W2" },
  { init: "LF", name: "Lena Fischer", role: "Backend Engineer · 6y Node.js", score: 88, visa: "EU Blue Card", visaTone: "gr", tz: "CET · 7h overlap", model: "EOR" },
];

const TERMINAL = [
  { t: "$ pepoltek audit --candidate PN-4471 --suite full", cls: "text-white/50" },
  { t: "› static analysis ........... clean", cls: "text-white/80" },
  { t: "› redis memory safety ....... [ PASS ]", cls: "text-signal" },
  { t: "› kafka backpressure ........ [ PASS ]", cls: "text-signal" },
  { t: "› system design review ...... 96 / 100", cls: "text-electric-bright" },
  { t: "› integration benchmarks .... 14/14 clean", cls: "text-signal" },
  { t: "[ PASSED ] audit sealed · hash 0xA1F…9C", cls: "text-white" },
];

const PILL = {
  el: "border-electric/30 bg-electric/10 text-electric",
  br: "border-electric-bright/40 bg-electric-bright/10 text-[#0b74c9]",
  gr: "border-signal/30 bg-signal/10 text-signal",
} as const;

export default function AiHrmsPortal() {
  const [tab, setTab] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const [typed, setTyped] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);
  const [termLines, setTermLines] = useState(0);

  const QUERY = "Filter software engineers with 5+ years in Node.js and C2C readiness";

  // typing + staged reveal for tab 1
  useEffect(() => {
    if (tab !== 0 || !inView) return;
    setTyped(0);
    setVisibleRows(0);
    let i = 0;
    const type = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= QUERY.length) {
        clearInterval(type);
        [0, 1, 2].forEach((n) => setTimeout(() => setVisibleRows(n + 1), 300 + n * 260));
      }
    }, 26);
    return () => clearInterval(type);
  }, [tab, inView]);

  // terminal streaming for tab 2
  useEffect(() => {
    if (tab !== 1 || !inView) return;
    setTermLines(0);
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setTermLines(n);
      if (n >= TERMINAL.length) clearInterval(id);
    }, 340);
    return () => clearInterval(id);
  }, [tab, inView]);

  return (
    <section ref={ref} id="ai-hrms" className="relative w-full bg-canvas px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(10,132,255,0.07)_1px,transparent_1.4px)] [background-size:28px_28px]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[380px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_64%)] blur-2xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* left — copy + features */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.07] px-4 py-1 font-mono text-[10px] font-500 uppercase tracking-[0.16em] text-electric backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
            In-house AI-HRMS
          </div>
          <h2 className="mt-4 font-display text-3xl font-800 leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-[44px]">
            Ask for the shortlist in <span className="text-electric">plain language.</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            The client portal accepts natural-language queries and returns ranked candidates with match score, work authorization, engagement model, and the engineering audit that produced the ranking.
          </p>

          {/* features */}
          <ul className="mt-8 space-y-4">
            {[
              {
                title: "Natural-language shortlisting",
                body: "Query in plain English — get ranked matches with match score, work authorization, timezone overlap, and engagement model.",
                icon: <path d="M12 3v2M5 8l1.4 1.4M19 8l-1.4 1.4M12 21a5 5 0 0 0 5-5c0-2.5-2-3.5-2-6a3 3 0 0 0-6 0c0 2.5-2 3.5-2 6a5 5 0 0 0 5 5Z" />,
              },
              {
                title: "Engineering-grade audit trail",
                body: "Every ranking ships with code-quality, test-coverage, and Redis/Kafka memory-safety validation you can inspect.",
                icon: (
                  <>
                    <path d="m7 8-4 4 4 4" />
                    <path d="m17 8 4 4-4 4" />
                    <path d="M14 4 10 20" />
                  </>
                ),
              },
              {
                title: "Behavioral video scorecards",
                body: "HEXACO, OCEAN, and BEI signals paired with a 90-second technical explainer clip for every finalist.",
                icon: (
                  <>
                    <rect x="3" y="5" width="14" height="14" rx="2" />
                    <path d="m17 9 4-2v10l-4-2" />
                  </>
                ),
              },
            ].map((f) => (
              <li key={f.title} className="group flex gap-3.5">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-electric shadow-[0_10px_24px_-14px_rgba(10,132,255,0.6)] transition-colors duration-200 group-hover:border-electric/40">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </span>
                <div>
                  <div className="font-display text-[15px] font-700 text-ink">{f.title}</div>
                  <p className="mt-0.5 max-w-md text-[13.5px] leading-relaxed text-ink-soft">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* cta */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="#deploy"
              className="group inline-flex items-center gap-2 rounded-xl bg-electric px-7 py-3.5 font-display text-sm font-600 text-white shadow-[0_12px_30px_-8px_rgba(10,132,255,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright"
            >
              Open the AI-HRMS demo
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 font-display text-sm font-600 text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:text-electric"
            >
              Book a guided tour
            </Link>
          </div>
        </div>

        {/* right — portal frame */}
        <div className="relative">
          {/* glow edge */}
          <div className="ai-edge pointer-events-none absolute -inset-px rounded-[2rem]" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_50px_120px_-45px_rgba(10,132,255,0.5)]">
            {/* browser chrome */}
            <div className="flex items-center gap-3 border-b border-border/70 bg-gradient-to-b from-[#f4f8ff] to-white px-5 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-1.5 font-mono text-[11px] text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                portal.pepoltek.ai <span className="text-ink-soft">/ shortlist</span>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-electric sm:inline">Live</span>
            </div>

            {/* tab nav */}
            <div className="flex flex-wrap gap-1.5 border-b border-border/70 bg-[#f7faff] px-4 py-3 sm:px-6">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`group relative inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 font-display text-[12.5px] font-600 transition-all duration-300 sm:text-[13px] ${
                    tab === t.id
                      ? "border-electric bg-electric text-white shadow-[0_10px_24px_-8px_rgba(10,132,255,0.7)]"
                      : "border-border bg-white text-ink-soft hover:border-electric/40 hover:text-ink"
                  }`}
                >
                  <span className={`font-mono text-[10px] ${tab === t.id ? "text-white/70" : "text-electric"}`}>{t.k}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">{t.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* panels */}
            <div className="relative min-h-[440px] bg-gradient-to-br from-white via-[#f9fcff] to-[#eef4fd] p-5 sm:p-8">
              {/* ---------- TAB 1: NL query ---------- */}
              {tab === 0 && (
                <div key="t0" className="ai-fade">
                  {/* query bar */}
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3.5 shadow-[0_16px_40px_-24px_rgba(10,132,255,0.5)]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-electric" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v2M5 8l1.4 1.4M19 8l-1.4 1.4M12 21a5 5 0 0 0 5-5c0-2.5-2-3.5-2-6a3 3 0 0 0-6 0c0 2.5-2 3.5-2 6a5 5 0 0 0 5 5Z" />
                    </svg>
                    <div className="min-w-0 flex-1 font-mono text-[12px] leading-snug text-ink sm:text-[13.5px]">
                      {QUERY.slice(0, typed)}
                      <span className="ai-caret ml-0.5 inline-block h-[14px] w-[2px] translate-y-[2px] bg-electric" />
                    </div>
                    <button className="hidden shrink-0 items-center gap-1.5 rounded-lg bg-electric px-3.5 py-2 font-display text-[12px] font-600 text-white transition-colors hover:bg-electric-bright sm:inline-flex">
                      Run →
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-mist">
                    <span className="rounded-full border border-border bg-white px-2.5 py-1">Node.js</span>
                    <span className="rounded-full border border-border bg-white px-2.5 py-1">5+ yrs</span>
                    <span className="rounded-full border border-border bg-white px-2.5 py-1">C2C ready</span>
                    <span className="ml-auto normal-case text-electric">3 ranked matches · audited</span>
                  </div>

                  {/* results */}
                  <div className="mt-4 space-y-2.5">
                    {CANDIDATES.map((c, i) => (
                      <div
                        key={c.init}
                        className={`group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-border bg-white p-3.5 transition-all duration-500 hover:border-electric/40 hover:shadow-[0_18px_44px_-26px_rgba(10,132,255,0.55)] sm:gap-4 ${
                          visibleRows > i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                        }`}
                        style={{ transitionDelay: `${i * 40}ms` }}
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-electric-bright font-display text-sm font-700 text-white shadow-[0_8px_18px_-6px_rgba(10,132,255,0.7)]">
                          {c.init}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-display text-[14px] font-700 text-ink">{c.name}</div>
                          <div className="truncate font-mono text-[11px] text-ink-soft">{c.role}</div>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <span className={`rounded-md border px-2 py-0.5 font-mono text-[9px] font-600 ${PILL[c.visaTone as keyof typeof PILL]}`}>{c.visa}</span>
                            <span className="rounded-md border border-border bg-canvas px-2 py-0.5 font-mono text-[9px] text-ink-soft">{c.tz}</span>
                            <span className="rounded-md border border-border bg-canvas px-2 py-0.5 font-mono text-[9px] text-ink-soft">{c.model}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="font-display text-lg font-800 leading-none text-electric">
                            <CountUp to={c.score} play={visibleRows > i} suffix="%" dur={800} />
                          </div>
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#e3ecfa]">
                            <div className="h-full rounded-full bg-gradient-to-r from-electric to-electric-bright transition-[width] duration-[900ms] ease-out" style={{ width: visibleRows > i ? `${c.score}%` : "0%" }} />
                          </div>
                          <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-mist">match score</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------- TAB 2: audit logs ---------- */}
              {tab === 1 && (
                <div key="t1" className="ai-fade grid gap-5 lg:grid-cols-[1fr_1.15fr]">
                  {/* metric tiles */}
                  <div className="grid grid-cols-2 gap-3 self-start">
                    {[
                      { v: 96, suf: "/100", label: "Code quality score", big: true },
                      { v: 94, suf: "%", label: "Test coverage", big: true },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl border border-border bg-white p-4 shadow-[0_16px_40px_-30px_rgba(10,132,255,0.5)]">
                        <div className="font-display text-3xl font-800 text-ink"><CountUp to={s.v} play={inView && tab === 1} suffix={s.suf} /></div>
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-mist">{s.label}</div>
                      </div>
                    ))}
                    {[
                      { label: "Redis memory safety", state: "Validated" },
                      { label: "Kafka backpressure", state: "Validated" },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-2.5 rounded-2xl border border-border bg-white p-4">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal/10 text-signal">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                        </span>
                        <div>
                          <div className="font-display text-[13px] font-700 text-ink">{s.label}</div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-signal">{s.state}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* terminal */}
                  <div className="overflow-hidden rounded-2xl border border-[#0b1d3a] bg-[#0a1428] shadow-[0_30px_70px_-30px_rgba(10,20,40,0.8)]">
                    <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      <span className="ml-2 font-mono text-[10px] text-white/40">audit · integration benchmarks</span>
                    </div>
                    <div className="space-y-1.5 p-4 font-mono text-[11.5px] leading-relaxed sm:text-[12.5px]">
                      {TERMINAL.map((l, i) => (
                        <div key={i} className={`transition-all duration-300 ${termLines > i ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"} ${l.cls}`}>
                          {l.t}
                        </div>
                      ))}
                      {termLines >= TERMINAL.length && (
                        <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-3 py-1.5 font-mono text-[11px] font-600 text-signal">
                          <span className="h-1.5 w-1.5 rounded-full bg-signal" /> 14 / 14 benchmarks clean
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------- TAB 3: behavioral scorecards ---------- */}
              {tab === 2 && (
                <div key="t2" className="ai-fade grid gap-5 lg:grid-cols-[1.05fr_1fr]">
                  {/* video preview */}
                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-[#0a1428] shadow-[0_30px_70px_-32px_rgba(10,20,40,0.8)]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(10,132,255,0.35),transparent_60%)]" />
                    <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1.4px)] [background-size:22px_22px]" />
                    <div className="relative flex min-h-[240px] flex-col justify-between p-5 sm:min-h-[300px]">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5f57]" /> Technical explainer
                        </span>
                        <span className="font-mono text-[11px] text-white/70">01:30</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-3 py-4">
                        <button className="group/play relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-[0_16px_40px_-10px_rgba(10,132,255,0.8)] transition-transform duration-200 hover:scale-105">
                          <span className="ai-ring absolute inset-0 rounded-full border-2 border-white/50" />
                          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 text-electric" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        </button>
                        <span className="font-display text-sm font-600 text-white">90-second whiteboard walkthrough</span>
                      </div>
                      {/* waveform */}
                      <div className="flex items-end justify-center gap-[3px]">
                        {Array.from({ length: 40 }).map((_, i) => (
                          <span key={i} className="ai-wave w-[3px] rounded-full bg-gradient-to-t from-electric to-electric-bright" style={{ height: `${8 + ((i * 7) % 26)}px`, animationDelay: `${(i % 10) * 0.09}s` }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* gauges */}
                  <div className="flex flex-col justify-center rounded-2xl border border-border bg-white p-5 shadow-[0_16px_40px_-30px_rgba(10,132,255,0.5)]">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">Behavioral scorecard · candidate PN-4471</div>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <Gauge value={92} label="HEXACO" sub="Integrity" play={inView && tab === 2} delay={0} />
                      <Gauge value={88} label="OCEAN" sub="Adaptability" play={inView && tab === 2} delay={140} />
                      <Gauge value={95} label="BEI" sub="Scenario" play={inView && tab === 2} delay={280} />
                    </div>
                    <div className="mt-6 space-y-2 border-t border-border pt-4">
                      {[
                        ["Structured competency interview", "Passed"],
                        ["Communication & clarity", "High"],
                        ["Culture-add alignment", "Strong"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between text-[12.5px]">
                          <span className="text-ink-soft">{k}</span>
                          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-600 text-signal">
                            <span className="h-1.5 w-1.5 rounded-full bg-signal" />{v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ai-edge {
          background: conic-gradient(from var(--pt-ang, 0deg), transparent 0deg, rgba(56,189,248,0.55) 90deg, transparent 180deg, rgba(10,132,255,0.5) 300deg, transparent 360deg);
          animation: pt-spin 6s linear infinite;
          filter: blur(9px);
          opacity: 0.55;
        }
        .ai-fade { animation: ai-fade 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes ai-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .ai-caret { animation: ai-caret 1s steps(2) infinite; }
        @keyframes ai-caret { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .ai-ring { animation: ai-ring 2s ease-out infinite; }
        @keyframes ai-ring { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.7); opacity: 0; } }
        .ai-wave { animation: ai-wave 1.1s ease-in-out infinite; transform-origin: bottom; }
        @keyframes ai-wave { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
        @media (prefers-reduced-motion: reduce) {
          .ai-edge, .ai-caret, .ai-ring, .ai-wave { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
