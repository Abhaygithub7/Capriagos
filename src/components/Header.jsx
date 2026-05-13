import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

const menuItems = [
  { label: 'Women', route: '/women' },
  { label: 'Men', route: '/men' },
  { label: 'Unisex', route: '/unisex' },
  { label: 'Home', route: '/home-decor' },
  { label: 'Story', route: '/story' },
  { label: 'Contact', route: '/contact' }
];

const navVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    y: 30,
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleCart, itemCount } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <button
            className={styles.menuBtn}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>

          <Link to="/" className={styles.logo}>
            <Logo className={styles.logoSvg} />
          </Link>

          <button className={styles.cartBtn} onClick={toggleCart} aria-label="Open cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
              <path d="M6 6L5 3H2" />
            </svg>
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  className={styles.cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className={styles.overlayBg}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
            />

            <motion.ul
              className={styles.navList}
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {menuItems.map((item, index) => (
                <motion.li key={item.label} variants={itemVariants}>
                  <Link
                    to={item.route}
                    className={styles.navLink}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={styles.navIndex}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className={styles.overlayFooter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className={styles.overlayTagline}>
                Pre-loved with purpose
              </p>
              <p className={styles.overlaySubtext}>
                Sustainable fashion for conscious consumers
              </p>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}