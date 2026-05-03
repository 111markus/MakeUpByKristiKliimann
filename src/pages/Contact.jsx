import { Phone, Mail, Instagram, MapPin, Facebook } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import FadeInView from '../components/FadeInView'

const contactInfo = [
  {
    icon: <Phone size={20} />,
    label: 'Telefon',
    value: '+372 5675 4911',
    href: 'tel:+37256754911',
  },
    {
    icon: <Mail size={20} />,
    label: 'E-mail',
    value: 'kristikliimann.kk@gmail.com',
    href: 'mailto:kristikliimann.kk@gmail.com',
  },
  {
    icon: <Instagram size={20} />,
    label: 'Instagram',
    value: '@makeupbykristikliimann',
    href: 'https://www.instagram.com/makeupbykristikliimann/',
  },
  {
    icon: <Facebook size={20} />,
    label: 'Facebook',
    value: 'Kristi Kliimann Makeup',
    href: 'https://www.facebook.com/KristiKliimannMakeup',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Asukoht',
    value: 'Tartu',
    href: null,
  },
]

export default function Contact() {
  return (
    <>
      {/* ===== HERO (Uuendatud vastavalt PriceList stiilile) ===== */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-ivory pt-20">
          <div className="absolute inset-0">
          <img
            src="/pilt_2.png"
            alt="Professionaalne jumestus"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark font-medium leading-tight"
          >
            Kontakt
          </motion.h1>
        </div>
      </section>

      {/* ===== CONTACT CONTENT ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            {/* Contact Info */}
            <FadeInView direction="left">
              <div className="lg:col-span-1">
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-dark mb-2">
                  Kontaktandmed
                </h3>
                <p className="text-warm-gray font-light text-sm mb-10">
                  Võid ka otse ühendust võtta.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-ivory text-rose">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-xs tracking-widest uppercase text-soft-gray mb-1">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-dark font-light hover:text-rose transition-colors duration-300"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-dark font-light">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInView>

            {/* Google Maps Embed */}
            <FadeInView direction="right" delay={0.2} className="lg:col-span-2">
              <div className="aspect-[16/12] w-full overflow-hidden">
                <iframe
                  title="Kristi Kliimann asukoht - Tartu"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2091.81042104876!2d26.753867!3d58.379734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eb36cfc35d274b%3A0xdfc1547ec19640f1!2sSangar%20Outlet!5e0!3m2!1set!2see!4v1772095176256!5m2!1set!2see"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-ivory">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeInView>
            <p className="text-xs tracking-[0.3em] uppercase text-soft-gray mb-4">
              Kiireim viis
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-dark mb-6">
              Broneeri aeg <span className="italic text-rose">onlines</span>
            </h2>
            <p className="text-warm-gray font-light mb-8 max-w-lg mx-auto leading-relaxed">
              Vali sobiv aeg ja teenus mugavalt veebis.
            </p>
            <a
              href="https://kristikliimannbeauty.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-dark text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-charcoal transition-all duration-500"
            >
              Broneeri aeg
            </a>
          </FadeInView>
        </div>
      </section>
    </>
  )
}