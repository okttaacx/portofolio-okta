// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'

// Komponen Global & Kursor
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import WaveBackground from './components/OrbBackground'   
import AIAssistant from './components/AIAssistant'
import MusicPlayer from './components/MusicPlayer'

// Import Halaman
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'
import ProjectDetail from './sections/ProjectDetail'

export default function App() {
  return (
    <Router>
      {/* Kursor kustom — paling atas */}
      <CustomCursor />
      <ScrollToTop />

      {/* Wave kaca — fixed background, z-index: 0 */}
      <WaveBackground />

      <Routes>
        {/* HALAMAN UTAMA */}
        <Route path="/" element={
          <main>
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </main>
        } />

        {/* HALAMAN DETAIL PROJECT */}
        <Route path="/project/:id" element={
          <main>
            <ProjectDetail />
          </main>
        } />
      </Routes>

      {/* Komponen Global */}
      <Analytics />
      <AIAssistant />
      <MusicPlayer />
    </Router>
  )
}