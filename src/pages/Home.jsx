import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Star, Camera, Crown, Gift, Wand2, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import SectionHeading from '../components/SectionHeading'
import FadeInView from '../components/FadeInView'
import { getHomeServices } from '../lib/api'

const MotionDiv = motion.div
const MotionH1 = motion.h1
const MotionP = motion.p

const iconMap = { Camera, Crown, Gift, Heart, Sparkles, Star, Wand2, Zap }

const fallbackServices = [
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
  const [services, setServices] = useState(fallbackServices)
  const reviewsRef = useRef(null)
  const itemsPerSlide = 3
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide)

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % totalSlides)
    scrollToReviews()
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + totalSlides) % totalSlides)
    scrollToReviews()
  }

  const scrollToReviews = () => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const getVisibleTestimonials = () => {
    const startIdx = currentReview * itemsPerSlide
    return testimonials.slice(startIdx, startIdx + itemsPerSlide)
  }

  useEffect(() => {
    let cancelled = false
    getHomeServices()
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length) setServices(data)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

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
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-cream/70 text-xs tracking-[0.4em] uppercase mb-6"
          >
            Kristi Kliimann · Professionaalne Jumestaja
          </MotionP>

          <MotionH1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-cream font-medium leading-tight mb-8"
          >
            Professionaalne jumestus
            <br />
            <span className="italic text-blush">Sinu erilisteks hetkedeks</span>
          </MotionH1>

          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-cream/70 text-base md:text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Iga nägu on kunstiteos. Lasen sinu loomulikul ilul särada –
            olgu see pulmapäev, fotosessioon või eriline õhtu.
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://kristikliimannbeauty.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full max-w-xs sm:w-auto px-10 py-4 bg-cream text-dark text-xs tracking-[0.2em] uppercase font-medium hover:bg-rose hover:text-cream transition-all duration-500 flex items-center justify-center gap-3"
            >
              Broneeri aeg
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <Link
              to="/hinnakiri"
              className="w-full max-w-xs sm:w-auto px-10 py-4 border border-cream/30 text-cream text-center text-xs tracking-[0.2em] uppercase font-medium hover:bg-cream/10 transition-all duration-500"
            >
              Hinnakiri
            </Link>
          </MotionDiv>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-16 lg:py-20 bg-ivory">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_1fr] gap-12 lg:gap-16 items-stretch">
            <FadeInView direction="left" className="h-full">
              <div className="relative h-full">
                <img
                  src="/Pilt_Kristi2.png"
                  alt="Kristi Kliimann profiilipilt"
                  width="800"
                  height="1067"
                  className="w-full aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[760px] object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute -bottom-4 -left-4 w-full h-full border border-rose/20 -z-10" />
              </div>
            </FadeInView>

            <FadeInView direction="right" delay={0.2} className="h-full">
              <div className="h-full lg:flex lg:flex-col lg:justify-center">
                <p className="text-xs tracking-[0.3em] uppercase text-soft-gray mb-3">Minust</p>
                <h2 className="font-serif text-3xl md:text-[2.35rem] font-medium text-dark mb-6 leading-tight">
                  Ilu on minu kirg,
                  <br />
                  <span className="italic text-rose">jumestus on minu kunst</span>
                </h2>

                <div className="space-y-4 text-warm-gray font-light leading-[1.65] text-sm md:text-[15px] xl:text-base text-left">
                  <p>
                    Tere! Mina olen Kristi - sinu teejuht ilumaailmas juba 10 aastat. Minu jaoks ei ole jumestus ja soengukunst lihtsalt töö, vaid elustiil, kirg ja eneseväljendusvorm. Usun siiralt, et iga naine on loomupäraselt ilus ning minu ülesanne on seda ilu professionaalsete tehnikate ja kunstilise silma abil esile tõsta.
                  </p>
                  <p>
                    Aastate jooksul olen näinud tuhandeid naeratusi ja aidanud paljudel naistel särada nende elu tähtsaimatel hetkedel. Pikk kogemus on andnud mulle kindlustunde lahendada ka keerukamaid soove ning luua tulemuse, mis püsib ka varajaste hommikutundideni.
                  </p>
                  <p>
                    Vaatan igat klienti kui eraldi lugu. Olgu selleks õrn pruudimeik, julge fantaasiameik või moodne fotomeik - lähenen igale tööle kunstniku täpsuse ja kirega. Kuna valdan nii jumestus- kui ka soengukunsti, saan luua terviklahenduse, kus iga detail toetab ühist visiooni.
                  </p>
                  <p>
                    Sa ei pea muretsema stiilide sobivuse pärast - minu juures kohtuvad visioon ja teostus ühes toolis. Kasutan oma töös ainult kvaliteetseid tooteid, mis aitavad tagada kauni, vastupidava ja enesekindlust loova tulemuse.
                  </p>
                  <p>
                    Sinu hingerahu ja veatu välimus on minu prioriteet. Minu juurde on oodatud kõik, kes hindavad kvaliteeti, personaalsust ja sooja atmosfääri. Tule ja leiame koos sinu unikaalse sära!
                  </p>
                  <p className="font-serif text-xl md:text-2xl italic text-rose text-left">
                    Sinu ilu, minu kunst.
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS (Carousel) ===== */}
      <section className="py-16 lg:py-20 bg-dark" ref={reviewsRef}>
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
                <MotionDiv
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
                </MotionDiv>
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
                <div className="group bg-cream p-6 lg:p-8 text-center hover:shadow-xl transition-all duration-500 h-full flex flex-col items-center justify-between min-h-56">
                  <div className="flex-1 flex flex-col items-center justify-start">
                    <div className="text-rose mb-6 flex justify-center group-hover:scale-125 transition-transform duration-300">
                      {typeof service.icon === 'string' ? (() => {
                        const Icon = iconMap[service.icon] || Sparkles
                        return <Icon size={28} />
                      })() : service.icon}
                    </div>
                    <h3 className="font-serif text-2xl lg:text-3xl font-medium text-dark">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-center gap-2 mt-6">
                    <p className="text-xs text-rose font-light">alates</p>
                    <p className="text-4xl lg:text-5xl font-semibold text-rose">
                      {service.price}
                      {typeof service.price === 'number' ? ' €' : ''}
                    </p>
                    <p className="text-base lg:text-lg text-warm-gray font-light">
                      {service.duration_minutes ? `${service.duration_minutes} min` : service.time}
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>

          <FadeInView delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-20 mb-2">
              <a
                href="https://kristikliimannbeauty.setmore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full max-w-xs sm:w-auto px-10 py-4 bg-rose text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-dark transition-all duration-500 flex items-center justify-center gap-3"
              >
                Broneeri aeg
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <Link
                to="/hinnakiri"
                className="w-full max-w-xs sm:w-auto px-10 py-4 border border-dark/30 text-dark text-center text-xs tracking-[0.2em] uppercase font-medium hover:bg-dark hover:border-dark hover:text-cream transition-all duration-500"
              >
                Hinnakiri
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  )
}
