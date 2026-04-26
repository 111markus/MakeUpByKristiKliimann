import { Link } from 'react-router-dom'
import { Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 shrink-0">
              <img
                src="/kristi_logo_refined.png"
                alt="Kristi Kliimann"
                className="h-16 w-auto"
              />
              <img
                src="/kristi_valge.png"
                alt="K Logo"
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-cream mb-6">Kiirlingid</h4>
            <div className="space-y-3">
              {[
                { to: '/', label: 'Avaleht' },
                { to: '/hinnakiri', label: 'Hinnakiri' },
                { to: '/galerii', label: 'Galerii' },
                { to: '/kontakt', label: 'Kontakt' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-cream/60 hover:text-rose transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://kkbeauty.setmore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-rose hover:text-blush transition-colors duration-300"
              >
                Broneeri aeg →
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg text-cream mb-6">Kontakt</h4>
            <div className="space-y-4">
              <a
                href="tel:+37256754911"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-rose transition-colors duration-300"
              >
                <Phone size={16} />
                +372 5675 4911
              </a>
              <a
                href="mailto:kristikliimann.kk@gmail.com"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-rose transition-colors duration-300"
              >
                <Mail size={16} />
                kristikliimann.kk@gmail.com
              </a>
              <a
                href="https://www.instagram.com/makeupbykristikliimann/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-rose transition-colors duration-300"
              >
                <Instagram size={16} />
                @makeupbykristikliimann
              </a>
              <p className="flex items-center gap-3 text-sm text-cream/60">
                <MapPin size={16} />
                Tartu
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-cream/10 mx-10 lg:mx-16"></div>
      <p className="text-xs text-cream/40 text-center py-6">
        © {currentYear} Kristi Kliimann
      </p>
    </footer>
  )
}
