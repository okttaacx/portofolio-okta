import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import ScrollToTop from './components/ScrollToTop'
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
      <ScrollToTop />
      <Routes>
        {/* HALAMAN UTAMA (Beranda) */}
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

        {/* HALAMAN KHUSUS DETAIL PROJECT */}
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  )
}