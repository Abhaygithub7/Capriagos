import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './StorySection.module.css';

export default function StorySection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className={styles.section} id="story" ref={sectionRef}>
      <motion.div className={styles.bgParallax} style={{ y }} />

      <div className={styles.container}>
        <div className={styles.content}>
          <motion.span
            className={styles.tag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.span>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Pre-loved with Purpose
          </motion.h2>

          <motion.div
            className={styles.letter}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className={styles.letterContent}>
              <p className={styles.handwritten}>
                "When we packed this handwritten letter, we hoped it would bring joy to your doorstep..."
              </p>
              <p className={styles.body}>
                Every piece in our collection has a history. We believe in giving clothing a second life,
                reducing waste, and making sustainable fashion accessible to everyone.
              </p>
            </div>
            <div className={styles.letterDecoration}>
              <svg viewBox="0 0 100 20" className={styles.divider}>
                <path d="M0,10 Q25,0 50,10 T100,10" stroke="currentColor" fill="none" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Items Rescued</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Sustainable</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>∞</span>
              <span className={styles.statLabel}>Love Given</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.imageGrid}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className={styles.imageWrapper1}>
            <img
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=500&fit=crop"
              alt="Sustainable fashion"
              className={styles.image}
              loading="lazy"
            />
          </div>
          <div className={styles.imageWrapper2}>
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop"
              alt="Curated collection"
              className={styles.image}
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}