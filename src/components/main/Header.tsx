"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";

const NAV_ITEMS = [
  { label: "About Us", href: "/#about" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Opportunities", href: "/#opportunity" },
  { label: "Want Hiring", href: "/#hiring" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[#bcd6fa]/40 bg-canvas/90 shadow-[0_4px_20px_-4px_rgba(10,20,40,0.06)] backdrop-blur-md py-2.5"
          : "bg-transparent pt-3.5 pb-2.5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl 2xl:max-w-[1360px] items-center justify-between gap-4 px-6 lg:px-10">
        {/* Left: black logo image instead of text */}
        <Link href="/" className="group flex shrink-0 items-center transition-transform hover:opacity-90">
          <Image
            src="/assets/pepoltek/black_logo.png"
            alt="Pepoltek Limited"
            width={160}
            height={40}
            className="h-8 w-auto object-contain sm:h-9"
            priority
          />
        </Link>

        {/* Middle: nav items */}
        <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.14em] text-[#3d4c68] lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-electric"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: auth buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <Link
            href="/login"
            className="hidden items-center justify-center whitespace-nowrap rounded-xl border border-[#bcd6fa] bg-white/80 px-4 py-2 font-display text-xs sm:text-sm font-semibold text-[#0a1428] shadow-[0_2px_8px_-2px_rgba(10,20,40,0.04)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:text-electric sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-[#0a1428] px-4.5 py-2 font-display text-xs sm:text-sm font-semibold text-white shadow-[0_6px_16px_-4px_rgba(10,20,40,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric hover:shadow-[0_8px_20px_-4px_rgba(10,132,255,0.5)]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
