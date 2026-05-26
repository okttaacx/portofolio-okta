// src/components/WaveBackground.jsx
// npm install framer-motion

import { motion } from 'framer-motion';
import React from 'react';

const styleTag = `
  .wave-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
    background: #f8f9fa;
  }

  .shimmer-layer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      transparent 0%,
      transparent 30%,
      rgba(255,255,255,0.6) 42%,
      rgba(255,255,255,0.8) 45%,
      rgba(255,255,255,0.6) 48%,
      transparent 60%,
      transparent 100%
    );
    background-size: 300% 100%;
    animation: shimmerMove 12s ease-in-out infinite;
  }

  .wave-svg-top {
    position: absolute;
    top: -2px; left: -5%;
    width: 110%; height: 380px;
  }
  .wave-svg-bot {
    position: absolute;
    bottom: -2px; left: -5%;
    width: 110%; height: 380px;
    transform: rotate(180deg);
  }

  /* Layer paling belakang — abu gelap, kesan kedalaman/bayangan */
  .wt-l5 { fill: rgba(180, 185, 195, 0.40); }

  /* Layer 4 */
  .wt-l4 { fill: rgba(200, 205, 212, 0.50); }

  /* Layer 3 — mid */
  .wt-l3 { fill: rgba(220, 223, 228, 0.65); }

  /* Layer 2 — terang */
  .wt-l2 { fill: rgba(238, 240, 243, 0.82); }

  /* Layer 1 — PUTIH, paling depan, ada drop shadow abu tipis */
  .wt-l1 {
    fill: rgba(255, 255, 255, 1);
    filter: drop-shadow(0 6px 18px rgba(140, 148, 165, 0.28))
            drop-shadow(0 2px 4px rgba(140, 148, 165, 0.15));
  }

  /* Spekuler — garis putih terang di puncak */
  .wt-edge {
    fill: none;
    stroke: rgba(255, 255, 255, 1);
    stroke-width: 2.5;
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 1));
  }

  /* Shadow tipis di balik puncak — kesan lekukan 3D */
  .wt-shadow {
    fill: none;
    stroke: rgba(120, 130, 150, 0.12);
    stroke-width: 8;
    filter: blur(4px);
  }

  @keyframes shimmerMove {
    0%   { background-position: 200% 0; }
    50%  { background-position: -50% 0; }
    100% { background-position: 200% 0; }
  }
`;

const P = {
  l5:     "M-100,0 C80,160 260,240 500,140 C720,50  940,210 1160,130 C1340,65  1440,170 1540,110 L1540,0 L-100,0 Z",
  l4:     "M-100,0 C60,180 300,110 550,175 C760,235 980,80  1200,155 C1360,215 1450,95  1540,135 L1540,0 L-100,0 Z",
  l3:     "M-100,0 C100,145 320,255 560,155 C780,60  1000,230 1200,145 C1360,80  1440,195 1540,130 L1540,0 L-100,0 Z",
  l2:     "M-100,0 C50,175 240,100 480,170 C700,240 920,70  1140,155 C1310,220 1430,85  1540,140 L1540,0 L-100,0 Z",
  l1:     "M-100,0 C70,200 280,115 520,185 C740,255 960,85  1180,165 C1340,225 1440,105 1540,155 L1540,0 L-100,0 Z",
  shadow: "M-100,10 C70,210 280,125 520,195 C740,265 960,95  1180,175 C1340,235 1440,115 1540,165",
};

const waveAnims = [
  { y: [0, -22, 0], x: [0, -3, 0], dur: 6  },
  { y: [0, -16, 0], x: [0,  4, 0], dur: 8  },
  { y: [0, -20, 0], x: [0, -2, 0], dur: 10 },
  { y: [0, -14, 0], x: [0,  3, 0], dur: 13 },
  { y: [0, -18, 0], x: [0, -4, 0], dur: 16 },
];

const waveKeys    = ['l1', 'l2', 'l3', 'l4', 'l5'];
const waveClasses = ['wt-l1', 'wt-l2', 'wt-l3', 'wt-l4', 'wt-l5'];

export default function WaveBackground() {
  return (
    <>
      <style>{styleTag}</style>
      <div className="wave-bg" aria-hidden="true">

        <div className="shimmer-layer" />

        {/* ══ WAVE ATAS ══ */}
        <svg className="wave-svg-top" viewBox="0 0 1440 380"
          xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">

          {waveKeys.map((k, i) => (
            <motion.path
              key={`top-${k}`}
              className={waveClasses[i]}
              d={P[k]}
              animate={{ y: waveAnims[i].y, x: waveAnims[i].x }}
              transition={{ duration: waveAnims[i].dur, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          <motion.path
            className="wt-shadow"
            d={P.shadow}
            animate={{ y: waveAnims[0].y, x: waveAnims[0].x }}
            transition={{ duration: waveAnims[0].dur, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.path
            className="wt-edge"
            d={P.l1}
            animate={{ y: waveAnims[0].y, x: waveAnims[0].x }}
            transition={{ duration: waveAnims[0].dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* ══ WAVE BAWAH ══ */}
        <svg className="wave-svg-bot" viewBox="0 0 1440 380"
          xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">

          {waveKeys.map((k, i) => (
            <motion.path
              key={`bot-${k}`}
              className={waveClasses[i]}
              d={P[k]}
              animate={{ y: waveAnims[i].y, x: waveAnims[i].x.map(v => -v) }}
              transition={{ duration: waveAnims[i].dur * 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          <motion.path
            className="wt-shadow"
            d={P.shadow}
            animate={{ y: waveAnims[0].y, x: waveAnims[0].x.map(v => -v) }}
            transition={{ duration: waveAnims[0].dur * 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.path
            className="wt-edge"
            d={P.l1}
            animate={{ y: waveAnims[0].y, x: waveAnims[0].x.map(v => -v) }}
            transition={{ duration: waveAnims[0].dur * 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

      </div>
    </>
  );
}