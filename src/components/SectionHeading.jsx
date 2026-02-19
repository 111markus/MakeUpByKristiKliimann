import { motion } from 'framer-motion'

export default function SectionHeading({ subtitle, title, description, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center mb-14 lg:mb-20"
    >
      {subtitle && (
        <p className={`text-xs tracking-[0.3em] uppercase mb-4 ${light ? 'text-cream/50' : 'text-soft-gray'}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6 ${light ? 'text-cream' : 'text-dark'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light ${light ? 'text-cream/70' : 'text-warm-gray'}`}>
          {description}
        </p>
      )}
      <div className={`w-16 h-[1px] mx-auto mt-6 ${light ? 'bg-rose' : 'bg-rose'}`} />
    </motion.div>
  )
}
