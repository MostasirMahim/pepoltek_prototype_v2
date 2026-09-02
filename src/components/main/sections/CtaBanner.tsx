"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "@/components/ui/Icons";

export default function CtaBanner() {
  return (
    <section id="cta-banner" className="relative w-full bg-canvas px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1360px]">
        <div className="cta-shell relative overflow-hidden rounded-[2rem] border border-white/15 px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-10 shadow-[0_40px_100px_-35px_rgba(10,20,40,0.65)]">
          {/* Deep Navy to Electric Blue Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-[#0d234a] to-[#0a4d9c]" />
          
          {/* Subtle Grid Texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1.4px)] [background-size:24px_24px]" />
          
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -left-12 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.35),transparent_65%)] blur-2xl" />
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-80 w-80 lg:h-[460px] lg:w-[460px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.28),transparent_65%)] blur-3xl" />
          
          {/* Diagonal Light Sweep */}
          <div className="cta-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent" />

          {/* Two-Column Grid: Text on Left, 3D Visual on Right */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-8 xl:gap-10">
            {/* Left Column (7 cols): Copy & Primary CTAs */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm shadow-2xs">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-bright" />
                <span>Zero risk hiring</span>
              </div>

              {/* Headline */}
              <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-extrabold leading-[1.12] tracking-tight text-white">
                Send us the requirement. We send back a{" "}
                <span className="bg-gradient-to-r from-electric-bright via-sky-200 to-white bg-clip-text text-transparent">
                  vetted shortlist.
                </span>
              </h2>

              <p className="mt-3.5 max-w-xl text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                Elastic turnkey pods and pre-vetted specialists deployed in 2 to 7 days with guaranteed daily timezone overlap.
              </p>

              {/* Guarantee Pills */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                {[
                  "2 week risk free trial on staff augmentation",
                  "90 day replacement guarantee on direct hire",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 font-mono text-[11px] font-medium text-white/90 backdrop-blur-sm"
                  >
                    <CheckCircle size={14} className="text-electric-bright shrink-0" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-display text-xs sm:text-sm font-bold text-ink shadow-[0_14px_34px_-10px_rgba(255,255,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95 cursor-pointer"
                >
                  <span>Hire &amp; Deploy</span>
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1 text-ink" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-display text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 cursor-pointer"
                >
                  <span>Engagement &amp; pricing</span>
                </Link>
              </div>
            </div>

            {/* Right Column (5 cols): Perfectly Situated 3D Character Illustration */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[450px] transition-transform duration-300 hover:scale-[1.02]">
                {/* Backplate Ambient Glow Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric/30 via-sky-400/20 to-transparent blur-2xl -z-1 scale-90 pointer-events-none" />
                
                {/* 3D Visual Asset */}
                <Image
                  src="/assets/cta_pic.png"
                  alt="Pepoltek Talent Pod & 2-Week Risk-Free Trial Guarantee"
                  width={900}
                  height={900}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)] select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-shine { animation: cta-shine 4.5s ease-in-out infinite; }
        @keyframes cta-shine { 0% { left: -33%; } 55%,100% { left: 130%; } }
        @media (prefers-reduced-motion: reduce) { .cta-shine { animation: none !important; } }
      `}</style>
    </section>
  );
}
