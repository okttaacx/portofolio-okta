import { profile, skills } from '../data/content'
import './About.css'

const skillColors = {
  programming: 'blue',
  database: 'coral',
  tools: 'sage',
  soft: 'amber'
}

const skillLabels = {
  programming: 'Programming',
  database: 'Database',
  tools: 'Tools & Design',
  soft: 'Soft Skills'
}

const skillIcons = {
  programming: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  database: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  tools: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  soft: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

// IconGraduate sudah tidak dipakai, jadi bisa dihapus atau dibiarkan
// Aku biarkan saja siapa tahu nanti mau dipakai lagi

const IconLocation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">Siapa Okta?</h2>
        </div>

        <div className="about__grid">
          <div className="about__text card">
            <p className="about__bio">{profile.about}</p>
            <div className="about__meta">
              {/* Bagian Pendidikan Dihapus */}
              
              <div className="about__meta-item">
                <span className="about__meta-icon"><IconLocation /></span>
                <div>
                  <strong>Lokasi</strong>
                  <span>{profile.location}</span>
                </div>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-icon"><IconMail /></span>
                <div>
                  <strong>Email</strong>
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about__skills">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className={`skill-group card skill-group--${skillColors[cat]}`}>
                <h4 className="skill-group__label">
                  <span className="skill-group__icon">{skillIcons[cat]}</span>
                  {skillLabels[cat]}
                </h4>
                <div className="skill-group__chips">
                  {items.map(s => (
                    <span key={s} className="skill-chip">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}