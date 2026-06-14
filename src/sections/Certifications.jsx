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

// ── PALET WARNA LIGHT MODE (Satu Warna: Biru) ──
const themeLightBlue = { 
  bg: 'rgba(255, 255, 255, 0.7)', 
  border: 'rgba(59, 130, 246, 0.25)', 
  accent: '#3b82f6' 
};

// ── PALET WARNA DARK MODE (Satu Warna: Ungu) ──
const themeDarkPurple = { 
  bg: 'rgba(15, 23, 42, 0.5)', 
  border: 'rgba(168, 85, 247, 0.3)', 
  accent: '#a855f7' 
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

  // Tentukan warna yang aktif berdasarkan mode
  const activeColor = isDark ? themeDarkPurple : themeLightBlue;

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
            return (
              <div
                key={c.id}
                className="cert-card"
                style={{
                  '--c-bg': activeColor.bg,
                  '--c-border': activeColor.border,
                  '--c-accent': activeColor.accent,
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