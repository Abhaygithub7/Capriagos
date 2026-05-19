import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Hero.module.css';

const categories = [
  { label: "Women's Collection", href: '#women' },
  { label: "Men's Collection", href: '#men' }
];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section className={styles.hero} ref={containerRef}>
      <motion.div className={styles.bgContainer} style={{ y, scale }}>
        <div className={styles.bgPattern} />
      </motion.div>

      <div className={styles.content}>
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          A Pre-Loved Brand
        </motion.p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Sustainable Fashion
          <br />
          <span className={styles.titleAccent}>For Conscious Consumers</span>
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Every piece tells a story. Every purchase makes a difference.
          <br />
          Discover curated pre-loved fashion with purpose.
        </motion.p>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className={styles.ctaLabel}>Select a category</span>
          <div className={styles.categories}>
            {categories.map((cat) => (
              <motion.a
                key={cat.label}
                href={cat.href}
                className={styles.categoryBtn}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {cat.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path d="M8 0v20M1 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </section>
  );
}