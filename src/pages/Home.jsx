import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Star, Camera } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import FadeInView from '../components/FadeInView'

const services = [
  {
    icon: <Heart size={28} />,
    title: 'Pulmameik',
    description: 'Kauakestev ja kaunis jumestus sinu elu kõige olulisemaks päevaks. Sisaldab proovimeiki.',
  },
  {
    icon: <Star size={28} />,
    title: 'Õhtujumestus',
    description: 'Särav ja elegantne meik gaaladeks, sünnipäevadeks ja erilisteks õhtuteks.',
  },
  {
    icon: <Camera size={28} />,
    title: 'Fotomeik',
    description: 'Professionaalne jumestus, mis näeb kaamera ees laitmatult välja.',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Loomulik meik',
    description: 'Kerge ja värske "no-makeup" look, mis rõhutab sinu loomulikku ilu.',
  },
]

const testimonials = [
  {
    name: 'Katrin M.',
    role: 'Pruut',
    text: 'Elena tegi mu pulma-meigi ja see oli absoluutselt täiuslik! Meik püsis terve päeva ja ma tundsin end nagu printsess.',
    rating: 5,
  },
  {
    name: 'Laura S.',
    role: 'Fotosessioon',
    text: 'Olen kasutanud Elena teenuseid mitmel korral. Tema professionaalsus ja oskus on erakordne. Soovitan soojalt!',
    rating: 5,
  },
  {
    name: 'Marii T.',
    role: 'Gala õhtu',
    text: 'Parim jumestaja, kellega olen kokku puutunud! Elena kuulab alati mu soove ja tulemus ületab ootusi.',
    rating: 5,
  },
]

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2071&auto=format&fit=crop"
            alt="Professionaalne jumestus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/40 to-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-cream/70 text-xs tracking-[0.4em] uppercase mb-6"
          >
            Elena Kask · Professionaalne Jumestaja
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-cream font-medium leading-tight mb-8"
          >
            Professionaalne jumestus
            <br />
            <span className="italic text-blush">erilisteks hetkedeks</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-cream/70 text-base md:text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Iga nägu on kunstiteos. Lasen sinu loomulikul ilul särada –
            olgu see pulmapäev, fotosessioon või eriline õhtu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://setmore.com/yourname"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-4 bg-cream text-dark text-xs tracking-[0.2em] uppercase font-medium hover:bg-rose hover:text-cream transition-all duration-500 flex items-center gap-3"
            >
              Broneeri aeg
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <Link
              to="/galerii"
              className="px-10 py-4 border border-cream/30 text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-cream/10 transition-all duration-500"
            >
              Vaata galeriid
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-[1px] h-12 bg-gradient-to-b from-transparent to-cream/50"
          />
        </motion.div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInView direction="left">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop"
                  alt="Elena Kask jumestaja"
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-rose/30 -z-10" />
              </div>
            </FadeInView>

            <FadeInView direction="right" delay={0.2}>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-soft-gray mb-4">Tere tulemast</p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-dark mb-6 leading-tight">
                  Ilu on minu
                  <br />
                  <span className="italic text-rose">kirg ja kutsumus</span>
                </h2>
                <p className="text-warm-gray font-light leading-relaxed mb-6">
                  Olen Elena – professionaalne jumestaja rohkem kui 8-aastase kogemusega.
                  Minu missioon on aidata igal naisel tunda end oma parimal päeval
                  ilusana ja enesekindlana.
                </p>
                <p className="text-warm-gray font-light leading-relaxed mb-8">
                  Kasutan ainult kõrgekvaliteedilisi tooteid ja pidevalt uuendatavaid
                  tehnikaid, et pakkuda parimat tulemust.
                </p>
                <Link
                  to="/minust"
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-dark font-medium border-b border-dark pb-1 hover:text-rose hover:border-rose transition-colors duration-300"
                >
                  Loe rohkem
                  <ArrowRight size={14} />
                </Link>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-24 lg:py-32 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            subtitle="Mida pakun"
            title="Teenused"
            description="Professionaalne jumestus igaks olukorraks – pulmadest fotosessioonideni."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <FadeInView key={service.title} delay={i * 0.1}>
                <div className="group bg-cream p-8 lg:p-10 text-center hover:shadow-lg transition-all duration-500">
                  <div className="text-rose mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-dark mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm text-warm-gray font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>

          <FadeInView delay={0.4}>
            <div className="text-center mt-14">
              <a
                href="https://setmore.com/yourname"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-dark text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-charcoal transition-all duration-500"
              >
                Broneeri aeg
                <ArrowRight size={16} />
              </a>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            subtitle="Tagasiside"
            title="Mida kliendid ütlevad"
            description="Rahulolu on minu suurim tunnustus."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeInView key={t.name} delay={i * 0.15}>
                <div className="border border-cream/10 p-8 lg:p-10">
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} size={14} className="fill-rose text-rose" />
                    ))}
                  </div>
                  <p className="text-cream/70 text-sm font-light leading-relaxed italic mb-8">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="text-cream font-serif text-base">{t.name}</p>
                    <p className="text-cream/40 text-xs mt-1">{t.role}</p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1457972729786-0411a3b2b626?q=80&w=2070&auto=format&fit=crop"
            alt="Meigitarvikud"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark/70" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <FadeInView>
            <p className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-4">
              Oled valmis?
            </p>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-cream font-medium mb-6 leading-tight">
              Broneeri oma
              <br />
              <span className="italic text-blush">jumestusaeg</span>
            </h2>
            <p className="text-cream/60 font-light mb-10 max-w-lg mx-auto leading-relaxed">
              Iga eriline hetk väärib professionaalset meiki. Broneeri oma aeg
              ja lasen sinu ilul särada.
            </p>
            <a
              href="https://setmore.com/yourname"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-5 bg-cream text-dark text-xs tracking-[0.2em] uppercase font-medium hover:bg-rose hover:text-cream transition-all duration-500"
            >
              Broneeri aeg
              <ArrowRight size={16} />
            </a>
          </FadeInView>
        </div>
      </section>
    </>
  )
}
