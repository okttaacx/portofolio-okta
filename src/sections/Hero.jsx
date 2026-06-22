import { useEffect, useRef, useState, useCallback } from 'react'
import { profile } from '../data/content'
import './Hero.css'
import ShinyText from '../components/ShinyText'
import { FaReact, FaFigma } from 'react-icons/fa'
import { SiLaravel, SiMysql } from 'react-icons/si'

const techBadges = [
  { name: 'React',   icon: <FaReact /> },
  { name: 'Laravel', icon: <SiLaravel /> },
  { name: 'Figma',   icon: <FaFigma /> },
  { name: 'MySQL',   icon: <SiMysql /> },
]

// ── Typewriter ────────────────────────────────────────────
// FIX #1: Kurangi jumlah state — gabung jadi 1 state object
// + pakai useRef untuk timer supaya tidak bocor
function Typewriter({ text, delay = 0, speed = 100, pause = 2000 }) {
  const [state, setState] = useState({ displayed: '', started: false, isDeleting: false })
  const timerRef = useRef(null)

  useEffect(() => {
    const startTimer = setTimeout(
      () => setState(s => ({ ...s, started: true })),
      delay
    )
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!state.started) return

    const { displayed, isDeleting } = state
    const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current) }

    if (!isDeleting && displayed.length < text.length) {
      timerRef.current = setTimeout(
        () => setState(s => ({ ...s, displayed: text.slice(0, s.displayed.length + 1) })),
        speed
      )
    } else if (!isDeleting && displayed.length === text.length) {
      timerRef.current = setTimeout(
        () => setState(s => ({ ...s, isDeleting: true })),
        pause
      )
    } else if (isDeleting && displayed.length > 0) {
      timerRef.current = setTimeout(
        () => setState(s => ({ ...s, displayed: text.slice(0, s.displayed.length - 1) })),
        speed / 2
      )
    } else if (isDeleting && displayed.length === 0) {
      setState(s => ({ ...s, isDeleting: false }))
    }

    return clearTimer
  }, [state.started, state.displayed, state.isDeleting, text, speed, pause])

  return (
    <span>
      {state.displayed}
      {state.started && <span className="typewriter-cursor">|</span>}
    </span>
  )
}

// ── LoopingChips ──────────────────────────────────────────
// FIX #2: Pause interval saat tab hidden → hemat CPU
// FIX #3: Pause interval saat tidak mounted/visible
function LoopingChips({ badges }) {
  const [visibleIndex, setVisibleIndex] = useState(-1)
  const indexRef     = useRef(-1)
  const intervalRef  = useRef(null)

  const startInterval = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      indexRef.current++
      if (indexRef.current > badges.length + 2) indexRef.current = -1
      setVisibleIndex(indexRef.current)
    }, 400)
  }, [badges.length])

  const stopInterval = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  useEffect(() => {
    startInterval()

    // Pause saat tab hidden
    const handleVisibility = () => {
      if (document.hidden) stopInterval()
      else startInterval()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      stopInterval()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [startInterval, stopInterval])

  return (
    <>
      {badges.map((tech, i) => (
        <span
          key={tech.name}
          className={`hero__tech-chip ${visibleIndex >= i ? 'visible' : ''}`}
          style={{
            opacity:    visibleIndex >= i ? 1 : 0,
            transform:  visibleIndex >= i ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 0.4s ease-out',
            display:    'inline-flex',
            alignItems: 'center',
            gap:        '6px',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', fontSize: '1em' }}>
            {tech.icon}
          </span>
          {tech.name}
        </span>
      ))}
    </>
  )
}

// ── Hero ──────────────────────────────────────────────────
export default function Hero() {
  const [mounted,     setMounted]     = useState(false)
  const [showCVMenu,  setShowCVMenu]  = useState(false)
  // FIX #4: isDark pakai ref → tidak re-render seluruh Hero saat ganti tema
  // ShinyText, foto, dll di-update via direct DOM manipulation atau CSS var
  const isDarkRef    = useRef(false)
  const [isDark,     setIsDark]       = useState(false) // tetap butuh state untuk foto & ShinyText props
  const dropdownRef  = useRef(null)

  useEffect(() => { setMounted(true) }, [])

  // FIX #5: Satu MutationObserver untuk seluruh app sudah ideal,
  // tapi karena komponen ini berdiri sendiri, kita throttle callback-nya
  useEffect(() => {
    const check = () => {
      const dark = document.body.classList.contains('dark-mode')
      if (dark !== isDarkRef.current) {
        isDarkRef.current = dark
        setIsDark(dark) // update state hanya saat benar-benar berubah (bukan setiap mutation)
      }
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // FIX #6: Preload kedua foto profil supaya swap tidak flash
  useEffect(() => {
    const imgs = ['/foto-profil.webp', '/foto-profil-dark.webp']
    imgs.forEach(src => {
      const link = document.createElement('link')
      link.rel  = 'preload'
      link.as   = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCVMenu(false)
      }
    }
    // FIX #7: Pakai capture:false + passive:true untuk click outside
    document.addEventListener('mousedown',  handleClickOutside, { passive: true })
    document.addEventListener('touchstart', handleClickOutside, { passive: true })
    return () => {
      document.removeEventListener('mousedown',  handleClickOutside)
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
            <span className="hero__name-line">
              <ShinyText
                text="Okta Ramji"
                speed={3}
                color={isDark ? '#ffffff' : '#1e3a8a'}
                shineColor={isDark ? '#c084fc' : '#3b82f6'}
                spread={120}
              />
            </span>
            <span className="hero__name-line hero__name-accent">
              <ShinyText
                text="Saputra"
                speed={3}
                delay={0.5}
                color={isDark ? '#a855f7' : '#1d4ed8'}
                shineColor={isDark ? '#ffffff' : '#93c5fd'}
                spread={120}
              />
            </span>
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
                  width="11" height="11" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{
                    transition: 'transform 0.25s ease',
                    transform:  showCVMenu ? 'rotate(180deg)' : 'rotate(0deg)',
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
        {/* FIX #6: Kedua gambar di-render sekaligus, swap via CSS opacity */}
        {/* Tidak ada re-fetch gambar saat ganti tema */}
        <div className={`hero__photo-wrap ${mounted ? 'anim-in' : ''}`} style={{ '--d': '200ms' }}>
          <div className="hero__photo-card">
            <div className="hero__photo-frame">
              <img
                src="/foto-profil.webp"
                alt="Okta Ramji Saputra - Frontend & Fullstack Developer"
                className="hero__photo-img"
                draggable={false}
                style={{ opacity: isDark ? 0 : 1, transition: 'opacity 0.3s ease', position: 'absolute', inset: 0 }}
              />
              <img
                src="/foto-profil-dark.webp"
                alt=""
                aria-hidden="true"
                className="hero__photo-img"
                draggable={false}
                style={{ opacity: isDark ? 1 : 0, transition: 'opacity 0.3s ease', position: 'absolute', inset: 0 }}
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