import { Mesh, Program, Renderer, Triangle, Vec3 } from 'ogl';
import React, { useEffect, useRef } from 'react';

// FIX #1: Style inject sekali di luar komponen, bukan di dalam render
if (typeof document !== 'undefined' && !document.getElementById('orb-bg-style')) {
  const s = document.createElement('style');
  s.id = 'orb-bg-style';
  s.textContent = `
    .orb-bg {
      position: fixed;
      inset: 0;
      z-index: 0;
      overflow: hidden;
      background: transparent;
      pointer-events: none;
    }
    .orb-bg canvas {
      width: 100vw !important;
      height: 100vh !important;
    }
  `;
  document.head.appendChild(s);
}

// FIX #2: Shader string di luar komponen — tidak dibuat ulang tiap render
const vert = /* glsl */ `
  precision highp float;
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  uniform float iTime;
  uniform vec3 iResolution;
  uniform float hover;
  uniform float rot;
  uniform float hoverIntensity;
  uniform vec3 backgroundColor;
  uniform float saturation;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;

  vec3 hash33(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
    p3 += dot(p3, p3.yxz + 19.19);
    return -1.0 + 2.0 * fract(vec3(p3.x + p3.y, p3.x + p3.z, p3.y + p3.z) * p3.zyx);
  }

  float snoise3(vec3 p) {
    const float K1 = 0.333333333;
    const float K2 = 0.166666667;
    vec3 i = floor(p + (p.x + p.y + p.z) * K1);
    vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
    vec3 e = step(vec3(0.0), d0 - d0.yzx);
    vec3 i1 = e * (1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy * (1.0 - e);
    vec3 d1 = d0 - (i1 - K2);
    vec3 d2 = d0 - (i2 - K1);
    vec3 d3 = d0 - 0.5;
    vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
    vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));
    return dot(vec4(31.316), n);
  }

  vec4 extractAlpha(vec3 colorIn) {
    float a = max(max(colorIn.r, colorIn.g), colorIn.b);
    return vec4(colorIn.rgb / (a + 1e-5), a);
  }

  const float innerRadius = 0.6;
  const float noiseScale = 0.65;

  float light1(float intensity, float attenuation, float dist) { return intensity / (1.0 + dist * attenuation); }
  float light2(float intensity, float attenuation, float dist) { return intensity / (1.0 + dist * dist * attenuation); }

  vec4 draw(vec2 uv) {
    vec3 color1 = uColor1;
    vec3 color2 = uColor2;
    vec3 color3 = uColor3;
    
    float ang = atan(uv.y, uv.x);
    float len = length(uv);
    float invLen = len > 0.0 ? 1.0 / len : 0.0;
    float bgLuminance = dot(backgroundColor, vec3(0.299, 0.587, 0.114));
    
    float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
    float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
    float d0 = distance(uv, (r0 * invLen) * uv);
    float v0 = light1(1.0, 10.0, d0);
    v0 *= smoothstep(r0 * 1.05, r0, len);
    float innerFade = smoothstep(r0 * 0.8, r0 * 0.95, len);
    v0 *= mix(innerFade, 1.0, bgLuminance * 0.7);
    float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;
    
    float a = iTime * -1.0;
    vec2 pos = vec2(cos(a), sin(a)) * r0;
    float d = distance(uv, pos);
    float v1 = light2(1.5, 5.0, d);
    v1 *= light1(1.0, 50.0, d0);
    
    float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
    float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
    
    vec3 colBase = mix(color1, color2, cl);
    float fadeAmount = mix(1.0, 0.1, bgLuminance);
    
    vec3 darkCol = mix(color3, colBase, v0);
    darkCol = (darkCol + v1) * v2 * v3;
    darkCol = clamp(darkCol, 0.0, 1.0);
    
    vec3 lightCol = (colBase + v1) * mix(1.0, v2 * v3, fadeAmount);
    lightCol = mix(backgroundColor, lightCol, v0);
    lightCol = clamp(lightCol, 0.0, 1.0);
    
    vec3 finalCol = mix(darkCol, lightCol, bgLuminance);
    
    float luma = dot(finalCol, vec3(0.299, 0.587, 0.114));
    vec3 grayscaleCol = vec3(luma);
    finalCol = mix(grayscaleCol, finalCol, saturation);

    return extractAlpha(finalCol);
  }

  vec4 mainImage(vec2 fragCoord) {
    vec2 center = iResolution.xy * 0.5;
    float size = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord - center) / size * 2.0;
    
    float angle = rot;
    float s = sin(angle);
    float c = cos(angle);
    uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
    
    uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
    uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
    
    return draw(uv);
  }

  void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    vec4 col = mainImage(fragCoord);
    gl_FragColor = vec4(col.rgb * col.a, col.a);
  }
`;

export default function OrbBackground({ hoverIntensity = 0.5 }) {
  const ctnDom   = useRef(null);
  // FIX #3: isDark disimpan di ref, bukan state — tidak trigger re-render
  const isDarkRef = useRef(false);

  // FIX #3 lanjutan: Deteksi dark mode via ref + callback ke uniform langsung
  // Tidak perlu useState → tidak ada re-render saat tema berubah
  const programRef = useRef(null);

  useEffect(() => {
    const checkTheme = () => {
      isDarkRef.current = document.body.classList.contains('dark-mode');
      // Kalau program sudah ada, langsung flag agar RAF update target warna
      // (RAF sudah jalan terus, jadi tidak perlu trigger apa-apa)
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // FIX #4: WebGL setup HANYA sekali — tidak restart saat isDark berubah
  // Dulu dependency [isDark, hoverIntensity] → destroy + rebuild WebGL tiap ganti tema!
  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime:           { value: 0 },
        iResolution:     { value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
        hover:           { value: 0 },
        rot:             { value: 0 },
        hoverIntensity:  { value: hoverIntensity },
        backgroundColor: { value: new Vec3(0, 0, 0) },
        uColor1:         { value: new Vec3(0.612, 0.263, 0.996) },
        uColor2:         { value: new Vec3(0.298, 0.761, 0.914) },
        uColor3:         { value: new Vec3(0.063, 0.078, 0.600) },
        saturation:      { value: 1.0 },
      },
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    // FIX #5: Resize dengan debounce — dulu fire ratusan kali saat resize
    let resizeTimer;
    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!container) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // FIX: cap DPR di 2, tidak perlu >2
        const width  = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width * dpr, height * dpr);
        program.uniforms.iResolution.value.set(
          gl.canvas.width, gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }, 100);
    }
    window.addEventListener('resize', resize);
    resize();

    // FIX #6: Throttle mousemove — dulu update setiap pixel gerakan
    let mouseMoveScheduled = false;
    let targetHover = 0;
    const handleMouseMove = (e) => {
      if (mouseMoveScheduled) return;
      mouseMoveScheduled = true;
      requestAnimationFrame(() => {
        const width   = window.innerWidth;
        const height  = window.innerHeight;
        const size    = Math.min(width, height);
        const uvX     = ((e.clientX - width  / 2) / size) * 2.0;
        const uvY     = ((e.clientY - height / 2) / size) * 2.0;
        targetHover   = Math.sqrt(uvX * uvX + uvY * uvY) < 1.2 ? 1 : 0;
        mouseMoveScheduled = false;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const targetBg = new Vec3();
    const targetC1 = new Vec3();
    const targetC2 = new Vec3();
    const targetC3 = new Vec3();

    let lastTime    = 0;
    let currentRot  = 0;
    const rotSpeed  = 0.3;
    let rafId;

    const update = (t) => {
      rafId = requestAnimationFrame(update);

      // FIX #7: Skip frame saat tab hidden → hemat GPU
      if (document.hidden) {
        lastTime = t;
        return;
      }

      const dt = Math.min((t - lastTime) * 0.001, 0.05); // cap dt supaya tidak lompat
      lastTime = t;

      program.uniforms.iTime.value = t * 0.001;

      // Warna target dibaca dari ref — tidak perlu re-render React
      if (isDarkRef.current) {
        targetBg.set(15/255, 17/255, 21/255);
        targetC1.set(0.612, 0.263, 0.996);
        targetC2.set(0.298, 0.761, 0.914);
        targetC3.set(0.063, 0.078, 0.600);
      } else {
        targetBg.set(1, 1, 1);
        targetC1.set(0.180, 0.490, 0.960);
        targetC2.set(0.300, 0.850, 0.950);
        targetC3.set(0.600, 0.300, 0.950);
      }

      program.uniforms.backgroundColor.value.lerp(targetBg, 0.05);
      program.uniforms.uColor1.value.lerp(targetC1, 0.05);
      program.uniforms.uColor2.value.lerp(targetC2, 0.05);
      program.uniforms.uColor3.value.lerp(targetC3, 0.05);

      program.uniforms.saturation.value += (1.0 - program.uniforms.saturation.value) * 0.1;
      program.uniforms.hover.value += (targetHover - program.uniforms.hover.value) * 0.1;

      if (targetHover > 0.5) currentRot += dt * rotSpeed;
      program.uniforms.rot.value = currentRot;

      renderer.render({ scene: mesh });
    };

    rafId = requestAnimationFrame(update);

    // FIX #7 lanjutan: pause/resume RAF saat tab hidden
    const handleVisibility = () => {
      if (!document.hidden && !rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(update);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      programRef.current = null;
    };
  }, []); // FIX #4: dependency array kosong — setup WebGL hanya SEKALI

  // FIX #8: Update hoverIntensity uniform tanpa restart WebGL
  useEffect(() => {
    if (programRef.current) {
      programRef.current.uniforms.hoverIntensity.value = hoverIntensity;
    }
  }, [hoverIntensity]);

  return <div ref={ctnDom} className="orb-bg" aria-hidden="true" />;
}