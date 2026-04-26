import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingOverlay from './components/LoadingOverlay'
import Home from './pages/Home'
import PriceList from './pages/PriceList'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <LoadingOverlay />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hinnakiri" element={<PriceList />} />
          <Route path="/galerii" element={<Gallery />} />
          <Route path="/kontakt" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
