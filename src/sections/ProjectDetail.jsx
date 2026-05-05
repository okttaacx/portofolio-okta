import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react'; // Tambahkan ini
import { projects } from '../data/content';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const project = projects.find((p) => String(p.id) === id);

  // --- KODE PELINDUNG INSTAN SCROLL ---
  useEffect(() => {
    // 1. Matikan smooth scroll di HTML
    document.documentElement.style.scrollBehavior = 'auto';
    
    // 2. Paksa layar pindah ke kordinat paling atas (0,0) secara instan
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 3. Kembalikan efek smooth setelah 50ms agar web tetap enak dilihat
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

  if (!project) {
    return (
      <div className="container" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <h2>Project tidak ditemukan</h2>
        <span onClick={handleBack} className="back-link" style={{ cursor: 'pointer' }}>
          ← Kembali ke Beranda
        </span>
      </div>
    );
  }

  return (
    <section className="project-detail animate-fade-in">
      <div className="container">

        <span
          onClick={handleBack}
          className="back-link"
          style={{ cursor: 'pointer', display: 'inline-block', marginBottom: '1.5rem' }}
        >
          ← Kembali ke Beranda
        </span>

        <div className="detail__grid">
          {/* Kolom Kiri: Info Singkat */}
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
          </div>

          {/* Kolom Kanan: Daftar Fitur */}
          <div className="detail__features">
            <h3 className="features-title" style={{ textAlign: 'left' }}>Fitur Utama</h3>

            {project.features && project.features.length > 0 ? (
              project.features.map((f, i) => (
                <div key={i} className="feature-item">
                  <div
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