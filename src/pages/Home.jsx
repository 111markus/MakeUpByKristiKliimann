import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Star, Camera, Crown, Gift, Wand2, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import FadeInView from '../components/FadeInView'

const services = [
  {
    icon: <Crown size={28} />,
    title: 'Pruudimeik',
    time: '90 min',
    price: '75 €',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Fantaasiameik',
    time: '90 min',
    price: '60 €',
  },
  {
    icon: <Heart size={28} />,
    title: 'Pruudi proovimeik',
    time: '90 min',
    price: '55 €',
  },
  {
    icon: <Star size={28} />,
    title: 'Pidulik jumestus',
    time: '60 min',
    price: '55 €',
  },
  {
    icon: <Wand2 size={28} />,
    title: 'Pruudisoeng',
    time: '90 min',
    price: '55 €',
  },
  {
    icon: <Camera size={28} />,
    title: 'Fotomeik',
    time: '60 min',
    price: '50 €',
  },
  {
    icon: <Gift size={28} />,
    title: 'Pruudi proovisoeng',
    time: '90 min',
    price: '45 €',
  },
  {
    icon: <Zap size={28} />,
    title: 'Soengud',
    time: '60 min',
    price: '40 €',
  },
]

const testimonials = [
  {
    name: 'Gerli',
    text: 'Kristi tegi minust, MEIE päeval, maailma kaunima pruudi! Suur aitäh Sulle selle imelise töö eest!',
    rating: 5,
  },
  {
    name: 'Sandra',
    text: 'Ise on Kristi üliüli sõbralik ja selle meigiga tundsin end nagu printsess niiet kindlasti soovitan',
    rating: 5,
  },
  {
    name: 'Aurelie',
    text: 'Ma ei ole end kunagi nii ilusana tundnud, teeb super tööd, soovitan!',
    rating: 5,
  },
  {
    name: 'Pille-Riin',
    text: 'Jäin väga rahule! Meik oli ilus, püsis peal terve pika päeva ja oli ideaalse katvusega. Kindlasti lähen tagasi ja soovitan ka teistele!',
    rating: 5,
  },
  {
    name: 'Niina',
    text: 'Väga meeldis!',
    rating: 5,
  },
  {
    name: 'Helis',
    text: 'Kristi on väga tubli ja pühendunud, hea kunstimeele ja värvitunnetusega, armas meikar!',
    rating: 5,
  },
  {
    name: 'Kirsti',
    text: 'Olen alati meigiga ülimalt rahule jäänud ja Kristi ise on ka super tore inimene. Soovitan!',
    rating: 5,
  },
  {
    name: 'Jana',
    text: 'Mind pani Kristi ka printsessina tundma. Meik püsis ülihàsti peal. Soovitan tàiega kindla kàega Kristit!!!',
    rating: 5,
  },
  {
    name: 'Küllike',
    text: 'Jäin väga rahule nii meigi kui soenguga. Super! Kindlasti tulen veelkord tagasi. Ilusat jõuluaega Teile.',
    rating: 5,
  },
  {
    name: 'Marrit',
    text: 'Väga kaunis meik. Püsis väga hästi. Soovitan soojalt kõigile. Aitähh',
    rating: 5,
  },
  {
    name: 'Angelica',
    text: 'Käisin lõpumeiki ja soengut tegemas.. olin tulemusega ülirahul. Väga kaunis tulemus sai ning püsis peal väga hästi. Aitäh!',
    rating: 5,
  },
  {
    name: 'Liina',
    text: 'Kristi on väga andekas ja tema tehtud jumestus oli imeilus ning püsis väga hästi. Kindlasti kohtume taas',
    rating: 5,
  },
  {
    name: 'Kätlin',
    text: 'Kristi tehtud jumestus püsis veatuna terve pika päeva. Lisaks suudab Kristi väga hästi tabada kliendi olemust ja teha just temale sobiliku jumestuse. Jäin väga rahule!',
    rating: 5,
  },
  {
    name: 'Elina',
    text: 'Sõnu polegi vaja. Ja loodan, et tead seda, alati rohkem kui veel rahul!',
    rating: 5,
  },
  {
    name: 'Kedli',
    text: 'Aitäh super meigikunstnikule, kes pani mu särama',
    rating: 5,
  },
]

export default function Home() {
  const [currentReview, setCurrentReview] = useState(2)
  const itemsPerSlide = 3
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide)

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % totalSlides)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getVisibleTestimonials = () => {
    const startIdx = currentReview * itemsPerSlide
    return testimonials.slice(startIdx, startIdx + itemsPerSlide)
  }
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/avaleht8.png"
            alt="Professionaalne jumestus"
            width="1920"
            height="1080"
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
            decoding="sync"
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
            Kristi Kliimann · Professionaalne Jumestaja
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-cream font-medium leading-tight mb-8"
          >
            Professionaalne jumestus
            <br />
            <span className="italic text-blush">Sinu erilisteks hetkedeks</span>
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
              href="https://kristikliimannbeauty.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-4 bg-cream text-dark text-xs tracking-[0.2em] uppercase font-medium hover:bg-rose hover:text-cream transition-all duration-500 flex items-center gap-3"
            >
              Broneeri aeg
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <Link
              to="/hinnakiri"
              className="px-10 py-4 border border-cream/30 text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-cream/10 transition-all duration-500"
            >
              Hinnakiri
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-24 lg:py-32 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeInView direction="left">
              <div className="relative">
                <img
                  src="/Pilt_Kristi2.png"
                  alt="Kristi Kliimann profiilipilt"
                  width="800"
                  height="1067"
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute -bottom-4 -left-4 w-full h-full border border-rose/20 -z-10" />
              </div>
            </FadeInView>

            <FadeInView direction="right" delay={0.2}>
              <div className="lg:pt-8">
                <p className="text-xs tracking-[0.3em] uppercase text-soft-gray mb-4">Minust</p>
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-dark mb-8 leading-tight">
                  Ilu on minu kirg,
                  <br />
                  <span className="italic text-rose">jumestus on minu kunst</span>
                </h2>

                <div className="space-y-6 text-warm-gray font-light leading-relaxed text-lg md:text-xl text-justify">
                  <p>
                    Sinu ilu, minu kirg – juba 10 aastat.
                  </p>
                  <p>
                    Usun südamest, et iga naine on ilus. Minu töö ei ole seda ilu luua, vaid see oskuslikult esile tuua. Kasutades vaid tipptasemel tooteid ja oma kümneaastast kogemustepagasit, loon Sulle meigi, mis ei pane Sind lihtsalt särama, vaid annab ka vankumatu enesekindluse.
                  </p>
                  <p>
                    Olgu tegu pulma, fotosessiooni või olulise peoga – minu eesmärk on, et peeglisse vaadates tunneksid Sa end ikka iseendana, kuid oma parimas ja lummavaimas versioonis. Sa väärid end tundma laitmatult.
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS (Carousel) ===== */}
      <section className="py-16 lg:py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            subtitle="Arvustused"
            title="Klientide tagasiside"
            light
          />

          <div className="relative">
            {/* Carousel Content - 3 items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {getVisibleTestimonials().map((t) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border border-cream/10 p-8 lg:p-10 h-80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating)].map((_, idx) => (
                        <Star key={idx} size={14} className="fill-rose text-rose" />
                      ))}
                    </div>
                    <p className="text-cream/70 text-sm font-light leading-relaxed italic mb-4 line-clamp-6">
                      "{t.text}"
                    </p>
                  </div>
                  <div>
                    <p className="text-cream font-serif text-base">{t.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Buttons and Dots */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevReview}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-cream/30 text-cream hover:border-rose hover:text-rose transition-all duration-300"
                aria-label="Eelmine arvustus"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Dots */}
              <div className="flex items-center justify-center gap-4 min-w-[140px]">
                {[...Array(totalSlides)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentReview(idx)}
                    className="relative w-4 h-4 flex items-center justify-center group"
                    aria-label={`Slaid ${idx + 1}`}
                  >
                    <div
                      className={`rounded-full transition-all duration-300 ease-out ${idx === currentReview
                          ? 'bg-rose w-3 h-3'
                          : 'bg-cream/20 w-2 h-2 group-hover:bg-cream/40'
                        }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={nextReview}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-cream/30 text-cream hover:border-rose hover:text-rose transition-all duration-300"
                aria-label="Järgmine arvustus"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES (Kompaktsem) ===== */}
      <section className="py-16 lg:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            title="Teenused"
            description="Professionaalne jumestus igaks olukorraks."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <FadeInView key={service.title} delay={i * 0.1}>
                <div className={`group bg-cream p-6 lg:p-8 text-center hover:shadow-xl transition-all duration-500 h-full flex flex-col items-center justify-between min-h-56 ${i === services.length - 1 ? 'lg:col-start-2 lg:col-span-2' : ''}`}>
                  <div className="flex-1 flex flex-col items-center justify-start">
                    <div className="text-rose mb-6 flex justify-center group-hover:scale-125 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="font-serif text-2xl lg:text-3xl font-medium text-dark">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-center gap-2 mt-6">
                    <p className="text-xs text-rose font-light">alates</p>
                    <p className="text-4xl lg:text-5xl font-semibold text-rose">
                      {service.price}
                    </p>
                    <p className="text-base lg:text-lg text-warm-gray font-light">
                      {service.time}
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>

          <FadeInView delay={0.4}>
            <div className="text-center mt-20 mb-2">
              <a
                href="https://kristikliimannbeauty.setmore.com"
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
    </>
  )
}