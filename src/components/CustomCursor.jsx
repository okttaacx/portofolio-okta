import { useEffect, useRef } from 'react';

// ─── Utility ────────────────────────────────────────────────────────────────

function starPath(cx, cy, R, r, n = 5, angle = 0) {
  let d = '';
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI / n) * i - Math.PI / 2 + angle;
    const rad = i % 2 === 0 ? R : r;
    d += (i === 0 ? 'M' : 'L') +
      (cx + Math.cos(a) * rad).toFixed(2) + ',' +
      (cy + Math.sin(a) * rad).toFixed(2);
  }
  return d + 'Z';
}

function randRange(a, b) { return a + Math.random() * (b - a); }

// ─── Burst (click explosion) ─────────────────────────────────────────────────

function spawnBurst(bx, by, count = 22) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = randRange(2, 9);
    const el = document.createElement('div');
    const sz = randRange(2, 7);
    const isStar = Math.random() > 0.5;
    const gray = Math.floor(randRange(50, 150)); // dark gray particles
    Object.assign(el.style, {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: '99998',
      width: sz + 'px',
      height: sz + 'px',
      background: `rgb(${gray},${gray},${gray})`,
      borderRadius: isStar ? '2px' : '50%',
      left: bx + 'px',
      top: by + 'px',
      transform: 'translate(-50%,-50%)',
    });
    document.body.appendChild(el);
    parts.push({
      el, x: bx, y: by,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - randRange(1, 3),
      gravity: randRange(0.12, 0.28),
      life: 1, decay: randRange(0.018, 0.04),
    });
  }

  function anim() {
    let alive = false;
    for (const p of parts) {
      if (p.life <= 0) { p.el.style.display = 'none'; continue; }
      alive = true;
      p.vy += p.gravity; p.x += p.vx; p.y += p.vy; p.life -= p.decay;
      p.el.style.left = p.x + 'px';
      p.el.style.top = p.y + 'px';
      p.el.style.opacity = Math.max(0, p.life);
      p.el.style.transform = `translate(-50%,-50%) scale(${0.4 + p.life * 0.6})`;
    }
    if (alive) requestAnimationFrame(anim);
    else parts.forEach(p => p.el.remove());
  }
  requestAnimationFrame(anim);
}

// ─── Trail particle ──────────────────────────────────────────────────────────

function makeTrailParticle() {
  const el = document.createElement('div');
  const size = randRange(3, 7);
  const gray = Math.floor(randRange(60, 160)); // dark gray trail
  Object.assign(el.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '99997',
    borderRadius: '50%',
    transform: 'translate(-50%,-50%)',
    width: size + 'px',
    height: size + 'px',
    background: `rgb(${gray},${gray},${gray})`,
  });
  document.body.appendChild(el);
  return {
    el,
    life: 1,
    decay: randRange(0.05, 0.09),
    vx: randRange(-0.5, 0.5),
    vy: randRange(-0.5, 0.5),
  };
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CustomCursor() {
  const svgRef = useRef(null);
  const rafRef = useRef(null);

  const state = useRef({
    mx: -300, my: -300,
    cx: -300, cy: -300,
    rot: 0,
    hovering: false,
    trail: [],
    lastTrailX: -999,
    lastTrailY: -999,
    TRAIL_MAX: 14,
  });

  // Hide native cursor
  useEffect(() => {
    const style = document.createElement('style');
    style.id = '__magic-cursor-hide__';
    style.textContent = '* { cursor: none !important; }';
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Animation loop
  useEffect(() => {
    const ns = 'http://www.w3.org/2000/svg';
    const s = state.current;

    function drawCursor() {
      const svg = svgRef.current;
      if (!svg) return;
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const { cx, cy, rot, hovering } = s;
      const R = rot * Math.PI / 180;

      // ── Hover rings (dark) ──
      if (hovering) {
        const dashPatterns = ['3 5', '1 6', '5 8'];
        const opacities = [0.25, 0.18, 0.12];
        for (let k = 0; k < 3; k++) {
          const circle = document.createElementNS(ns, 'circle');
          circle.setAttribute('cx', cx);
          circle.setAttribute('cy', cy);
          circle.setAttribute('r', 26 + k * 11);
          circle.setAttribute('fill', 'none');
          circle.setAttribute('stroke', '#555');
          circle.setAttribute('stroke-width', '0.8');
          circle.setAttribute('stroke-dasharray', dashPatterns[k]);
          circle.setAttribute('opacity', opacities[k]);
          circle.setAttribute('transform',
            `rotate(${rot * (k % 2 === 0 ? 1 : -1.3)},${cx},${cy})`);
          svg.appendChild(circle);
        }
        // Orbit dots
        for (let i = 0; i < 6; i++) {
          const a = R + (i / 6) * Math.PI * 2;
          const dot = document.createElementNS(ns, 'circle');
          dot.setAttribute('cx', (cx + Math.cos(a) * 34).toFixed(2));
          dot.setAttribute('cy', (cy + Math.sin(a) * 34).toFixed(2));
          dot.setAttribute('r', '1.5');
          dot.setAttribute('fill', '#555');
          dot.setAttribute('opacity', '0.4');
          svg.appendChild(dot);
        }
      }

      // ── Soft glow (dark) ──
      const glow = document.createElementNS(ns, 'circle');
      glow.setAttribute('cx', cx); glow.setAttribute('cy', cy);
      glow.setAttribute('r', hovering ? 18 : 12);
      glow.setAttribute('fill', 'none');
      glow.setAttribute('stroke', 'rgba(0,0,0,0.06)');
      glow.setAttribute('stroke-width', hovering ? '14' : '8');
      svg.appendChild(glow);

      // ── Main star (dark) ──
      const oR = hovering ? 16 : 10;
      const oIr = hovering ? 7 : 4;
      const outerStar = document.createElementNS(ns, 'path');
      outerStar.setAttribute('d', starPath(cx, cy, oR, oIr, 5, R));
      outerStar.setAttribute('fill', '#333');
      outerStar.setAttribute('opacity', '0.9');
      svg.appendChild(outerStar);

      // ── Inner counter-rotating star ──
      const innerStar = document.createElementNS(ns, 'path');
      innerStar.setAttribute('d', starPath(cx, cy, oR * 0.4, oIr * 0.4, 4, -R * 2));
      innerStar.setAttribute('fill', '#888');
      innerStar.setAttribute('opacity', '0.7');
      svg.appendChild(innerStar);

      // ── Micro sparkles ──
      for (let i = 0; i < 3; i++) {
        const a = -R * 1.5 + (i / 3) * Math.PI * 2;
        const sr = oR + 6;
        const sp = document.createElementNS(ns, 'path');
        sp.setAttribute('d', starPath(
          cx + Math.cos(a) * sr, cy + Math.sin(a) * sr,
          2.5, 1, 4, R * 2
        ));
        sp.setAttribute('fill', '#555');
        sp.setAttribute('opacity', hovering ? '0.45' : '0.2');
        svg.appendChild(sp);
      }
    }

    function tick() {
      s.cx += (s.mx - s.cx) * 0.16;
      s.cy += (s.my - s.cy) * 0.16;
      s.rot += s.hovering ? 1.8 : 0.9;

      // Spawn trail
      if (Math.hypot(s.mx - s.lastTrailX, s.my - s.lastTrailY) > 4) {
        const p = makeTrailParticle();
        s.trail.push(p);
        if (s.trail.length > s.TRAIL_MAX) {
          const old = s.trail.shift();
          old.el.remove();
        }
        s.lastTrailX = s.mx;
        s.lastTrailY = s.my;
      }

      // Update trail
      for (let i = s.trail.length - 1; i >= 0; i--) {
        const p = s.trail[i];
        p.life -= p.decay;
        p.el.style.left = (s.cx + p.vx * 3) + 'px';
        p.el.style.top = (s.cy + p.vy * 3) + 'px';
        p.el.style.opacity = Math.max(0, p.life * 0.45);
        p.el.style.transform = `translate(-50%,-50%) scale(${p.life * 0.8})`;
        if (p.life <= 0) { p.el.remove(); s.trail.splice(i, 1); }
      }

      drawCursor();
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      state.current.trail.forEach(p => p.el.remove());
      state.current.trail = [];
    };
  }, []);

  // Events
  useEffect(() => {
    const onMove = (e) => {
      const s = state.current;
      s.mx = e.clientX;
      s.my = e.clientY;
      s.hovering = !!(e.target.closest('a') || e.target.closest('button'));
    };
    const onClick = (e) => spawnBurst(e.clientX, e.clientY, 22);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'visible',
      }}
      xmlns="http://www.w3.org/2000/svg"
    />
  );
}