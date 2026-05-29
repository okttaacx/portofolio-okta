import { useState, useRef, useEffect } from 'react';
import Groq from 'groq-sdk';
import { profile, skills, projects, experiences, certifications } from '../data/content';

// ── Lazy init — tidak crash kalau env belum ada saat load ─────────────────────
const getGroqClient = () => new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

// ── System prompt dinamis dari data.js ───────────────────────────────────────
const buildSystemPrompt = () => {
  const projectSummary = projects.map((p) => ({
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    stack: p.stack,
    highlights: p.highlights,
    github: p.github || null,
    figma: p.figma || null,
  }));

  const expSummary = experiences.map((e) => ({
    role: e.role,
    company: e.company,
    period: e.period,
    points: e.points,
  }));

  const certSummary = certifications.map((c) => ({
    title: c.title,
    issuer: c.issuer,
    year: c.year,
    description: c.description,
  }));

  return `
Kamu adalah asisten virtual resmi untuk portofolio ${profile.name}.
Tugasmu adalah menjawab pertanyaan dari HRD, Recruiter, atau pengunjung secara profesional, singkat, dan meyakinkan.
Gunakan bahasa Indonesia yang baku namun ramah. Jawab maksimal 3–4 kalimat per respons.
Jika ada pertanyaan di luar pekerjaan, pendidikan, atau portofolio ${profile.name}, tolak dengan sopan.

=== DATA LENGKAP ${profile.name.toUpperCase()} ===

PROFIL:
- Nama: ${profile.name}
- Tagline: ${profile.tagline}
- Lokasi: ${profile.location}
- Email: ${profile.email}
- LinkedIn: ${profile.linkedin}
- GitHub: ${profile.github}
- Tentang: ${profile.about}

KEAHLIAN:
- Programming: ${skills.programming.join(', ')}
- Database: ${skills.database.join(', ')}
- Tools: ${skills.tools.join(', ')}
- Soft Skills: ${skills.soft.join(', ')}

PROYEK:
${JSON.stringify(projectSummary, null, 2)}

PENGALAMAN & ORGANISASI:
${JSON.stringify(expSummary, null, 2)}

SERTIFIKASI & HKI:
${JSON.stringify(certSummary, null, 2)}
  `.trim();
};

// ── Inline styles selaras Projects.css ───────────────────────────────────────
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
    background: '#111111',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.15)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    flexShrink: 0,
  },
  chatBox: {
    width: '340px',
    height: '460px',
    background: 'rgba(240, 240, 240, 0.6)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.85)',
    borderBottom: '1px solid rgba(150,150,150,0.3)',
    borderRight: '1px solid rgba(150,150,150,0.3)',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.12), inset 0 0 25px rgba(255,255,255,0.6)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
  topAccent: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #333333, transparent)',
    opacity: 0.8,
    zIndex: 1,
  },
  header: {
    padding: '14px 18px',
    borderBottom: '1px solid rgba(150,150,150,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
    position: 'relative',
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
    background: '#111111',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: '0.82rem',
    fontWeight: 700,
    color: '#111111',
    margin: 0,
  },
  headerSub: {
    fontSize: '0.70rem',
    color: '#666666',
    margin: 0,
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#666666',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
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
    background: '#111111',
    color: '#ffffff',
    padding: '9px 13px',
    borderRadius: '12px 12px 2px 12px',
    maxWidth: '82%',
    fontSize: '0.80rem',
    lineHeight: 1.6,
  },
  msgAssistant: {
    alignSelf: 'flex-start',
    background: 'rgba(255,255,255,0.75)',
    color: '#111111',
    padding: '9px 13px',
    borderRadius: '12px 12px 12px 2px',
    maxWidth: '82%',
    fontSize: '0.80rem',
    lineHeight: 1.6,
    border: '1px solid rgba(150,150,150,0.25)',
  },
  typing: {
    alignSelf: 'flex-start',
    background: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(150,150,150,0.2)',
    borderRadius: '12px 12px 12px 2px',
    padding: '10px 14px',
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },
  inputArea: {
    padding: '10px 14px',
    borderTop: '1px solid rgba(150,150,150,0.2)',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    zIndex: 2,
    position: 'relative',
  },
  input: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(150,150,150,0.35)',
    background: 'rgba(255,255,255,0.7)',
    fontSize: '0.78rem',
    color: '#111111',
    outline: 'none',
    fontFamily: 'inherit',
  },
  sendBtn: {
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    background: '#111111',
    border: '1px solid #111111',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background 0.2s ease',
  },
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconBot = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>
  </svg>
);

// ── Komponen Utama ────────────────────────────────────────────────────────────
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

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const systemPrompt = buildSystemPrompt();

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
      // Groq client dibuat di sini (lazy) — tidak crash saat halaman load
      const groq = getGroqClient();

      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.5,
        max_tokens: 400,
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
    background: '#666666',
    animation: 'aiBounce 1.2s infinite',
    animationDelay: delay,
  });

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
        .ai-chatbox { animation: aiSlideUp 0.22s ease; transform-origin: bottom right; }
        .ai-toggle-btn:hover { transform: scale(1.08) !important; box-shadow: 0 14px 35px rgba(0,0,0,0.25) !important; }
        .ai-send-btn:hover:not(:disabled) { background: #333333 !important; }
        .ai-input:focus { border-color: rgba(100,100,100,0.5) !important; box-shadow: 0 0 0 2px rgba(0,0,0,0.06) !important; }
        .ai-close-btn:hover { background: rgba(0,0,0,0.06) !important; }
        .ai-messages::-webkit-scrollbar { width: 4px; }
        .ai-messages::-webkit-scrollbar-track { background: transparent; }
        .ai-messages::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
      `}</style>

      <div style={styles.wrapper}>
        {isOpen && (
          <div style={styles.chatBox} className="ai-chatbox">
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