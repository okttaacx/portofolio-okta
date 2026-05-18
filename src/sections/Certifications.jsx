import React from 'react';
import { certifications } from '../data/content';
import './Certifications.css';

// Komponen Icon Panah SVG untuk menggantikan karakter Unicode ↗
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

// Nama properti tetap sama agar tidak error dengan data di content.js
// Tapi semua nilainya diubah menjadi variasi skala monokrom
const colorMap = {
  blue:   { bg: 'rgba(240, 240, 240, 0.4)', border: 'rgba(150, 150, 150, 0.4)', accent: '#333333' },
  coral:  { bg: 'rgba(245, 245, 245, 0.4)', border: 'rgba(160, 160, 160, 0.4)', accent: '#444444' },
  yellow: { bg: 'rgba(250, 250, 250, 0.4)', border: 'rgba(180, 180, 180, 0.4)', accent: '#555555' },
  sage:   { bg: 'rgba(235, 235, 235, 0.4)', border: 'rgba(140, 140, 140, 0.4)', accent: '#222222' },
  purple: { bg: 'rgba(230, 230, 230, 0.4)', border: 'rgba(120, 120, 120, 0.4)', accent: '#111111' }, // Tambahan untuk HKI
};

export default function Certifications() {
  return (
    <section id="certifications" className="section certifications">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Licenses & Certifications</span>
          <h2 className="section-title">Sertifikasi & Penghargaan</h2>
        </div>

        <div className="certs__grid">
          {certifications.map((c, i) => {
            const color = colorMap[c.color] ?? colorMap.purple;
            return (
              <div
                key={c.id}
                className="cert-card"
                style={{
                  '--c-bg': color.bg,
                  '--c-border': color.border,
                  '--c-accent': color.accent,
                  animationDelay: `${i * 0.1}s`
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