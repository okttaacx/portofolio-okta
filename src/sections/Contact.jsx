import { profile } from '../data/content'
import './Contact.css'

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const IconLinkedIn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const IconGitHub = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

const IconLocation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const IconWhatsApp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

export default function Contact() {
  const waNumber = profile.phone.replace(/^0/, '62')
  const waMessage = "Halo Okta, saya melihat web portofolio Anda dan tertarik untuk berdiskusi!"
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact__inner card">

          {/* Efek awan dekoratif tambahan */}
          <div className="contact__cloud contact__cloud--1" />
          <div className="contact__cloud contact__cloud--2" />

          <div className="contact__left">
            <span className="section-tag">Contact</span>
            <h2 className="section-title" style={{ marginTop: '.5rem' }}>Let's Connect!</h2>
            <p className="contact__desc">
              Terbuka untuk peluang kerja, kolaborasi project, atau sekedar ngobrol soal tech.
              Jangan ragu untuk reach out ya!
            </p>
            <div className="contact__links">
              <a href={gmailLink} target="_blank" rel="noopener noreferrer" className="contact__link">
                <span className="contact__link-icon"><IconMail /></span>
                <div>
                  <span className="contact__link-label">Email</span>
                  <span className="contact__link-val">{profile.email}</span>
                </div>
              </a>

              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact__link">
                <span className="contact__link-icon contact__link-icon--linkedin"><IconLinkedIn /></span>
                <div>
                  <span className="contact__link-label">LinkedIn</span>
                  <span className="contact__link-val">{profile.linkedin.split('/in/')[1]?.replace('/', '') || 'oktaramji'}</span>
                </div>
              </a>

              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="contact__link">
                <span className="contact__link-icon contact__link-icon--github"><IconGitHub /></span>
                <div>
                  <span className="contact__link-label">GitHub</span>
                  <span className="contact__link-val">{profile.github.split('.com/')[1] || 'oktaramji'}</span>
                </div>
              </a>
            </div>
          </div>

          <div className="contact__right">
            <div className="contact__card-big">
              <div className="contact__card-cloud" />
              <div className="contact__avatar">OR</div>
              <h3>Okta Ramji Saputra</h3>
              <p className="contact__role">Web Developer • UI/UX Designer</p>
              <p className="contact__location">
                <IconLocation />
                Malang, Jawa Timur
              </p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="contact__wa-btn">
                <IconWhatsApp />
                Kirim WA
              </a>
            </div>
          </div>

        </div>
      </div>

      <footer className="footer">
        <p>© 2026 Okta Ramji Saputra · Dibuat dengan React + Vite · Deploy di Vercel</p>
      </footer>
    </section>
  )
}