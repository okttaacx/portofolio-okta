import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from '../data/content';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === parseInt(id));

  // Mengatur agar saat masuk ke halaman detail, langsung instan ke atas
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'; // Matikan smooth sementara
    window.scrollTo(0, 0); // Instan ke atas
    
    const timeout = setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth'; // Nyalakan lagi
    }, 50);

    return () => clearTimeout(timeout);
  }, [id]);

  // Fungsi khusus agar saat klik "Kembali", langsung INSTAN di tempat semula
  const handleBack = () => {
    document.documentElement.style.scrollBehavior = 'auto'; // Matikan animasi
    navigate(-1); // Mundur secara instan
    
    // Nyalakan kembali animasi scroll untuk keperluan web lainnya
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);
  };

  if (!project) {
    return (
      <div className="container" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <h2>Project tidak ditemukan</h2>
        <span 
          onClick={handleBack} 
          className="back-link"
          style={{ cursor: 'pointer' }}
        >
          ← Kembali ke Beranda
        </span>
      </div>
    );
  }

  return (
    <section className="project-detail animate-fade-in">
      <div className="container">
        
        {/* Tombol kembali utama dengan fungsi handleBack */}
        <span 
          onClick={handleBack} 
          className="back-link"
          style={{ cursor: 'pointer', display: 'inline-block', marginBottom: '1.5rem' }}
        >
          ← Kembali ke Beranda
        </span>

        <div className="detail__grid">
          {/* Kolom Kiri: Info Singkat (Sticky) */}
          <div className="detail__info card" style={{ textAlign: 'left' }}>
            <div className="detail__title-wrapper">
              <span
                className="detail__small-icon"
                dangerouslySetInnerHTML={{ __html: project.icon }}
              />
              <h2 className="detail__title-main">{project.title}</h2>
            </div>
            <p className="detail__subtitle-small">{project.subtitle}</p>

            <hr style={{ margin: '1.25rem 0', opacity: '0.05' }} />

            <h3>Tentang Project</h3>
            <p className="detail__desc-text">{project.description}</p>

            <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1rem' }}>
              Tech Stack:
            </h4>
            <div className="detail__stack">
              {project.stack.map((s) => (
                <span key={s} className="project-card__tag">
                  {s}
                </span>
              ))}
            </div>

            <div className="detail__small-links" style={{ marginTop: '2rem' }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card__btn project-card__btn--gh"
                  style={{ fontSize: '0.8rem', width: '100%', textAlign: 'center' }}
                >
                  Source Code GitHub
                </a>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Daftar Fitur */}
          <div className="detail__features">
            <h3 className="features-title" style={{ textAlign: 'left' }}>Fitur Utama</h3>

            {project.features && project.features.length > 0 ? (
              project.features.map((f, i) => (
                <div key={i} className="feature-item">
                  <div
                    /* 
                       DIPERBAIKI DI SINI: 
                       Sekarang mengecek project.type === 'mobile' 
                    */
                    className={`feature-img-wrapper ${
                      project.type === 'mobile' ? 'mobile-frame' : 'desktop-frame'
                    }`}
                  >
                    <img src={f.img} alt={f.name} />
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
                style={{ textAlign: 'center', color: 'var(--text-light)', padding: '3rem' }}
              >
                🖼️ Gambar fitur akan segera diperbarui.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}