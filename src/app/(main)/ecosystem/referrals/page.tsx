"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/main/PageHero";
import {
  DollarSign,
  Layers,
  Clock,
  ArrowRight,
  Check,
  CheckCircle,
  Users,
} from "@/components/ui/Icons";

const PIPELINE_STAGES = [
  { stage: "Submitted", desc: "Profile entered via your link", reward: "$0 (Initiated)" },
  { stage: "Screened", desc: "Passed initial recruiter review", reward: "$50 (Milestone 1)" },
  { stage: "Interviewed", desc: "Passed hard-coded technical vetting", reward: "$100 (Milestone 2)" },
  { stage: "Placed", desc: "Deployed to client pod", reward: "$350 (Final Bounty: $500 Total)" },
];

export default function ReferralsPage() {
  const [candidatesCount, setCandidatesCount] = useState(3);
  const estimatedEarnings = candidatesCount * 500;

  return (
    <div className="relative min-h-screen bg-canvas">
      {/* Hero Header */}
      <PageHero
        eyebrow="Refer & Earn Bounty Network"
        title="Monetize Your Professional"
        highlightedText="Engineering Network"
        description="Know exceptional software engineers, architects, or healthcare practitioners? Refer them to Pepoltek and earn up to $500 cash bounty per successful sprint placement, tracked transparently through our live payout ledger."
        stats={[
          {
            value: "$500",
            label: "Max Bounty Per Placement",
            icon: <DollarSign size={20} />,
          },
          {
            value: "4 Stages",
            label: "Milestone Payout Cadence",
            icon: <Layers size={20} />,
          },
          {
            value: "30 Days",
            label: "Escrow Clearing SLA",
            icon: <Clock size={20} />,
          },
        ]}
        actions={[
          {
            label: "Generate Referral Link",
            href: "/register",
            primary: true,
          },
          {
            label: "View Sample Ledger",
            href: "#ledger-preview",
          },
        ]}
        proofPills={[
          "Milestone-Based Escrow Release",
          "Direct Wire & Bank Transfers",
          "Real-Time Tracking URL",
          "No Cap on Referrals",
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        {/* Interactive Earnings Calculator */}
        <div className="rounded-3xl border border-[#bcd6fa] bg-white p-6 sm:p-10 shadow-[0_15px_40px_-15px_rgba(10,20,40,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="font-mono text-xs text-signal uppercase tracking-widest font-semibold">
                Referral Bounty Calculator
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Calculate Your Potential Referral Earnings
              </h2>
              {/* Clean readable Inter text */}
              <p className="text-xs sm:text-sm text-ink-soft font-normal leading-relaxed">
                You earn milestone bounties as your referred colleagues advance through the vetting pipeline.
                Full bounties clear into your escrow ledger within 30 days of client deployment.
              </p>

              <div className="pt-2">
                <div className="flex justify-between font-mono text-xs text-ink mb-2">
                  <span>Referred Candidates Placed:</span>
                  <span className="font-bold text-signal text-sm">{candidatesCount} Placements</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={candidatesCount}
                  onChange={(e) => setCandidatesCount(Number(e.target.value))}
                  className="w-full accent-signal cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[10px] text-mist mt-1">
                  <span>1 Colleague</span>
                  <span>5 Colleagues</span>
                  <span>10 Colleagues</span>
                  <span>15 Colleagues</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-signal/30 bg-signal/5 p-7 text-center">
              <div className="font-mono text-xs text-ink-soft uppercase tracking-wider">
                Total Estimated Cash Bounty
              </div>
              <div className="mt-2 font-display text-4xl sm:text-5xl font-extrabold text-signal">
                ${estimatedEarnings.toLocaleString()}
              </div>
              <p className="mt-2 text-xs text-ink-soft font-normal leading-relaxed">
                ${(candidatesCount * 350).toLocaleString()} upon client placement + ${(candidatesCount * 150).toLocaleString()} milestone incentives.
              </p>
              <Link
                href="/register"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 font-display text-xs font-bold text-white hover:bg-signal transition-colors"
              >
                <span>Generate Your Referral Link</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* 4-Stage Milestone Tracking Pipeline (FR-049 & FR-050) */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              The 4-Stage Transparent Payout Pipeline
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-ink-soft font-normal">
              Every referral event is logged in your real-time candidate and partner payout ledger.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PIPELINE_STAGES.map((s, idx) => (
              <div
                key={s.stage}
                className="rounded-3xl border border-[#bcd6fa] bg-white p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-canvas border border-[#bcd6fa] font-mono text-xs font-bold text-ink">
                      0{idx + 1}
                    </span>
                    <span className="rounded-md bg-signal/15 px-2 py-0.5 font-mono text-[10px] font-bold text-signal">
                      Stage {idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.stage}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-soft font-normal leading-relaxed">{s.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#bcd6fa]/40 font-mono text-xs text-signal font-semibold">
                  Payout: {s.reward}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Payout Ledger Preview (FR-050) */}
        <div id="ledger-preview" className="mt-16 rounded-3xl border border-[#bcd6fa] bg-white p-6 sm:p-10 shadow-xs">
          <div className="border-b border-[#bcd6fa]/50 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-display text-xl font-bold text-ink">Sample Payout Ledger Preview</h3>
              <p className="text-xs sm:text-sm text-ink-soft font-normal">
                Live ledger demonstrating how referral transactions are recorded and cleared.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-ink-soft">Cleared: <strong className="text-signal font-semibold">$850.00</strong></span>
              <span className="font-mono text-xs text-ink-soft">Pending: <strong className="text-amber-500 font-semibold">$500.00</strong></span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#bcd6fa]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-[#bcd6fa] bg-canvas/70 text-ink font-semibold">
                <tr>
                  <th className="px-4 py-2.5">Candidate Referee</th>
                  <th className="px-4 py-2.5">Target Specialty</th>
                  <th className="px-4 py-2.5">Current Stage</th>
                  <th className="px-4 py-2.5">Bounty Value</th>
                  <th className="px-4 py-2.5">Settlement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#bcd6fa]/40 bg-white">
                <tr>
                  <td className="px-4 py-3 font-semibold text-ink">Marcus R. (Verified)</td>
                  <td className="px-4 py-3 text-ink-soft">Senior Go & Kubernetes Pod</td>
                  <td className="px-4 py-3 text-signal font-bold">Placed & Active</td>
                  <td className="px-4 py-3 text-ink font-bold">$500.00</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-signal/15 px-2 py-0.5 text-[10px] font-bold text-signal">
                      CLEARED
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-ink">Dr. Elena K. (Verified)</td>
                  <td className="px-4 py-3 text-ink-soft">Telehealth Critical Care RN</td>
                  <td className="px-4 py-3 text-electric font-bold">Interviewing</td>
                  <td className="px-4 py-3 text-ink font-bold">$150.00</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                      PENDING SPRINT
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-ink">Siddharth N.</td>
                  <td className="px-4 py-3 text-ink-soft">Full-Stack Next.js / Python</td>
                  <td className="px-4 py-3 text-ink-soft">Screened (Passed)</td>
                  <td className="px-4 py-3 text-ink font-bold">$50.00</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-signal/15 px-2 py-0.5 text-[10px] font-bold text-signal">
                      CLEARED
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <h3 className="font-display text-2xl font-bold text-ink">
            Ready to Start Referring?
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-ink-soft font-normal">
            Create your account to obtain your unique tracking URL and monitor live milestones.
          </p>
          <div className="mt-6">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-7 py-3.5 font-display text-sm font-semibold text-white shadow-md hover:bg-signal transition-colors"
            >
              <span>Get Your Unique Referral Link</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
