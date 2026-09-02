"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Compass,
  Briefcase,
  FileText,
  ShieldCheck,
  Award,
  Zap,
  DollarSign,
  Users,
  Search,
  ChevronDown,
  LogOut,
} from "@/components/ui/Icons";
import { CURRENT_TALENT_PROFILE, RACHEL_HIGGINS_PROFILE } from "@/data/talentDashboardData";

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
    icon: <Activity size={18} />,
  },
  {
    label: "Reverse Job Search",
    href: "/candidate/reverse-search",
    icon: <Compass size={18} />,
  },
  {
    label: "Pod Applications",
    href: "/candidate/applications",
    badge: "3 Active",
    icon: <Briefcase size={18} />,
  },
  {
    label: "AI Resume Intake",
    href: "/candidate/resume-upload",
    icon: <FileText size={18} />,
  },
  {
    label: "Verified Profile",
    href: "/candidate/profile",
    icon: <ShieldCheck size={18} />,
  },
  {
    label: "Talent Academy",
    href: "/candidate/academy",
    badge: "Upskill",
    icon: <Award size={18} />,
  },
  {
    label: "Assessments & Badges",
    href: "/candidate/assessments",
    icon: <Zap size={18} />,
  },
  {
    label: "Refer & Earn Bounty",
    href: "/candidate/referrals",
    badge: "$500",
    icon: <DollarSign size={18} />,
  },
  {
    label: "Messages & Sprints",
    href: "/candidate/messages",
    badge: "2",
    icon: <Users size={18} />,
  },
];

export default function CandidateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activePersona, setActivePersona] = useState<"alex" | "rachel">("alex");
  const currentProfile = activePersona === "alex" ? CURRENT_TALENT_PROFILE : RACHEL_HIGGINS_PROFILE;
  const avatarInitials = activePersona === "alex" ? "AM" : "RH";

  const [isOpenToPods, setIsOpenToPods] = useState(currentProfile.isOpenToPods);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-canvas text-ink flex flex-col antialiased">
      {/* Top Navbar: Permanent Static Header (h-16 shrink-0) */}
      <header className="h-16 shrink-0 z-40 flex w-full items-center justify-between border-b border-[#bcd6fa]/50 bg-white/95 px-4 sm:px-6 lg:px-8 backdrop-blur-md shadow-xs">
        {/* Left: Mobile Toggle & Clean Brand Logo (without badge) */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-1.5 text-ink-soft hover:bg-canvas lg:hidden cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="group flex items-center transition-transform hover:opacity-90">
            <Image
              src="/assets/pepoltek/black_logo.png"
              alt="Pepoltek Limited"
              width={130}
              height={32}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Center: Search Box & Dual-Persona Switcher */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative w-64 lg:w-80">
            <Search size={15} className="absolute left-3.5 text-mist pointer-events-none transition-colors" />
            <input
              type="text"
              placeholder="Search pods, contracts, telemetry..."
              className="w-full rounded-full border border-[#bcd6fa] bg-canvas/40 py-2 pl-9.5 pr-14 text-xs text-ink placeholder-mist transition-all hover:bg-white hover:border-electric/50 focus:border-electric focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-electric/15"
            />
            <kbd className="absolute right-3 hidden sm:inline-flex items-center gap-0.5 rounded-md border border-[#bcd6fa]/70 bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-mist shadow-2xs">
              Ctrl+K
            </kbd>
          </div>

          {/* Persona Switcher Capsule */}
          <div className="flex items-center rounded-xl border border-[#bcd6fa] bg-canvas/50 p-1 text-xs">
            <button
              type="button"
              onClick={() => setActivePersona("alex")}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                activePersona === "alex" ? "bg-ink text-white shadow-xs" : "text-ink-soft hover:text-ink"
              }`}
            >
              Tech (Alex Morgan)
            </button>
            <button
              type="button"
              onClick={() => setActivePersona("rachel")}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                activePersona === "rachel" ? "bg-signal text-white shadow-xs" : "text-ink-soft hover:text-ink"
              }`}
            >
              Clinical (Dr. Higgins)
            </button>
          </div>
        </div>

        {/* Right: Refined Pod Availability Toggle & Interactive Profile Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Refined Sprint Availability Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpenToPods(!isOpenToPods)}
            className={`hidden sm:flex items-center gap-2.5 rounded-xl border px-3.5 py-1.5 transition-all cursor-pointer shadow-2xs ${
              isOpenToPods
                ? "border-signal/30 bg-signal/10 hover:bg-signal/15 text-ink"
                : "border-[#bcd6fa]/70 bg-canvas/60 hover:bg-canvas text-ink-soft"
            }`}
            title="Click to toggle sprint deployment status"
          >
            <span className="relative flex h-2 w-2">
              {isOpenToPods && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              )}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isOpenToPods ? "bg-signal" : "bg-mist"}`} />
            </span>
            <span className="text-xs font-semibold tracking-normal text-ink">
              {isOpenToPods ? "Open to Pod Sprints" : "Unavailable"}
            </span>
            <span
              className={`relative inline-flex h-4 w-7.5 items-center rounded-full transition-colors duration-200 ${
                isOpenToPods ? "bg-signal" : "bg-mist/30"
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-xs transition-transform duration-200 ${
                  isOpenToPods ? "translate-x-3.5" : "translate-x-0.5"
                }`}
              />
            </span>
          </button>

          {/* Interactive Profile Dropdown Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="group flex items-center gap-2.5 rounded-2xl border border-transparent p-1.5 transition-all hover:border-[#bcd6fa] hover:bg-canvas/50 cursor-pointer"
              aria-expanded={profileMenuOpen}
              aria-haspopup="true"
            >
              <div className="relative">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl font-display text-xs font-bold text-white shadow-xs ${
                  activePersona === "alex" ? "bg-gradient-to-tr from-electric to-electric-bright" : "bg-gradient-to-tr from-signal to-emerald-400"
                }`}>
                  {avatarInitials}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-signal" />
              </div>
              <div className="hidden text-left xl:block pr-1">
                <div className="font-display text-xs font-bold text-ink">{currentProfile.fullName}</div>
                <div className="text-[11px] text-mist font-medium">{currentProfile.seniority}</div>
              </div>
              <ChevronDown
                size={14}
                className={`text-mist transition-transform duration-200 ${profileMenuOpen ? "rotate-180 text-ink" : "group-hover:text-ink"}`}
              />
            </button>

            {/* Elevated Profile Dropdown Menu Card */}
            {profileMenuOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-[#bcd6fa] bg-white p-3.5 shadow-xl backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-150">
                {/* Header Profile Identity */}
                <div className="flex items-center gap-3 border-b border-[#bcd6fa]/40 pb-3.5">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl font-display text-sm font-bold text-white shadow-xs shrink-0 ${
                    activePersona === "alex" ? "bg-gradient-to-tr from-electric to-electric-bright" : "bg-gradient-to-tr from-signal to-emerald-400"
                  }`}>
                    {avatarInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-display text-xs font-bold text-ink truncate">
                        {currentProfile.fullName}
                      </h4>
                      <span className="rounded-full bg-signal/15 px-2 py-0.5 text-[10px] font-semibold text-signal shrink-0">
                        Tier 1 Elite
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-soft truncate font-medium">
                      {currentProfile.email}
                    </p>
                    <span className="text-[10.5px] text-mist truncate block mt-0.5">
                      {currentProfile.title}
                    </span>
                  </div>
                </div>

                {/* Persona Switcher inside Dropdown */}
                <div className="my-2.5 p-2 rounded-xl bg-canvas/70 border border-[#bcd6fa]/50 space-y-1">
                  <span className="font-mono text-[9.5px] uppercase font-bold text-mist block">Switch Candidate Showcase:</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActivePersona("alex")}
                      className={`p-1.5 rounded-lg text-left text-[10.5px] font-semibold transition-all cursor-pointer ${
                        activePersona === "alex" ? "bg-ink text-white" : "bg-white text-ink-soft hover:text-ink"
                      }`}
                    >
                      AM • Tech Lead
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePersona("rachel")}
                      className={`p-1.5 rounded-lg text-left text-[10.5px] font-semibold transition-all cursor-pointer ${
                        activePersona === "rachel" ? "bg-signal text-white" : "bg-white text-ink-soft hover:text-ink"
                      }`}
                    >
                      RH • Clinical Lead
                    </button>
                  </div>
                </div>

                {/* Telemetry Micro Summary */}
                <div className="my-2.5 grid grid-cols-3 gap-2 rounded-xl bg-canvas/60 p-2 text-center border border-[#bcd6fa]/40">
                  <div>
                    <div className="text-[10px] font-semibold text-mist uppercase tracking-wider">Readiness</div>
                    <div className="font-display text-xs font-bold text-electric">
                      {currentProfile.readinessIndex}%
                    </div>
                  </div>
                  <div className="border-x border-[#bcd6fa]/40">
                    <div className="text-[10px] font-semibold text-mist uppercase tracking-wider">ATS Match</div>
                    <div className="font-display text-xs font-bold text-signal">
                      {currentProfile.atsCompatibilityScore}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-mist uppercase tracking-wider">Vetting</div>
                    <div className="font-display text-xs font-bold text-ink">
                      {currentProfile.technicalVettingScore}/100
                    </div>
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="space-y-0.5 text-xs font-medium text-ink-soft">
                  <Link
                    href="/candidate/profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-canvas hover:text-ink"
                  >
                    <ShieldCheck size={15} className="text-mist" />
                    <span>Verified Profile & Telemetry</span>
                  </Link>
                  <Link
                    href="/candidate/resume-upload"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-canvas hover:text-ink"
                  >
                    <FileText size={15} className="text-mist" />
                    <span>AI Resume Intake & Re-Parse</span>
                  </Link>
                  <Link
                    href="/candidate/reverse-search"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-canvas hover:text-ink"
                  >
                    <Compass size={15} className="text-mist" />
                    <span>Reverse Match Pipelines</span>
                  </Link>
                  <Link
                    href="/candidate/referrals"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-canvas hover:text-ink"
                  >
                    <DollarSign size={15} className="text-mist" />
                    <span>Refer & Earn ($500 Bounty)</span>
                  </Link>
                </div>

                {/* Bottom Sign Out */}
                <div className="mt-2 pt-2 border-t border-[#bcd6fa]/40">
                  <Link
                    href="/login"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut size={14} />
                      <span>Sign Out of Talent Portal</span>
                    </div>
                    <span className="font-mono text-[10px] text-mist">v2.4</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Shell: Sidebar Pinned to Left, Only Main Body Scrolls */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Desktop Left Sidebar: Static Top Card, Scrollable Middle Nav, Static Bottom Box */}
        <aside className="hidden lg:flex w-[270px] shrink-0 h-full border-r border-[#bcd6fa]/50 bg-white p-4 flex-col overflow-hidden">
          {/* Top Static Profile Readiness Widget (shrink-0, NEVER scrolls) */}
          <div className="shrink-0 mb-3 rounded-2xl border border-electric/20 bg-gradient-to-br from-electric/5 to-canvas p-3.5 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-ink font-display">Profile Readiness</span>
              <span className="font-display text-sm font-bold text-electric">{CURRENT_TALENT_PROFILE.readinessIndex}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-canvas overflow-hidden border border-[#bcd6fa]/40">
              <div
                className="h-full rounded-full bg-gradient-to-r from-electric to-electric-bright transition-all duration-500"
                style={{ width: `${CURRENT_TALENT_PROFILE.readinessIndex}%` }}
              />
            </div>
            <p className="mt-2 text-[10.5px] text-ink-soft leading-snug">
              Tier 1 Elite Squad verified. Ready for 7-day client sprint deployment.
            </p>
          </div>

          {/* Middle Nav Items: ONLY THIS CONTAINER SCROLLS with thin scrollbar */}
          <nav className="flex-1 min-h-0 overflow-y-auto space-y-1 pr-1 thin-scrollbar">
            {CANDIDATE_NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                    active
                      ? "bg-ink text-white shadow-xs"
                      : "text-ink-soft hover:bg-canvas hover:text-ink"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={active ? "text-electric-bright shrink-0" : "text-mist group-hover:text-electric transition-colors shrink-0"}>
                      {item.icon}
                    </span>
                    <span className="whitespace-nowrap truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`shrink-0 whitespace-nowrap ml-2 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${
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

          {/* Bottom Static Help Box (shrink-0, NEVER scrolls) */}
          <div className="shrink-0 pt-3 border-t border-[#bcd6fa]/40 mt-3">
            <div className="rounded-2xl border border-[#bcd6fa]/60 bg-canvas/60 p-3 text-xs">
              <div className="font-display font-bold text-ink">Need Pod Guidance?</div>
              <p className="mt-0.5 text-[11px] text-ink-soft leading-snug">
                Connect directly with Marcus Vance, In-House Pod Director.
              </p>
              <Link
                href="/candidate/messages"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-electric hover:underline whitespace-nowrap"
              >
                <span>Open Sprint Channel →</span>
              </Link>
            </div>

            <div className="mt-2.5 flex items-center justify-between px-1 text-[11px] text-mist font-medium">
              <span>Talent v2.4</span>
              <Link href="/login" className="hover:text-ink transition-colors">
                Sign Out
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Slide-over Drawer & Backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-16 z-40 bg-ink/30 backdrop-blur-xs lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 top-16 z-50 w-72 border-r border-[#bcd6fa]/50 bg-white p-4 flex flex-col justify-between overflow-hidden lg:hidden shadow-xl animate-in slide-in-from-left duration-200">
              {/* Mobile Static Top Card */}
              <div className="shrink-0 mb-3 rounded-xl border border-electric/20 bg-gradient-to-br from-electric/5 to-canvas p-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-ink font-display">Profile Readiness</span>
                  <span className="font-mono text-electric font-bold">{CURRENT_TALENT_PROFILE.readinessIndex}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-canvas overflow-hidden border border-[#bcd6fa]/40">
                  <div
                    className="h-full rounded-full bg-electric w-[88%]"
                  />
                </div>
              </div>

              {/* Mobile Scrollable Middle Nav */}
              <nav className="flex-1 min-h-0 overflow-y-auto space-y-1 pr-1 thin-scrollbar">
                {CANDIDATE_NAV.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                        active
                          ? "bg-ink text-white shadow-xs"
                          : "text-ink-soft hover:bg-canvas hover:text-ink"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={active ? "text-electric-bright shrink-0" : "text-mist shrink-0"}>
                          {item.icon}
                        </span>
                        <span className="whitespace-nowrap truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="shrink-0 whitespace-nowrap ml-2 rounded-full bg-electric/10 px-2 py-0.5 text-[10px] font-mono font-bold text-electric">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Static Bottom Footer */}
              <div className="shrink-0 pt-3 border-t border-[#bcd6fa]/40 mt-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs font-semibold text-ink-soft hover:text-ink"
                >
                  <span>Sign Out</span>
                  <LogOut size={14} />
                </Link>
              </div>
            </aside>
          </>
        )}

        {/* Main Content Area: Scrolls independently with thin scrollbar */}
        <main className="flex-1 min-w-0 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 thin-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
