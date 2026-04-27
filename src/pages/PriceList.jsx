import { motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import { useState } from 'react'
import FadeInView from '../components/FadeInView'

const servicesList = [
  {
    title: 'Fantaasiameik',
    price: '60€',
    duration: '90 min',
    description: 'Fantaasiameik on loodud nendele, kes tahavad midagi erilist ja ekstravagantsset. Täis detaile ja loovust!'
  },
  {
    title: 'Pidulik jumestus',
    price: '55€',
    duration: '60 min',
    description: 'Elegantne ja särav meik gaaladeks, pidudeks ja spetsiaalseteks õhtuteks. Pikaajaline ja kaunis.'
  },
  {
    title: 'Fotomeik',
    price: '50€',
    duration: '60 min',
    description: 'Professionaalne jumestus, mis näeb kaamera ees laitmatult välja. Ideaalne fotosessioonide jaoks.'
  },
  {
    title: 'Jumestus mehele',
    price: '20€',
    duration: '15 min',
    description: 'Kerge ja loomulik jumestus mehele. Ühtlustab näonaha ilma silmapaistva meigikihita.'
  }
]

export default function PriceList() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleService = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="/taust_2.png"
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
            Hinnakiri
          </motion.h1>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="pt-16 lg:pt-24 pb-8 lg:pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <FadeInView delay={0.2}>
            <div className="bg-ivory p-10 lg:p-14">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-dark mb-10">
                Teenused
              </h2>
              
              <div className="space-y-0">
                {servicesList.map((service, index) => (
                  <div key={index} className="border-b border-warm-gray/30">
                    <button
                      onClick={() => toggleService(index)}
                      className="w-full flex items-center justify-between py-6 px-0 hover:bg-transparent transition-colors duration-200 group"
                    >
                      <div className="flex-1 text-left">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-light text-lg md:text-xl text-dark">{service.title}</h3>
                          <span className="font-light text-lg md:text-xl text-dark">{service.price}</span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="ml-4"
                      >
                        <Plus 
                          size={24} 
                          className="text-dark group-hover:text-rose transition-colors duration-200"
                        />
                      </motion.div>
                    </button>
                    
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, maxHeight: 0 }}
                        animate={{ opacity: 1, maxHeight: 500 }}
                        exit={{ opacity: 0, maxHeight: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-0 py-4">
                          <p className="text-warm-gray font-light leading-relaxed text-base">
                            {service.description}
                          </p>
                          <p className="text-sm text-warm-gray font-light mt-3">
                            {service.duration}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs text-warm-gray font-light mt-10">
                * Teenuse lõplik hind võib varieeruda vastavalt töömahule. Lisad (sh kunstripsmed) ei kuulu hinna sisse.
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pt-2 pb-12 lg:pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <FadeInView>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              href="https://kkbeauty.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-5 bg-rose text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-dark transition-all duration-500"
            >
              Broneeri aeg
              <ArrowRight size={16} />
            </motion.a>
          </FadeInView>
        </div>
      </section>
    </>
  )
}