import React, { useState, useRef, useEffect } from 'react';
import { profile, skills, projects, experiences, certifications } from '../data/content';

// ── Strict English & Token-Optimized System Prompt ───────────────────────────
const buildSystemPrompt = () => {
  const projectsText = projects.map(p => 
    `• ${p.title} (${p.stack?.join(', ') || ''}): ${p.description} ` +
    (p.features ? `Key features: ${p.features.map(f => `${f.name} - ${f.desc}`).join('; ')}` : '')
  ).join('\n');

  const expText = experiences.map(e => 
    `• ${e.role} at ${e.company} (${e.period}): ${e.points?.join('; ') || ''}`
  ).join('\n');

  const certText = certifications.map(c => 
    `• ${c.title} by ${c.issuer} (${c.year}): ${c.description}`
  ).join('\n');

  return `
You are the official portfolio AI assistant representing ${profile.name}.
You speak on behalf of ${profile.name} to recruiters, engineering managers, and portfolio visitors.

PRIMARY DIRECTIVE:
- ALWAYS RESPOND EXCLUSIVELY IN ENGLISH. Even if the user types or greets you in Indonesian or any other language, you MUST formulate your entire response in clear, polished, and professional English.

CORE RULES:
1. TONE & LENGTH:
   - Concise and impactful: 2 to 3 sentences maximum, unless the user explicitly requests an in-depth explanation.
   - Professional, articulate, and welcoming.
2. STRICT TRUTHFULNESS:
   - Answer ONLY using the candidate data provided below. Never fabricate links, salary numbers, or unverified achievements.
   - If asked about information not found in the data, state it politely and invite them to connect with Okta directly via Email (${profile.email}) or LinkedIn.
3. SCOPE MANAGEMENT:
   - Politely decline non-portfolio or off-topic queries and steer the conversation back to Okta's software engineering background.
   - Never refer to yourself as an "AI language model by OpenAI/Meta". You are simply Okta's portfolio assistant.

CANDIDATE DATA:
Name: ${profile.name} | Role: ${profile.role || profile.taglineSub} | Location: ${profile.location}
Email: ${profile.email} | Phone: ${profile.phone}
LinkedIn: ${profile.linkedin} | GitHub: ${profile.github}
Bio: ${profile.about}
Skills: ${skills.programming.join(', ')} | DB: ${skills.database.join(', ')} | Tools: ${skills.tools.join(', ')}

PROJECTS & CORE FEATURES:
${projectsText}

EXPERIENCE & LEADERSHIP:
${expText}

CERTIFICATIONS & HONORS:
${certText}
  `.trim();
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconBot = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconSparkle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>
  </svg>
);

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I'm ${profile.name}'s virtual assistant. Feel free to ask me anything about Okta's projects, tech stack, or background! 👋`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const systemPrompt = buildSystemPrompt();

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: trimmed },
        { 
          role: 'assistant', 
          content: 'API key is not configured. Please verify VITE_GROQ_API_KEY in your .env file and restart the development server.' 
        },
      ]);
      setInput('');
      return;
    }

    const userMessage = { role: 'user', content: trimmed };
    // Keep last 6 messages to stay well beneath Groq token limits
    const recentHistory = messages.slice(-6);

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          temperature: 0.5,
          max_tokens: 350,
          messages: [
            { role: 'system', content: systemPrompt },
            ...recentHistory,
            userMessage,
          ],
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('RATE_LIMIT');
        }
        const errJson = await res.json().catch(() => ({}));
        throw new Error(`Groq HTTP Error ${res.status}: ${JSON.stringify(errJson)}`);
      }

      const data = await res.json();
      const aiReply =
        data.choices?.[0]?.message?.content ||
        "I'm sorry, I couldn't formulate a response. Please try asking again!";

      setMessages((prev) => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (error) {
      console.error('Groq Error Detail:', error);
      
      const errorMessage = error.message === 'RATE_LIMIT'
        ? '⏳ Messages are being sent too quickly. Please wait 5-10 seconds before asking again!'
        : 'Oops, unable to connect to the assistant right now. Please try again later or reach out to Okta directly!';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: errorMessage },
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
    background: isDark ? '#94A3B8' : '#64748b',
    animation: 'aiBounce 1.2s infinite',
    animationDelay: delay,
  });

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
      width: '345px',
      height: '460px',
      background: isDark ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: isDark ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(59,130,246,0.25)',
      borderRadius: '16px',
      boxShadow: isDark ? '0 15px 40px rgba(0,0,0,0.6)' : '0 10px 30px rgba(14, 165, 233, 0.15)',
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
      opacity: 0.9,
      zIndex: 1,
    },
    header: {
      padding: '14px 18px',
      borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(59,130,246,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 2,
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
      background: isDark ? '#a855f7' : '#2563eb',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    headerTitle: {
      fontSize: '0.82rem',
      fontWeight: 700,
      color: isDark ? '#F8FAFC' : '#1e40af',
      margin: 0,
    },
    headerSub: {
      fontSize: '0.70rem',
      color: isDark ? '#94A3B8' : '#64748b',
      margin: 0,
    },
    closeBtn: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: isDark ? '#94A3B8' : '#64748b',
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
    },
    msgUser: {
      alignSelf: 'flex-end',
      background: isDark ? '#9333ea' : '#2563eb',
      color: '#ffffff',
      padding: '9px 13px',
      borderRadius: '12px 12px 2px 12px',
      maxWidth: '82%',
      fontSize: '0.80rem',
      lineHeight: 1.6,
    },
    msgAssistant: {
      alignSelf: 'flex-start',
      background: isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255,255,255,0.85)',
      color: isDark ? '#F8FAFC' : '#1e293b',
      padding: '9px 13px',
      borderRadius: '12px 12px 12px 2px',
      maxWidth: '85%',
      fontSize: '0.80rem',
      lineHeight: 1.6,
      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(59,130,246,0.2)',
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
    },
    inputArea: {
      padding: '10px 14px',
      borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(59,130,246,0.15)',
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      zIndex: 2,
    },
    input: {
      flex: 1,
      padding: '8px 12px',
      borderRadius: '8px',
      border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(59,130,246,0.3)',
      background: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255,255,255,0.7)',
      fontSize: '0.78rem',
      color: isDark ? '#F8FAFC' : '#1e293b',
      outline: 'none',
      fontFamily: 'inherit',
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
      transition: 'opacity 0.2s ease',
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
        .ai-send-btn:hover:not(:disabled) { opacity: 0.85 !important; }
        .ai-input::placeholder { color: ${isDark ? '#64748B' : '#94a3b8'}; }
        .ai-input:focus { border-color: ${isDark ? 'rgba(168,85,247,0.6)' : 'rgba(14,165,233,0.6)'} !important; }
        .ai-close-btn:hover { background: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.1)'} !important; }
        .ai-messages::-webkit-scrollbar { width: 4px; }
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
                    <p style={styles.headerSub}>Ask anything about Okta ✦</p>
                  </div>
                </div>
                <button
                  style={styles.closeBtn}
                  className="ai-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Assistant"
                >
                  <IconClose />
                </button>
              </div>

              {/* Messages Area */}
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

              {/* Input Area */}
              <div style={styles.inputArea}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Okta's skills, projects..."
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
                  aria-label="Send message"
                >
                  <IconSend />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          style={styles.toggleBtn}
          className="ai-toggle-btn"
          aria-label={isOpen ? 'Close Assistant' : 'Open AI Assistant'}
        >
          {isOpen ? <IconClose /> : <IconSparkle />}
        </button>
      </div>
    </>
  );
}