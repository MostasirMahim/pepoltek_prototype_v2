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
      const calcPowerNode = document.getElementById("calculator-power-node");
      const calcDevice = document.getElementById("calculator-device-anchor");
      const calcBezel = document.getElementById("calculator-outer-bezel");
      const calcHalo = document.getElementById("calculator-glow-halo");
      const heroConnectors = document.getElementById("hero-connector-lines");
      const heroCards = document.querySelectorAll(".hero-stat-card");

      if (!heroAnchor || !overviewAnchor) return;

      const getMeasurements = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const heroRect = heroAnchor.getBoundingClientRect();
        const overviewRect = overviewAnchor.getBoundingClientRect();
        const calcAnchor = calcPowerNode || calcDevice;

        const heroCenterX = heroRect.left + heroRect.width / 2;
        const heroCenterY = heroRect.top + scrollY + heroRect.height / 2;

        // Stage 1: Overview Target Coordinates
        const overviewCenterX = overviewRect.left + overviewRect.width / 2;
        const overviewCenterY = overviewRect.top + scrollY + overviewRect.height / 2;

        const dx1 = overviewCenterX - heroCenterX;
        const dy1 = overviewCenterY - heroCenterY;
        const targetSize1 = Math.min(overviewRect.width, overviewRect.height) || 280;
        const originSize = Math.min(heroRect.width, heroRect.height) || 400;
        const scale1 = (targetSize1 / originSize) * 1.1;

        // Stage 2: Calculator Target Coordinates (Section 3)
        let dx2 = dx1;
        let dy2 = dy1 + 850;
        let scale2 = 0.26;

        if (calcAnchor) {
          const calcRect = calcAnchor.getBoundingClientRect();
          const calcCenterX = calcRect.left + calcRect.width / 2;
          const calcCenterY = calcRect.top + scrollY + calcRect.height / 2;

          dx2 = calcCenterX - heroCenterX;
          dy2 = calcCenterY - heroCenterY;

          // Scale down into a dense, high-energy core docked at the status node
          const targetSize2 = Math.min(calcRect.width, calcRect.height) || 44;
          scale2 = Math.max(0.18, Math.min(0.32, (targetSize2 / originSize) * 2.3));
        }

        return { dx1, dy1, scale1, dx2, dy2, scale2 };
      };

      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        // Multi-stage timeline scrubbed from Hero top down to Section 3 Calculator
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            endTrigger: "#hiring-velocity-section",
            end: "center 50%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Hero ➔ Overview (0 to 3.2s)
        tl.to(
          traveler,
          {
            x: () => getMeasurements().dx1,
            y: () => getMeasurements().dy1,
            scale: () => getMeasurements().scale1,
            ease: "power1.inOut",
            duration: 3.2,
          },
          0
        );

        // Hero connector lines and stat cards fade out
        if (heroConnectors) {
          tl.to(
            heroConnectors,
            {
              opacity: 0,
              ease: "power1.out",
              duration: 1.4,
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
              duration: 1.4,
            },
            0
          );
        }

        // 2. Dwell at Overview while user reads (3.2s to 4.6s)
        tl.to(
          traveler,
          {
            x: () => getMeasurements().dx1,
            y: () => getMeasurements().dy1,
            scale: () => getMeasurements().scale1,
            ease: "none",
            duration: 1.4,
          },
          3.2
        );

        // 3. Overview ➔ Section 3 Calculator Power Node (4.6s to 8.4s)
        tl.to(
          traveler,
          {
            x: () => getMeasurements().dx2,
            y: () => getMeasurements().dy2,
            scale: () => getMeasurements().scale2,
            ease: "power2.inOut",
            duration: 3.8,
          },
          4.6
        );

        // 3b. Fade the globe out as it approaches the calculator (invisible upon docking)
        tl.to(
          traveler,
          {
            opacity: 0,
            ease: "power3.in",
            duration: 1.6,
          },
          7.0
        );

        // 4. Calculator Docking & Border Surge: dramatic bezel border blink on arrival

        // 4a. Outer Bezel Border Blink
        if (calcBezel) {
          // Surge flash
          tl.to(
            calcBezel,
            {
              boxShadow: "0 0 40px 6px rgba(10,132,255,0.7), 0 30px 60px -20px rgba(10,132,255,0.5)",
              borderColor: "#0a84ff",
              ease: "power4.out",
              duration: 0.6,
            },
            7.8
          );
          // Blink dip
          tl.to(
            calcBezel,
            {
              boxShadow: "0 10px 25px -10px rgba(10,132,255,0.2)",
              borderColor: "#bcd6fa",
              ease: "power2.in",
              duration: 0.3,
            },
            8.4
          );
          // Blink surge back
          tl.to(
            calcBezel,
            {
              boxShadow: "0 0 35px 5px rgba(56,189,248,0.65), 0 25px 50px -15px rgba(10,132,255,0.45)",
              borderColor: "#38bdf8",
              ease: "power2.out",
              duration: 0.3,
            },
            8.7
          );
          // Settle at clean premium glow (revert to Figma tailwind classes)
          tl.to(
            calcBezel,
            {
              clearProps: "boxShadow,borderColor",
              ease: "power1.out",
              duration: 0.6,
            },
            9.1
          );
        }

        // 4b. Halo glow: pulse on dock then settle
        if (calcHalo) {
          tl.to(
            calcHalo,
            {
              opacity: 1,
              scale: 1.12,
              ease: "power4.out",
              duration: 0.6,
            },
            7.8
          );
          // Blink contract
          tl.to(
            calcHalo,
            {
              opacity: 0.4,
              scale: 0.98,
              ease: "power2.in",
              duration: 0.3,
            },
            8.4
          );
          // Blink expand
          tl.to(
            calcHalo,
            {
              opacity: 0.9,
              scale: 1.06,
              ease: "power2.out",
              duration: 0.4,
            },
            8.7
          );
          // Settle (revert to Figma tailwind classes)
          tl.to(
            calcHalo,
            {
              clearProps: "opacity,scale",
              ease: "power1.out",
              duration: 0.6,
            },
            9.1
          );
        }

        // 4c. Power node: explosive glow burst → blink → settle
        if (calcPowerNode) {
          tl.to(
            calcPowerNode,
            {
              scale: 2.0,
              boxShadow: "0 0 32px 10px rgba(56,189,248,1)",
              ease: "power4.out",
              duration: 0.5,
            },
            7.9
          );
          // Blink shrink
          tl.to(
            calcPowerNode,
            {
              scale: 1.0,
              boxShadow: "0 0 8px 2px rgba(56,189,248,0.4)",
              ease: "power2.in",
              duration: 0.3,
            },
            8.4
          );
          // Blink expand
          tl.to(
            calcPowerNode,
            {
              scale: 1.6,
              boxShadow: "0 0 24px 8px rgba(56,189,248,0.9)",
              ease: "power2.out",
              duration: 0.3,
            },
            8.7
          );
          // Settle
          tl.to(
            calcPowerNode,
            {
              scale: 1.0,
              boxShadow: "0 0 8px rgba(56,189,248,0.9)",
              ease: "power1.out",
              duration: 0.6,
            },
            9.0
          );
        }
      });
    };

    const timer = setTimeout(() => {
      setupAnimation();
      ScrollTrigger.refresh();
    }, 200);

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
      className="pointer-events-none absolute inset-0 z-30 h-full w-full will-change-transform"
      style={{ transformOrigin: "center center" }}
    >
      <GlobeVisual hideCenterHub={false} />
    </div>
  );
}
