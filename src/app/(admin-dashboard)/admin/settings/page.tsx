"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [matchingScoreThreshold, setMatchingScoreThreshold] = useState(90);
  const [autoSlaAlerts, setAutoSlaAlerts] = useState(true);
  const [twoFactorEnforced, setTwoFactorEnforced] = useState(true);
  const [autoAuditSync, setAutoAuditSync] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">System & Platform Parameters</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Configure AI Pod Matching parameters, escrow rules, webhook connections, and security enforcement policies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Matching Engine Configuration */}
        <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-electric text-white text-xs font-bold">
              ⚡
            </span>
            <h2 className="font-display text-base font-bold text-white">AI Pod Matching Engine</h2>
          </div>
          <p className="text-xs text-gray-400">
            Automated scoring algorithm for pairing pre-vetted specialists with incoming client requisitions.
          </p>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between font-mono text-[11px] mb-1">
                <span className="text-gray-400">Minimum Pod Match Threshold</span>
                <span className="text-electric-bright font-bold">{matchingScoreThreshold}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="99"
                value={matchingScoreThreshold}
                onChange={(e) => setMatchingScoreThreshold(Number(e.target.value))}
                className="w-full accent-electric cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1b2b4d]">
              <span className="text-gray-300">Automated 7-Day Sprint SLA Alerts</span>
              <input
                type="checkbox"
                checked={autoSlaAlerts}
                onChange={(e) => setAutoSlaAlerts(e.target.checked)}
                className="h-4 w-4 rounded-sm accent-electric"
              />
            </div>
          </div>
        </div>

        {/* Security & Authentication Enforcement */}
        <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-signal text-white text-xs font-bold">
              🛡
            </span>
            <h2 className="font-display text-base font-bold text-white">Enterprise Security & Compliance</h2>
          </div>
          <p className="text-xs text-gray-400">
            Mandatory multi-factor authentication, NHS DBS verification hooks, and GDPR telemetry.
          </p>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Enforce Mandatory 2FA for Recruiter & Admin Portals</span>
              <input
                type="checkbox"
                checked={twoFactorEnforced}
                onChange={(e) => setTwoFactorEnforced(e.target.checked)}
                className="h-4 w-4 rounded-sm accent-electric"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1b2b4d]">
              <span className="text-gray-300">Auto-sync with UK DBS & GMC Medical Gateway</span>
              <input
                type="checkbox"
                checked={autoAuditSync}
                onChange={(e) => setAutoAuditSync(e.target.checked)}
                className="h-4 w-4 rounded-sm accent-electric"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={() => alert("Platform parameters updated and propagated to global cluster.")}
          className="rounded-xl bg-electric px-5 py-2.5 font-display text-xs font-semibold text-white hover:bg-electric-bright transition-all shadow-xs cursor-pointer"
        >
          Save & Propagate Platform Parameters →
        </button>
      </div>
    </div>
  );
}
