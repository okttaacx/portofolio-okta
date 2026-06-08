import { useRef, useState, useEffect } from 'react'

const playlist = [
  { title: 'Short Meditation', artist: 'Relaxation Music', src: '/bgmusic.mp3' },
  { title: 'Shape of My Heart', artist: 'Backstreet Boys', src: '/bgmusic2.mp3' },
]

const IconMusic = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

const IconPause = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" rx="1.5" />
    <rect x="14" y="4" width="4" height="16" rx="1.5" />
  </svg>
)

const IconPlay = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 4.75C6 4.02 6.8 3.58 7.42 3.97l12.5 7.25a1 1 0 010 1.56l-12.5 7.25C6.8 20.42 6 19.98 6 19.25V4.75z" />
  </svg>
)

const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [rotation, setRotation] = useState(0)
  const animFrameRef = useRef(null)
  const lastTimeRef = useRef(null)

  useEffect(() => {
    setIsDark(document.body.classList.contains('dark-mode'))
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark-mode'))
    })
    observer.observe(document.body, { attributes: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (playing) {
      const animate = (time) => {
        if (lastTimeRef.current !== null) {
          const delta = time - lastTimeRef.current
          setRotation(prev => (prev + delta * 0.06) % 360)
        }
        lastTimeRef.current = time
        animFrameRef.current = requestAnimationFrame(animate)
      }
      animFrameRef.current = requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(animFrameRef.current)
      lastTimeRef.current = null
    }
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [playing])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = playlist[currentIndex].src
    audio.load()
    if (playing) audio.play()
  }, [currentIndex])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause() } else { audio.play() }
    setPlaying(!playing)
  }

  const selectTrack = (i) => {
    if (i === currentIndex) { toggle(); return }
    setCurrentIndex(i)
    setPlaying(true)
  }

  const current = playlist[currentIndex]
  const dark = isDark

  return (
    <>
      <style>{`
        @keyframes mpSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .mp-panel { animation: mpSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
        .mp-track-item:hover {
          background: ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(59,130,246,0.07)'} !important;
        }
        .mp-main-btn:hover { transform: scale(1.1) !important; }
        .mp-close-btn:hover { opacity: 1 !important; }
      `}</style>

      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
      }}>

        {/* Panel playlist */}
        {expanded && (
          <div className="mp-panel" style={{
            width: '230px',
            background: dark ? 'rgba(15,23,42,0.88)' : 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: dark ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(59,130,246,0.2)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: dark
              ? '0 15px 40px rgba(0,0,0,0.6), inset 0 0 25px rgba(255,255,255,0.03)'
              : '0 10px 30px rgba(14,165,233,0.12), inset 0 0 25px rgba(255,255,255,0.6)',
          }}>
            <div style={{
              height: '3px',
              background: dark
                ? 'linear-gradient(90deg, #c084fc, transparent)'
                : 'linear-gradient(90deg, #0ea5e9, transparent)',
            }} />

            {/* Now playing */}
            <div style={{
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderBottom: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(59,130,246,0.1)',
              position: 'relative',
            }}>
              {/* Vinyl */}
              <div style={{
                width: '46px', height: '46px',
                borderRadius: '50%',
                background: dark
                  ? 'radial-gradient(circle, #2d1b69 0%, #1a103d 45%, #0f0a1e 100%)'
                  : 'radial-gradient(circle, #1e40af 0%, #1d4ed8 45%, #1e3a8a 100%)',
                transform: `rotate(${rotation}deg)`,
                flexShrink: 0,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: playing
                  ? (dark ? '0 0 12px rgba(168,85,247,0.5)' : '0 0 12px rgba(14,165,233,0.45)')
                  : '0 2px 6px rgba(0,0,0,0.25)',
              }}>
                {[36, 26, 16].map(s => (
                  <div key={s} style={{
                    position: 'absolute',
                    width: s, height: s,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }} />
                ))}
                <div style={{
                  width: '7px', height: '7px',
                  borderRadius: '50%',
                  background: dark ? '#c084fc' : '#0ea5e9',
                  boxShadow: playing ? `0 0 5px ${dark ? '#c084fc' : '#0ea5e9'}` : 'none',
                  zIndex: 1,
                }} />
              </div>

              <div style={{ overflow: 'hidden', flex: 1 }}>
                <p style={{
                  margin: 0, fontSize: '0.78rem', fontWeight: 700,
                  color: dark ? '#F8FAFC' : '#1e40af',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{current.title}</p>
                <p style={{
                  margin: 0, fontSize: '0.68rem',
                  color: dark ? '#94A3B8' : '#475569',
                }}>{current.artist}</p>
                <p style={{
                  margin: '3px 0 0', fontSize: '0.63rem',
                  color: dark ? '#a855f7' : '#0ea5e9',
                }}>{playing ? '▶ Playing...' : '⏸ Paused'}</p>
              </div>

              {/* Tombol X */}
              <button
                onClick={() => setExpanded(false)}
                className="mp-close-btn"
                title="Tutup"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '22px', height: '22px',
                  borderRadius: '50%',
                  background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(59,130,246,0.08)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: dark ? '#94A3B8' : '#475569',
                  opacity: 0.7,
                  transition: 'opacity 0.2s',
                  padding: 0,
                }}
              >
                <IconClose />
              </button>
            </div>

            {/* Playlist */}
            <div style={{ padding: '6px 0' }}>
              {playlist.map((track, i) => (
                <div
                  key={i}
                  className="mp-track-item"
                  onClick={() => selectTrack(i)}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'background 0.2s',
                    background: i === currentIndex
                      ? (dark ? 'rgba(124,58,237,0.12)' : 'rgba(59,130,246,0.07)')
                      : 'transparent',
                  }}
                >
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                    background: i === currentIndex
                      ? (dark ? '#c084fc' : '#0ea5e9')
                      : (dark ? 'rgba(255,255,255,0.15)' : 'rgba(59,130,246,0.25)'),
                  }} />
                  <div>
                    <p style={{
                      margin: 0, fontSize: '0.75rem',
                      fontWeight: i === currentIndex ? 700 : 400,
                      color: i === currentIndex
                        ? (dark ? '#F8FAFC' : '#1e40af')
                        : (dark ? '#94A3B8' : '#475569'),
                    }}>{track.title}</p>
                    <p style={{
                      margin: 0, fontSize: '0.63rem',
                      color: dark ? '#64748B' : '#94a3b8',
                    }}>{track.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tombol utama */}
        <button
          onClick={() => {
            if (!expanded) {
              setExpanded(true)
            } else {
              toggle()
            }
          }}
          className="mp-main-btn"
          title={!expanded ? 'Buka playlist' : playing ? 'Pause' : 'Play'}
          style={{
            width: '48px', height: '48px',
            borderRadius: '50%',
            background: dark ? 'rgba(15,23,42,0.88)' : 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: dark ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(59,130,246,0.25)',
            color: playing
              ? (dark ? '#c084fc' : '#0ea5e9')
              : (dark ? '#94A3B8' : '#64748b'),
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: playing
              ? (dark ? '0 0 16px rgba(168,85,247,0.35)' : '0 0 16px rgba(14,165,233,0.3)')
              : (dark ? '0 4px 15px rgba(0,0,0,0.4)' : '0 4px 15px rgba(14,165,233,0.12)'),
            transition: 'transform 0.2s ease, box-shadow 0.3s ease, color 0.3s ease',
          }}
        >
          {!expanded ? <IconMusic /> : playing ? <IconPause /> : <IconPlay />}
        </button>

      </div>

      <audio ref={audioRef} src={playlist[currentIndex].src} loop />
    </>
  )
}
