import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Heart, ShoppingBag } from 'lucide-react';
import styles from './ProductDetailModal.module.css';

export function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    onAddToCart({ ...product, size: selectedSize, quantity });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modalWrapper}>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <X size={24} />
            </button>

            <div className={styles.content}>
              <div className={styles.imageSection}>
                <motion.div
                  layoutId={`product-image-${product.id}`}
                  className={styles.mainImage}
                >
                  <img src={images[activeImageIndex]} alt={product.name} />
                </motion.div>

                {images.length > 1 && (
                  <div className={styles.thumbnailStrip}>
                    {images.map((img, index) => (
                      <button
                        key={index}
                        className={`${styles.thumbnail} ${index === activeImageIndex ? styles.active : ''}`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img src={img} alt={`${product.name} view ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.detailsSection}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className={styles.category}>{product.category}</span>
                </motion.div>

                <motion.h2
                  className={styles.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {product.name}
                </motion.h2>

                <motion.p
                  className={styles.price}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  ₹{product.price.toLocaleString()}
                </motion.p>

                <motion.p
                  className={styles.description}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {product.description}
                </motion.p>

                <motion.div
                  className={styles.sizeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className={styles.sizeLabel}>Select Size</span>
                  <div className={styles.sizeOptions}>
                    {product.sizes?.map((size) => (
                      <button
                        key={size}
                        className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className={styles.quantitySection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <span className={styles.quantityLabel}>Quantity</span>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className={styles.quantityButton}
                    >
                      <Minus size={16} />
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className={styles.quantityButton}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  className={styles.actions}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    className={styles.addToCartButton}
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                  >
                    <ShoppingBag size={18} />
                    Add to Bag
                  </button>
                  <button
                    className={styles.wishlistButton}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart
                      size={20}
                      fill={isWishlisted ? 'currentColor' : 'none'}
                    />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ProductDetailModal;