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
      {/* Titik inti */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#333', // Ubah warna sesuai tema webmu
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
      {/* Cincin luar (dengan animasi CSS ringan) */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '2px solid rgba(51, 51, 51, 0.5)', // Ubah warna sesuai tema webmu
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'transform 0.15s ease-out', // Ini yang bikin efek smooth tanpa JS berat
        }}
      />
    </>
  );
}