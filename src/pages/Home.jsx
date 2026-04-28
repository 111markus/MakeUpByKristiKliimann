import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Star, Camera } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import FadeInView from '../components/FadeInView'

const services = [
  {
    icon: <Sparkles size={28} />,
    title: 'Fantaasiameik',
    description: '90 min · 60 €',
  },
  {
    icon: <Star size={28} />,
    title: 'Pidulik jumestus',
    description: '60 min · 55 €',
  },
  {
    icon: <Camera size={28} />,
    title: 'Fotomeik',
    description: '60 min · 50 €',
  },
  {
    icon: <Heart size={28} />,
    title: 'Jumestus mehele',
    description: '15 min · 20 €',
  },
]

const testimonials = [
  {
    name: 'Piret',
    text: 'Väga rahule jäin! Kristi teeb oma tööd kirega ja see peegeldub tulemuses. Super ilus meik, mis püsib terve päeva!',
    rating: 5,
  },
  {
    name: 'Kadi-Ly',
    text: 'Suur-suur aitäh Sulle, Kristi! Jäin meigiga väga rahule – see oli täpselt selline, nagu soovisin, ja pidas terve pika päeva ja öö vastu. Soovitan soojalt!',
    rating: 5,
  },
  {
    name: 'Merlyn',
    text: 'Kristi on imeline meigikunstnik! Ta oskab nii hästi rõhutada inimese loomulikku ilu. Atmosfäär oli väga meeldiv ja tulemus lihtsalt super.',
    rating: 5,
  },
  {
    name: 'Triin',
    text: 'Väga meeldiv kogemus! Kristi on oma töös väga professionaalne ja samas nii soe inimene. Meik püsis veatuna ürituse lõpuni.',
    rating: 5,
  },
  {
    name: 'Anete',
    text: 'Minu kindel lemmik! Kristi juures tunned end alati hoituna ja tulemus on alati 5+. Aitäh!',
    rating: 5,
  },
  {
    name: 'Grete-Lilijane',
    text: 'Väga tubli ja andekas meikar! Soovitan kõigile, kes soovivad tõeliselt ilusat ja kvaliteetset jumestust.',
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
            src="/avaleht8.png"
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
              href="https://kkbeauty.setmore.com"
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
                  className="w-full aspect-[3/4] object-cover"
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

      {/* ===== REVIEWS (Kompaktsem) ===== */}
      <section className="py-16 lg:py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            subtitle="Arvustused"
            title="Klientide tagasiside"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeInView key={t.name} delay={i * 0.1}>
                <div className="border border-cream/10 p-8 lg:p-10 h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} size={14} className="fill-rose text-rose" />
                    ))}
                  </div>
                  <p className="text-cream/70 text-sm font-light leading-relaxed italic mb-4 flex-grow">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="text-cream font-serif text-base">{t.name}</p>
                  </div>
                </div>
              </FadeInView>
            ))}
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
                <div className="group bg-cream p-10 lg:p-16 text-center hover:shadow-xl transition-all duration-500 h-full flex flex-col items-center justify-between min-h-80">
                  <div className="flex-1 flex flex-col items-center justify-start">
                    <div className="text-rose mb-8 flex justify-center group-hover:scale-125 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="font-serif text-2xl lg:text-3xl font-medium text-dark">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-center gap-8 mt-8">
                    <p className="text-4xl lg:text-5xl font-semibold text-rose">
                      {service.description.split(' · ')[1]}
                    </p>
                    <p className="text-base lg:text-lg text-warm-gray font-light">
                      {service.description.split(' · ')[0]}
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>

          <FadeInView delay={0.4}>
            <div className="text-center mt-12">
              <a
                href="https://kkbeauty.setmore.com"
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