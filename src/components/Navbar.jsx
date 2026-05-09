import { useState, useEffect } from 'react'
import './Navbar.css'

// Menambahkan 'Certifications' di antara Experience dan Contact
const links = ['About', 'Projects', 'Experience', 'Certifications', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-dot" />
          okta.dev
        </a>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map(l => (
            <li key={l}>
              {/* Gunakan split(' ')[0].toLowerCase() jika nanti ada spasi, 
                  tapi karena 'Certifications' 1 kata, ini sudah aman */}
              <a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {l}
              </a>
            </li>
          ))}
          <li>
            <a href="/CV_Okta.pdf" className="navbar__cta" download>
              Download CV
            </a>
          </li>
        </ul>

        <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>
    </nav>
  )
}