"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface DropdownItem {
  title: string;
  desc: string;
  href: string;
  badge?: string;
  icon: React.ReactNode;
}

interface NavSection {
  label: string;
  href: string;
  eyebrow: string;
  items: DropdownItem[];
  spotlight: {
    headline: string;
    sub: string;
    cta: string;
    href: string;
  };
  layout?: "single" | "dual";
}

const NAV_DATA: NavSection[] = [
  {
    label: "About Us",
    href: "#overview",
    eyebrow: "01 · Core Infrastructure",
    layout: "single",
    items: [
      {
        title: "In-House Delivery Engine",
        desc: "Specialized recruiters, technical interviewers & architect leads.",
        href: "#overview",
        badge: "In-House",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
      },
      {
        title: "Chasing The Sun Matrix",
        desc: "Talent hubs across 4 longitudes for guaranteed live overlap.",
        href: "#about",
        badge: "4 Hubs",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        title: "Operational Excellence",
        desc: "20+ combined years, 30+ enterprise clients & 98% retention rate.",
        href: "#overview",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        title: "SOC 2 & HIPAA Governance",
        desc: "Institutional data security and BAA compliance across all pods.",
        href: "#solutions",
        badge: "Certified",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ),
      },
    ],
    spotlight: {
      headline: "Zero-Risk Engineering Deployment",
      sub: "40+ hours reclaimed per hire with guaranteed 2-week risk-free trials.",
      cta: "Explore Our Model",
      href: "#overview",
    },
  },
  {
    label: "Solutions",
    href: "#solutions",
    eyebrow: "02 · Regulated Capabilities",
    layout: "dual",
    items: [
      {
        title: "Frontend & Full-Stack Pods",
        desc: "React, Next.js, Vue, TypeScript, iOS & Android engineering.",
        href: "#solutions",
        badge: "SDLC",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        ),
      },
      {
        title: "Backend & Distributed Systems",
        desc: "Python, Go, Node, Java, high-throughput microservices & APIs.",
        href: "#solutions",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
          </svg>
        ),
      },
      {
        title: "AI, MLOps & Data Pipelines",
        desc: "LLMs, vector databases, RAG architecture & real-time analytics.",
        href: "#solutions",
        badge: "AI/Data",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        ),
      },
      {
        title: "EHR / EMR Interoperability",
        desc: "Epic, Cerner, FHIR & HL7 compliance integration for hospitals.",
        href: "#solutions",
        badge: "HIPAA",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        ),
      },
      {
        title: "Cloud & DevSecOps Architecture",
        desc: "AWS, Azure, Kubernetes, Terraform & CI/CD pipeline governance.",
        href: "#solutions",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        ),
      },
      {
        title: "Clinical Informatics & Telehealth",
        desc: "Secure patient engagement portals and clinical workflow tools.",
        href: "#solutions",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
    ],
    spotlight: {
      headline: "Dual-Sector Capability Engine",
      sub: "Switch effortlessly between Technology and Clinical workforce tracks.",
      cta: "Explore All Stacks",
      href: "#solutions",
    },
  },
  {
    label: "Opportunities",
    href: "#opportunity",
    eyebrow: "03 · Global Talent Network",
    layout: "single",
    items: [
      {
        title: "Candidate Talent Dashboard",
        desc: "Track pod applications, assessment scores & verified profile telemetry.",
        href: "/candidate/dashboard",
        badge: "Portal",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
      {
        title: "14-Day Talent Academy Bootcamps",
        desc: "Intensive repo orientation, clinical compliance & code quality bootcamps.",
        href: "/candidate/academy",
        badge: "Academy",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
      },
      {
        title: "Reverse Job Sourcing Search",
        desc: "Let venture-backed employers and delivery pods apply to hire you.",
        href: "/candidate/reverse-search",
        badge: "Active",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ),
      },
      {
        title: "US & Global Visa Pipelines",
        desc: "OPT, STEM OPT (12 to 36 months), H-1B transfer, C2C & W2 frameworks.",
        href: "/candidate/profile",
        badge: "Global",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
    ],
    spotlight: {
      headline: "Are You a High-Impact Engineer?",
      sub: "Access your Candidate Dashboard or apply to join our vetted talent network.",
      cta: "Candidate Portal",
      href: "/candidate/dashboard",
    },
  },
  {
    label: "Want Hiring",
    href: "#hiring",
    eyebrow: "04 · Deployment Models & Dashboards",
    layout: "dual",
    items: [
      {
        title: "7-Day Sprint Deployment",
        desc: "From technical brief to fully productive specialist in 7 days flat.",
        href: "#solutions",
        badge: "Fast Track",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
      },
      {
        title: "Recruiter & Sourcing Portal",
        desc: "Manage candidate shortlists, AI matching, interviews & analytics.",
        href: "/recruiter/dashboard",
        badge: "Recruiter Hub",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        title: "Dedicated Engineering Pods",
        desc: "Turnkey cross-functional squads with architect & PM leadership.",
        href: "/recruiter/pods",
        badge: "Autonomous",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
      },
      {
        title: "Candidate Workspace",
        desc: "Direct access to talent profile, reverse job search & assessments.",
        href: "/candidate/dashboard",
        badge: "Candidate Hub",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
      {
        title: "Staff Augmentation (W2 / C2C)",
        desc: "Elastic bandwidth expansion with a 2-week risk-free trial period.",
        href: "#commercial-terms",
        badge: "Risk-Free",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        ),
      },
      {
        title: "Admin Control Center",
        desc: "Institutional compliance, pods governance, finance & audit logs.",
        href: "/admin/dashboard",
        badge: "Admin Hub",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
      },
      {
        title: "Live Velocity Calculator",
        desc: "Model squad sizes, seniority premiums, timezone overlap & monthly savings.",
        href: "#about",
        badge: "Interactive",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        title: "AI Talent Search Engine",
        desc: "Instant candidate screening & matching via talent intelligence.",
        href: "/recruiter/ai-search",
        badge: "AI Match",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ),
      },
    ],
    spotlight: {
      headline: "Access All Enterprise Portals",
      sub: "Sign in with your role-based credentials (Candidate, Recruiter, or Admin).",
      cta: "Access Portal Login",
      href: "/login",
    },
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[#bcd6fa]/40 bg-canvas/95 shadow-[0_8px_30px_-6px_rgba(10,20,40,0.08)] backdrop-blur-md py-2.5"
          : "bg-transparent pt-3.5 pb-2.5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl 2xl:max-w-[1360px] items-center justify-between gap-4 px-6 lg:px-10">
        
        {/* Left: black logo */}
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

        {/* Middle: Desktop Nav with Interactive Mega Dropdowns */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={handleMouseLeave}
        >
          {NAV_DATA.map((section, idx) => {
            const isOpen = activeMenu === idx;
            return (
              <div
                key={section.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(idx)}
              >
                {/* Top-level Nav Pill Button */}
                <Link
                  href={section.href}
                  className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                    isOpen
                      ? "bg-electric/[0.09] text-electric"
                      : "text-[#3d4c68] hover:bg-black/[0.04] hover:text-[#0a1428]"
                  }`}
                >
                  <span>{section.label}</span>
                  <svg
                    className={`h-3 w-3 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-electric" : "text-[#7d91b0] group-hover:text-electric"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Dropdown Card */}
                {isOpen && (
                  <div
                    className={`absolute top-full pt-3 z-50 animate-in fade-in-0 zoom-in-95 duration-200 ${
                      idx === 3
                        ? "-right-12 sm:right-0 w-[680px]"
                        : section.layout === "dual"
                        ? "-left-40 sm:-left-32 w-[680px]"
                        : "-left-12 w-[520px]"
                    }`}
                  >
                    {/* Floating Glass Shell */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#bcd6fa]/70 bg-white/95 p-6 shadow-[0_25px_70px_-15px_rgba(10,20,40,0.22)] backdrop-blur-xl">
                      
                      {/* Ambient corner highlights */}
                      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_70%)] blur-2xl" />
                      <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.15),transparent_70%)] blur-2xl" />

                      {/* Header Eyebrow inside Dropdown */}
                      <div className="mb-4 flex items-center justify-between border-b border-[#e4eeff] pb-3">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-electric">
                          {section.eyebrow}
                        </span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[#8aa0c2]">
                          Pepoltek Engine
                        </span>
                      </div>

                      {/* Items Grid */}
                      <div
                        className={`grid gap-2.5 ${
                          section.layout === "dual" ? "grid-cols-2" : "grid-cols-1"
                        }`}
                      >
                        {section.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className="group/item flex items-start gap-3 rounded-xl p-2.5 transition-all duration-150 hover:bg-[#f2f7ff] hover:shadow-[0_2px_12px_-3px_rgba(10,132,255,0.15)]"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric transition-colors duration-150 group-hover/item:bg-electric group-hover/item:text-white">
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-display text-[13px] font-bold leading-tight text-[#0a1428] group-hover/item:text-electric transition-colors">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="rounded bg-electric/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-electric">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="mt-0.5 text-[11.5px] leading-snug text-[#4f6485]">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Bottom Spotlight Bar */}
                      <div className="mt-5 rounded-xl border border-electric/20 bg-gradient-to-r from-electric/[0.07] to-transparent p-3.5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-display text-[12.5px] font-bold text-[#0a1428]">
                              {section.spotlight.headline}
                            </div>
                            <div className="mt-0.5 text-[11px] text-[#4f6485]">
                              {section.spotlight.sub}
                            </div>
                          </div>
                          <Link
                            href={section.spotlight.href}
                            onClick={() => setActiveMenu(null)}
                            className="group/cta inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-electric px-3 py-1.5 font-display text-[11.5px] font-semibold text-white shadow-[0_4px_12px_-2px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright hover:shadow-[0_6px_16px_-2px_rgba(56,189,248,0.5)]"
                          >
                            <span>{section.spotlight.cta}</span>
                            <span className="transition-transform duration-200 group-hover/cta:translate-x-0.5">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Auth buttons & Mobile Hamburger */}
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#bcd6fa]/80 bg-white/90 text-[#0a1428] transition-colors hover:bg-electric/10 hover:text-electric lg:hidden focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="border-b border-[#bcd6fa]/50 bg-canvas/98 px-6 py-5 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-2">
            {NAV_DATA.map((section, sIdx) => {
              const isExpanded = mobileExpanded === sIdx;
              return (
                <div key={section.label} className="border-b border-[#bcd6fa]/30 pb-2">
                  <button
                    onClick={() => setMobileExpanded(isExpanded ? null : sIdx)}
                    className="flex w-full items-center justify-between py-2 text-left font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#0a1428]"
                  >
                    <span>{section.label}</span>
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-electric" : "text-[#7d91b0]"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="mt-2 space-y-2 pl-3 pb-3">
                      {section.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 py-1.5 text-[12.5px] font-medium text-[#3d4c68] hover:text-electric transition-colors"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto rounded bg-electric/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-electric">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
