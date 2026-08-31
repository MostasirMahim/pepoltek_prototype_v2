"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlobeVisual from "@/components/GlobeVisual";

export default function GlobeScrollBridge() {
  const travelerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const traveler = travelerRef.current;
    if (!traveler) return;

    let ctx: gsap.Context;

    const setupAnimation = () => {
      const heroAnchor = document.getElementById("hero-globe-anchor");
      const overviewAnchor = document.getElementById("overview-orb-target");
      const heroConnectors = document.getElementById("hero-connector-lines");
      const heroCards = document.querySelectorAll(".hero-stat-card");

      if (!heroAnchor || !overviewAnchor) return;

      const getMeasurements = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const heroRect = heroAnchor.getBoundingClientRect();
        const overviewRect = overviewAnchor.getBoundingClientRect();

        const heroCenterX = heroRect.left + heroRect.width / 2;
        const heroCenterY = heroRect.top + scrollY + heroRect.height / 2;

        const overviewCenterX = overviewRect.left + overviewRect.width / 2;
        const overviewCenterY = overviewRect.top + scrollY + overviewRect.height / 2;

        const dx = overviewCenterX - heroCenterX;
        const dy = overviewCenterY - heroCenterY;
        const targetSize = Math.min(overviewRect.width, overviewRect.height) || 280;
        const originSize = Math.min(heroRect.width, heroRect.height) || 400;
        const scale = (targetSize / originSize) * 1.1;

        return { dx, dy, scale };
      };

      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        // Timeline scrubbed from Hero top until arriving over the Overview brand circle
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            endTrigger: "#overview-section",
            end: "center 55%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Smoothly translate & scale the globe from Hero down into Overview
        tl.to(
          traveler,
          {
            x: () => getMeasurements().dx,
            y: () => getMeasurements().dy,
            scale: () => getMeasurements().scale,
            ease: "power1.inOut",
          },
          0
        );

        // Hero connector lines and stat cards fade out smoothly
        if (heroConnectors) {
          tl.to(
            heroConnectors,
            {
              opacity: 0,
              ease: "power1.out",
            },
            0
          );
        }

        if (heroCards && heroCards.length > 0) {
          tl.to(
            heroCards,
            {
              opacity: 0,
              y: -30,
              stagger: 0.05,
              ease: "power1.out",
            },
            0
          );
        }
      });
    };

    const timer = setTimeout(() => {
      setupAnimation();
      ScrollTrigger.refresh();
    }, 150);

    const handleResize = () => {
      setupAnimation();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
      ref={travelerRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full will-change-transform"
      style={{ transformOrigin: "center center" }}
    >
      <GlobeVisual hideCenterHub={false} />
    </div>
  );
}
