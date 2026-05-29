import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Matikan skrip di perangkat mobile/touchscreen
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Sembunyikan kursor asli
    document.body.style.cursor = 'none';

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Dot mengikuti mouse secara instan
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
      
      // Ring mengikuti dengan sedikit delay (efek smooth) via CSS transition
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <style>{`
        /* Warna kursor bawaan (Light Mode) */
        .custom-cursor-dot {
          background-color: #111111; 
          transition: background-color 0.3s ease;
        }
        .custom-cursor-ring {
          border: 2px solid rgba(17, 17, 17, 0.5); 
          /* Transisi transform untuk gerakan, dan warna untuk dark mode */
          transition: border-color 0.3s ease, transform 0.15s ease-out;
        }

        /* ── OVERRIDE SAAT DARK MODE AKTIF ── */
        body.dark-mode .custom-cursor-dot {
          background-color: #F8FAFC; /* Putih terang */
        }
        body.dark-mode .custom-cursor-ring {
          border: 2px solid rgba(248, 250, 252, 0.4); /* Putih transparan */
        }

        /* Pastikan elemen yang bisa di-klik juga menyembunyikan kursor asli */
        a, button, input, textarea {
          cursor: none !important;
        }
      `}</style>

      {/* Titik inti */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
      {/* Cincin luar (dengan animasi CSS ringan) */}
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
        }}
      />
    </>
  );
}