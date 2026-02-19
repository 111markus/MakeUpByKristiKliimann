import { Award, Heart, Palette, Users, CheckCircle } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import FadeInView from '../components/FadeInView'

const stats = [
  { icon: <Users size={24} />, number: '500+', label: 'Rahulolev klient' },
  { icon: <Heart size={24} />, number: '200+', label: 'Pulma-jumestust' },
  { icon: <Award size={24} />, number: '8+', label: 'Aastat kogemust' },
  { icon: <Palette size={24} />, number: '15+', label: 'Brändi koostööd' },
]

const reasons = [
  {
    title: 'Personaalne lähenemine',
    description: 'Iga klient on unikaalne. Kuulan sinu soove ja loon just sulle sobiva meigi.',
  },
  {
    title: 'Kõrgekvaliteedilised tooted',
    description: 'Kasutan ainult premium-klassi meigitooteid (MAC, Charlotte Tilbury, NARS, Dior).',
  },
  {
    title: 'Pikaajaline vastupidavus',
    description: 'Minu meik püsib terve päeva – tantsimisest nutmiseni.',
  },
  {
    title: 'Rahuliku õhkkonna loomine',
    description: 'Meigitegemine on nauditav kogemus, mitte stressirohke protsess.',
  },
  {
    title: 'Punktuaalsus ja usaldusväärsus',
    description: 'Olen alati õigel ajal kohal ja valmis looma sinu unistuste meiki.',
  },
  {
    title: 'Pidev professionaalne areng',
    description: 'Osalen regulaarselt rahvusvahelistel koolitustel ja workshopidel.',
  },
]

const certifications = [
  'Make Up For Ever Professional Certificate',
  'MAC Pro Artistry Certification',
  'London School of Make-up – Bridal Specialization',
  'Advanced Airbrush Techniques Workshop, Milan',
  'Eesti Jumestajate Liidu liige',
]

export default function About() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            subtitle="Minust"
            title="Tere, mina olen Elena"
            description="Professionaalne jumestaja, kes usub, et iga naine väärib tunda end ilusana."
          />
        </div>
      </section>

      {/* ===== PROFILE ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeInView direction="left">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1974&auto=format&fit=crop"
                  alt="Elena Kask profiilipilt"
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute -bottom-4 -left-4 w-full h-full border border-rose/20 -z-10" />
              </div>
            </FadeInView>

            <FadeInView direction="right" delay={0.2}>
              <div className="lg:pt-8">
                <h3 className="font-serif text-3xl md:text-4xl font-medium text-dark mb-8 leading-tight">
                  Ilu on minu kirg,
                  <br />
                  <span className="italic text-rose">jumestus on minu kunst</span>
                </h3>

                <div className="space-y-5 text-warm-gray font-light leading-relaxed">
                  <p>
                    Minu teekond jumestuse maailmas algas üle 8 aasta tagasi, kui avastasin,
                    et meik ei ole lihtsalt toodete näole kandmine – see on kunst, mis aitab
                    inimestel tunda end enesekindlana ja ilusana.
                  </p>
                  <p>
                    Olen lõpetanud rahvusvaheliselt tunnustatud meigikoolid ja täiendanud ennast
                    pidevalt parimate meistrite juures Londonis, Milanos ja Pariisis. Minu portfoolios
                    on üle 200 pulma-jumestuse, arvukad moefotosessioonid ning koostöö tuntud
                    Eesti brändidega.
                  </p>
                  <p>
                    Minu filosoofia on lihtne: iga naine on ilus. Minu ülesanne on rõhutada
                    seda loomulikku ilu ja aidata sul tunda end oma parimal päeval just nii,
                    nagu sa väärid – laitmatult.
                  </p>
                  <p>
                    Väljaspool tööd leiad mind reisimas, loomas inspireerivat sisu Instagrami
                    või nautimas head kohvi Tallinna kohvikutes.
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeInView key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-rose mb-3 flex justify-center">{stat.icon}</div>
                  <p className="font-serif text-3xl md:text-4xl text-cream font-medium">{stat.number}</p>
                  <p className="text-cream/50 text-xs tracking-widest uppercase mt-2">{stat.label}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="py-24 lg:py-32 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            subtitle="Kvalifikatsioonid"
            title="Kogemus ja sertifikaadid"
            description="Pidev areng ja õppimine on minu professionaalse teekonna lahutamatu osa."
          />

          <FadeInView>
            <div className="max-w-2xl mx-auto space-y-5">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-start gap-4 bg-cream p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <CheckCircle size={20} className="text-rose flex-shrink-0 mt-0.5" />
                  <p className="text-warm-gray font-light">{cert}</p>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ===== WHY ME ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            subtitle="Miks just mina"
            title="Miks valida mind"
            description="Sinu ilu ja rahulolu on minu prioriteet."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, i) => (
              <FadeInView key={reason.title} delay={i * 0.1}>
                <div className="group p-8 border border-beige hover:border-rose/30 hover:bg-ivory/50 transition-all duration-500">
                  <div className="w-8 h-[1px] bg-rose mb-6 group-hover:w-12 transition-all duration-300" />
                  <h3 className="font-serif text-xl font-medium text-dark mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-warm-gray font-light leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
