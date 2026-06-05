import React, { useState, useEffect } from 'react';
import { certifications } from '../data/content';
import './Certifications.css';

// Komponen Icon Panah SVG
const IconArrowUpRight = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

// ── PALET WARNA LIGHT MODE (Tema Biru Cerah & Cyan) ──
const colorMapLight = {
  blue:   { bg: 'rgba(255, 255, 255, 0.7)', border: 'rgba(59, 130, 246, 0.25)', accent: '#3b82f6' }, // Bright Blue
  coral:  { bg: 'rgba(255, 255, 255, 0.7)', border: 'rgba(14, 165, 233, 0.25)', accent: '#0ea5e9' }, // Cyan
  yellow: { bg: 'rgba(255, 255, 255, 0.7)', border: 'rgba(37, 99, 235, 0.25)', accent: '#2563eb' }, // Darker Blue
  sage:   { bg: 'rgba(255, 255, 255, 0.7)', border: 'rgba(6, 182, 212, 0.25)', accent: '#06b6d4' }, // Teal
  purple: { bg: 'rgba(255, 255, 255, 0.7)', border: 'rgba(99, 102, 241, 0.25)', accent: '#6366f1' }, // Indigo
};

// ── PALET WARNA DARK MODE (Tema Ungu Elegan) ──
const colorMapDark = {
  blue:   { bg: 'rgba(15, 23, 42, 0.5)', border: 'rgba(139, 92, 246, 0.3)', accent: '#8b5cf6' }, // Violet
  coral:  { bg: 'rgba(15, 23, 42, 0.5)', border: 'rgba(192, 132, 252, 0.3)', accent: '#c084fc' }, // Light Purple
  yellow: { bg: 'rgba(15, 23, 42, 0.5)', border: 'rgba(168, 85, 247, 0.3)', accent: '#a855f7' }, // Purple
  sage:   { bg: 'rgba(15, 23, 42, 0.5)', border: 'rgba(216, 180, 254, 0.3)', accent: '#d8b4fe' }, // Pale Purple
  purple: { bg: 'rgba(15, 23, 42, 0.5)', border: 'rgba(124, 58, 237, 0.3)', accent: '#7c3aed' }, // Deep Purple
};

export default function Certifications() {
  // STATE UNTUK DETEKSI DARK MODE
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Cek awal
    setIsDark(document.body.classList.contains('dark-mode'));

    // Bikin observer kalau-kalau tombol toggle diklik
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.body.classList.contains('dark-mode'));
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Tentukan mana palet warna yang lagi aktif
  const activeColorMap = isDark ? colorMapDark : colorMapLight;

  return (
    <section id="certifications" className="section certifications">
      <div className="container">
        
        {/* Header tanpa animasi */}
        <div className="section-header">
          <span className="section-tag">Licenses & Certifications</span>
          <h2 className="section-title">Sertifikasi & Penghargaan</h2>
        </div>

        {/* Grid tanpa animasi */}
        <div className="certs__grid">
          {certifications.map((c) => {
            const color = activeColorMap[c.color] ?? activeColorMap.purple;
            return (
              <div
                key={c.id}
                className="cert-card"
                style={{
                  '--c-bg': color.bg,
                  '--c-border': color.border,
                  '--c-accent': color.accent,
                }}
              >
                {/* BAGIAN ATAS: Header, Deskripsi, Highlights */}
                <div className="cert-card__content-top">
                  <div className="cert-card__header">
                    <div
                      className="cert-card__icon"
                      dangerouslySetInnerHTML={{ __html: c.icon }}
                    />
                    <div>
                      <h3 className="cert-card__title">{c.title}</h3>
                      <p className="cert-card__subtitle">{c.subtitle}</p>
                    </div>
                  </div>

                  <p className="cert-card__desc">{c.description}</p>

                  <ul className="cert-card__highlights">
                    {c.highlights.map((h) => (
                      <li key={h}>
                        <span className="cert-card__bullet" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* BAGIAN BAWAH: Meta Info & Tombol Links */}
                <div className="cert-card__content-bottom">
                  <div className="cert-card__stack">
                    <span className="cert-card__tag">{c.issuer}</span>
                    <span className="cert-card__tag">{c.year}</span>
                    {c.credentialId && (
                      <span className="cert-card__tag">No: {c.credentialId}</span>
                    )}
                  </div>

                  <div className="cert-card__links">
                    {c.link && (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-card__btn"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        Lihat Dokumen <IconArrowUpRight />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}