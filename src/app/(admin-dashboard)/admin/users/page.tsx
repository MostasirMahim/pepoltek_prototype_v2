"use client";

import { useState } from "react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "Candidate" | "Recruiter" | "Pod Lead" | "Admin";
  sector: "Software Tech" | "Healthcare" | "Enterprise Ops";
  status: "Active" | "Pending Verification" | "Suspended";
  joinedDate: string;
  lastActive: string;
}

const USERS_DATA: UserRecord[] = [
  {
    id: "USR-101",
    name: "Alex Morgan",
    email: "alex.morgan@engineer.com",
    role: "Candidate",
    sector: "Software Tech",
    status: "Active",
    joinedDate: "Aug 12, 2026",
    lastActive: "Just now",
  },
  {
    id: "USR-102",
    name: "Dr. Rachel Higgins",
    email: "rachel.higgins@nhs-trust.co.uk",
    role: "Candidate",
    sector: "Healthcare",
    status: "Active",
    joinedDate: "Aug 18, 2026",
    lastActive: "15 mins ago",
  },
  {
    id: "USR-103",
    name: "Elena Rostova",
    email: "elena@apextech.io",
    role: "Recruiter",
    sector: "Enterprise Ops",
    status: "Active",
    joinedDate: "Jul 29, 2026",
    lastActive: "1 hour ago",
  },
  {
    id: "USR-104",
    name: "Marcus Vance",
    email: "marcus.vance@pepoltek.com",
    role: "Pod Lead",
    sector: "Software Tech",
    status: "Active",
    joinedDate: "Jun 14, 2026",
    lastActive: "2 mins ago",
  },
  {
    id: "USR-105",
    name: "David Kim",
    email: "david.kim@dev.io",
    role: "Candidate",
    sector: "Software Tech",
    status: "Pending Verification",
    joinedDate: "Yesterday",
    lastActive: "Yesterday",
  },
];

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredUsers = USERS_DATA.filter((u) => {
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">User & Role RBAC Management</h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Control platform accounts, permission matrices, candidate verification tiers, and recruiter organizations.
          </p>
        </div>
        <button className="rounded-xl bg-electric px-4 py-2 font-display text-xs font-semibold text-white hover:bg-electric-bright transition-colors shadow-xs">
          + Create User Account
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user name, email, or ID..."
            className="w-full rounded-xl border border-[#1b2b4d] bg-[#0a1428] px-3.5 py-2 pl-9 text-xs text-white placeholder-gray-500 focus:border-electric focus:outline-hidden"
          />
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex gap-2">
          {["All", "Candidate", "Recruiter", "Pod Lead", "Admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-xl px-3.5 py-2 font-display text-xs font-semibold transition-all cursor-pointer ${
                roleFilter === r
                  ? "bg-electric text-white"
                  : "bg-[#0a1428] border border-[#1b2b4d] text-gray-400 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#1b2b4d] font-mono text-gray-400 uppercase text-[11px]">
              <th className="pb-3 font-semibold">User ID & Name</th>
              <th className="pb-3 font-semibold">Role</th>
              <th className="pb-3 font-semibold">Sector</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Joined Date</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1b2b4d]/50">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-[#060b14]/50 transition-colors">
                <td className="py-3.5 pr-3">
                  <div className="font-display font-bold text-white">{u.name}</div>
                  <div className="font-mono text-[11px] text-gray-400">
                    {u.id} • {u.email}
                  </div>
                </td>
                <td className="py-3.5 font-medium">
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                      u.role === "Candidate"
                        ? "bg-blue-500/20 text-electric-bright"
                        : u.role === "Recruiter"
                        ? "bg-purple-500/20 text-purple-300"
                        : u.role === "Pod Lead"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 font-mono text-gray-300">{u.sector}</td>
                <td className="py-3.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                      u.status === "Active"
                        ? "bg-signal/20 text-signal"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="py-3.5 font-mono text-gray-400">{u.joinedDate}</td>
                <td className="py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-lg border border-[#1b2b4d] bg-[#060b14] px-2.5 py-1 font-mono text-[11px] text-gray-300 hover:text-white">
                      Impersonate
                    </button>
                    <button className="rounded-lg bg-electric/20 border border-electric/40 px-2.5 py-1 font-mono text-[11px] text-electric-bright hover:bg-electric hover:text-white transition-colors">
                      Edit RBAC
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
