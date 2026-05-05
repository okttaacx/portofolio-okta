import { Link } from 'react-router-dom';
import { projects } from '../data/content';
import './Projects.css';

const colorMap = {
  blue:   { bg: 'rgba(226, 235, 245, 0.4)', border: 'rgba(138, 180, 248, 0.4)', accent: '#4A88DA' },
  coral:  { bg: 'rgba(255, 237, 235, 0.4)', border: 'rgba(248, 180, 172, 0.4)', accent: '#E8735A' },
  yellow: { bg: 'rgba(255, 249, 219, 0.4)', border: 'rgba(250, 204, 21,  0.4)', accent: '#EAB308' },
  sage:   { bg: 'rgba(228, 240, 232, 0.4)', border: 'rgba(134, 194, 150, 0.4)', accent: '#5A9E6F' },
};

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Projects</span>
          <h2 className="section-title">Yang Sudah Dibuat</h2>
        </div>

        <div className="projects__grid">
          {projects.map((p, i) => {
            const c = colorMap[p.color] ?? colorMap.blue;
            return (
              <div
                key={p.id}
                className="project-card"
                style={{
                  '--c-bg': c.bg,
                  '--c-border': c.border,
                  '--c-accent': c.accent,
                  animationDelay: `${i * 0.1}s`
                }}
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
                      <span key={s} className="project-card__tag">
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
                        GitHub →
                      </a>
                    )}

                    {p.figma && (
                      <a
                        href={p.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card__btn project-card__btn--figma"
                      >
                        Figma →
                      </a>
                    )}

                    {p.title.includes('Jurnal') ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card__btn project-card__btn--live"
                      >
                        Baca Jurnal ↗
                      </a>
                    ) : (
                      <Link
                        to={`/project/${p.id}`}
                        className="project-card__btn project-card__btn--live"
                      >
                        Lihat Detail
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