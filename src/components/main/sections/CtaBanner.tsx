"use client";

import Link from "next/link";

export default function CtaBanner() {
  return (
    <section id="cta-banner" className="relative w-full bg-canvas px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1360px]">
        <div className="cta-shell relative overflow-hidden rounded-[1.75rem] border border-white/10 px-6 py-8 shadow-[0_40px_100px_-45px_rgba(10,20,40,0.7)] sm:px-10 sm:py-10">
          {/* gradient + texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-[#0e2a5c] to-electric" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1.4px)] [background-size:24px_24px]" />
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.45),transparent_62%)] blur-2xl" />
          <div className="cta-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Clean Top-to-Bottom Layout with Buttons at Bottom */}
          <div className="relative flex flex-col items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-[10px] font-500 uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-bright" />
              Zero-risk hiring
            </div>

            {/* Headline */}
            <h2 className="mt-3.5 max-w-3xl font-display text-2xl font-800 leading-[1.12] tracking-tight text-white sm:text-3xl lg:text-[36px]">
              Send us the requirement. We send back a{" "}
              <span className="bg-gradient-to-r from-electric-bright to-white bg-clip-text text-transparent">
                vetted shortlist.
              </span>
            </h2>

            {/* Guarantee Pills */}
            <div className="mt-4 flex flex-wrap gap-2.5">
              {[
                "2-week risk-free trial on staff augmentation",
                "90-day replacement guarantee on direct hire",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 font-mono text-[11px] font-500 text-white/85 backdrop-blur-sm"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 shrink-0 text-electric-bright"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>

            {/* Bottom CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link
                href="#deploy"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-display text-sm font-600 text-ink shadow-[0_14px_34px_-10px_rgba(255,255,255,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95"
              >
                Hire &amp; Deploy
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="#commercial-terms"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 font-display text-sm font-600 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
              >
                Engagement &amp; pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-shine { animation: cta-shine 4s ease-in-out infinite; }
        @keyframes cta-shine { 0% { left: -33%; } 55%,100% { left: 130%; } }
        @media (prefers-reduced-motion: reduce) { .cta-shine { animation: none !important; } }
      `}</style>
    </section>
  );
}
