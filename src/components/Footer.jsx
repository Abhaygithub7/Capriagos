import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const shopLinks = ['Story', 'Contact Us', "FAQ's"];
const policyLinks = ['Privacy Policy', 'Shipping & Delivery Policy', 'No Return & Exchange Policy', 'Terms of Service'];

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <motion.div
          className={styles.mission}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.missionText}>Pre-loved with purpose.</p>
          <p className={styles.missionSubtext}>Sustainable fashion for conscious consumers</p>
        </motion.div>

        <div className={styles.links}>
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className={styles.columnTitle}>Shop</h4>
            <ul className={styles.list}>
              {shopLinks.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.link}>{link}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className={styles.columnTitle}>Help</h4>
            <ul className={styles.list}>
              {policyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.link}>{link}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className={styles.columnTitle}>Connect</h4>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
            </div>
            <p className={styles.email}>hello@capriagos.com</p>
          </motion.div>
        </div>

        <motion.div
          className={styles.bottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className={styles.copyright}>© 2026 Capriagos. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}