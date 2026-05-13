import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem } = useCart();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.wrapper}>
          <motion.div
            className={styles.backdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeCart}
          />

          <motion.aside
            className={styles.drawer}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.header}>
              <h3 className={styles.title}>Your Cart</h3>
              <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={styles.content}>
              {items.length === 0 ? (
                <div className={styles.empty}>
                  <p className={styles.emptyText}>Your cart is empty</p>
                  <p className={styles.emptySubtext}>Add some pre-loved treasures</p>
                </div>
              ) : (
                <ul className={styles.items}>
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.li
                        key={`${item.id}-${index}`}
                        className={styles.item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.itemImage}
                        />
                        <div className={styles.itemInfo}>
                          <h4 className={styles.itemName}>{item.name}</h4>
                          <p className={styles.itemPrice}>₹{item.price.toFixed(2)}</p>
                        </div>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.total}>
                  <span>Total</span>
                  <span className={styles.totalPrice}>₹{total.toFixed(2)}</span>
                </div>
                <button className={styles.checkoutBtn}>
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}