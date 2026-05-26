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
  const [hidden, setHidden] = useState(false) // State baru untuk menyembunyikan navbar

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
      // Scroll ke BAWAH dan sudah melewati 150px -> Sembunyikan
      setHidden(true);
    } else {
      // Scroll ke ATAS atau di paling atas -> Tampilkan
      setHidden(false);
    }
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <motion.nav 
      // Animasi masuk awal (mount) dan animasi sembunyi saat scroll
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: hidden ? -100 : 0, 
        opacity: hidden ? 0 : 1 
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
    >
      {/* ── Bar atas — selalu terlihat ── */}
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
          <li>
            {/* Animasi scale saat tombol hover/tap */}
            <motion.a 
              href="/CV_Okta.pdf" 
              className="navbar__cta" 
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.a>
          </li>
        </ul>

        {/* ── Burger button ── */}
        <button
          className="navbar__burger"
          onClick={() => setMenuOpen(true)}
          aria-label="Buka menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile panel & Overlay (Pakai AnimatePresence agar exit animation jalan) ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay gelap */}
            <motion.div 
              className="navbar__overlay navbar__overlay--open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)} 
            />

            {/* Panel geser dari kanan */}
            <motion.div 
              className="navbar__panel navbar__panel--open"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              aria-hidden={!menuOpen}
            >
              <button
                className="navbar__close"
                onClick={() => setMenuOpen(false)}
                aria-label="Tutup menu"
              >
                ✕
              </button>
              
              <ul className="navbar__panel-links">
                {links.map(l => (
                  <motion.li key={l} variants={mobileItemVariants}>
                    <a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                      {l}
                    </a>
                  </motion.li>
                ))}
                <motion.li variants={mobileItemVariants}>
                  <a href="/CV_Okta.pdf" className="navbar__cta" download onClick={() => setMenuOpen(false)}>
                    Download CV
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
    </motion.nav>
  )
}