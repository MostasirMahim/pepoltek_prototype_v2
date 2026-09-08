"use client";

import React, { useState, useEffect } from "react";
import GlobeVisual from "@/components/GlobeVisual";

interface AchievementNode {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  dotPos: { top: string; left: string };
  badgePos: { top: string; left: string };
}

const ACHIEVEMENTS: AchievementNode[] = [
  {
    id: "clients",
    title: "30+ Enterprise Clients",
    subtitle: "Across 15+ operating countries",
    tag: "Global Footprint",
    dotPos: { top: "34%", left: "32%" }, // North America approx
    badgePos: { top: "16%", left: "20%" },
  },
  {
    id: "specialists",
    title: "600+ Specialists Deployed",
    subtitle: "Pre-vetted SDLC & clinical talent",
    tag: "Talent Pods",
    dotPos: { top: "52%", left: "68%" }, // South Asia / APAC
    badgePos: { top: "68%", left: "65%" },
  },
  {
    id: "overlap",
    title: "24/7 Follow-the-Sun Sourcing",
    subtitle: "4 to 6 hours guaranteed daily overlap",
    tag: "Delivery Core",
    dotPos: { top: "38%", left: "54%" }, // Europe / GCC
    badgePos: { top: "14%", left: "68%" },
  },
];

export default function GlobeScrollBridge() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-cycle through achievement nodes every 3.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ACHIEVEMENTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="hero-globe-static-wrapper"
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      {/* Static 3D Globe Visual - No scroll downward translation */}
      <div className="relative h-full w-full">
        <GlobeVisual hideCenterHub={false} />
      </div>

      {/* Dynamic Continent Achievement Telemetry Popups */}
      {ACHIEVEMENTS.map((node, i) => {
        const isActive = activeIdx === i;
        return (
          <div
            key={node.id}
            className={`pointer-events-auto absolute transition-all duration-700 ${
              isActive
                ? "scale-100 opacity-100 z-30"
                : "pointer-events-none scale-95 opacity-0 z-10"
            }`}
            style={{
              top: node.badgePos.top,
              left: node.badgePos.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative flex flex-col rounded-xl border border-electric/40 bg-white/95 px-3.5 py-2.5 shadow-[0_12px_32px_-6px_rgba(10,132,255,0.38)] backdrop-blur-md transition-all hover:border-electric">
              {/* Header bar */}
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-electric">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                  {node.tag}
                </span>
                <span className="font-mono text-[8.5px] font-semibold text-mist">
                  {i + 1} / {ACHIEVEMENTS.length}
                </span>
              </div>

              {/* Title & metrics */}
              <div className="mt-1 font-display text-[13px] font-extrabold tracking-tight text-ink sm:text-[14px]">
                {node.title}
              </div>
              <div className="font-mono text-[10px] text-ink-soft sm:text-[10.5px]">
                {node.subtitle}
              </div>

              {/* Mini progress bar for cycle */}
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-electric/10">
                <div
                  key={activeIdx}
                  className="h-full rounded-full bg-gradient-to-r from-electric to-electric-bright"
                  style={{
                    animation: isActive ? "globeAchievementBar 3.8s linear forwards" : "none",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Pulsing continent surface beacons */}
      {ACHIEVEMENTS.map((node, i) => {
        const isActive = activeIdx === i;
        return (
          <div
            key={`beacon-${node.id}`}
            className="pointer-events-none absolute"
            style={{
              top: node.dotPos.top,
              left: node.dotPos.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span
              className={`block h-3 w-3 rounded-full transition-all duration-500 ${
                isActive
                  ? "bg-electric shadow-[0_0_14px_4px_rgba(10,132,255,0.8)] scale-125"
                  : "bg-electric/40 scale-75 opacity-60"
              }`}
            />
            {isActive && (
              <span className="absolute inset-[-6px] rounded-full border border-electric-bright animate-ping opacity-75" />
            )}
          </div>
        );
      })}

      {/* Scoped CSS for achievement progress bar */}
      <style>{`
        @keyframes globeAchievementBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
