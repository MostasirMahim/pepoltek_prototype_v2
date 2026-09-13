"use client";

import React from "react";
import GlobeVisual from "@/components/GlobeVisual";

export default function GlobeScrollBridge() {
  return (
    <div
      id="hero-globe-static-wrapper"
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div className="relative h-full w-full">
        <GlobeVisual hideCenterHub={false} />
      </div>
    </div>
  );
}

