import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './NewsletterSection.module.css';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.content}>
        {isSubmitted ? (
          <motion.div
            className={styles.success}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span className={styles.successIcon}>✓</span>
            <h3 className={styles.successTitle}>You&apos;re on the list</h3>
            <p className={styles.successText}>Welcome to the Capriagos circle</p>
          </motion.div>
        ) : (
          <>
            <span className={styles.label}>Join the Circle</span>
            <h2 className={styles.title}>Stories, first dibs, slow updates</h2>
            <p className={styles.description}>
              No spam. Just the occasional note when something worth sharing arrives.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
                <svg className={styles.inputBorder} viewBox="0 0 200 40">
                  <path
                    d="M0,20 Q50,0 100,20 Q150,40 200,20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <button type="submit" className={styles.submitButton}>
                <span>Subscribe</span>
                <div className={styles.liquidFill} />
              </button>
            </form>
          </>
        )}
      </div>

      <div className={styles.texture} />
    </section>
  );
}

export default NewsletterSection;