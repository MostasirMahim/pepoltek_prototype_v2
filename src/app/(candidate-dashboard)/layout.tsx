"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  badge?: string;
  icon: React.ReactNode;
}

const CANDIDATE_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/candidate/dashboard",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: "Reverse Job Search",
    href: "/candidate/reverse-search",
    badge: "AI Match",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    label: "Pod Applications",
    href: "/candidate/applications",
    badge: "3 Active",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "AI Resume Intake",
    href: "/candidate/resume-upload",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    label: "Verified Profile",
    href: "/candidate/profile",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: "Talent Academy",
    href: "/candidate/academy",
    badge: "Upskill",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: "Assessments & Badges",
    href: "/candidate/assessments",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    label: "Refer & Earn Bounty",
    href: "/candidate/referrals",
    badge: "$500",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Messages & Sprints",
    href: "/candidate/messages",
    badge: "2",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
];

export default function CandidateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpenToPods, setIsOpenToPods] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f7fd] text-ink flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#bcd6fa]/50 bg-white/95 px-4 sm:px-6 lg:px-8 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-1.5 text-ink-soft hover:bg-canvas lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="group flex items-center gap-2.5 transition-transform hover:opacity-90">
            <Image
              src="/assets/pepoltek/black_logo.png"
              alt="Pepoltek Limited"
              width={130}
              height={32}
              className="h-7 w-auto object-contain"
            />
            <span className="hidden sm:inline-block rounded-md bg-electric/10 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-electric">
              Talent Pod Portal
            </span>
          </Link>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick Search */}
          <div className="relative hidden md:block w-64">
            <input
              type="text"
              placeholder="Search pods, sprints, skills..."
              className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/40 px-3 py-1.5 pl-8 text-xs text-ink placeholder-mist focus:border-electric focus:bg-white focus:outline-hidden"
            />
            <svg className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-mist" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Pod Availability Toggle */}
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-[#bcd6fa]/60 bg-canvas px-3 py-1.5 text-xs">
            <span className={`h-2 w-2 rounded-full ${isOpenToPods ? "bg-signal animate-ping" : "bg-mist"}`} />
            <span className="font-mono text-[11px] font-semibold text-ink-soft">
              {isOpenToPods ? "Open to Pod Sprints" : "Unavailable"}
            </span>
            <button
              onClick={() => setIsOpenToPods(!isOpenToPods)}
              className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                isOpenToPods ? "bg-signal" : "bg-gray-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  isOpenToPods ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 pl-2">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-electric to-electric-bright font-display text-sm font-bold text-white shadow-xs">
                AM
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-signal" />
            </div>
            <div className="hidden text-left xl:block">
              <div className="font-display text-xs font-bold text-ink">Alex Morgan</div>
              <div className="font-mono text-[10px] text-mist">Full-Stack Lead Pod</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Shell: Sidebar + Content */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-[#bcd6fa]/50 p-4 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0 top-16" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Profile Completeness Widget */}
          <div className="mb-5 rounded-xl border border-electric/20 bg-gradient-to-br from-electric/5 to-canvas p-3.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-ink">Profile Readiness</span>
              <span className="font-mono text-electric font-bold">92%</span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-canvas overflow-hidden border border-[#bcd6fa]/40">
              <div className="h-full rounded-full bg-gradient-to-r from-electric to-electric-bright w-[92%]" />
            </div>
            <p className="mt-2 text-[10px] text-ink-soft">
              Add NHS/Cloud verification badge to hit 100% priority match.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-0.5">
            {CANDIDATE_NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    active
                      ? "bg-ink text-white shadow-xs"
                      : "text-ink-soft hover:bg-canvas hover:text-ink"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={active ? "text-electric-bright" : "text-mist group-hover:text-electric transition-colors"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                        active
                          ? "bg-electric text-white"
                          : "bg-electric/10 text-electric"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Help & Switcher Box */}
          <div className="mt-auto pt-4 border-t border-[#bcd6fa]/40">
            <div className="rounded-xl border border-[#bcd6fa]/60 bg-canvas/60 p-3 text-xs">
              <div className="font-display font-bold text-ink">Need Pod Help?</div>
              <p className="mt-0.5 text-[11px] text-ink-soft">
                Connect with your dedicated Talent Pod Advocate.
              </p>
              <Link
                href="/candidate/messages"
                className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] font-bold text-electric hover:underline"
              >
                <span>Live Chat Support →</span>
              </Link>
            </div>

            <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-mist font-mono">
              <span>Candidate v2.4</span>
              <Link href="/login" className="hover:text-ink transition-colors">
                Sign Out
              </Link>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
