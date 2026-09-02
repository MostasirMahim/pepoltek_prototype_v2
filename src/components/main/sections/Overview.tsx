import React from "react";
import Image from "next/image";

const overviewData = {
  logo: "/assets/pepoltek/white_logo.png",
  logoAlt: "Pepoltek Limited",
  badge: "Who We Are",
  text: "Pepoltek Limited operates as a global IT solutions provider delivering technical staffing and workforce solutions to 30+ clients across 15+ countries in IT & Healthcare. Powered by an in house delivery engine of industry specialists (Niche recruiters, business analysts, software engineers), our team brings 20+ years of combined execution leadership across greenfield HR tech and Enterprise level scale & commercialization.",
  subtext:
    "Together, we’re here to reshape global hiring standards, faster turnarounds, data backed uncompromized quality.",
};

const stats = [
  { value: "5+", label: "Years Excellence" },
  { value: "30+", label: "Clients Worldwide" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function Overview() {
  return (
    <section id="overview-section" className="relative w-full bg-gradient-to-b from-canvas via-white to-canvas py-20 lg:py-28">
      {/* Floating decorative ambient icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[15%] left-[5%] text-electric/10 animate-[float-node_6s_ease-in-out_infinite]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="absolute right-[5%] bottom-[20%] text-electric/10 animate-[float-node_6s_ease-in-out_1s_infinite]">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M5.5 20v-2a6.5 6.5 0 0 1 13 0v2" />
          </svg>
        </div>
        <div className="absolute top-[40%] left-[8%] text-electric/10 animate-[float-node_6s_ease-in-out_2s_infinite]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        </div>
        <div className="absolute right-[8%] bottom-[30%] text-electric/10 animate-[float-node_6s_ease-in-out_1.5s_infinite]">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <path d="M12 22V12" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left Column: Interactive Brand Orb Dock Target & Badges */}
          <div
            id="overview-orb-target"
            className="relative flex min-h-[340px] items-center justify-center sm:min-h-[420px]"
          >
            <div className="relative flex h-[240px] w-[240px] items-center justify-center sm:h-[300px] sm:w-[300px]">
              {/* Dashed outer orbit ring */}
              <div
                id="overview-dashed-ring"
                className="absolute inset-0 h-full w-full rounded-full border-2 border-dashed border-electric/25 animate-[spin_22s_linear_infinite]"
                style={{ transformOrigin: "center" }}
              >
                {/* Satellite orb */}
                <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-electric shadow-[0_0_16px_rgba(10,132,255,0.7)]" />
              </div>

              {/* Inner morphing gradient blob */}
              <div
                id="overview-brand-blob"
                className="group relative flex h-[160px] w-[160px] items-center justify-center overflow-hidden bg-gradient-to-br from-electric to-[#0052cc] shadow-[0_20px_45px_-10px_rgba(10,132,255,0.45)] transition-shadow duration-300 hover:shadow-[0_24px_55px_-8px_rgba(10,132,255,0.6)] sm:h-[200px] sm:w-[200px] animate-[morph_8s_ease-in-out_infinite]"
              >
                <Image
                  src={overviewData.logo}
                  alt={overviewData.logoAlt}
                  width={220}
                  height={50}
                  className="p-5 sm:p-7 object-contain filter brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Floating badges wrapper */}
            <div id="overview-floating-badges" className="pointer-events-none absolute inset-0">
              {/* Floating pill badge 1: Est. 2020 */}
              <div className="pointer-events-auto absolute top-[14%] right-[4%] sm:right-[10%] flex items-center gap-2 rounded-full border border-electric/20 bg-white/90 px-4 py-2 text-xs sm:text-sm font-semibold text-ink shadow-[0_10px_25px_-5px_rgba(10,20,40,0.08)] backdrop-blur-md animate-[float-badge_5s_ease-in-out_infinite]">
                <span className="h-2 w-2 rounded-full bg-electric shadow-[0_0_8px_rgba(10,132,255,0.8)]" />
                <span>Est. 2020</span>
              </div>

              {/* Floating pill badge 2: Global */}
              <div className="pointer-events-auto absolute bottom-[16%] left-[2%] sm:left-[6%] flex items-center gap-2 rounded-full border border-electric/20 bg-white/90 px-4 py-2 text-xs sm:text-sm font-semibold text-ink shadow-[0_10px_25px_-5px_rgba(10,20,40,0.08)] backdrop-blur-md animate-[float-badge_5.5s_ease-in-out_0.5s_infinite]">
                <span className="h-2 w-2 rounded-full bg-electric shadow-[0_0_8px_rgba(10,132,255,0.8)]" />
                <span>Global</span>
              </div>
            </div>
          </div>

          {/* Right Column: Overview Story & Metrics */}
          <div className="flex flex-col text-left">
            {/* Section Pill */}
            <div className="mb-5 inline-flex items-center gap-2 self-start rounded-full border border-electric/20 bg-electric/[0.08] px-3.5 py-1 text-xs font-mono font-medium tracking-[0.14em] uppercase text-electric">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
              {overviewData.badge}
            </div>

            {/* Main paragraph description */}
            <p className="text-base sm:text-lg leading-relaxed text-ink-soft">
              {overviewData.text}
            </p>

            {/* Quote block */}
            <div className="relative mt-6 rounded-r-2xl border-l-4 border-electric bg-gradient-to-r from-electric/[0.05] via-electric/[0.02] to-transparent py-4 pr-6 pl-5 sm:pl-7">
              {/* Quote background icon */}
              <svg
                className="pointer-events-none absolute top-2 right-4 h-9 w-9 text-electric/15"
                viewBox="0 0 40 40"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14 16L10 22V28H18V22H12L14 16Z" />
                <path d="M28 16L24 22V28H32V22H26L28 16Z" />
              </svg>
              <p className="text-base sm:text-[17px] font-normal italic leading-relaxed text-ink">
                &ldquo;{overviewData.subtext}&rdquo;
              </p>
            </div>

            {/* Animated accent gradient line */}
            <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-electric/40 to-transparent" />

            {/* Features / Stats metrics row - commented out to maintain compact section height */}
            {/* <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#bcd6fa]/60 pt-6 sm:gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-electric">
                    {stat.value}
                  </span>
                  <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft sm:text-xs">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
