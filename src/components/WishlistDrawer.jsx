import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import styles from './WishlistDrawer.module.css';

export function WishlistDrawer({ isOpen, onClose, wishlist, onRemove, onMoveToCart }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.drawerWrapper}>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Wishlist</h2>
              <button className={styles.closeButton} onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.content}>
              {wishlist.length === 0 ? (
                <div className={styles.empty}>
                  <p>Your wishlist is empty</p>
                  <span>Save pieces you love for later</span>
                </div>
              ) : (
                <div className={styles.items}>
                  {wishlist.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className={styles.item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      exit={{ opacity: 0, x: 100 }}
                    >
                      <div className={styles.itemImage}>
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className={styles.itemDetails}>
                        <span className={styles.itemCategory}>{item.category}</span>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <p className={styles.itemPrice}>₹{item.price.toLocaleString()}</p>
                        <div className={styles.itemActions}>
                          <button
                            className={styles.moveToCartButton}
                            onClick={() => onMoveToCart(item)}
                          >
                            <ShoppingBag size={14} />
                            Move to Bag
                          </button>
                          <button
                            className={styles.removeButton}
                            onClick={() => onRemove(item.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )
      }
    </AnimatePresence>
  );
}

export default WishlistDrawer;