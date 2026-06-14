import { useRef, useState, useEffect, useCallback } from 'react'

const playlist = [
  { title: 'Short Meditation', artist: 'Relaxation Music', src: '/bgmusic.mp3' },
  { title: 'Shape of My Heart', artist: 'Backstreet Boys', src: '/bgmusic2.mp3' },
]

// ── Icons ─────────────────────────────────────────────────
const IcoMusic = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
    stroke="rgba(255,255,255,0.92)" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.3))' }}>
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
)
const IcoPlay = () => (
  <svg width="19" height="19" viewBox="0 0 24 24"
    fill="rgba(255,255,255,0.92)"
    style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.3))' }}>
    <path d="M7 4.75C7 3.82 8.04 3.28 8.8 3.82l10 6.7a1 1 0 010 1.66l-10 6.7C7.04 19.42 7 18.88 7 18.25V4.75z"/>
  </svg>
)
const IcoPause = () => (
  <svg width="19" height="19" viewBox="0 0 24 24"
    fill="rgba(255,255,255,0.92)"
    style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.3))' }}>
    <rect x="5" y="4" width="4" height="16" rx="1.5"/>
    <rect x="15" y="4" width="4" height="16" rx="1.5"/>
  </svg>
)
const IcoClose = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <line x1="1" y1="1" x2="9" y2="9"/>
    <line x1="9" y1="1" x2="1" y2="9"/>
  </svg>
)

// ── Bola bouncing canvas ──────────────────────────────────
function makeBalls(isDark, size) {
  const light = ['#3b82f6','#60a5fa','#93c5fd','#1d4ed8','#2563eb','#bfdbfe']
  const dark  = ['#c084fc','#a855f7','#e879f9','#818cf8','#9333ea','#d8b4fe']
  const c = isDark ? dark : light
  return [
    { x: 0.38*size, y: 0.28*size, vx:  1.5, vy:  1.0, r: 5.5, color: c[0] },
    { x: 0.62*size, y: 0.52*size, vx: -1.2, vy:  1.4, r: 4.0, color: c[1] },
    { x: 0.48*size, y: 0.68*size, vx:  0.8, vy: -1.6, r: 3.5, color: c[2] },
    { x: 0.22*size, y: 0.58*size, vx:  1.7, vy: -0.8, r: 3.0, color: c[3] },
    { x: 0.72*size, y: 0.28*size, vx: -0.9, vy:  1.3, r: 6.0, color: c[4] },
    { x: 0.50*size, y: 0.42*size, vx:  1.1, vy:  0.9, r: 2.5, color: c[5] },
  ]
}

function BouncingBalls({ playing, size = 52, isDark }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const ballsRef  = useRef(null)
  const lastRef   = useRef(null)
  const stateRef  = useRef({ playing, isDark })

  useEffect(() => { stateRef.current = { playing, isDark } }, [playing, isDark])

  // Reset bola saat tema berubah
  useEffect(() => {
    ballsRef.current = makeBalls(isDark, size)
  }, [isDark, size])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const R = size / 2
    const cx = R, cy = R

    if (!ballsRef.current) ballsRef.current = makeBalls(isDark, size)

    const tick = (t) => {
      const { playing: p } = stateRef.current
      const dt = lastRef.current ? Math.min((t - lastRef.current) / 16, 2.5) : 1
      lastRef.current = t

      ctx.clearRect(0, 0, size, size)
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R - 0.5, 0, Math.PI * 2)
      ctx.clip()

      const speed = p ? 1 : 0.12

      ballsRef.current = ballsRef.current.map(b => {
        let { x, y, vx, vy, r, color } = b
        x += vx * speed * dt
        y += vy * speed * dt
        const dx = x - cx, dy = y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist + r > R - 1) {
          const nx = dx / dist, ny = dy / dist
          const dot = vx * nx + vy * ny
          vx -= 2 * dot * nx
          vy -= 2 * dot * ny
          const ov = dist + r - (R - 1)
          x -= nx * ov
          y -= ny * ov
        }
        // Soft glow gradient
        const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.05, x, y, r)
        g.addColorStop(0, color + 'ff')
        g.addColorStop(0.6, color + 'bb')
        g.addColorStop(1, color + '22')
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
        return { x, y, vx, vy, r, color }
      })

      ctx.restore()
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastRef.current = null
    }
  }, [size])

  return (
    <canvas ref={canvasRef} width={size} height={size}
      style={{ borderRadius: '50%', display: 'block' }}/>
  )
}

// ── Main ──────────────────────────────────────────────────
export default function MusicPlayer() {
  const audioRef   = useRef(null)
  const ringRafRef = useRef(null)
  const ringLast   = useRef(null)

  const [playing,      setPlaying]      = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expanded,     setExpanded]     = useState(false)
  const [ringDeg,      setRingDeg]      = useState(0)
  const [isDark,       setIsDark]       = useState(false)

  // Deteksi dark mode dari class website (bukan OS)
  useEffect(() => {
    const check = () =>
      setIsDark(
        document.documentElement.classList.contains('dark') ||
        document.body.classList.contains('dark-mode') ||
        document.body.classList.contains('dark')
      )
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    obs.observe(document.body,            { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // Ring berputar lambat — pakai ref untuk speed supaya tidak restart RAF
  const playingRef = useRef(playing)
  useEffect(() => { playingRef.current = playing }, [playing])

  useEffect(() => {
    const tick = (t) => {
      if (ringLast.current !== null) {
        const speed = playingRef.current ? 0.038 : 0.010
        setRingDeg(prev => (prev + (t - ringLast.current) * speed) % 360)
      }
      ringLast.current = t
      ringRafRef.current = requestAnimationFrame(tick)
    }
    ringRafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(ringRafRef.current)
      ringLast.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = playlist[currentIndex].src
    audio.load()
    if (playing) audio.play().catch(() => {})
  }, [currentIndex])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else          { audio.play().catch(() => {}); setPlaying(true) }
  }, [playing])

  const selectTrack = (i) => {
    if (i === currentIndex) { togglePlay(); return }
    setCurrentIndex(i)
    setPlaying(true)
  }

  // ── Token warna — selaras dengan tema biru/ungu website ──
  const accent  = isDark ? '#a855f7'              : '#3b82f6'
  const accent2 = isDark ? 'rgba(168,85,247,0.28)': 'rgba(59,130,246,0.22)'
  const bg      = isDark ? 'rgba(15,23,42,0.88)'  : 'rgba(255,255,255,0.88)'
  const border  = isDark ? 'rgba(124,58,237,0.3)' : 'rgba(59,130,246,0.18)'
  const shadow  = isDark
    ? '0 12px 36px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)'
    : '0 10px 30px rgba(59,130,246,0.13), 0 2px 8px rgba(0,0,0,0.05)'
  const glow    = isDark
    ? '0 0 0 3px rgba(168,85,247,0.18)'
    : '0 0 0 3px rgba(59,130,246,0.14)'
  const tp      = isDark ? '#F8FAFC' : '#1e3a8a'
  const tm      = isDark ? '#94A3B8' : '#64748b'
  const tActive = isDark ? 'rgba(124,58,237,0.1)' : 'rgba(59,130,246,0.06)'
  const canvBg  = isDark ? '#0a0614'              : '#dbeafe'

  const current = playlist[currentIndex]

  return (
    <>
      <style>{`
        @keyframes mp-pop {
          from { opacity:0; transform:scale(0.84) translateY(12px); }
          to   { opacity:1; transform:scale(1)    translateY(0); }
        }
        @keyframes mp-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:.35; transform:scale(.65); }
        }
        @keyframes mp-ripple {
          0%   { transform:scale(1);   opacity:.38; }
          100% { transform:scale(1.85); opacity:0; }
        }
        .mp-panel  { animation: mp-pop .22s cubic-bezier(0.34,1.52,0.64,1) both; }
        .mp-track  { transition: background .15s; }
        .mp-track:hover { opacity:.82; }
        .mp-fab    { transition: transform .18s, box-shadow .25s; }
        .mp-fab:hover  { transform: scale(1.07) !important; }
        .mp-fab:active { transform: scale(0.94) !important; }
        @media (max-width: 480px) {
          .mp-panel { width: calc(100vw - 52px) !important; max-width: 265px !important; }
        }
      `}</style>

      <div style={{
        position: 'fixed', bottom: 24, left: 24, zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
      }}>

        {/* ── Panel ── */}
        {expanded && (
          <div className="mp-panel" style={{
            width: 236,
            background: bg,
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: `1px solid ${border}`,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: shadow,
          }}>
            {/* accent line */}
            <div style={{ height: 2.5, background: `linear-gradient(90deg,${accent},transparent)`, opacity: .85 }}/>

            {/* now playing */}
            <div style={{
              padding: '13px 13px 11px',
              display: 'flex', alignItems: 'center', gap: 11,
              borderBottom: `1px solid ${border}`,
              position: 'relative',
            }}>
              {/* Mini canvas bola */}
              <div style={{
                width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                background: canvBg,
                border: `1px solid ${border}`,
                overflow: 'hidden',
              }}>
                <BouncingBalls playing={playing} size={48} isDark={isDark}/>
              </div>

              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: tp, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3 }}>
                  {current.title}
                </div>
                <div style={{ fontSize: 11, color: tm, marginTop: 2, lineHeight: 1.3 }}>
                  {current.artist}
                </div>
                <div style={{ fontSize: 10, color: accent, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {playing && (
                    <div style={{
                      width: 5, height: 5, borderRadius: '50%', background: accent, flexShrink: 0,
                      animation: 'mp-pulse 1.2s ease-in-out infinite',
                    }}/>
                  )}
                  {playing ? 'Playing...' : 'Paused'}
                </div>
              </div>

              <button onClick={() => setExpanded(false)} aria-label="Close player"
                style={{
                  position: 'absolute', top: 9, right: 9,
                  width: 22, height: 22, borderRadius: '50%',
                  border: `1px solid ${border}`,
                  background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(59,130,246,0.07)',
                  cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: tm, transition: 'opacity .15s',
                }}>
                <IcoClose/>
              </button>
            </div>

            {/* playlist */}
            <div style={{ padding: '5px 0 4px' }}>
              {playlist.map((track, i) => {
                const active = i === currentIndex
                return (
                  <div key={i} className="mp-track" onClick={() => selectTrack(i)}
                    style={{
                      padding: '7px 13px',
                      display: 'flex', alignItems: 'center', gap: 9,
                      cursor: 'pointer',
                      background: active ? tActive : 'transparent',
                    }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                      background: active ? accent : accent2,
                      transform: active ? 'scale(1.4)' : 'scale(1)',
                      transition: 'all .2s',
                    }}/>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{
                        fontSize: 12.5, lineHeight: 1.3,
                        fontWeight: active ? 700 : 400,
                        color: active ? tp : tm,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>{track.title}</div>
                      <div style={{ fontSize: 10, color: tm, opacity: .6 }}>{track.artist}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── FAB ── */}
        <div style={{ position: 'relative', width: 52, height: 52 }}>

          {/* Ring dashed berputar — tanpa background apa-apa */}
          <div style={{
            position: 'absolute',
            inset: -6,
            borderRadius: '50%',
            border: `1.5px dashed ${accent}`,
            opacity: isDark ? 0.5 : 0.45,
            transform: `rotate(${ringDeg}deg)`,
            pointerEvents: 'none',
          }}/>

          {/* Ripple saat playing */}
          {playing && (
            <div style={{
              position: 'absolute', inset: -2, borderRadius: '50%',
              border: `1.5px solid ${accent}`,
              animation: 'mp-ripple 2.2s ease-out infinite',
              pointerEvents: 'none',
            }}/>
          )}

          {/* Button utama */}
          <button
            className="mp-fab"
            onClick={() => !expanded ? setExpanded(true) : togglePlay()}
            aria-label={!expanded ? 'Open playlist' : playing ? 'Pause' : 'Play'}
            style={{
              width: 52, height: 52, borderRadius: '50%',
              /* Tidak ada background solid — canvas yang jadi tampilan */
              background: canvBg,
              border: `1px solid ${border}`,
              boxShadow: playing ? `${shadow}, ${glow}` : shadow,
              cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', position: 'relative',
            }}>
            {/* Canvas bola */}
            <BouncingBalls playing={playing} size={52} isDark={isDark}/>

            {/* Icon mengambang di atas bola — TANPA background gelap */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%',
              /* Tidak ada background sama sekali */
            }}>
              {!expanded
                ? <IcoMusic/>
                : playing
                ? <IcoPause/>
                : <IcoPlay/>
              }
            </div>
          </button>
        </div>
      </div>

      <audio ref={audioRef} src={playlist[currentIndex].src} loop/>
    </>
  )
}