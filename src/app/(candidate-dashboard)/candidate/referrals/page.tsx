"use client";

import { useState } from "react";

interface ReferralRecord {
  id: string;
  candidateName: string;
  role: string;
  stage: "Submitted" | "Screened" | "Interviewed" | "Placed & Deployed";
  bountyAmount: string;
  payoutStatus: "Pending Placement" | "Escrow Locked" | "Cleared for Payout";
  date: string;
}

const REFERRAL_LIST: ReferralRecord[] = [
  {
    id: "REF-301",
    candidateName: "David Kim",
    role: "Senior Go / Kafka Engineer",
    stage: "Interviewed",
    bountyAmount: "$500.00",
    payoutStatus: "Escrow Locked",
    date: "Sep 22, 2026",
  },
  {
    id: "REF-302",
    candidateName: "Sarah Lindqvist",
    role: "NHS Band 7 ICU Specialist",
    stage: "Placed & Deployed",
    bountyAmount: "$500.00",
    payoutStatus: "Cleared for Payout",
    date: "Sep 05, 2026",
  },
  {
    id: "REF-303",
    candidateName: "Carlos Mendez",
    role: "Cloud DevOps Engineer",
    stage: "Screened",
    bountyAmount: "$250.00",
    payoutStatus: "Pending Placement",
    date: "Sep 28, 2026",
  },
];

export default function CandidateReferralsPage() {
  const [referralLink] = useState("https://pepoltek.com/join?ref=AMORGAN-882");
  const [copied, setCopied] = useState(false);

  // Form submission states
  const [refName, setRefName] = useState("");
  const [refEmail, setRefEmail] = useState("");
  const [refRole, setRefRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRefName("");
      setRefEmail("");
      setRefRole("");
      alert("Candidate referral successfully submitted to the recruitment pipeline!");
    }, 800);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl border border-electric/30 bg-gradient-to-r from-ink via-[#0d1f3d] to-ink p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-electric/40 bg-electric/20 px-3 py-0.5 text-[11px] font-mono text-electric-bright">
              <span>PEPOLTEK BOUNTY NETWORK</span>
            </div>
            <h1 className="mt-2.5 font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Refer & Earn Bounty Marketplace
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-300 max-w-xl">
              Refer world-class software engineers or clinical healthcare specialists. Earn up to <strong className="text-white">$500 per placed candidate</strong> on our transparent milestone ledger.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-xs">
            <div>
              <div className="font-mono text-[10px] uppercase text-gray-300">Cleared Bounties</div>
              <div className="font-display text-2xl font-bold text-signal">$500.00</div>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <div className="font-mono text-[10px] uppercase text-gray-300">In Pipeline</div>
              <div className="font-display text-2xl font-bold text-electric-bright">$750.00</div>
            </div>
          </div>
        </div>

        {/* Unique Link Box */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1">
            <span className="font-mono text-[11px] text-gray-300">Your Unique Referral Invite Link:</span>
            <div className="mt-1 font-mono text-xs text-electric-bright bg-[#060b14]/70 px-3.5 py-2 rounded-xl border border-white/15 truncate select-all">
              {referralLink}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="self-end sm:self-auto rounded-xl bg-electric px-4 py-2 font-display text-xs font-semibold text-white hover:bg-electric-bright transition-colors shadow-xs cursor-pointer"
          >
            {copied ? "✓ Copied Link!" : "Copy Invite Link"}
          </button>
        </div>
      </div>

      {/* Split: Direct Referral Form & Payout Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form: Submit Candidate (1 col) */}
        <div className="rounded-2xl border border-[#bcd6fa] bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <h2 className="font-display text-base font-bold text-ink">Submit Candidate Directly</h2>
          <p className="text-xs text-ink-soft">
            Directly refer a colleague or specialist to lock in your referral timestamp.
          </p>

          <form onSubmit={handleReferSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase text-ink-soft mb-1">
                Candidate Full Name
              </label>
              <input
                type="text"
                required
                value={refName}
                onChange={(e) => setRefName(e.target.value)}
                placeholder="e.g. John Doe / Dr. Watson"
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase text-ink-soft mb-1">
                Candidate Email
              </label>
              <input
                type="email"
                required
                value={refEmail}
                onChange={(e) => setRefEmail(e.target.value)}
                placeholder="candidate@email.com"
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase text-ink-soft mb-1">
                Primary Specialty
              </label>
              <input
                type="text"
                required
                value={refRole}
                onChange={(e) => setRefRole(e.target.value)}
                placeholder="e.g. Lead Kubernetes SRE"
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full rounded-xl bg-ink py-2.5 font-display text-xs font-semibold text-white hover:bg-electric transition-colors shadow-xs cursor-pointer"
            >
              {submitted ? "Submitting..." : "Submit Candidate for Review →"}
            </button>
          </form>
        </div>

        {/* Right Ledger: Referral Tracking Pipeline (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-[#bcd6fa] bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-ink">Referral Pipeline & Payout Ledger</h2>
            <span className="font-mono text-xs text-mist">Tracking Stages</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#bcd6fa]/50 font-mono text-mist uppercase text-[11px]">
                  <th className="pb-3 font-semibold">Candidate</th>
                  <th className="pb-3 font-semibold">Specialty</th>
                  <th className="pb-3 font-semibold">Pipeline Stage</th>
                  <th className="pb-3 font-semibold">Bounty Reward</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#bcd6fa]/30">
                {REFERRAL_LIST.map((ref) => (
                  <tr key={ref.id} className="hover:bg-canvas/40 transition-colors">
                    <td className="py-3.5 pr-2">
                      <div className="font-display font-bold text-ink">{ref.candidateName}</div>
                      <div className="font-mono text-[10px] text-mist">{ref.id} • {ref.date}</div>
                    </td>
                    <td className="py-3.5 text-ink-soft">{ref.role}</td>
                    <td className="py-3.5">
                      <span className="rounded-md bg-canvas border border-[#bcd6fa]/60 px-2 py-0.5 font-mono text-[10px] text-ink font-semibold">
                        {ref.stage}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono font-bold text-ink">{ref.bountyAmount}</td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                          ref.payoutStatus === "Cleared for Payout"
                            ? "bg-signal/10 text-signal"
                            : ref.payoutStatus === "Escrow Locked"
                            ? "bg-electric/10 text-electric"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {ref.payoutStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
