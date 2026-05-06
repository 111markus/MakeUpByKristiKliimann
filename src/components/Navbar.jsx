import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { path: '/', label: 'Avaleht' },
  { path: '/hinnakiri', label: 'Hinnakiri' },
  { path: '/galerii', label: 'Galerii' },
  { path: '/kontakt', label: 'Kontakt' },
]

const adminLinks = [
  { path: '/admin/hinnakiri', label: 'Hinnakiri' },
  { path: '/admin/teenused', label: 'Teenused' },
]

const MotionDiv = motion.div

export default function Navbar({ adminActions }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isAdmin = location.pathname.startsWith('/admin')
  const showAdminActions = isAdmin && adminActions
  const showSolidBg = scrolled || !isHome

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderActionButtons = () => (
    showAdminActions ? (
      <>
        <button
          type="button"
          disabled={adminActions.busy}
          onClick={adminActions.onSave}
          className="w-full md:w-auto px-7 py-3 bg-rose text-cream text-xs tracking-widest uppercase font-medium rounded-sm hover:bg-dark transition-all duration-300 disabled:opacity-60"
        >
          Salvesta
        </button>
        <button
          type="button"
          disabled={adminActions.busy}
          onClick={adminActions.onLogout}
          className="w-full md:w-auto px-7 py-3 border-2 border-rose text-rose text-xs tracking-widest uppercase font-medium rounded-sm hover:bg-dark hover:border-dark hover:text-cream transition-all duration-300 disabled:opacity-60"
        >
          Logi välja
        </button>
        {adminActions.username && (
          <span className="w-full md:w-auto text-center md:text-left text-sm text-warm-gray font-light whitespace-nowrap">
            Sisse logitud: {adminActions.username}
          </span>
        )}
      </>
    ) : isAdmin ? (
      <Link
        to="/"
        className="w-full md:w-auto px-7 py-3 border-2 border-rose text-rose text-center text-xs tracking-widest uppercase font-medium rounded-sm hover:bg-rose hover:text-cream transition-all duration-300"
      >
        Tagasi lehele
      </Link>
    ) : (
      <a
        href="https://kristikliimannbeauty.setmore.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full md:w-auto px-7 py-3 border-2 border-rose text-rose text-center text-xs tracking-widest uppercase font-medium rounded-sm hover:bg-rose hover:text-cream transition-all duration-300"
      >
        Broneeri aeg
      </a>
    )
  )

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
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:opacity-80 transition-opacity duration-300 flex items-center gap-3 shrink-0"
          >
            <img
              src="/kristi_logo_refined.png"
              alt="Kristi Kliimann"
              width="48"
              height="48"
              className="h-12 lg:h-16 w-auto shrink-0"
            />
            <img
              src="/kristi_valge.png"
              alt="K Logo"
              width="40"
              height="40"
              className={`h-10 w-auto shrink-0 transition-all duration-500 ${
                showSolidBg ? 'brightness-0' : 'brightness-100'
              }`}
            />
          </Link>

          <div className="flex items-center justify-end gap-8 flex-1">
            <div className="hidden lg:flex items-center gap-8">
              {isAdmin && adminLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-widest uppercase font-light transition-colors duration-300 hover:text-rose ${
                    location.pathname === link.path ? 'text-rose' : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!isAdmin && navLinks.map((link) => (
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

            <div className="hidden lg:flex items-center gap-3">
              {renderActionButtons()}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 ${showSolidBg ? 'text-dark' : 'text-cream'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-cream/98 backdrop-blur-md border-t border-beige"
          >
            <div className="px-6 py-8 space-y-6">
              {!isAdmin && navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm tracking-widest uppercase font-light transition-colors duration-300 ${
                    location.pathname === link.path ? 'text-rose' : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && adminLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm tracking-widest uppercase font-light transition-colors duration-300 ${
                    location.pathname === link.path ? 'text-rose' : 'text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-2">
                {renderActionButtons()}
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </header>
  )
}
