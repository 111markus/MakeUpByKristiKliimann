import { motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import FadeInView from '../components/FadeInView'
import { getServices } from '../lib/api'

export default function PriceList() {
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [servicesByCategory, setServicesByCategory] = useState(null)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    let cancelled = false
    getServices()
      .then((data) => {
        if (cancelled) return
        setServicesByCategory(data)
      })
      .catch((err) => {
        if (cancelled) return
        setLoadError(err)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const serviceCategories = useMemo(() => {
    if (!servicesByCategory) return []
    return Object.entries(servicesByCategory).map(([category, services]) => ({
      category,
      services
    }))
  }, [servicesByCategory])

  const toggleService = (categoryIndex, serviceIndex) => {
    const key = `${categoryIndex}-${serviceIndex}`
    setExpandedIndex(expandedIndex === key ? null : key)
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="/taust_2.png"
            alt="Professionaalne jumestus"
            width="1920"
            height="800"
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
            decoding="sync"
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

              {loadError && (
                <p className="text-sm text-rose font-light mb-6">
                  Teenuste laadimine ebaõnnestus.
                </p>
              )}
              
              <div className="space-y-0">
                {serviceCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className={`font-serif text-xl md:text-2xl font-medium text-dark mt-16 mb-4 pt-8 ${categoryIndex === 0 ? 'border-t border-warm-gray/30' : ''}`}>
                      {category.category}
                    </h3>
                    <div className="space-y-0">
                      {category.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="border-b border-warm-gray/30">
                          <button
                            onClick={() => toggleService(categoryIndex, serviceIndex)}
                            className="w-full flex items-center justify-between py-6 px-0 hover:bg-transparent transition-colors duration-200 group"
                          >
                            <div className="flex-1 text-left">
                              <div className="flex items-baseline justify-between gap-4">
                                <h3 className="font-light text-lg md:text-xl text-dark">{service.name}</h3>
                                <span className="font-light text-lg md:text-xl text-dark">{service.price}€</span>
                              </div>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedIndex === `${categoryIndex}-${serviceIndex}` ? 45 : 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="ml-4"
                            >
                              <Plus 
                                size={24} 
                                className="text-dark group-hover:text-rose transition-colors duration-200"
                              />
                            </motion.div>
                          </button>
                          
                          {expandedIndex === `${categoryIndex}-${serviceIndex}` && (
                            <motion.div
                              initial={{ opacity: 0, maxHeight: 0 }}
                              animate={{ opacity: 1, maxHeight: 500 }}
                              exit={{ opacity: 0, maxHeight: 0 }}
                              transition={{ duration: 0.35, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-0 py-4">
                                <p className="text-warm-gray font-light leading-relaxed text-base">
                                  Hind: {service.price}€
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                    {categoryIndex === 0 && (
                      <p className="text-xs text-warm-gray font-light mt-6">
                        * Teenuse lõplik hind võib varieeruda vastavalt töömahule. Lisad (sh kunstripsmed) ei kuulu hinna sisse.
                      </p>
                    )}
                    {categoryIndex === 1 && (
                      <p className="text-xs text-warm-gray font-light mt-6">
                        * Teenuse lõplik hind võib varieeruda vastavalt töömahule, juuste paksusele ja pikkusele.
                      </p>
                    )}
                  </div>
                ))}
              </div>
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
              href="https://kristikliimannbeauty.setmore.com"
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