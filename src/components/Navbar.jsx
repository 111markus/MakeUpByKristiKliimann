import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { path: '/', label: 'Avaleht' },
  { path: '/hinnakiri', label: 'Hinnakiri' },
  { path: '/galerii', label: 'Galerii' },
  { path: '/kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // On non-home pages, always show solid background
  const showSolidBg = scrolled || !isHome

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolidBg
          ? 'bg-cream/90 backdrop-blur-lg shadow-sm'
          : 'bg-transparent backdrop-blur-none'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Left Logo */}
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity duration-300 flex items-center gap-3 shrink-0"
          >
            <img
              src="/kristi_logo_refined.png"
              alt="Kristi Kliimann"
              className="h-12 lg:h-16 w-auto shrink-0"
            />
            <img
              src="/kristi.png"
              alt="K Logo"
              className={`h-10 w-auto shrink-0 transition-all duration-500 ${
                showSolidBg ? 'brightness-0' : 'brightness-100'
              }`}
            />
          </Link>

          {/* Right side - Navigation and Logo */}
          <div className="flex items-center justify-end gap-8 flex-1">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-widest uppercase font-light transition-colors duration-300 hover:text-rose ${
                    location.pathname === link.path
                      ? 'text-rose'
                      : showSolidBg ? 'text-charcoal' : 'text-cream/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Logo and Button group */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://kkbeauty.setmore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 border-2 border-rose text-rose text-xs tracking-widest uppercase font-medium rounded-sm hover:bg-rose hover:text-cream transition-all duration-300"
              >
                Broneeri aeg
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 ${showSolidBg ? 'text-dark' : 'text-cream'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-cream/98 backdrop-blur-md border-t border-beige"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-sm tracking-widest uppercase font-light transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-rose'
                      : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://kkbeauty.setmore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-8 py-3 border-2 border-rose text-rose text-xs tracking-widest uppercase font-medium rounded-sm hover:bg-rose hover:text-cream transition-all duration-300"
              >
                Broneeri aeg
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
