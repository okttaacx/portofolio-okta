// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

// Komponen Global & Kursor
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import WaveBackground from './components/WaveBackground'   // ← tambah ini

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
          <>
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </>
        } />

        {/* HALAMAN DETAIL PROJECT */}
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  )
}