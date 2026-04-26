import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import FadeInView from '../components/FadeInView'

export default function PriceList() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32">
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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream font-medium leading-tight mb-6"
          >
            Hinnakiri
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-cream/70 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed"
          >
            Professionaalne jumestus sobiva hinnaga – iga eelarve jaoks.
          </motion.p>
        </div>
      </section>

      {/* ===== PRICING INFO ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <FadeInView>
            <div className="text-center mb-16">
              <p className="text-warm-gray text-lg font-light leading-relaxed mb-8">
                Minu hinnad on läbipaistvad ja konkurentsivõimelised. 
                Teenused ja täpsed hinnad leiad allolevalt lingilt, kus saad ka broneerida oma jumestusaega.
              </p>
              
              <a
                href="https://anolla.com/book/makeupbykristikliimann"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-12 py-5 bg-dark text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-rose transition-all duration-500"
              >
                Vaata teenuseid ja hinna
                <ArrowRight size={16} />
              </a>
            </div>
          </FadeInView>

          <FadeInView delay={0.2}>
            <div className="bg-ivory p-10 lg:p-14">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-dark mb-8">
                Miks valida mind?
              </h2>
              
              <div className="space-y-6 text-warm-gray font-light leading-relaxed">
                <p>
                  🎨 <strong>Professionaalne lähenemine</strong> – Iga klient on unikaalne ja mul on kogemus erinevate näotüüpide ja soovide käsitlemisel.
                </p>
                <p>
                  ✨ <strong>Kõrgekvaliteedilised tooted</strong> – Kasutan ainult premium-klassi meigitooteid (MAC, Charlotte Tilbury, NARS, Dior).
                </p>
                <p>
                  ⏰ <strong>Pikaajaline vastupidavus</strong> – Minu meik püsib terve päeva – tantsimisest nutmiseni.
                </p>
                <p>
                  😌 <strong>Rahuliku õhkkonna loomine</strong> – Meigitegemine on nauditav kogemus, mitte stressirohke protsess.
                </p>
                <p>
                  🎯 <strong>Punktuaalsus ja usaldusväärsus</strong> – Olen alati õigel ajal kohal ja valmis looma sinu unistuste meiki.
                </p>
                <p>
                  📚 <strong>Pidev professionaalne areng</strong> – Osalen regulaarselt rahvusvahelistel koolitustel ja workshopidel.
                </p>
              </div>
            </div>
          </FadeInView>
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
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-cream font-medium mb-6 leading-tight">
              Oled valmis?
              <br />
              <span className="italic text-blush">Broneeri oma jumestusaeg</span>
            </h2>
            <p className="text-cream/60 font-light mb-10 max-w-lg mx-auto leading-relaxed">
              Vali sobiv teenus ja aeg allolevalt lingilt.
            </p>
            <a
              href="https://kkbeauty.setmore.com"
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
