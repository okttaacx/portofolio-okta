import './About.css'
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaFigma, FaGithub, FaGitAlt, FaPhp, FaAngular, FaVuejs,
} from 'react-icons/fa'
import {
  SiLaravel, SiMongodb, SiMysql,
  SiCanva, SiPhpmyadmin, SiCodeigniter, SiTypescript, SiNestjs,  SiPostgresql,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

const iconMap = {
  'HTML':          <FaHtml5 />,
  'CSS':           <FaCss3Alt />,
  'JavaScript':    <FaJs />,
  'TypeScript':    <SiTypescript />,
  'Vue.js':        <FaVuejs />,
  'React.js':      <FaReact />,
  'Angular':       <FaAngular />,
  'Node.js':       <FaNodeJs />,
  'NestJS':        <SiNestjs />,
  'PHP (Laravel)': <FaPhp />,
  'Laravel':       <SiLaravel />,
  'CodeIgniter':   <SiCodeigniter />,
  'PostgreSQL':    <SiPostgresql />,
  'MySQL':         <SiMysql />,
  'phpMyAdmin':    <SiPhpmyadmin />,
  'MongoDB':       <SiMongodb />,
  'Figma':         <FaFigma />,
  'Canva':         <SiCanva />,
  'Git':           <FaGitAlt />,
  'GitHub':        <FaGithub />,
  'VS Code':       <VscCode />,
}

const row1Skills = [
  { name: 'TypeScript',    cls: 'sp-blue'  },
  { name: 'Vue.js',        cls: 'sp-sage'  },
  { name: 'React.js',      cls: 'sp-blue'  },
  { name: 'Angular',       cls: 'sp-coral' },
  { name: 'JavaScript',    cls: 'sp-blue'  },
  { name: 'HTML',          cls: 'sp-blue'  },
  { name: 'CSS',           cls: 'sp-coral' },
  { name: 'Figma',         cls: 'sp-amber' },
  { name: 'Canva',         cls: 'sp-amber' },
  { name: 'GitHub',        cls: 'sp-blue'  },
  { name: 'VS Code',       cls: 'sp-sage'  },
]

const row2Skills = [
  { name: 'NestJS',        cls: 'sp-coral' },
  { name: 'PostgreSQL',    cls: 'sp-blue'  },
  { name: 'Node.js',       cls: 'sp-sage'  },
  { name: 'PHP (Laravel)', cls: 'sp-sage'  },
  { name: 'Laravel',       cls: 'sp-amber' },
  { name: 'CodeIgniter',   cls: 'sp-sage'  },
  { name: 'MySQL',         cls: 'sp-coral' },
  { name: 'phpMyAdmin',    cls: 'sp-coral' },
  { name: 'MongoDB',       cls: 'sp-sage'  },
  { name: 'Git',           cls: 'sp-amber' },
  { name: 'TypeScript',    cls: 'sp-blue'  },
]

function Pill({ name, cls }) {
  return (
    <span className={`sp ${cls}`}>
      <span className="pill-icon">
        {iconMap[name] ?? <span className="dot" />}
      </span>
      {name}
    </span>
  )
}

function StarBorder({ children, className = '', speed = '6s' }) {
  return (
    <div className={`star-border-container ${className}`}>
      <div
        className="border-gradient-bottom"
        style={{ animationDuration: speed }}
      />
      <div
        className="border-gradient-top"
        style={{ animationDuration: speed }}
      />
      <div className="star-inner-content card">
        {children}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">

        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Hi, I'm <span className="title-accent">Okta</span>
          </h2>
        </div>

        <StarBorder className="ab-bio-card" speed="5s">
          <p className="about__bio">
           Focused on Fullstack Web Development, with experience in developing web applications across both frontend and backend. Proficient in technologies such as Laravel, CodeIgniter 4, React.js, Vue.js, Angular, Node.js, and NestJS, as well as database management using MySQL, PostgreSQL, and MongoDB. Experienced in building information systems, e-commerce applications, and integrating RESTful APIs through professional projects and internships. Adaptable, solution-oriented, and capable of working independently or collaboratively to deliver functional, responsive, and user-centered web applications.
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