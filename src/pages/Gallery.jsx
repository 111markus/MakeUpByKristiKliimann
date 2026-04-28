import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import FadeInView from '../components/FadeInView'

const galleryImages = [
  { id: 3, src: '/galerii pildid/Liis Vissel_(2).jpg', alt: 'Fotograaf: Liis Vissel', category: 'pulmad' },
  { id: 7, src: '/galerii pildid/Liis Vissel_(6).jpg', alt: 'Fotograaf: Liis Vissel', category: 'loomulik' },
  { id: 1, src: '/galerii pildid/Liis Vissel_.jpg', alt: 'Fotograaf: Liis Vissel', category: 'portree' },
  { id: 19, src: '/galerii pildid/Maigiphotography_(9).jpg', alt: 'Fotograaf: Maigiphotography', category: 'fotomeik' },
  { id: 40, src: '/galerii pildid/1000012873-01.jpeg', alt: 'Fotograaf: Kristi Kliimann', category: 'ohtujumestus' },
  { id: 21, src: '/galerii pildid/helis_kunnap.jpg', alt: 'Fotograaf: Helis Künnap', category: 'pulmad' },
  { id: 5, src: '/galerii pildid/Liis Vissel_(4).jpg', alt: 'Fotograaf: Liis Vissel', category: 'fotomeik' },
  { id: 37, src: '/galerii pildid/screenshot4.jpg', alt: 'Fotograaf: Carmel Konsin', category: 'ohtujumestus' },
  { id: 14, src: '/galerii pildid/Maigiphotography_(4).jpg', alt: 'Fotograaf: Maigiphotography', category: 'portree' },
  { id: 41, src: '/galerii pildid/IMG_20250626_191244.jpg', alt: 'Fotograaf: Kristi Kliimann', category: 'loomulik' },
  { id: 2, src: '/galerii pildid/Liis Vissel_(1).jpg', alt: 'Fotograaf: Liis Vissel', category: 'ohtujumestus' },
  { id: 32, src: '/galerii pildid/file2.png', alt: 'Fotograaf: Kristi Kliimann', category: 'fotomeik' },
  { id: 11, src: '/galerii pildid/Maigiphotography_.jpg', alt: 'Fotograaf: Maigiphotography', category: 'fotomeik' },
  { id: 8, src: '/galerii pildid/Liis Vissel_(7).jpg', alt: 'Fotograaf: Liis Vissel', category: 'portree' },
  { id: 26, src: '/galerii pildid/Mammukaspildistab.jpg', alt: 'Fotograaf: Mammukaspildistab', category: 'fotomeik' },
  { id: 43, src: '/galerii pildid/IMG_20260428_193449.jpg', alt: 'Fotograaf: Jüri Luht', category: 'ohtujumestus' },
  { id: 17, src: '/galerii pildid/Maigiphotography_(7).jpg', alt: 'Fotograaf: Maigiphotography', category: 'pulmad' },
  { id: 35, src: '/galerii pildid/screenshot2.jpg', alt: 'Fotograaf: Jüri Luht', category: 'portree' },
  { id: 29, src: '/galerii pildid/Sirje Punnar.jpg', alt: 'Fotograaf: Sirje Punnar', category: 'ohtujumestus' },
  { id: 15, src: '/galerii pildid/Maigiphotography_(5).jpg', alt: 'Fotograaf: Maigiphotography', category: 'fotomeik' },
  { id: 24, src: '/galerii pildid/Kadri Parv_.jpg', alt: 'Fotograaf: Kadri Parv', category: 'portree' },
  { id: 38, src: '/galerii pildid/screenshot5.jpg', alt: 'Fotograaf: Carmel Konsin', category: 'portree' },
  { id: 12, src: '/galerii pildid/Maigiphotography_(1).jpg', alt: 'Fotograaf: Maigiphotography', category: 'ohtujumestus' },
  { id: 28, src: '/galerii pildid/Rein Leib.jpg', alt: 'Fotograaf: Rein Leib', category: 'portree' },
  { id: 6, src: '/galerii pildid/Liis Vissel_(5).jpg', alt: 'Fotograaf: Liis Vissel', category: 'ohtujumestus' },
  { id: 30, src: '/galerii pildid/file.png', alt: 'Fotograaf: Kristi Kliimann', category: 'portree' },
  { id: 18, src: '/galerii pildid/Maigiphotography_(8).jpg', alt: 'Fotograaf: Maigiphotography', category: 'fotomeik' },
  { id: 42, src: '/galerii pildid/IMG_20260302_120502_674.webp', alt: 'Fotograaf: Kristi Kliimann', category: 'ohtujumestus' },
  { id: 9, src: '/galerii pildid/Liis Vissel_(8).jpg', alt: 'Fotograaf: Liis Vissel', category: 'pulmad' },
  { id: 33, src: '/galerii pildid/file3.png', alt: 'Fotograaf: Kristi Kliimann', category: 'ohtujumestus' },
  { id: 13, src: '/galerii pildid/Maigiphotography_(3).jpg', alt: 'Fotograaf: Maigiphotography', category: 'loomulik' },
  { id: 27, src: '/galerii pildid/Mammukaspildistab_.jpg', alt: 'Fotograaf: Mammukaspildistab', category: 'fotomeik' },
  { id: 4, src: '/galerii pildid/Liis Vissel_(3).jpg', alt: 'Fotograaf: Liis Vissel', category: 'ohtujumestus' },
  { id: 36, src: '/galerii pildid/screenshot3.jpg', alt: 'Fotograaf: Maigiphotography', category: 'fotomeik' },
  { id: 20, src: '/galerii pildid/Maigiphotography.jpg', alt: 'Fotograaf: Maigiphotography', category: 'portree' },
  { id: 31, src: '/galerii pildid/file1.png', alt: 'Fotograaf: Kristi Kliimann', category: 'ohtujumestus' },
  { id: 25, src: '/galerii pildid/Kairi Naha.jpg', alt: 'Fotograaf: Kairi Naha', category: 'loomulik' },
  { id: 16, src: '/galerii pildid/Maigiphotography_(6).jpg', alt: 'Fotograaf: Maigiphotography', category: 'ohtujumestus' },
  { id: 10, src: '/galerii pildid/Liis Vissel_(9).jpg', alt: 'Fotograaf: Liis Vissel', category: 'ohtujumestus' },
];

export default function Gallery() {
  const [lightboxImage, setLightboxImage] = useState(null)

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-ivory pt-20">
        <div className="absolute inset-0">
          <img
            src="/taust_1.png"
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
            Galerii
          </motion.h1>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image) => (
              <FadeInView key={image.id}>
                <div
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
                </div>
              </FadeInView>
            ))}
          </div>
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
              className="max-w-[90%] max-h-[90vh] object-contain cursor-default shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}