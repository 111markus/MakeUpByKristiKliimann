import { Link } from 'react-router-dom'
import { Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-3xl font-semibold text-cream mb-4">
              Elena<span className="text-rose">.</span>
            </h3>
            <p className="text-sm leading-relaxed text-cream/60 max-w-xs">
              Professionaalne jumestus erilisteks hetkedeks. Iga nägu on kunstiteos,
              mis ootab avastamist.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-cream mb-6">Kiirlingid</h4>
            <div className="space-y-3">
              {[
                { to: '/', label: 'Avaleht' },
                { to: '/minust', label: 'Minust' },
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
                href="https://setmore.com/yourname"
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
                href="tel:+37255512345"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-rose transition-colors duration-300"
              >
                <Phone size={16} />
                +372 5551 2345
              </a>
              <a
                href="mailto:elena@jumestus.ee"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-rose transition-colors duration-300"
              >
                <Mail size={16} />
                elena@jumestus.ee
              </a>
              <a
                href="https://instagram.com/elenakask.makeup"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-rose transition-colors duration-300"
              >
                <Instagram size={16} />
                @elenakask.makeup
              </a>
              <p className="flex items-center gap-3 text-sm text-cream/60">
                <MapPin size={16} />
                Tallinn, Eesti
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            © {currentYear} Elena Kask. Kõik õigused kaitstud.
          </p>
          <p className="text-xs text-cream/40 flex items-center gap-1">
            Loodud <Heart size={12} className="text-rose" /> armastusega
          </p>
        </div>
      </div>
    </footer>
  )
}
