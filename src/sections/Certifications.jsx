import React from 'react';
import { certifications } from '../data/content';
import './Certifications.css';

const colorMap = {
  blue:   { bg: 'rgba(226, 235, 245, 0.4)', border: 'rgba(138, 180, 248, 0.4)', accent: '#4A88DA' },
  coral:  { bg: 'rgba(255, 237, 235, 0.4)', border: 'rgba(248, 180, 172, 0.4)', accent: '#E8735A' },
  yellow: { bg: 'rgba(255, 249, 219, 0.4)', border: 'rgba(250, 204, 21,  0.4)', accent: '#EAB308' },
  sage:   { bg: 'rgba(228, 240, 232, 0.4)', border: 'rgba(134, 194, 150, 0.4)', accent: '#5A9E6F' },
  purple: { bg: 'rgba(243, 232, 255, 0.4)', border: 'rgba(216, 180, 254, 0.4)', accent: '#A855F7' }, // Tambahan untuk HKI
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
                      >
                        Lihat Dokumen ↗
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