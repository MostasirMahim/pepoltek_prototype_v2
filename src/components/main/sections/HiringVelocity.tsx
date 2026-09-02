"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ---------- config / data ---------- */

const SENIORITY = [
  { key: "Junior", mult: 1.0 },
  { key: "Mid", mult: 1.55 },
  { key: "Senior", mult: 2.3 },
  { key: "Lead", mult: 3.1 },
  { key: "C-Level", mult: 4.6 },
] as const;

const REGIONS = [
  { key: "North America", tag: "NA", mult: 1.9, overlap: "6–9h" },
  { key: "CEE / Europe", tag: "EU", mult: 1.35, overlap: "5–8h" },
  { key: "LATAM", tag: "LA", mult: 1.1, overlap: "7–9h" },
  { key: "South Asia / APAC", tag: "AP", mult: 1.0, overlap: "4–6h" },
] as const;

const TECH = [
  { key: "FrontEnd", prem: 0.07 },
  { key: "BackEnd", prem: 0.1 },
  { key: "AI", prem: 0.16 },
  { key: "Cloud / DevOps", prem: 0.12 },
  { key: "QA", prem: 0.05 },
  { key: "Product", prem: 0.09 },
  { key: "Project", prem: 0.05 },
  { key: "Specialized Tech", prem: 0.18 },
] as const;

const BASE_UNIT = 4200; // baseline monthly unit / specialist

/* timezone matrix: guaranteed live overlap in a shared workday (0-24 scale) */
const ZONES = [
  { name: "EST / PST", region: "Americas", start: 13, end: 21, hours: "8h", live: "9am–5pm ET" },
  { name: "GMT / BST", region: "United Kingdom", start: 8, end: 17, hours: "9h", live: "8am–5pm UK" },
  { name: "CET / CEST", region: "Europe", start: 7, end: 16, hours: "9h", live: "8am–5pm CET" },
  { name: "GCC Region", region: "Gulf", start: 5, end: 13, hours: "8h", live: "8am–4pm GST" },
] as const;

/* ---------- helpers ---------- */

function useCountUp(target: number, decimals = 0, ms = 550) {
  const [val, setVal] = useState(target);
  const from = useRef(target);
  const raf = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    const b = target;
    cancelAnimationFrame(raf.current);
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(a + (b - a) * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else from.current = b;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, ms]);
  const f = Math.pow(10, decimals);
  return (Math.round(val * f) / f).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/* ---------- shared: section badge ---------- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-fit inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.08] px-4 py-1 font-mono text-[11px] font-500 tracking-[0.14em] uppercase text-electric">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
      {children}
    </div>
  );
}

/* ---------- left: timezone matrix ---------- */

function TimezoneMatrix() {
  const ticks = [0, 4, 8, 12, 16, 20, 24];
  return (
    <div className="flex flex-col h-full">
      <Badge>Chasing the sun</Badge>

      <h2 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.08] font-800 tracking-tight text-ink">
        Your workday never
        <br />
        goes <span className="text-electric">dark.</span>
      </h2>
      <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-ink-soft">
        We staff talent hubs across four longitudes so a live engineer is always
        inside your business hours. The matrix below is guaranteed daily overlap —
        not a best-effort promise.
      </p>

      {/* matrix */}
      <div className="mt-8 rounded-2xl border border-[#bcd6fa]/60 bg-white/80 p-5 shadow-[0_20px_50px_-24px_rgba(10,132,255,0.25)] backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-mist">
          <span>Global overlap matrix</span>
          <span className="flex items-center gap-1.5 text-[var(--color-signal)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" />
            live coverage
          </span>
        </div>

        {/* hour scale */}
        <div className="ml-[128px] mb-2 flex justify-between font-mono text-[10px] text-mist">
          {ticks.map((t) => (
            <span key={t}>{String(t).padStart(2, "0")}</span>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          {ZONES.map((z, i) => {
            const left = (z.start / 24) * 100;
            const width = ((z.end - z.start) / 24) * 100;
            return (
              <div
                key={z.name}
                className="flex items-center"
                style={{ animation: `pt-rise .5s ease both`, animationDelay: `${i * 70}ms` }}
              >
                <div className="w-[128px] shrink-0 pr-3">
                  <div className="font-mono text-[12px] font-500 text-ink">{z.name}</div>
                  <div className="text-[10px] text-mist">{z.region}</div>
                </div>
                <div className="relative h-8 flex-1 overflow-hidden rounded-md bg-[#eef4fd] ring-1 ring-inset ring-[#bcd6fa]/70">
                  {/* faint grid */}
                  {ticks.slice(1, -1).map((t) => (
                    <span
                      key={t}
                      className="absolute top-0 h-full w-px bg-[#bcd6fa]/50"
                      style={{ left: `${(t / 24) * 100}%` }}
                    />
                  ))}
                  {/* overlap band */}
                  <div
                    className="absolute top-1/2 h-6 -translate-y-1/2 rounded-[5px] shadow-[0_0_18px_-2px_rgba(10,132,255,0.5)]"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      background:
                        "linear-gradient(90deg,var(--color-electric),var(--color-electric-bright))",
                    }}
                  >
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[10px] font-600 text-white">
                      {z.hours} live
                    </span>
                    {/* sweep */}
                    <span
                      className="absolute inset-y-0 w-1/3 bg-white/35 blur-[2px]"
                      style={{ animation: `pt-sweep 3.4s ${i * 0.4}s ease-in-out infinite` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <a
        href="#"
        className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-electric px-7 py-3.5 font-display text-[15px] font-600 text-white shadow-[0_10px_25px_-5px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0a1428] hover:shadow-[0_14px_30px_-5px_rgba(10,20,40,0.5)]"
      >
        Hire locally, deploy globally
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
}

/* ---------- right: calculator ---------- */

function Calculator() {
  const [seniority, setSeniority] = useState(2);
  const [region, setRegion] = useState(1);
  const [tech, setTech] = useState<string[]>(["FrontEnd", "BackEnd"]);
  const [squad, setSquad] = useState(6);

  const toggleTech = (k: string) =>
    setTech((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const calc = useMemo(() => {
    const sen = SENIORITY[seniority];
    const reg = REGIONS[region];
    const prem = tech.reduce(
      (sum, k) => sum + (TECH.find((t) => t.key === k)?.prem ?? 0),
      0
    );
    const perRole = BASE_UNIT * sen.mult * reg.mult * (1 + prem);
    const investment = perRole * squad;
    const sprint = Math.min(
      14,
      Math.round(2 + seniority * 1.4 + squad * 0.08 + tech.length * 0.5)
    );
    const legacy = Math.min(45, 35 + Math.round(seniority * 1.6 + squad * 0.05));
    const hoursPerRole = 40 + tech.length * 3 + seniority * 4;
    const hoursTotal = hoursPerRole * squad;
    return { investment, perRole, sprint, legacy, hoursPerRole, hoursTotal, prem };
  }, [seniority, region, tech, squad]);

  const invStr = useCountUp(calc.investment);
  const perRoleStr = useCountUp(calc.perRole);
  const sprintStr = useCountUp(calc.sprint);
  const legacyStr = useCountUp(calc.legacy);
  const hoursStr = useCountUp(calc.hoursTotal);

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(165deg,#fbfdff_0%,#eff6ff_50%,#e4eeff_100%)] p-5 backdrop-blur-md sm:p-6">
      {/* blueprint dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:radial-gradient(rgba(10,132,255,0.16)_1px,transparent_1.4px)] [background-size:18px_18px]" />
      {/* accent glows */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.22),transparent_70%)] blur-2xl" />
      {/* sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.7),transparent)]" />

      <div className="relative flex items-center justify-between">
        <Badge>Velocity calculator</Badge>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-signal)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)] [animation:pt-pulse_1.6s_ease-in-out_infinite]" />
          LIVE
        </span>
      </div>

      {/* seniority */}
      <Field label="Seniority level">
        <div className="grid grid-cols-5 gap-1.5">
          {SENIORITY.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setSeniority(i)}
              className={`rounded-lg py-2 font-mono text-[11px] font-500 transition-all duration-200 ${
                seniority === i
                  ? "bg-electric text-white shadow-[0_6px_16px_-6px_rgba(10,132,255,0.6)]"
                  : "bg-white text-ink-soft ring-1 ring-inset ring-[#bcd6fa]/70 hover:text-electric hover:ring-electric/40"
              }`}
            >
              {s.key}
            </button>
          ))}
        </div>
      </Field>

      {/* region */}
      <Field label="Sourcing region">
        <div className="grid grid-cols-2 gap-1.5">
          {REGIONS.map((r, i) => (
            <button
              key={r.key}
              onClick={() => setRegion(i)}
              className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-left transition-all duration-200 ${
                region === i
                  ? "bg-electric/[0.06] ring-1 ring-inset ring-electric"
                  : "bg-white ring-1 ring-inset ring-[#bcd6fa]/70 hover:ring-electric/40"
              }`}
            >
              <span className={`text-[13px] font-500 ${region === i ? "text-ink" : "text-ink-soft"}`}>
                {r.key}
              </span>
              <span className={`font-mono text-[10px] ${region === i ? "text-electric" : "text-mist"}`}>
                {r.overlap}
              </span>
            </button>
          ))}
        </div>
      </Field>

      {/* tech chips */}
      <Field label={`Tech focus · ${tech.length} selected`}>
        <div className="flex flex-wrap gap-1.5">
          {TECH.map((t) => {
            const on = tech.includes(t.key);
            return (
              <button
                key={t.key}
                onClick={() => toggleTech(t.key)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] transition-all duration-200 ${
                  on
                    ? "bg-electric/[0.1] text-electric ring-1 ring-inset ring-electric/50"
                    : "bg-white text-mist ring-1 ring-inset ring-[#bcd6fa]/70 hover:text-ink hover:ring-electric/30"
                }`}
              >
                {on ? "✓ " : "+ "}
                {t.key}
              </button>
            );
          })}
        </div>
      </Field>

      {/* squad slider */}
      <Field label="Squad size">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-2xl font-700 text-ink">
            {squad}
            <span className="ml-1.5 font-mono text-[11px] font-400 text-mist">
              {squad === 1 ? "specialist" : "specialists"}
            </span>
          </span>
          <span className="font-mono text-[10px] text-mist">1 — 100</span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={squad}
          onChange={(e) => setSquad(Number(e.target.value))}
          className="pt-slider mt-2.5 w-full"
          style={{
            background: `linear-gradient(90deg, #0a84ff ${squad}%, #bcd6fa ${squad}%)`,
          }}
        />
      </Field>

      {/* outputs */}
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Stat label="Legacy agency latency" value={`${legacyStr}`} unit="days" tone="dim" note="industry standard" strike />
        <Stat label="Pepoltek deployment sprint" value={`${sprintStr}`} unit="days" tone="electric" note="signed to shipping" />
        <Stat label="Eng. hours reclaimed" value={`${hoursStr}`} unit="hrs / mo" tone="signal" note={`${calc.hoursPerRole}+ per role`} />
        <Stat
          label="Per-specialist rate"
          value={money(Number(perRoleStr.replace(/,/g, "")))}
          unit="/ mo"
          tone="plain"
          note={calc.prem > 0 ? `+${Math.round(calc.prem * 100)}% skill premium` : "base rate"}
        />
      </div>

      {/* investment */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-electric/30 bg-electric/[0.06] px-5 py-3">
        <div>
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-mist">
            Live investment estimate
          </div>
          <div className="mt-1 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-800 leading-none text-ink">
            {money(Number(invStr.replace(/,/g, "")))}
            <span className="ml-1.5 font-mono text-[12px] font-400 text-mist">/ month</span>
          </div>
        </div>
        <button className="group flex cursor-pointer items-center gap-2 rounded-xl bg-electric px-5 py-3 font-display text-[14px] font-600 text-white shadow-[0_10px_25px_-5px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0a1428] hover:shadow-[0_14px_30px_-5px_rgba(10,20,40,0.5)]">
          Lock this squad
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="mb-2 font-mono text-[10px] tracking-[0.16em] uppercase text-mist">{label}</div>
      {children}
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  note,
  tone,
  strike,
}: {
  label: string;
  value: string;
  unit: string;
  note?: string;
  tone: "electric" | "signal" | "dim" | "plain";
  strike?: boolean;
}) {
  const toneColor =
    tone === "electric"
      ? "text-electric"
      : tone === "signal"
        ? "text-[var(--color-signal)]"
        : tone === "dim"
          ? "text-mist"
          : "text-ink";
  return (
    <div className="rounded-xl border border-[#bcd6fa]/60 bg-white px-3.5 py-2.5">
      <div className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-mist">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span
          className={`font-display text-2xl font-700 ${toneColor} ${
            strike ? "line-through decoration-[#f43f5e]/70 decoration-2" : ""
          }`}
        >
          {value}
        </span>
        <span className="font-mono text-[10px] text-mist">{unit}</span>
      </div>
      {note && <div className="mt-1 font-mono text-[9.5px] text-mist/90">{note}</div>}
    </div>
  );
}

/* ---------- device frame (alien-tech bezel) ---------- */

function DeviceFrame({ children }: { children: React.ReactNode }) {
  const edgeTicks = Array.from({ length: 13 });
  return (
    <div id="calculator-device-anchor" className="relative">
      {/* ambient halo */}
      <div
        id="calculator-glow-halo"
        className="pointer-events-none absolute -inset-6 rounded-[2.6rem] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.22),transparent_65%)] opacity-40 blur-2xl transition-all duration-700"
      />

      {/* outer bezel */}
      <div
        id="calculator-outer-bezel"
        className="relative rounded-[2.1rem] bg-[linear-gradient(150deg,#f4f9ff,#d4e5fb_45%,#eaf3ff)] p-3 shadow-[0_40px_90px_-30px_rgba(10,132,255,0.45),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-[#bcd6fa] transition-all duration-500"
      >
        {/* engraved inner rail */}
        <div className="relative rounded-[1.7rem] bg-[linear-gradient(160deg,#0a1428,#12203a)] p-[6px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          {/* animated conic edge glow */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] p-px [background:conic-gradient(from_var(--pt-ang,0deg),transparent_0deg,rgba(56,189,248,0.9)_40deg,transparent_120deg,transparent_240deg,rgba(10,132,255,0.7)_300deg,transparent_360deg)] [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude] [animation:pt-spin_7s_linear_infinite]" />

          {/* top device bar */}
          <div className="relative flex items-center justify-between px-4 pb-2 pt-1.5">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)] shadow-[0_0_6px_#16a34a]" />
              <span className="h-1.5 w-1.5 rounded-full bg-electric-bright/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            </div>
            <span className="font-mono text-[9px] font-500 tracking-[0.34em] text-white uppercase drop-shadow-[0_0_6px_rgba(56,189,248,0.4)]">
              PEPOLTEK · OS
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-6 rounded-full bg-white/15" />
              <span
                id="calculator-power-node"
                className="relative flex h-2 w-2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#7dd3fc,#0a84ff)] shadow-[0_0_8px_rgba(56,189,248,0.9)] transition-all duration-300"
              />
            </span>
          </div>

          {/* screen */}
          <div className="relative overflow-hidden rounded-[1.35rem]">
            {/* corner brackets */}
            <span className="pointer-events-none absolute left-2 top-2 z-20 h-4 w-4 rounded-tl-md border-l-2 border-t-2 border-electric-bright/80" />
            <span className="pointer-events-none absolute right-2 top-2 z-20 h-4 w-4 rounded-tr-md border-r-2 border-t-2 border-electric-bright/80" />
            <span className="pointer-events-none absolute bottom-2 left-2 z-20 h-4 w-4 rounded-bl-md border-b-2 border-l-2 border-electric-bright/80" />
            <span className="pointer-events-none absolute bottom-2 right-2 z-20 h-4 w-4 rounded-br-md border-b-2 border-r-2 border-electric-bright/80" />
            {children}
          </div>
        </div>

        {/* side edge ticks */}
        <div className="pointer-events-none absolute -left-[1px] top-1/2 flex -translate-y-1/2 flex-col gap-1.5">
          {edgeTicks.map((_, i) => (
            <span key={i} className={`h-px ${i % 4 === 0 ? "w-2.5 bg-electric/60" : "w-1.5 bg-[#9ec1f0]"}`} />
          ))}
        </div>
        <div className="pointer-events-none absolute -right-[1px] top-1/2 flex -translate-y-1/2 flex-col items-end gap-1.5">
          {edgeTicks.map((_, i) => (
            <span key={i} className={`h-px ${i % 4 === 0 ? "w-2.5 bg-electric/60" : "w-1.5 bg-[#9ec1f0]"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- section shell ---------- */

export default function HiringVelocity() {
  return (
    <section
      id="hiring-velocity-section"
      className="relative w-full bg-canvas px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      {/* background ambience */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(188,214,250,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(188,214,250,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <TimezoneMatrix />
        <DeviceFrame>
          <Calculator />
        </DeviceFrame>
      </div>

      <style>{`
        .pt-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
        }
        .pt-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 999px;
          background: #fff;
          border: 3px solid #0a84ff;
          box-shadow: 0 0 0 4px rgba(10, 132, 255, 0.18);
          transition: transform 0.15s;
        }
        .pt-slider::-webkit-slider-thumb:hover {
          transform: scale(1.12);
        }
        .pt-slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 999px;
          background: #fff;
          border: 3px solid #0a84ff;
        }
      `}</style>
    </section>
  );
}
