import { Link } from 'react-router-dom';
import { projects } from '../data/content';
import './Projects.css';

// --- ICON PANAH BACA JURNAL ---
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

// --- ICON PANAH KANAN (Untuk GitHub, Figma, Detail) ---
const IconArrowRight = () => (
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
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        
        {/* Header Tanpa Animasi */}
        <div className="section-header">
          <span className="section-tag">Projects</span>
          <h2 className="section-title">Yang Sudah Dibuat</h2>
        </div>

        {/* Grid Tanpa Animasi */}
        <div className="projects__grid">
          {projects.map((p) => {
            return (
              <div
                key={p.id}
                className="project-card"
              >
                {/* BAGIAN ATAS: Header, Deskripsi, Highlights */}
                <div className="project-card__content-top">
                  <div className="project-card__header">
                    <div
                      className="project-card__icon"
                      dangerouslySetInnerHTML={{ __html: p.icon }}
                    />
                    <div>
                      <h3 className="project-card__title">{p.title}</h3>
                      <p className="project-card__subtitle">{p.subtitle}</p>
                    </div>
                  </div>

                  <p className="project-card__desc">{p.description}</p>

                  <ul className="project-card__highlights">
                    {p.highlights.map((h) => (
                      <li key={h}>
                        <span className="project-card__bullet" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* BAGIAN BAWAH: Tech Stack & Tombol Links */}
                <div className="project-card__content-bottom">
                  <div className="project-card__stack">
                    {p.stack.map((s) => (
                      <span 
                        key={s} 
                        className="project-card__tag"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="project-card__links">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card__btn project-card__btn--gh"
                      >
                        GitHub <IconArrowRight />
                      </a>
                    )}

                    {p.figma && (
                      <a
                        href={p.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card__btn project-card__btn--figma"
                      >
                        Figma <IconArrowRight />
                      </a>
                    )}

                    {p.title.includes('Jurnal') ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card__btn project-card__btn--live"
                      >
                        Baca Jurnal <IconArrowUpRight />
                      </a>
                    ) : (
                      <Link
                        to={`/project/${p.id}`}
                        className="project-card__btn project-card__btn--live"
                      >
                        Lihat Detail <IconArrowRight />
                      </Link>
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