import { profile } from '../data/content'
import './Hero.css'

const techBadges = ['React', 'Laravel', 'Flutter', 'Figma', 'MySQL']

export default function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Catatan: div 'hero__blob' sudah dihapus dari sini karena kita sudah 
        menggunakan efek Ombak Kaca 3D di background global (index.css). 
        Ini membuat rendering React kamu jauh lebih ringan dan bersih!
      */}

      <div className="container hero__inner">
        {/* =======================================
            KOLOM KIRI: TEKS & TOMBOL
        ======================================= */}
        <div className="hero__text">
          <div className="hero__badge animate-fade-up" style={{ animationDelay: '.1s' }}>
            <span className="hero__badge-dot" />
            Available for opportunities
          </div>

          <h1 className="hero__name animate-fade-up" style={{ animationDelay: '.2s' }}>
            Okta Ramji<br />
            <span className="hero__name-accent">Saputra</span>
          </h1>

          <p className="hero__tagline animate-fade-up" style={{ animationDelay: '.3s' }}>
            {profile.tagline}
          </p>
          
          <p className="hero__sub animate-fade-up" style={{ animationDelay: '.4s' }}>
            {profile.taglineSub}
          </p>

          <div className="hero__tech animate-fade-up" style={{ animationDelay: '.5s' }}>
            {techBadges.map(tech => (
              <span key={tech} className="hero__tech-chip">{tech}</span>
            ))}
          </div>

          <div className="hero__ctas animate-fade-up" style={{ animationDelay: '.6s' }}>
            <a href="#projects" className="btn btn--primary">
              Lihat Projects
            </a>
            {/* Tambahan optimasi: atribut download diberi nama file spesifik */}
            <a href="/cv-okta.pdf" className="btn btn--outline" download="CV_Okta_Ramji_Saputra.pdf">
              Download CV
            </a>
          </div>
        </div>

        {/* =======================================
            KOLOM KANAN: KARTU FOTO
        ======================================= */}
        <div className="hero__photo-wrap animate-float">
          <div className="hero__photo-card">
            <div className="hero__photo-frame">
              <img 
                src="/photo.jpg" 
                alt="Okta Ramji Saputra - Frontend & Fullstack Developer" 
                className="hero__photo-img" 
              />
              <div className="hero__photo-fallback">OR</div>
            </div>
          </div>

          {/* Cincin orbit bercahaya */}
          <div className="hero__spin-ring" />
        </div>
      </div>

      {/* =======================================
          SCROLL CUE (INDIKATOR BAWAH)
      ======================================= */}
      <div className="hero__scroll-cue">
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  )
}