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

const ADMIN_NAV: NavItem[] = [
  {
    label: "Mission Control",
    href: "/admin/dashboard",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "User & Role RBAC",
    href: "/admin/users",
    badge: "1.2k",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: "Pod Allocations",
    href: "/admin/pods-management",
    badge: "48 Live",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: "Compliance & Audits",
    href: "/admin/compliance",
    badge: "99.8%",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: "Immutable Audit Logs",
    href: "/admin/audit-logs",
    badge: "P0 Live",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    label: "Escrow & Payouts",
    href: "/admin/finance",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "System Settings",
    href: "/admin/settings",
    icon: (
      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060b14] text-white flex flex-col antialiased selection:bg-electric selection:text-white">
      {/* Top Admin Telemetry Console Bar */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#1b2b4d] bg-[#0a1428]/95 px-4 sm:px-6 lg:px-8 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-[#1b2b4d] lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="group flex items-center gap-2.5 transition-transform hover:opacity-90">
            <Image
              src="/assets/pepoltek/white_logo.png"
              alt="Pepoltek Limited"
              width={130}
              height={32}
              className="h-7 w-auto object-contain"
            />
            <span className="hidden sm:inline-block rounded-md border border-electric/40 bg-electric/20 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-electric-bright">
              AdminOS
            </span>
          </Link>
        </div>

        {/* Status indicator & Admin badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[11px] text-signal font-semibold">
            <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
            <span>PLATFORM HEALTH: 99.98% OPTIMAL</span>
          </div>

          <div className="flex items-center gap-2 border-l border-[#1b2b4d] pl-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric font-display text-xs font-bold text-white shadow-xs">
              SA
            </div>
            <div className="hidden text-left xl:block">
              <div className="font-display text-xs font-bold text-white">Super Administrator</div>
              <div className="font-mono text-[10px] text-electric-bright">Full Root Privileges</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Mission Control Body */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#0a1428] border-r border-[#1b2b4d] p-4 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0 top-16" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Telemetry Node Card */}
          <div className="mb-5 rounded-xl border border-[#1b2b4d] bg-[#060b14]/80 p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">ACTIVE POD NODES</span>
              <span className="text-signal font-bold">48 Online</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#1b2b4d] overflow-hidden">
              <div className="h-full rounded-full bg-signal w-[100%]" />
            </div>
            <p className="text-[10px] text-gray-400 pt-1 font-mono">
              Cluster: EU-West-2 / Global AWS EKS
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-0.5">
            {ADMIN_NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    active
                      ? "bg-electric text-white shadow-sm"
                      : "text-gray-300 hover:bg-[#1b2b4d] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={active ? "text-white" : "text-gray-400 group-hover:text-electric-bright transition-colors"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                        active
                          ? "bg-white text-ink"
                          : "bg-[#1b2b4d] text-gray-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Root Status */}
          <div className="mt-auto pt-4 border-t border-[#1b2b4d]">
            <div className="rounded-xl border border-[#1b2b4d] bg-[#060b14] p-3 text-xs font-mono text-gray-400">
              <div className="text-white font-bold text-[11px]">Audit Log Stream: ACTIVE</div>
              <div className="text-[10px] text-gray-500 mt-1">SOC-2 & HIPAA Enforced</div>
            </div>

            <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-gray-400 font-mono">
              <span>Pepoltek OS v4.2</span>
              <Link href="/login" className="hover:text-white transition-colors">
                Sign Out
              </Link>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full bg-[#060b14]">
          {children}
        </main>
      </div>
    </div>
  );
}
