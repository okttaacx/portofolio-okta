import { experiences } from '../data/content'
import './Experience.css'

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

const IconCommittee = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
    <line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
)

export default function Experience() {
  const getBadgeIcon = (type) => {
    if (type === 'org') return <IconOrg />;
    if (type === 'committee') return <IconCommittee />;
    return <IconBriefcase />;
  };

  const getBadgeText = (type) => {
    if (type === 'org') return 'Organisasi';
    if (type === 'committee') return 'Kepanitiaan';
    return 'Pekerjaan';
  };

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Experience</span>
          <h2 className="section-title">Perjalanan Karir</h2>
        </div>

        {/* ✅ Card langsung jadi anak grid, tidak dibungkus exp__timeline */}
        <div className="exp__grid">
          {experiences.map((e, i) => (
            <div key={i} className="exp__item">
              <div className="exp__item-header">
                <div className="exp__item-left">
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

      </div>
    </section>
  )
}