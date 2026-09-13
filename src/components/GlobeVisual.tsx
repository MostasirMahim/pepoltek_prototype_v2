"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Rich, realistic continental ellipses in (lat, lon) space for realistic world map coverage
const LAND: [number, number, number, number][] = [
  // North America
  [58, -115, 18, 30], // Canada / Alaska east
  [62, -150, 10, 22], // Alaska
  [44, -100, 14, 26], // US Midwest / West
  [38, -82, 13, 14], // US East Coast
  [28, -102, 10, 14], // Mexico / SW
  [15, -90, 8, 12], // Central America
  [72, -40, 12, 18], // Greenland
  [22, -78, 6, 12], // Caribbean

  // South America
  [4, -68, 10, 14], // Northern SA / Colombia / Venezuela
  [-8, -52, 16, 16], // Brazil / Amazon
  [-22, -48, 12, 12], // Brazil SE / Sao Paulo
  [-32, -64, 16, 11], // Argentina / Chile
  [-50, -70, 8, 8], // Patagonia

  // Europe & Mediterranean
  [56, 14, 12, 18], // Western / Central Europe
  [54, -3, 8, 7], // UK & Ireland
  [62, 16, 12, 12], // Scandinavia
  [40, 0, 7, 10], // Spain / Portugal
  [40, 18, 8, 14], // Italy / Balkans / Greece
  [32, 20, 8, 30], // North Africa / Mediterranean rim

  // Africa
  [18, 10, 12, 22], // Sahara / West Africa
  [6, 22, 14, 18], // Central Africa
  [-4, 36, 12, 12], // East Africa / Kenya
  [-22, 26, 14, 15], // Southern Africa

  // Middle East & Central Asia
  [28, 48, 12, 18], // Arabian Peninsula / GCC
  [36, 54, 10, 16], // Iran / Middle East
  [48, 66, 12, 24], // Central Asia / Kazakhstan

  // South Asia
  [24, 78, 12, 14], // India West & Central
  [22, 88, 10, 10], // India East & Bangladesh
  [8, 80, 5, 5], // Sri Lanka

  // East Asia & Siberia
  [36, 106, 14, 20], // China Central & North
  [26, 114, 10, 14], // China South
  [58, 85, 14, 35], // Siberia Central
  [64, 130, 14, 28], // Siberia East
  [37, 138, 9, 8], // Japan
  [36, 128, 5, 5], // Korea

  // Southeast Asia & Oceania
  [14, 102, 10, 12], // Indochina / Thailand / Vietnam
  [2, 112, 10, 16], // Malaysia / Indonesia
  [-4, 120, 8, 14], // Indonesia archipelago
  [12, 122, 9, 8], // Philippines
  [-22, 134, 15, 20], // Australia North / Central
  [-32, 142, 12, 15], // Australia East / Sydney
  [-41, 174, 8, 6], // New Zealand
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

// Continental hubs placed on Upper Side (lat >= 28) and Lower Side (lat <= -22)
// to keep the horizontal center band completely clean of overlap with the center logo
const CONTINENTAL_HUBS = [
  // UPPER SIDE
  { lat: 44.0, lon: -98.0, num: "30+", word: "Clients", icon: "clients" },
  { lat: 52.0, lon: 8.0, num: "24/7", word: "Sourcing", icon: "sourcing" },
  { lat: 48.0, lon: 68.0, num: "4h+", word: "Overlap", icon: "clock" },
  { lat: 28.5, lon: 77.0, num: "600+", word: "Specialists", icon: "person" },
  { lat: 38.0, lon: 118.0, num: "15+", word: "Countries", icon: "globe" },

  // LOWER SIDE
  { lat: -23.5, lon: -48.0, num: "12+", word: "Squads", icon: "team" },
  { lat: -26.0, lon: 28.0, num: "100%", word: "Vetted", icon: "shield" },
  { lat: -22.0, lon: 118.0, num: "2 to 7d", word: "Deploy", icon: "deploy" },
  { lat: -28.0, lon: 138.0, num: "98%", word: "Retention", icon: "retention" },
];

// Vector drawing for each subtle hub icon matching its popping word
function drawSubtleIcon(
  ctx: CanvasRenderingContext2D,
  type: string,
  x: number,
  y: number,
  size: number,
  alpha: number
) {
  ctx.save();
  ctx.translate(x, y);
  const s = size / 14;
  ctx.scale(s, s);
  ctx.lineWidth = 1.35;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = `rgba(10, 132, 255, ${alpha})`;
  ctx.fillStyle = `rgba(10, 132, 255, ${alpha})`;

  switch (type) {
    case "person": // Specialists
      ctx.beginPath();
      ctx.arc(7, 4.2, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(7, 11, 4.2, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      break;

    case "team": // Squads
      ctx.beginPath();
      ctx.arc(4.6, 4.5, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(4.6, 10.8, 3, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(9.4, 4.5, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(9.4, 10.8, 3, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      break;

    case "clients": // Clients / Briefcase
      ctx.beginPath();
      ctx.rect(2.8, 5, 8.4, 6.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(5, 5);
      ctx.lineTo(5, 3.2);
      ctx.lineTo(9, 3.2);
      ctx.lineTo(9, 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(7, 7.5);
      ctx.lineTo(7, 8.8);
      ctx.stroke();
      break;

    case "clock": // Overlap
      ctx.beginPath();
      ctx.arc(7, 7, 5.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(7, 4.2);
      ctx.lineTo(7, 7);
      ctx.lineTo(9.2, 7);
      ctx.stroke();
      break;

    case "shield": // Vetted
      ctx.beginPath();
      ctx.moveTo(7, 2.2);
      ctx.lineTo(11.2, 4.2);
      ctx.lineTo(11.2, 7.8);
      ctx.quadraticCurveTo(7, 12, 7, 12);
      ctx.quadraticCurveTo(2.8, 7.8, 2.8, 7.8);
      ctx.lineTo(2.8, 4.2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(5.2, 7.2);
      ctx.lineTo(6.5, 8.5);
      ctx.lineTo(8.8, 5.8);
      ctx.stroke();
      break;

    case "globe": // Countries
      ctx.beginPath();
      ctx.arc(7, 7, 5.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(7, 7, 2.4, 5.2, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(1.8, 7);
      ctx.lineTo(12.2, 7);
      ctx.stroke();
      break;

    case "deploy": // Deploy / Lightning Zap
      ctx.beginPath();
      ctx.moveTo(7.8, 2);
      ctx.lineTo(3.8, 7.6);
      ctx.lineTo(7, 7.6);
      ctx.lineTo(6.2, 12);
      ctx.lineTo(10.2, 6.4);
      ctx.lineTo(7, 6.4);
      ctx.closePath();
      ctx.fill();
      break;

    case "sourcing": // Sourcing / Radar Target
      ctx.beginPath();
      ctx.arc(7, 7, 5.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(7, 7, 2, 0, Math.PI * 2);
      ctx.stroke();
      break;

    default: // Retention / Check circle
      ctx.beginPath();
      ctx.arc(7, 7, 5.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(4.6, 7.2);
      ctx.lineTo(6.4, 9);
      ctx.lineTo(9.4, 5.4);
      ctx.stroke();
      break;
  }
  ctx.restore();
}

export default function GlobeVisual({ hideCenterHub = false }: { hideCenterHub?: boolean } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Build realistic, compact dotted-land point cloud with high coverage
    const points: [number, number][] = [];
    for (let lat = -58; lat <= 82; lat += 2.1) {
      const step = 2.1 / Math.max(0.24, Math.cos(lat * D2R));
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
      if (!reduce) rot += dt * 9; // 9 degrees/sec rotation

      ctx.clearRect(0, 0, w, h);

      // Globe geometry: centered within its container
      const R = Math.min(w, h) * 0.38;
      const cx = w * 0.5;
      const cy = h * 0.5;

      // Faint globe disc + atmospheric limb glow
      const disc = ctx.createRadialGradient(cx, cy - R * 0.35, R * 0.1, cx, cy, R);
      disc.addColorStop(0, "rgba(219,234,254,0.55)");
      disc.addColorStop(0.7, "rgba(191,214,250,0.28)");
      disc.addColorStop(1, "rgba(159,192,242,0.05)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = disc;
      ctx.fill();

      // Atmospheric perimeter ring
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56,189,248,0.45)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Front hemisphere realistic land dots
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
        ctx.arc(sx, sy, 1.2 + z * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,132,255,${0.18 + 0.62 * depth})`;
        ctx.fill();
      }

      // ----------------------------------------------------------------------
      // CONTINENTAL HUBS: People Surface Glyph & Subtle-Icon Popup Bar
      // Upper side & Lower side placement keeps the horizontal center band 100% clean
      // ----------------------------------------------------------------------
      for (let i = 0; i < CONTINENTAL_HUBS.length; i++) {
        const hub = CONTINENTAL_HUBS[i];
        const phi = hub.lat * D2R;
        const lam = hub.lon * D2R;
        const cosPhi = Math.cos(phi);
        const x0 = cosPhi * Math.sin(lam);
        const z0 = cosPhi * Math.cos(lam);
        const yy = Math.sin(phi);
        const x = x0 * cosR + z0 * sinR;
        const z = -x0 * sinR + z0 * cosR;

        // Front hemisphere visibility threshold
        if (z <= 0.05) continue;

        const sx = cx + x * R;
        const sy = cy - yy * R;

        // Surface point: crafted people/candidate glyph with soft halo (instead of plain blue dot)
        const dotFade = Math.min(1, Math.max(0, (z - 0.05) * 2.0));
        ctx.save();
        ctx.beginPath();
        ctx.arc(sx, sy, 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * dotFade})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(10, 132, 255, ${0.5 * dotFade})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Person head
        ctx.beginPath();
        ctx.arc(sx, sy - 2, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10, 132, 255, ${dotFade})`;
        ctx.fill();

        // Person shoulders
        ctx.beginPath();
        ctx.arc(sx, sy + 3.2, 2.8, Math.PI * 1.15, Math.PI * 1.85);
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = `rgba(10, 132, 255, ${dotFade})`;
        ctx.stroke();
        ctx.restore();

        // --------------------------------------------------------------------
        // DYNAMIC POPPING TIMING:
        // 1. Point enters the visible globe at limb (ang = -90 deg).
        // 2. After a few seconds, once comfortably inner from the border (~2.4s):
        //    Smoothly rises up, holds for ~2.9s, then smoothly lowers down.
        // 3. Rests down on continent dot for ~1.8s while continuing across inner globe.
        // 4. While still inner the globe, pops up a second time:
        //    Smoothly rises up, holds for ~2.9s, then smoothly lowers down.
        // 5. Rests as it glides towards the opposite limb and behind the globe.
        // --------------------------------------------------------------------
        let ang = ((rot + hub.lon) % 360 + 360) % 360;
        if (ang > 180) ang -= 360;

        // Ensure point is on visible front hemisphere
        if (ang < -90 || ang > 90) continue;

        // Elapsed seconds since entering visible globe face (0s to 20s at 9 deg/s)
        const relT = (ang + 90) / 9;

        // Subtle micro-stagger per hub so adjacent hubs bloom harmoniously
        const stagger = (i % 3) * 0.35;
        const t = relT - stagger;

        let ease = 0;
        if (t >= 2.4 && t < 3.1) {
          // Pop 1 Rise: 0.7s smooth sinusoidal ease
          const p = (t - 2.4) / 0.7;
          ease = 0.5 - 0.5 * Math.cos(p * Math.PI);
        } else if (t >= 3.1 && t < 6.0) {
          // Pop 1 Hold: 2.9s full display
          ease = 1.0;
        } else if (t >= 6.0 && t < 6.7) {
          // Pop 1 Lower down: 0.7s smooth sinusoidal descent
          const p = (t - 6.0) / 0.7;
          ease = 0.5 + 0.5 * Math.cos(p * Math.PI);
        } else if (t >= 8.5 && t < 9.2) {
          // Pop 2 Rise (while still inner the globe): 0.7s smooth rise
          const p = (t - 8.5) / 0.7;
          ease = 0.5 - 0.5 * Math.cos(p * Math.PI);
        } else if (t >= 9.2 && t < 12.1) {
          // Pop 2 Hold: 2.9s full display
          ease = 1.0;
        } else if (t >= 12.1 && t < 12.8) {
          // Pop 2 Lower down: 0.7s smooth descent back to continent dot
          const p = (t - 12.1) / 0.7;
          ease = 0.5 + 0.5 * Math.cos(p * Math.PI);
        }

        if (ease <= 0.001) continue;

        const alpha = Math.min(1, ease * 1.5);

        // Smooth vertical lift up from the continent glyph
        const lift = 22 * ease;
        const dotX = sx;
        const dotY = sy;
        const barBottomY = dotY - (yy >= 0 ? lift : -lift);
        const scale = 0.75 + 0.25 * ease;

        // Expanding radar ripple around the surface people glyph
        const rippleT = ((now * 0.0016 + i * 0.15) % 1);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 6 + rippleT * 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(10, 132, 255, ${(1 - rippleT) * alpha * 0.75})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Ultra-fine vertical laser stem rising from surface glyph to floating bar
        ctx.beginPath();
        ctx.moveTo(dotX, dotY);
        ctx.lineTo(dotX, barBottomY);
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.85})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Precision anchor bead at stem end
        ctx.beginPath();
        ctx.arc(dotX, barBottomY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10, 132, 255, ${alpha})`;
        ctx.fill();

        // Measure text for sleek minimal pill bar
        ctx.font = "800 11px var(--font-sora), sans-serif";
        const numW = ctx.measureText(hub.num).width;
        ctx.font = "600 10px var(--font-inter), sans-serif";
        const wordW = ctx.measureText(hub.word).width;

        const iconSize = 13;
        const paddingX = 9;
        const gap = 5;
        const barW = paddingX * 2 + iconSize + gap + numW + 4 + wordW;
        const barH = 25;
        const barRadius = 12.5;

        const barCX = dotX;
        let barCY = yy >= 0 ? barBottomY - barH / 2 - 4 : barBottomY + barH / 2 + 4;

        // Keep horizontal center zone strictly clean of overlap with the center logo
        const centerClearance = 44;
        if (yy >= 0 && barCY > cy - centerClearance) {
          barCY = cy - centerClearance - barH / 2;
        } else if (yy < 0 && barCY < cy + centerClearance) {
          barCY = cy + centerClearance + barH / 2;
        }

        // Render sleek floating popup bar
        ctx.save();
        ctx.translate(barCX, barCY);
        ctx.scale(scale, scale);
        ctx.translate(-barCX, -barCY);

        const barLeft = barCX - barW / 2;
        const barTop = barCY - barH / 2;

        // Pill bar background
        ctx.beginPath();
        ctx.roundRect(barLeft, barTop, barW, barH, barRadius);

        const barGrad = ctx.createLinearGradient(barLeft, barTop, barLeft, barTop + barH);
        barGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.96})`);
        barGrad.addColorStop(1, `rgba(242, 248, 255, ${alpha * 0.94})`);
        ctx.fillStyle = barGrad;

        ctx.shadowColor = `rgba(10, 132, 255, ${alpha * 0.22})`;
        ctx.shadowBlur = 12;
        ctx.fill();

        // Delicate bar border
        ctx.strokeStyle = `rgba(10, 132, 255, ${alpha * 0.35})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw subtle vector icon matching its popping word
        const iconX = barLeft + paddingX;
        const iconY = barCY - iconSize / 2;
        drawSubtleIcon(ctx, hub.icon, iconX, iconY, iconSize, alpha);

        // Typography: bold number + clean label word
        const textStartX = iconX + iconSize + gap;
        const textBaselineY = barTop + barH * 0.65;

        // Bold number
        ctx.font = "800 11px var(--font-sora), sans-serif";
        ctx.fillStyle = `rgba(10, 20, 40, ${alpha})`;
        ctx.fillText(hub.num, textStartX, textBaselineY);

        // Clean label word
        ctx.font = "600 10px var(--font-inter), sans-serif";
        ctx.fillStyle = `rgba(61, 76, 104, ${alpha * 0.92})`;
        ctx.fillText(hub.word, textStartX + numW + 4, textBaselineY);

        ctx.restore();
      }

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
      {/* Middle center logo with full opacity and clean upper/lower hub clearance */}
      {!hideCenterHub && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-electric bg-white p-2.5 opacity-100 shadow-[0_0_24px_4px_rgba(10,132,255,0.3)] backdrop-blur-md sm:h-16 sm:w-16"
        >
          <Image
            src="/assets/pepoltek/pepoltek_icon.png"
            alt="Pepoltek Core"
            width={34}
            height={34}
            className="h-auto w-auto object-contain opacity-100"
            priority
          />
          <span
            className="absolute inset-[-6px] rounded-full border border-electric-bright/50 opacity-100"
            style={{ animation: "pulse-ring 3s ease-in-out infinite" }}
          />
        </div>
      )}
    </div>
  );
}


