"use client";

import { useEffect, useRef } from "react";

// Notable delivery hubs (lat, lon) that fire connection arcs into the central hub
const HUB_POINTS: [number, number][] = [
  [40.7, -74.0], // New York
  [51.5, -0.1], // London
  [28.6, 77.2], // Delhi
  [1.35, 103.8], // Singapore
  [-33.9, 151.2], // Sydney
  [52.5, 13.4], // Berlin
  [-23.5, -46.6], // Sao Paulo
];

// Continents approximated as ellipses in (lat, lon) space for the dot mask
const LAND: [number, number, number, number][] = [
  [54, -100, 26, 34], // North America
  [40, -78, 13, 13], // NA east / US
  [30, -105, 10, 12], // Mexico / SW
  [72, -42, 9, 16], // Greenland
  [-12, -60, 24, 13], // South America
  [4, -66, 9, 10], // northern SA
  [54, 18, 13, 26], // Europe
  [62, 90, 15, 60], // Siberia / N Asia
  [4, 20, 30, 17], // Africa
  [30, 45, 13, 22], // Middle East
  [22, 78, 11, 9], // India
  [35, 108, 15, 22], // China / E Asia
  [3, 112, 11, 13], // SE Asia
  [-25, 134, 12, 16], // Australia
];

function isLand(lat: number, lon: number): boolean {
  for (const [cLat, cLon, rLat, rLon] of LAND) {
    let dLon = lon - cLon;
    if (dLon > 180) dLon -= 360;
    if (dLon < -180) dLon += 360;
    const a = (lat - cLat) / rLat;
    const b = dLon / rLon;
    if (a * a + b * b <= 1) return true;
  }
  return false;
}

const D2R = Math.PI / 180;

export default function GlobeVisual({
  hideCenterHub = false,
}: {
  hideCenterHub?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Build the dotted-land point cloud once
    const points: [number, number][] = [];
    for (let lat = -58; lat <= 82; lat += 2.6) {
      const step = 2.6 / Math.max(0.25, Math.cos(lat * D2R));
      for (let lon = -180; lon < 180; lon += step) {
        if (isLand(lat, lon)) points.push([lat, lon]);
      }
    }

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let rot = -20;
    let last = performance.now();

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce) rot += dt * 9; // degrees/sec

      ctx.clearRect(0, 0, w, h);

      // Globe geometry: centered within its own box, logo hub at the core
      const R = Math.min(w, h) * 0.46;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const hubX = cx;
      const hubY = cy;

      // Faint globe disc + limb glow
      const disc = ctx.createRadialGradient(cx, cy - R * 0.35, R * 0.1, cx, cy, R);
      disc.addColorStop(0, "rgba(219,234,254,0.55)");
      disc.addColorStop(0.7, "rgba(191,214,250,0.28)");
      disc.addColorStop(1, "rgba(159,192,242,0.05)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = disc;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56,189,248,0.45)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Land dots (front hemisphere only)
      const cosR = Math.cos(rot * D2R);
      const sinR = Math.sin(rot * D2R);
      for (const [lat, lon] of points) {
        const phi = lat * D2R;
        const lam = lon * D2R;
        const cosPhi = Math.cos(phi);
        const x0 = cosPhi * Math.sin(lam);
        const z0 = cosPhi * Math.cos(lam);
        const y = Math.sin(phi);
        const x = x0 * cosR + z0 * sinR;
        const z = -x0 * sinR + z0 * cosR;
        if (z <= 0) continue;
        const sx = cx + x * R;
        const sy = cy - y * R;
        const depth = 0.35 + 0.65 * z;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.3 + z * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,132,255,${0.18 + 0.62 * depth})`;
        ctx.fill();
      }

      // Connection arcs from hub points into the central logo hub
      for (let i = 0; i < HUB_POINTS.length; i++) {
        const [lat, lon] = HUB_POINTS[i];
        const phi = lat * D2R;
        const lam = lon * D2R;
        const cosPhi = Math.cos(phi);
        const x0 = cosPhi * Math.sin(lam);
        const z0 = cosPhi * Math.cos(lam);
        const yy = Math.sin(phi);
        const x = x0 * cosR + z0 * sinR;
        const z = -x0 * sinR + z0 * cosR;
        if (z <= 0.02) continue;
        const sx = cx + x * R;
        const sy = cy - yy * R;

        const mx = (sx + hubX) / 2 + (sx - hubX) * 0.18;
        const my = (sy + hubY) / 2 + (sy - hubY) * 0.18 - 20;
        const fade = Math.min(1, z * 1.4);

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(mx, my, hubX, hubY);
        ctx.strokeStyle = `rgba(10,132,255,${0.28 * fade})`;
        ctx.lineWidth = 1.4;
        if (!reduce) {
          ctx.setLineDash([5, 9]);
          ctx.lineDashOffset = -((now / 22) % 200);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Candidate marker — a small person glyph (people onboarding to Pepoltek)
        ctx.save();
        // soft halo
        ctx.beginPath();
        ctx.arc(sx, sy, 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.85 * fade})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(10,132,255,${0.5 * fade})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        // head
        ctx.beginPath();
        ctx.arc(sx, sy - 2.2, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,132,255,${fade})`;
        ctx.fill();
        // shoulders
        ctx.beginPath();
        ctx.arc(sx, sy + 3.4, 3.2, Math.PI * 1.15, Math.PI * 1.85);
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = `rgba(10,132,255,${fade})`;
        ctx.stroke();
        ctx.restore();

        // Traveling packet along the arc
        if (!reduce) {
          const t = ((now / 1600 + i / HUB_POINTS.length) % 1);
          const it = 1 - t;
          const px = it * it * sx + 2 * it * t * mx + t * t * hubX;
          const py = it * it * sy + 2 * it * t * my + t * t * hubY;
          ctx.beginPath();
          ctx.arc(px, py, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56,189,248,${fade})`;
          ctx.fill();
        }
      }

      // Central hub glow
      const hubGlow = ctx.createRadialGradient(hubX, hubY, 2, hubX, hubY, 70);
      hubGlow.addColorStop(0, "rgba(56,189,248,0.5)");
      hubGlow.addColorStop(1, "rgba(56,189,248,0)");
      ctx.beginPath();
      ctx.arc(hubX, hubY, 70, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow;
      ctx.fill();

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      {!hideCenterHub && (
        <div
          className="absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-electric bg-white font-display text-2xl font-extrabold text-[#0a1428] shadow-[0_0_28px_4px_rgba(10,132,255,0.35)] sm:h-[68px] sm:w-[68px]"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          P
          <span
            className="absolute inset-[-10px] rounded-full border border-electric-bright/50"
            style={{ animation: "pulse-ring 3s ease-in-out infinite" }}
          />
        </div>
      )}
    </div>
  );
}
