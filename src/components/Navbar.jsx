import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import './Navbar.css'

const links = ['About', 'Projects', 'Experience', 'Certifications', 'Contact']

/* ── Variants Animasi untuk Mobile Menu ── */
const mobileMenuVariants = {
  closed: { x: '100%', transition: { type: 'spring', damping: 25, stiffness: 200 } },
  open: { 
    x: 0, 
    transition: { 
      type: 'spring', 
      damping: 25, 
      stiffness: 200,
      staggerChildren: 0.1,
      delayChildren: 0.2
    } 
  }
}

const mobileItemVariants = {
  closed: { x: 50, opacity: 0 },
  open: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false) // State untuk menyembunyikan navbar

  /* ── State Dark Mode ── */
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) return savedTheme === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const { scrollY } = useScroll()

  // Logika mendeteksi arah scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Deteksi apakah sudah di-scroll dari puncak (untuk efek glassmorphism)
    if (latest > 40) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Logika Hide on Scroll Down, Show on Scroll Up
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Efek mematikan scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Efek mengaktifkan Dark Mode di tag <body>
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  /* ── Komponen Toggle Switch (Menggunakan SVG) ── */
  const ToggleSwitch = () => (
    <div 
      className="navbar__switch"
      onClick={() => setDarkMode(!darkMode)}
      style={{ justifyContent: darkMode ? 'flex-end' : 'flex-start' }}
    >
      <motion.div 
        className="navbar__switch-handle" 
        layout 
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {darkMode ? (
          // SVG Moon Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        ) : (
          // SVG Sun Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        )}
      </motion.div>
    </div>
  )

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: hidden ? -100 : 0, 
        opacity: hidden ? 0 : 1 
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
    >
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-dot" />
          okta.dev
        </a>

        {/* ── Desktop links ── */}
        <ul className="navbar__links">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
        </ul>

        {/* ── Container Kanan (Toggle + Burger) ── */}
        <div className="navbar__actions">
          <div className="navbar__desktop-toggle">
            <ToggleSwitch />
          </div>

          <button
            className="navbar__burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Buka menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* ── Mobile panel & Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              className="navbar__overlay navbar__overlay--open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)} 
            />

            <motion.div 
              className="navbar__panel navbar__panel--open"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              aria-hidden={!menuOpen}
            >
              {/* Header Mobile Panel */}
              <div className="navbar__panel-header">
                <ToggleSwitch />
                <button
                  className="navbar__close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Tutup menu"
                >
                  ✕
                </button>
              </div>
              
              <ul className="navbar__panel-links">
                {links.map(l => (
                  <motion.li key={l} variants={mobileItemVariants}>
                    <a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                      {l}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}