import { useState } from 'react'
import { Phone, Mail, Instagram, MapPin, Send, CheckCircle } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import FadeInView from '../components/FadeInView'

const contactInfo = [
  {
    icon: <Phone size={20} />,
    label: 'Telefon',
    value: '+372 5551 2345',
    href: 'tel:+37255512345',
  },
  {
    icon: <Mail size={20} />,
    label: 'E-mail',
    value: 'elena@jumestus.ee',
    href: 'mailto:elena@jumestus.ee',
  },
  {
    icon: <Instagram size={20} />,
    label: 'Instagram',
    value: '@elenakask.makeup',
    href: 'https://instagram.com/elenakask.makeup',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Asukoht',
    value: 'Tallinn, Eesti',
    href: null,
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would integrate with a form service like Formspree, EmailJS, etc.
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            subtitle="Võta ühendust"
            title="Kontakt"
            description="Küsimusi? Soovid broneerida aega? Kirjuta mulle ja vastan esimesel võimalusel."
          />
        </div>
      </section>

      {/* ===== CONTACT CONTENT ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <FadeInView direction="left">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-dark mb-2">
                  Saada sõnum
                </h3>
                <p className="text-warm-gray font-light text-sm mb-10">
                  Täida allolev vorm ja võtan sinuga ühendust 24 tunni jooksul.
                </p>

                {submitted ? (
                  <div className="flex items-center gap-3 p-8 bg-ivory border border-rose/20">
                    <CheckCircle size={24} className="text-rose flex-shrink-0" />
                    <div>
                      <p className="font-serif text-lg text-dark">Aitäh sõnumi eest!</p>
                      <p className="text-sm text-warm-gray font-light mt-1">
                        Vastan sulle esimesel võimalusel.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs tracking-widest uppercase text-soft-gray mb-3"
                      >
                        Nimi *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-beige px-0 py-3 text-dark font-light focus:outline-none focus:border-rose transition-colors duration-300 placeholder:text-soft-gray/50"
                        placeholder="Sinu nimi"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs tracking-widest uppercase text-soft-gray mb-3"
                      >
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-beige px-0 py-3 text-dark font-light focus:outline-none focus:border-rose transition-colors duration-300 placeholder:text-soft-gray/50"
                        placeholder="sinu@email.ee"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs tracking-widest uppercase text-soft-gray mb-3"
                      >
                        Sõnum *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-beige px-0 py-3 text-dark font-light focus:outline-none focus:border-rose transition-colors duration-300 placeholder:text-soft-gray/50 resize-none"
                        placeholder="Kirjuta oma sõnum siia..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="group flex items-center gap-3 px-10 py-4 bg-dark text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-charcoal transition-all duration-500 mt-4"
                    >
                      Saada sõnum
                      <Send
                        size={14}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                      />
                    </button>
                  </form>
                )}
              </div>
            </FadeInView>

            {/* Contact Info & Map */}
            <FadeInView direction="right" delay={0.2}>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-dark mb-2">
                  Kontaktandmed
                </h3>
                <p className="text-warm-gray font-light text-sm mb-10">
                  Võid ka otse ühendust võtta.
                </p>

                <div className="space-y-6 mb-12">
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

                {/* Google Maps Embed */}
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <iframe
                    title="Elena Kask asukoht - Tallinn"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8131.66063547324!2d24.74135!3d59.436962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692949c8f4c1b3b%3A0x6e87a45edc1b0a6c!2sTallinn%2C%20Estonia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
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
              Broneeri aeg <span className="italic text-rose">online</span>
            </h2>
            <p className="text-warm-gray font-light mb-8 max-w-lg mx-auto leading-relaxed">
              Vali sobiv aeg ja teenus mugavalt veebis. Kinnitan broneeringu 24 tunni jooksul.
            </p>
            <a
              href="https://setmore.com/yourname"
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
