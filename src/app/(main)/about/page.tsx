import React from "react";
import Link from "next/link";
import PageHero from "@/components/main/PageHero";
import {
  Users,
  Compass,
  Code2,
  Award,
  Building2,
  ShieldCheck,
  Check,
  ArrowRight,
  Zap,
} from "@/components/ui/Icons";

export const metadata = {
  title: "About Us | Pepoltek Limited Global Workforce Engine",
  description:
    "Learn about Pepoltek Limited, our in-house delivery engine of specialized recruiters, business analysts, and software engineers with 20+ years combined leadership.",
};

const DELIVERY_PILLARS = [
  {
    role: "Niche Recruitment Specialists",
    focus: "Technology & Clinical Talent Sourcing",
    desc: "Domain experts who map global talent pipelines, screen behavioral competencies (HEXACO/OCEAN), and verify timezone overlap.",
    badge: "Sourcing & Culture",
    icon: <Users size={22} />,
  },
  {
    role: "Business Analysts & Solutions Architects",
    focus: "Discovery & SDLC Scoping",
    desc: "Translate ambiguous enterprise workforce demands into rigorous technical profiles, stack requirements, and sprint milestones.",
    badge: "Strategy & Scoping",
    icon: <Compass size={22} />,
  },
  {
    role: "Senior Software Engineers",
    focus: "Hard-Coded Technical Validation",
    desc: "Active engineers who conduct repository audits, code review pull requests, and evaluate system design architectures before client panels.",
    badge: "Code Vetting",
    icon: <Code2 size={22} />,
  },
];

const METRICS = [
  { value: "20+", label: "Years Combined Leadership", sub: "Greenfield HR-tech & enterprise scale" },
  { value: "30+", label: "Global Enterprise Clients", sub: "Across North America, UK, Europe & GCC" },
  { value: "98%", label: "Client Retention Rate", sub: "Backed by 2-week risk-free trials" },
  { value: "40+", label: "Hours Saved Per Placement", sub: "Eliminating resume screening fatigue" },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-canvas">
      {/* Hero Header */}
      <PageHero
        eyebrow="Operational Excellence"
        title="The In-House Delivery Engine"
        highlightedText="Behind Rapid Global Staffing"
        description="Pepoltek Limited is a global workforce solutions provider operating across Technology and Healthcare. We pair specialized recruitment directors and business analysts with active software engineers who validate every line of code before client submission."
        stats={[
          {
            value: "20+ Years",
            label: "Combined Leadership",
            icon: <Award size={20} />,
          },
          {
            value: "30+ Clients",
            label: "Enterprise Deployments",
            icon: <Building2 size={20} />,
          },
          {
            value: "98%",
            label: "Client Retention Rate",
            icon: <ShieldCheck size={20} />,
          },
        ]}
        actions={[
          {
            label: "Request Pod Deployment",
            href: "/contact",
            primary: true,
          },
          {
            label: "Inspect Technical Proof",
            href: "/case-studies",
          },
        ]}
        proofPills={[
          "Tripartite Pod Execution",
          "Hard-Coded Repository Audits",
          "SOC 2 & HIPAA Compliant",
          "2-Week Risk-Free Trial",
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Operational Metrics Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-3xl border border-[#bcd6fa] bg-white p-6 sm:p-7 shadow-xs hover:border-electric/50 transition-colors"
            >
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-electric">
                {m.value}
              </div>
              <div className="mt-2 font-display text-sm font-bold text-ink">{m.label}</div>
              {/* Clean readable Inter text */}
              <div className="mt-1 text-xs text-ink-soft font-normal leading-relaxed">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* The Three Pod Pillars */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-1 font-mono text-[11px] font-semibold text-electric uppercase tracking-widest">
              Execution Architecture
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
              Our In-House Tripartite Pod
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-ink-soft font-normal leading-relaxed">
              Every client engagement is managed by three dedicated specialists working synchronously.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-7">
            {DELIVERY_PILLARS.map((pillar) => (
              <div
                key={pillar.role}
                className="group flex flex-col justify-between rounded-3xl border border-[#bcd6fa] bg-white p-7 sm:p-8 shadow-xs hover:border-electric/60 hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between">
                    {/* Prominent Lucide Icon Container */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric/10 text-electric border border-electric/25 shadow-2xs group-hover:scale-105 group-hover:bg-electric group-hover:text-white transition-all duration-200">
                      {pillar.icon}
                    </div>
                    <span className="rounded-md border border-electric/30 bg-electric/10 px-2.5 py-1 font-mono text-[10px] font-bold text-electric uppercase">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-ink group-hover:text-electric transition-colors">
                    {pillar.role}
                  </h3>
                  <div className="font-mono text-xs text-electric font-semibold mt-1">
                    {pillar.focus}
                  </div>

                  {/* Clean readable Inter text */}
                  <p className="mt-3 text-xs sm:text-sm text-ink-soft font-normal leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#bcd6fa]/40 flex items-center gap-2 text-xs text-ink-soft font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                  <span>Sprint turnaround: 2 to 7 business days</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hard-Coded Technical Validation Manifesto */}
        <div className="mt-20 rounded-3xl border border-[#bcd6fa] bg-ink text-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="font-mono text-xs text-electric-bright uppercase tracking-widest">
                Validation Philosophy
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold">
                Why Hard-Coded Vetting Matters
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed">
                Traditional agencies rely on keyword matching algorithms that flood hiring managers with unqualified profiles.
                At Pepoltek, our senior software engineers personally conduct code repository evaluations, system design stress-tests,
                and architectural audits.
              </p>

              {/* Natural Inter list instead of thick mono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-white/90 font-normal">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal">
                    <Check size={12} />
                  </span>
                  <span>Repository git hygiene & commit quality</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal">
                    <Check size={12} />
                  </span>
                  <span>Microservice fault tolerance testing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal">
                    <Check size={12} />
                  </span>
                  <span>HIPAA & PCI DSS compliance checks</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal">
                    <Check size={12} />
                  </span>
                  <span>Live synchronous standup communication</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.06] p-7 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/20 text-electric-bright border border-electric/40">
                <Zap size={28} />
              </div>
              <div className="font-display text-xl font-bold text-white mt-4">
                Experience 2 to 7-Day Velocity
              </div>
              <p className="mt-2 text-xs sm:text-sm text-white/70 font-normal leading-relaxed">
                Submit your role specifications and test our vetted delivery pods with a 2-week risk-free trial.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="rounded-xl bg-electric px-5 py-3 font-display text-xs font-semibold text-white shadow-xs hover:bg-electric-bright transition-colors"
                >
                  Request Pod Deployment
                </Link>
                <Link
                  href="/case-studies"
                  className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-display text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
