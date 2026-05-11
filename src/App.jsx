import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingOverlay from './components/LoadingOverlay'
import Home from './pages/Home'
import PriceList from './pages/PriceList'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import AdminHomeServices from './pages/AdminHomeServices'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname])
  return null
}

function App() {
  const [adminNavActions, setAdminNavActions] = useState(null)
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-cream">
      <LoadingOverlay />
      <ScrollToTop />
      <Navbar adminActions={adminNavActions} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hinnakiri" element={<PriceList />} />
          <Route path="/galerii" element={<Gallery />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/admin" element={<Admin setAdminNavActions={setAdminNavActions} />} />
          <Route path="/admin/hinnakiri" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/teenused" element={<AdminHomeServices setAdminNavActions={setAdminNavActions} />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  )
}

export default App
