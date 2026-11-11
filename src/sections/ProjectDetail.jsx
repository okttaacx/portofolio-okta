import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from '../data/content';
import './ProjectDetail.css';

// Icon Arrow Kiri yang Modern & Ramping
const IconArrowLeft = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.4" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

// Icon External Link
const IconExternal = () => (
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
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const project = projects.find((p) => String(p.id) === id);

  // --- KODE PELINDUNG INSTAN SCROLL ---
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const timeout = setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);

    return () => clearTimeout(timeout);
  }, [id]);
  // ------------------------------------

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Tampilan jika project tidak ditemukan (404)
  if (!project) {
    return (
      <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Project Not Found</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
          The project you are looking for does not exist or may have been moved.
        </p>
        <button onClick={handleBack} className="back-link">
          <IconArrowLeft />
          <span>Back to Home</span>
        </button>
      </div>
    );
  }

  return (
    <section className="project-detail animate-fade-in">
      <div className="container">

        {/* Tombol Back to Home (Styling sepenuhnya dikontrol oleh CSS) */}
        <button onClick={handleBack} className="back-link">
          <IconArrowLeft />
          <span>Back to Home</span>
        </button>

        <div className="detail__grid">
          {/* Kolom Kiri: Ringkasan Proyek */}
          <div className="detail__info card" style={{ textAlign: 'left' }}>
            <div className="detail__title-wrapper">
              <span
                className="detail__small-icon"
                dangerouslySetInnerHTML={{ __html: project.icon }}
              />
              <h2 className="detail__title-main">{project.title}</h2>
            </div>
            <p className="detail__subtitle-small">{project.subtitle}</p>

            <hr style={{ margin: '1.25rem 0', opacity: '0.08' }} />

            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Project Overview</h3>
            <p className="detail__desc-text">{project.description}</p>

            <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '0.95rem', opacity: 0.85 }}>
              Technologies Used
            </h4>
            <div className="detail__stack">
              {project.stack.map((s) => (
                <span key={s} className="project-card__tag">
                  {s}
                </span>
              ))}
            </div>

            {/* Link Aksi Eksternal (Live Demo, Research Paper, GitHub, Figma) */}
            {(project.live || project.github || project.figma) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail__action-btn"
                  >
                    <span>
                      {project.title.toLowerCase().includes('jurnal') ? 'Read Paper' : 'Live Preview'}
                    </span>
                    <IconExternal />
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail__action-btn detail__action-btn--secondary"
                  >
                    <span>Source Code</span>
                    <IconExternal />
                  </a>
                )}

                {project.figma && (
                  <a
                    href={project.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail__action-btn detail__action-btn--secondary"
                  >
                    <span>Figma Prototype</span>
                    <IconExternal />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Kolom Kanan: Daftar Fitur */}
          <div className="detail__features">
            <h3 className="features-title" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              Key Features
            </h3>

            {project.features && project.features.length > 0 ? (
              project.features.map((f, i) => (
                <div key={i} className="feature-item">
                  <div
                    className={`feature-img-wrapper ${
                      project.type === 'mobile' ? 'mobile-frame' : 'desktop-frame'
                    }`}
                  >
                    <img src={f.img} alt={f.name} loading="lazy" />
                  </div>
                  <div className="feature-text" style={{ textAlign: 'left' }}>
                    <h4>{f.name}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="card"
                style={{ textAlign: 'center', color: 'var(--text-light)', padding: '3.5rem 2rem' }}
              >
                Feature previews and screenshots will be updated soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}