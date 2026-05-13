import { motion } from 'framer-motion';
import { useCountUp } from '../hooks';
import styles from './StoryPage.module.css';

const stats = [
  { value: 1200, suffix: '+', label: 'pieces rehomed' },
  { value: 0, suffix: '', label: 'new garments produced' },
  { value: '∞', suffix: '', label: 'stories continued' },
];

const steps = [
  { icon: '🔍', title: 'Found', description: 'Sourcing unique pieces from closets and markets' },
  { icon: '✨', title: 'Cleaned', description: 'Each item is washed, pressed, and restored' },
  { icon: '📸', title: 'Photographed', description: 'Captured with care to show every detail' },
  { icon: '❤️', title: 'Loved Again', description: 'Finding their way to someone new' },
];

export default function StoryPage() {
  return (
    <div className={styles.page}>
      <motion.section
        className={styles.opening}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.p
          className={styles.openingLine}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Every piece has a past
        </motion.p>
      </motion.section>

      <section className={styles.section}>
        <div className={styles.twoColumn}>
          <motion.div
            className={styles.originImage}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=600&fit=crop"
              alt="The Founders"
            />
          </motion.div>
          <div className={styles.originContent}>
            <span className={styles.sectionLabel}>The Origin</span>
            <p className={styles.handwrittenText}>
              Capriagos started with a simple belief: every piece of clothing holds a story.
              We founded this space to give pre-loved fashion a second chance while honoring
              the journeys these garments have already taken.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.statsStrip}>
        {stats.map((stat, index) => {
          const { ref, count } = useCountUp(stat.value, { duration: 2, start: 0 });
          return (
            <motion.div
              key={stat.label}
              ref={ref}
              className={styles.stat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <span className={styles.statNumber}>
                {stat.value === '∞' ? stat.value : count}{stat.suffix}
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          );
        })}
      </section>

      <section className={styles.processSection}>
        <h2 className={styles.sectionTitle}>The Process</h2>
        <div className={styles.processSteps}>
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className={styles.processStep}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <span className={styles.stepIcon}>{step.icon}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.letterSection}>
        <motion.div
          className={styles.letter}
          initial={{ opacity: 0, rotate: -1 }}
          whileInView={{ opacity: 1, rotate: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p>
            Dear Future Keeper,
            <br /><br />
            This garment has traveled to reach you. It has been worn to celebrations,
            kept in closets, forgotten, remembered, and now — reborn.
            <br /><br />
            Please treat it with the same love it once knew.
            <br /><br />
            With hope,
            <br />
            The Capriagos Team
          </p>
        </motion.div>
      </section>

      <section className={styles.promiseSection}>
        <motion.h2
          className={styles.promiseText}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          We promise to never sell fast fashion. Ever.
        </motion.h2>
        <motion.div
          className={styles.promiseLine}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </section>
    </div>
  );
}