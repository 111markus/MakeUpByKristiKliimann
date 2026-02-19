import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import FadeInView from '../components/FadeInView'

const categories = [
  { id: 'all', label: 'Kõik' },
  { id: 'pulmad', label: 'Pulmad' },
  { id: 'ohtujumestus', label: 'Õhtujumestus' },
  { id: 'fotomeik', label: 'Fotomeik' },
  { id: 'loomulik', label: 'Loomulik meik' },
]

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1780&auto=format&fit=crop',
    alt: 'Pulmameik - elegantne pruudi jumestus',
    category: 'pulmad',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?q=80&w=2069&auto=format&fit=crop',
    alt: 'Õhtujumestus - glamuurne look',
    category: 'ohtujumestus',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1935&auto=format&fit=crop',
    alt: 'Fotomeik - stuudiofoto jumestus',
    category: 'fotomeik',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=2070&auto=format&fit=crop',
    alt: 'Loomulik meik - no-makeup look',
    category: 'loomulik',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop',
    alt: 'Pulmameik - romantiline stiil',
    category: 'pulmad',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop',
    alt: 'Õhtujumestus - särav meik',
    category: 'ohtujumestus',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop',
    alt: 'Fotomeik - editorial look',
    category: 'fotomeik',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=2095&auto=format&fit=crop',
    alt: 'Loomulik meik - värske ilme',
    category: 'loomulik',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1974&auto=format&fit=crop',
    alt: 'Pulmameik - klassikaline elegants',
    category: 'pulmad',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1549236177-f9b0031756eb?q=80&w=1974&auto=format&fit=crop',
    alt: 'Õhtujumestus - dramaatiline smoky eye',
    category: 'ohtujumestus',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070&auto=format&fit=crop',
    alt: 'Fotomeik - moefoto jumestus',
    category: 'fotomeik',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop',
    alt: 'Loomulik meik - dewy glow',
    category: 'loomulik',
  },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxImage, setLightboxImage] = useState(null)

  const filteredImages =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            subtitle="Portfoolio"
            title="Galerii"
            description="Valik minu töödest – iga meik on loodud armastuse ja tähelepanelikkusega."
          />
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Category Filter */}
          <FadeInView>
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-dark text-cream'
                      : 'bg-transparent text-warm-gray border border-beige hover:border-dark hover:text-dark'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeInView>

          {/* Image Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
                  onClick={() => setLightboxImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-cream text-sm font-light">{image.alt}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lightbox-overlay"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-cream/80 hover:text-cream z-10 transition-colors duration-300"
              onClick={() => setLightboxImage(null)}
              aria-label="Sulge"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              onClick={(e) => e.stopPropagation()}
              className="cursor-default"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
