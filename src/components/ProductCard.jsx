import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useParallaxTilt, useMagnetic } from '../hooks';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, index, onProductClick, isWishlisted, onToggleWishlist }) {
  const { addItem, openCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const { ref: tiltRef, style: tiltStyle, handlers: tiltHandlers } = useParallaxTilt(3);
  const { ref: magneticRef, style: magneticStyle, handlers: magneticHandlers } = useMagnetic(0.15);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    onProductClick?.(product);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist?.(product);
  };

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={tiltRef}
        style={tiltStyle}
        {...tiltHandlers}
      >
        <a
          href={`#product-${product.id}`}
          className={styles.link}
          onClick={handleCardClick}
          data-cursor="product"
        >
          <div className={styles.imageContainer}>
            <motion.div
              layoutId={`product-image-${product.id}`}
              className={styles.imageWrapper}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={product.image}
                alt={product.name}
                className={styles.image}
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className={styles.quickAdd}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={14} />
                Quick Add
              </motion.button>
            </motion.div>

            <motion.button
              ref={magneticRef}
              className={`${styles.wishlistButton} ${isWishlisted ? styles.wishlisted : ''}`}
              style={magneticStyle}
              {...magneticHandlers}
              onClick={handleWishlistClick}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                size={18}
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </motion.button>

            {product.featured && (
              <span className={styles.featuredBadge}>Featured</span>
            )}
          </div>

          <div className={styles.info}>
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.price}>₹{product.price.toLocaleString()}</p>
            {product.sizes && (
              <div className={styles.sizes}>
                {product.sizes.slice(0, 3).map((size) => (
                  <span key={size} className={styles.sizeDot} title={size} />
                ))}
                {product.sizes.length > 3 && (
                  <span className={styles.moreSizes}>+{product.sizes.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </a>
      </div>
    </motion.article>
  );
}