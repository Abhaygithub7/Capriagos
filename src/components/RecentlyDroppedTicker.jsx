import { motion } from 'framer-motion';
import styles from './RecentlyDroppedTicker.module.css';

const TICKER_ITEMS = [
  'Just added: Rust Silk Slip · ₹799',
  'Now live: Vintage Cord Blazer · ₹1,499',
  'New arrival: Hand-embroidered Kaftan · ₹2,100',
  'Fresh drop: 90s Levi\'s 501 · ₹1,850',
];

export function RecentlyDroppedTicker() {
  return (
    <div className={styles.tickerWrapper}>
      <motion.div
        className={styles.ticker}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <span className={styles.label}>Just Dropped</span>
        <div className={styles.marquee}>
          <div className={styles.marqueeContent}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
              <span key={index} className={styles.item}>
                {item}
                <span className={styles.separator}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RecentlyDroppedTicker;