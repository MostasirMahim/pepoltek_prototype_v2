"use client";

import { useState } from "react";

interface Thread {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  pod: string;
}

const THREADS: Thread[] = [
  {
    id: "1",
    name: "Marcus Vance",
    role: "Lead Pod Architect",
    avatar: "MV",
    lastMessage: "The sprint kickoff for the High-Frequency Ledger Pod starts tomorrow at 9:00 AM BST.",
    time: "10:45 AM",
    unread: true,
    pod: "FinTech Ledger Pod",
  },
  {
    id: "2",
    name: "Dr. Rachel Higgins",
    role: "NHS Trust Clinical Lead",
    avatar: "RH",
    lastMessage: "We have approved your compliance credentials for the emergency rota integration.",
    time: "Yesterday",
    unread: false,
    pod: "CarePulse NHS Trust",
  },
  {
    id: "3",
    name: "Sarah Jenkins",
    role: "Pepoltek Pod Success Advocate",
    avatar: "SJ",
    lastMessage: "Your escrow milestone payment for Milestone #1 has been released.",
    time: "Oct 1",
    unread: false,
    pod: "Pepoltek Talent Support",
  },
];

export default function CandidateMessagesPage() {
  const [selectedThread, setSelectedThread] = useState<Thread>(THREADS[0]);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string; isMe: boolean }>>([
    {
      sender: "Marcus Vance",
      text: "Hi Alex, we reviewed your live coding benchmark. Exceptional work on the async WebSocket buffer handling.",
      time: "10:30 AM",
      isMe: false,
    },
    {
      sender: "Alex Morgan",
      text: "Thanks Marcus! Really excited about the architecture. Is the deployment stack fully Dockerized on AWS?",
      time: "10:38 AM",
      isMe: true,
    },
    {
      sender: "Marcus Vance",
      text: "Yes, fully containerized on EKS with Terraform. The sprint kickoff for the High-Frequency Ledger Pod starts tomorrow at 9:00 AM BST.",
      time: "10:45 AM",
      isMe: false,
    },
  ]);
  const [replyText, setReplyText] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "Alex Morgan",
        text: replyText.trim(),
        time: "Just now",
        isMe: true,
      },
    ]);
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Pod Sprints & Direct Messages</h1>
        <p className="text-xs sm:text-sm text-ink-soft">
          Communicate directly with your assigned Pod Leads, Hiring Managers, and Talent Advocates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-2xl border border-[#bcd6fa] bg-white overflow-hidden shadow-xs h-[640px]">
        {/* Left List of Threads */}
        <div className="border-r border-[#bcd6fa]/50 flex flex-col">
          <div className="p-3.5 border-b border-[#bcd6fa]/40 bg-canvas/30">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-[#bcd6fa] bg-white px-3 py-1.5 text-xs text-ink placeholder-mist focus:border-electric focus:outline-hidden"
            />
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#bcd6fa]/20">
            {THREADS.map((th) => (
              <button
                key={th.id}
                onClick={() => setSelectedThread(th)}
                className={`w-full p-4 text-left transition-colors flex items-start gap-3 cursor-pointer ${
                  selectedThread.id === th.id ? "bg-electric/5 border-l-4 border-l-electric" : "hover:bg-canvas/40"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink font-display text-xs font-bold text-white">
                  {th.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold text-ink truncate">{th.name}</span>
                    <span className="font-mono text-[10px] text-mist">{th.time}</span>
                  </div>
                  <div className="font-mono text-[10px] text-electric truncate">{th.pod}</div>
                  <p className="text-xs text-ink-soft truncate mt-1">{th.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Message Chat Box */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          {/* Active Chat Header */}
          <div className="p-4 border-b border-[#bcd6fa]/40 flex items-center justify-between bg-canvas/20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink font-display text-xs font-bold text-white">
                {selectedThread.avatar}
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-ink">{selectedThread.name}</h3>
                <span className="font-mono text-[11px] text-mist">
                  {selectedThread.role} • <span className="text-electric">{selectedThread.pod}</span>
                </span>
              </div>
            </div>

            <span className="rounded-full bg-signal/10 px-2.5 py-1 font-mono text-[10px] font-bold text-signal">
              Pod Encrypted Channel
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-canvas/10">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-md rounded-2xl p-3.5 text-xs ${
                    m.isMe
                      ? "bg-ink text-white rounded-br-none shadow-xs"
                      : "bg-white border border-[#bcd6fa] text-ink rounded-bl-none shadow-xs"
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <span className="mt-1 font-mono text-[10px] text-mist px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Reply Box */}
          <form onSubmit={handleSend} className="p-3.5 border-t border-[#bcd6fa]/40 bg-white flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Message ${selectedThread.name}...`}
              className="flex-1 rounded-xl border border-[#bcd6fa] bg-canvas/30 px-3.5 py-2 text-xs text-ink placeholder-mist focus:border-electric focus:bg-white focus:outline-hidden"
            />
            <button
              type="submit"
              className="rounded-xl bg-electric px-4 py-2 font-display text-xs font-semibold text-white hover:bg-electric-bright transition-colors cursor-pointer shadow-xs"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
