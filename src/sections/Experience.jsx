import { experiences, profile } from '../data/content'
import './Experience.css'

const IconGraduate = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)

const IconBriefcase = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12"/>
  </svg>
)

const IconOrg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

// ICON BARU UNTUK KEPANITIAAN (Bendera/Event)
const IconCommittee = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
    <line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
)

const IconBook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)

export default function Experience() {
  // Fungsi bantuan untuk menentukan Icon berdasarkan tipe
  const getBadgeIcon = (type) => {
    if (type === 'org') return <IconOrg />;
    if (type === 'committee') return <IconCommittee />;
    return <IconBriefcase />; // Default untuk 'work'
  };

  // Fungsi bantuan untuk menentukan Teks berdasarkan tipe
  const getBadgeText = (type) => {
    if (type === 'org') return 'Organisasi';
    if (type === 'committee') return 'Kepanitiaan';
    return 'Pekerjaan'; // Default untuk 'work'
  };

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Experience</span>
          <h2 className="section-title">Perjalanan Karir</h2>
        </div>

        <div className="exp__grid">
          {/* Kolom Kiri: Card Terpisah */}
          <div className="exp__timeline">
            {experiences.map((e, i) => (
              <div key={i} className="exp__item">
                <div className="exp__item-header">
                  <div className="exp__item-left">
                    {/* Render Icon dan Teks Dinamis */}
                    <span className="exp__type-badge">
                      {getBadgeIcon(e.type)}
                      {getBadgeText(e.type)}
                    </span>
                    <h3 className="exp__role">{e.role}</h3>
                    <p className="exp__company">{e.company}</p>
                  </div>
                  <span className="exp__period">{e.period}</span>
                </div>

                <ul className="exp__points">
                  {e.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Kolom Kanan: Education Card (Sticky) */}
          <div className="edu__card card">
            <div className="edu__icon-wrap">
              <IconGraduate />
            </div>

            <h3 className="edu__degree">{profile.education.degree}</h3>
            <p className="edu__uni">{profile.education.university}</p>
            <p className="edu__period">{profile.education.period}</p>

            <div className="edu__gpa">
              <span className="edu__gpa-label">IPK</span>
              <span className="edu__gpa-val">{profile.education.gpa}</span>
            </div>

            <div className="edu__thesis">
              <div className="edu__thesis-label">
                <IconBook />
                <span>Skripsi</span>
              </div>
              <p className="edu__thesis-text">{profile.education.thesis}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}