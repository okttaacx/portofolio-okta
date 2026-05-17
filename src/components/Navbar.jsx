import { useState, useEffect } from 'react'
import './Navbar.css'

const links = ['About', 'Projects', 'Experience', 'Certifications', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

      {/* Bar atas — selalu terlihat */}
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-dot" />
          okta.dev
        </a>

        {/* Desktop links */}
        <ul className="navbar__links">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
          <li>
            <a href="/CV_Okta.pdf" className="navbar__cta" download>
              Download CV
            </a>
          </li>
        </ul>

        {/* Burger button */}
        <button
          className="navbar__burger"
          onClick={() => setMenuOpen(true)}
          aria-label="Buka menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile panel — geser dari kanan */}
      <div className={`navbar__panel ${menuOpen ? 'navbar__panel--open' : ''}`} aria-hidden={!menuOpen}>
        <button
          className="navbar__close"
          onClick={() => setMenuOpen(false)}
          aria-label="Tutup menu"
        >
          ✕
        </button>
        
        <ul className="navbar__panel-links">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {l}
              </a>
            </li>
          ))}
          <li>
            <a href="/CV_Okta.pdf" className="navbar__cta" download onClick={() => setMenuOpen(false)}>
              Download CV
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay gelap */}
      <div 
        className={`navbar__overlay ${menuOpen ? 'navbar__overlay--open' : ''}`} 
        onClick={() => setMenuOpen(false)} 
      />
    </nav>
  )
}