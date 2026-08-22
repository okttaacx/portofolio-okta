import React, { useState, useRef, useEffect } from 'react';
import Groq from 'groq-sdk';
import { profile, skills, projects, experiences, certifications } from '../data/content';

// ── Lazy init — tidak crash kalau env belum ada saat load ─────────────────────
const getGroqClient = () => new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

// ── System prompt dinamis dari data.js ───────────────────────────────────────
const buildSystemPrompt = () => {
  // Ambil SEMUA detail project, termasuk fitur-fitur di dalamnya,
  // supaya AI bisa menjawab pertanyaan spesifik (mis. "fitur approval-nya gimana?")
  const projectSummary = projects.map((p) => ({
    title: p.title,
    type: p.type || null,
    subtitle: p.subtitle,
    description: p.description,
    stack: p.stack,
    highlights: p.highlights,
    github: p.github || null,
    figma: p.figma || null,
    live: p.live || null,
    features: Array.isArray(p.features) && p.features.length > 0
      ? p.features.map((f) => ({ nama: f.name, deskripsi: f.desc }))
      : null,
  }));

  const expSummary = experiences.map((e) => ({
    role: e.role,
    company: e.company,
    period: e.period,
    tipe: e.type,
    poin: e.points,
  }));

  const certSummary = certifications.map((c) => ({
    title: c.title,
    subtitle: c.subtitle || null,
    issuer: c.issuer,
    year: c.year,
    description: c.description,
    highlights: c.highlights || null,
  }));

  return `
Kamu adalah asisten virtual resmi di website portofolio ${profile.name}.
Kamu berbicara MEWAKILI ${profile.name} kepada HRD, recruiter, atau pengunjung website — bersikap seperti rekan kerja yang mengenal Okta dengan baik, bukan chatbot generik.

ATURAN GAYA JAWABAN:
1. Gunakan Bahasa Indonesia yang natural, sopan, dan percaya diri — bukan kaku seperti membaca CV.
2. Jawaban singkat, padat, maksimal 3–5 kalimat, kecuali diminta detail/rincian (misalnya "sebutkan semua fitur X").
3. Jawab HANYA berdasarkan DATA di bawah ini. Jangan mengarang link, angka, atau fakta yang tidak ada di data.
4. Jika ditanya sesuatu yang datanya tidak tersedia (misalnya gaji, ketersediaan interview, atau info pribadi lain), jawab jujur bahwa informasi itu belum tersedia dan sarankan untuk menghubungi Okta langsung lewat email/LinkedIn yang tercantum.
5. Jika pertanyaan menyebut nama project secara tidak persis (typo/singkatan/bahasa sehari-hari, mis. "yang toko sembako", "yang kendaraan", "yang kesehatan"), cocokkan ke project yang paling relevan di data sebelum menjawab.
6. Jika ditanya soal fitur teknis suatu project, jawab berdasarkan field "features" project tersebut — sebutkan nama fitur dan jelaskan singkat, jangan hanya highlight umum.
7. Jika pertanyaan di luar topik pekerjaan, pendidikan, skill, atau portofolio Okta (misalnya obrolan random, topik sensitif, atau hal tidak relevan), tolak dengan sopan dan arahkan kembali ke topik seputar Okta.
8. Jangan pernah menyebut dirimu sebagai "model AI", "large language model", atau semacamnya — cukup perkenalkan diri sebagai asisten portofolio Okta.
9. Boleh menggunakan sedikit emoji secukupnya (maks 1 per jawaban) agar terasa ramah, tapi jangan berlebihan.

=== DATA LENGKAP ${profile.name.toUpperCase()} ===

PROFIL:
- Nama: ${profile.name}
- Tagline: ${profile.tagline}
- Sub-tagline: ${profile.taglineSub}
- Lokasi: ${profile.location}
- Email: ${profile.email}
- No. HP: ${profile.phone}
- LinkedIn: ${profile.linkedin}
- GitHub: ${profile.github}
- Tentang: ${profile.about}

KEAHLIAN:
- Programming: ${skills.programming.join(', ')}
- Database: ${skills.database.join(', ')}
- Tools: ${skills.tools.join(', ')}
- Soft Skills: ${skills.soft.join(', ')}

PROYEK (lengkap dengan fitur-fitur di dalamnya):
${JSON.stringify(projectSummary, null, 2)}

PENGALAMAN KERJA & ORGANISASI:
${JSON.stringify(expSummary, null, 2)}

SERTIFIKASI & HKI:
${JSON.stringify(certSummary, null, 2)}
  `.trim();
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconBot = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);
const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconSparkle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>
  </svg>
);

// ── KOMPONEN UTAMA AI ASSISTANT ───────────────────────────────────────────────
export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Halo! Saya asisten AI ${profile.name}. Silakan tanyakan seputar keahlian, proyek, atau pengalaman Okta. 👋`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const systemPrompt = buildSystemPrompt();

  // Deteksi Dark Mode secara Real-time
  useEffect(() => {
    setIsDark(document.body.classList.contains('dark-mode'));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.body.classList.contains('dark-mode'));
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Fokus input saat dibuka
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: 'user', content: trimmed };
    const recentHistory = messages.slice(-20);

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const groq = getGroqClient();

      const response = await groq.chat.completions.create({
        model: 'openai/gpt-oss-120b',
        temperature: 0.4,
        max_tokens: 500,
        messages: [
          { role: 'system', content: systemPrompt },
          ...recentHistory,
          userMessage,
        ],
      });

      const aiReply =
        response.choices[0]?.message?.content ||
        'Maaf, sistem AI sedang sibuk. Silakan coba lagi.';

      setMessages((prev) => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (error) {
      console.error('Groq API Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Ups, terjadi gangguan koneksi. Silakan coba lagi.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const typingDot = (delay) => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: isDark ? '#94A3B8' : '#666666',
    animation: 'aiBounce 1.2s infinite',
    animationDelay: delay,
  });

  // ── Dynamic Styles (Light & Dark Mode) ───────────────────────────────────────
  const styles = {
    wrapper: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '12px',
    },
    toggleBtn: {
      width: '52px',
      height: '52px',
      borderRadius: '50%',
      background: isDark ? '#F8FAFC' : '#111111',
      color: isDark ? '#0F172A' : '#ffffff',
      border: isDark ? '1px solid #F8FAFC' : '1px solid rgba(255,255,255,0.15)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
      flexShrink: 0,
    },
    chatBoxWrapper: {
      transformOrigin: 'bottom right',
    },
    chatBox: {
      width: '340px',
      height: '460px',
      background: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: isDark ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(59,130,246,0.2)',
      borderBottom: isDark ? '1px solid rgba(0,0,0,0.4)' : '1px solid rgba(59,130,246,0.1)',
      borderRight: isDark ? '1px solid rgba(0,0,0,0.4)' : '1px solid rgba(59,130,246,0.1)',
      borderRadius: '16px',
      boxShadow: isDark ? '0 15px 40px rgba(0,0,0,0.6), inset 0 0 25px rgba(255,255,255,0.05)' : '0 10px 30px rgba(14, 165, 233, 0.12), inset 0 0 25px rgba(255,255,255,0.6)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      transition: 'all 0.3s ease',
    },
    topAccent: {
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: '3px',
      background: isDark ? 'linear-gradient(90deg, #c084fc, transparent)' : 'linear-gradient(90deg, #0ea5e9, transparent)',
      opacity: 0.8,
      zIndex: 1,
      transition: 'background 0.3s ease',
    },
    header: {
      padding: '14px 18px',
      borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(59,130,246,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 2,
      position: 'relative',
      transition: 'border-color 0.3s ease',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: isDark ? '#7c3aed' : '#3b82f6',
      border: isDark ? '1px solid rgba(255,255,255,0.2)' : 'none',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'all 0.3s ease',
    },
    headerTitle: {
      fontSize: '0.82rem',
      fontWeight: 700,
      color: isDark ? '#F8FAFC' : '#1e40af',
      margin: 0,
      transition: 'color 0.3s ease',
    },
    headerSub: {
      fontSize: '0.70rem',
      color: isDark ? '#94A3B8' : '#475569',
      margin: 0,
      transition: 'color 0.3s ease',
    },
    closeBtn: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: isDark ? '#94A3B8' : '#475569',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
    },
    messagesArea: {
      flex: 1,
      padding: '14px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 2,
      position: 'relative',
    },
    msgUser: {
      alignSelf: 'flex-end',
      background: isDark ? '#7c3aed' : '#3b82f6',
      color: '#ffffff',
      padding: '9px 13px',
      borderRadius: '12px 12px 2px 12px',
      maxWidth: '82%',
      fontSize: '0.80rem',
      lineHeight: 1.6,
      transition: 'all 0.3s ease',
    },
    msgAssistant: {
      alignSelf: 'flex-start',
      background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255,255,255,0.8)',
      color: isDark ? '#F8FAFC' : '#1e40af',
      padding: '9px 13px',
      borderRadius: '12px 12px 12px 2px',
      maxWidth: '82%',
      fontSize: '0.80rem',
      lineHeight: 1.6,
      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(59,130,246,0.2)',
      transition: 'all 0.3s ease',
    },
    typing: {
      alignSelf: 'flex-start',
      background: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255,255,255,0.6)',
      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(59,130,246,0.15)',
      borderRadius: '12px 12px 12px 2px',
      padding: '10px 14px',
      display: 'flex',
      gap: '5px',
      alignItems: 'center',
      transition: 'all 0.3s ease',
    },
    inputArea: {
      padding: '10px 14px',
      borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(59,130,246,0.15)',
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      zIndex: 2,
      position: 'relative',
      transition: 'border-color 0.3s ease',
    },
    input: {
      flex: 1,
      padding: '8px 12px',
      borderRadius: '8px',
      border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(59,130,246,0.3)',
      background: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255,255,255,0.7)',
      fontSize: '0.78rem',
      color: isDark ? '#F8FAFC' : '#1e40af',
      outline: 'none',
      fontFamily: 'inherit',
      transition: 'all 0.3s ease',
    },
    sendBtn: {
      width: '34px',
      height: '34px',
      borderRadius: '8px',
      background: isDark ? '#a855f7' : '#0ea5e9',
      border: 'none',
      color: '#ffffff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'background 0.3s ease',
    },
  };

  return (
    <>
      <style>{`
        @keyframes aiBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes aiSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ai-chatbox-wrapper { animation: aiSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
        .ai-toggle-btn:hover { transform: scale(1.08) !important; box-shadow: 0 14px 35px rgba(0,0,0,0.3) !important; }
        .ai-send-btn:hover:not(:disabled) { opacity: 0.8 !important; }
        .ai-input::placeholder { color: ${isDark ? '#64748B' : '#94a3b8'}; }
        .ai-input:focus { border-color: ${isDark ? 'rgba(168,85,247,0.5)' : 'rgba(14,165,233,0.5)'} !important; box-shadow: 0 0 0 2px ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(14,165,233,0.1)'} !important; }
        .ai-close-btn:hover { background: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.1)'} !important; color: ${isDark ? '#F8FAFC' : '#1e40af'} !important;}
        .ai-messages::-webkit-scrollbar { width: 4px; }
        .ai-messages::-webkit-scrollbar-track { background: transparent; }
        .ai-messages::-webkit-scrollbar-thumb { background: ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(59,130,246,0.2)'}; border-radius: 4px; }
      `}</style>

      <div style={styles.wrapper}>
        {isOpen && (
          <div style={styles.chatBoxWrapper} className="ai-chatbox-wrapper">
            <div style={styles.chatBox}>
              <div style={styles.topAccent} />

              {/* Header */}
              <div style={styles.header}>
                <div style={styles.headerLeft}>
                  <div style={styles.avatar}><IconBot /></div>
                  <div>
                    <p style={styles.headerTitle}>Okta's AI Assistant</p>
                    <p style={styles.headerSub}>Tanya apapun soal Okta ✦</p>
                  </div>
                </div>
                <button
                  style={styles.closeBtn}
                  className="ai-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup"
                >
                  <IconClose />
                </button>
              </div>

              {/* Pesan */}
              <div style={styles.messagesArea} className="ai-messages">
                {messages.map((msg, i) => (
                  <div key={i} style={msg.role === 'user' ? styles.msgUser : styles.msgAssistant}>
                    {msg.content}
                  </div>
                ))}
                {isLoading && (
                  <div style={styles.typing}>
                    <div style={typingDot('0s')} />
                    <div style={typingDot('0.2s')} />
                    <div style={typingDot('0.4s')} />
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div style={styles.inputArea}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tanya keahlian atau proyek Okta..."
                  style={styles.input}
                  className="ai-input"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  style={{
                    ...styles.sendBtn,
                    opacity: isLoading || !input.trim() ? 0.4 : 1,
                    cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                  }}
                  className="ai-send-btn"
                  aria-label="Kirim"
                >
                  <IconSend />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tombol Toggle */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          style={styles.toggleBtn}
          className="ai-toggle-btn"
          aria-label={isOpen ? 'Tutup AI' : 'Buka AI Assistant'}
        >
          {isOpen ? <IconClose /> : <IconSparkle />}
        </button>
      </div>
    </>
  );
}