import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/content'
import './Hero.css'

const techBadges = ['React', 'Laravel', 'Figma', 'MySQL']

function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return mounted
}

function Typewriter({ text, delay = 0, speed = 100, pause = 2000 }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let timer
    if (!isDeleting && displayed.length < text.length) {
      timer = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed)
    } else if (!isDeleting && displayed.length === text.length) {
      timer = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(text.slice(0, displayed.length - 1)), speed / 2)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
    }
    return () => clearTimeout(timer)
  }, [started, displayed, isDeleting, text, speed, pause])

  return (
    <span>
      {displayed}
      {started && <span className="typewriter-cursor">|</span>}
    </span>
  )
}

function LoopingChips({ badges }) {
  const [visibleIndex, setVisibleIndex] = useState(-1)

  useEffect(() => {
    let index = -1
    const interval = setInterval(() => {
      index++
      if (index > badges.length + 2) index = -1
      setVisibleIndex(index)
    }, 400)
    return () => clearInterval(interval)
  }, [badges.length])

  return (
    <>
      {badges.map((tech, i) => (
        <span
          key={tech}
          className={`hero__tech-chip ${visibleIndex >= i ? 'visible' : ''}`}
          style={{
            opacity: visibleIndex >= i ? 1 : 0,
            transform: visibleIndex >= i ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 0.4s ease-out'
          }}
        >
          {tech}
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const mounted = useMounted()
  const dropdownRef = useRef(null)
  const [showCVMenu, setShowCVMenu] = useState(false)

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (document.body.classList.contains('dark-mode')) {
      setIsDark(true)
    }
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.body.classList.contains('dark-mode'))
        }
      })
    })
    observer.observe(document.body, { attributes: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCVMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  return (
    <section id="hero" className="hero">

      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__lines" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="container hero__inner">

        {/* ═══ KOLOM KIRI ═══ */}
        <div className="hero__text">

          <div className={`hero__badge ${mounted ? 'anim-in' : ''}`} style={{ '--d': '0ms' }}>
            <span className="hero__badge-dot" />
            Available for opportunities
          </div>

          <h1 className={`hero__name ${mounted ? 'anim-in' : ''}`} style={{ '--d': '120ms' }}>
            <span className="hero__name-line">Okta Ramji</span>
            <span className="hero__name-line hero__name-accent">Saputra</span>
          </h1>

          <div className={`hero__divider ${mounted ? 'anim-in' : ''}`} style={{ '--d': '300ms' }} />

          <p className={`hero__tagline ${mounted ? 'anim-in' : ''}`} style={{ '--d': '380ms', minHeight: '1.5em' }}>
            <Typewriter text={profile.tagline || "Web Developer • UI/UX Designer"} delay={500} speed={100} pause={3000} />
          </p>

          <p className={`hero__sub ${mounted ? 'anim-in' : ''}`} style={{ '--d': '420ms' }}>
            {profile.taglineSub}
          </p>

          <div className={`hero__tech ${mounted ? 'anim-in' : ''}`} style={{ '--d': '520ms' }}>
            <LoopingChips badges={techBadges} />
          </div>

          {/* ═══ CTA ═══ */}
          <div className={`hero__ctas ${mounted ? 'anim-in' : ''}`} style={{ '--d': '720ms' }}>

            <a href="#projects" className="btn btn--primary hero__cta-btn">
              <span>Lihat Projects</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            <div className="hero__cv-wrapper" ref={dropdownRef}>
              <button
                className="btn btn--outline hero__cta-btn"
                onClick={() => setShowCVMenu(prev => !prev)}
                aria-expanded={showCVMenu}
                aria-haspopup="true"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                <span>Download CV</span>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transition: 'transform 0.25s ease',
                    transform: showCVMenu ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {showCVMenu && (
                <div className="hero__cv-dropdown">
                  <a
                    href="/CV_Okta_ID.pdf"
                    download="CV_Okta_Ramji_Saputra_ID.pdf"
                    className="hero__cv-option"
                    onClick={() => setShowCVMenu(false)}
                  >
                    <span>🇮🇩</span>
                    <span>Versi Indonesia</span>
                  </a>

                  <a
                    href="/CV_Okta_EN.pdf"
                    download="CV_Okta_Ramji_Saputra_EN.pdf"
                    className="hero__cv-option"
                    onClick={() => setShowCVMenu(false)}
                  >
                    <span>🇬🇧</span>
                    <span>English Version</span>
                  </a>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* ═══ KOLOM KANAN: FOTO ═══ */}
        <div className={`hero__photo-wrap ${mounted ? 'anim-in' : ''}`} style={{ '--d': '200ms' }}>
          <div className="hero__photo-card">
            <div className="hero__photo-frame">
              <img
                src={isDark ? "/foto-profil-dark.jpeg" : "/foto-profil.jpeg"}
                alt="Okta Ramji Saputra - Frontend & Fullstack Developer"
                className="hero__photo-img"
                draggable={false}
              />
              <div className="hero__photo-fallback">OR</div>
            </div>
          </div>
        </div>

      </div>

      <div className={`hero__scroll-cue ${mounted ? 'anim-in' : ''}`} style={{ '--d': '1100ms' }}>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <div className="hero__scroll-chevrons" aria-hidden="true">
          <span /><span /><span />
        </div>
        <span className="hero__scroll-label">scroll</span>
      </div>

    </section>
  )
}