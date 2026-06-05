import './About.css'

const row1Skills = [
  { name: 'HTML',          cls: 'sp-blue'  },
  { name: 'CSS',           cls: 'sp-coral' },
  { name: 'JavaScript',    cls: 'sp-blue'  },
  { name: 'PHP (Laravel)', cls: 'sp-sage'  },
  { name: 'React.js',      cls: 'sp-blue'  },
  { name: 'Node.js',       cls: 'sp-sage'  },
  { name: 'Figma',         cls: 'sp-amber' },
  { name: 'Canva',         cls: 'sp-amber' },
  { name: 'GitHub',        cls: 'sp-blue'  },
  { name: 'VS Code',       cls: 'sp-sage'  },
]

const row2Skills = [
  { name: 'MySQL',         cls: 'sp-coral' },
  { name: 'phpMyAdmin',    cls: 'sp-coral' },
  { name: 'MongoDB',       cls: 'sp-sage'  },
  { name: 'Git',           cls: 'sp-amber' },
  { name: 'HTML',          cls: 'sp-blue'  },
  { name: 'CSS',           cls: 'sp-coral' },
  { name: 'JavaScript',    cls: 'sp-blue'  },
  { name: 'React.js',      cls: 'sp-blue'  },
  { name: 'Node.js',       cls: 'sp-sage'  },
  { name: 'Laravel',       cls: 'sp-amber' },
]

function Pill({ name, cls }) {
  return (
    <span className={`sp ${cls}`}>
      <span className="dot" />
      {name}
    </span>
  )
}

// ── KOMPONEN STAR BORDER INTERNAL ─────────────────────────────────────────────
function StarBorder({ children, className = '', speed = '6s' }) {
  return (
    <div className={`star-border-container ${className}`}>
      <div 
        className="border-gradient-bottom" 
        style={{ animationDuration: speed }}
      ></div>
      <div 
        className="border-gradient-top" 
        style={{ animationDuration: speed }}
      ></div>
      {/* Menggabungkan style StarBorder dengan Glass Card bawaan */}
      <div className="star-inner-content card">
        {children}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">

        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Halo, saya <span className="title-accent">Okta</span>
          </h2>
        </div>

        {/* Membungkus deskripsi dengan efek StarBorder */}
        <StarBorder className="ab-bio-card" speed="5s">
          <p className="about__bio">
            Berfokus pada Web Development, Frontend Development, dan UI/UX Design.
            Berpengalaman mengembangkan aplikasi web menggunakan Laravel, React.js,
            dan Node.js, serta merancang UI/UX modern dan user-friendly menggunakan
            Figma. Memiliki pengalaman internship di Dinas Tenaga Kerja Kota Batu
            dalam pengembangan sistem berbasis Laravel dan pengelolaan data pelatihan.
            Adaptif, berorientasi pada solusi, dan mampu bekerja secara mandiri
            maupun dalam tim untuk menciptakan produk digital yang fungsional dan responsif.
          </p>
        </StarBorder>

        <div className="mq-section">
          <div className="mq-label">
            <span>Tech Stack</span>
          </div>

          <div className="mq-gap">
            <div className="mq-track">
              <div className="mq-row mq-row-1">
                {[...row1Skills, ...row1Skills, ...row1Skills].map((s, i) => (
                  <Pill key={i} name={s.name} cls={s.cls} />
                ))}
              </div>
            </div>
          </div>

          <div className="mq-track">
            <div className="mq-row mq-row-2">
              {[...row2Skills, ...row2Skills, ...row2Skills].map((s, i) => (
                <Pill key={i} name={s.name} cls={s.cls} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}