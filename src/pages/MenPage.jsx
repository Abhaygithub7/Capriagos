import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import styles from './CollectionPage.module.css';

const filters = ['All', 'Shirts', 'Trousers', 'Outerwear', 'Knitwear', 'Accessories'];

const menProducts = [
  { id: 101, name: 'Vintage Cord Blazer', price: 1499, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=533&fit=crop', category: 'Outerwear', sizes: ['M', 'L', 'XL'], featured: true },
  { id: 102, name: '90s Levi\'s 501', price: 1850, image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=533&fit=crop', category: 'Trousers', sizes: ['S', 'M', 'L', 'XL'], featured: true },
  { id: 103, name: 'Navy Linen Shirt', price: 799, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=533&fit=crop', category: 'Shirts', sizes: ['S', 'M', 'L'] },
  { id: 104, name: 'Wool Blend Coat', price: 2499, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=533&fit=crop', category: 'Outerwear', sizes: ['M', 'L', 'XL'], featured: true },
  { id: 105, name: 'Cream Cable Sweater', price: 999, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=533&fit=crop', category: 'Knitwear', sizes: ['S', 'M', 'L'] },
  { id: 106, name: 'Olive Cargo Pants', price: 899, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=533&fit=crop', category: 'Trousers', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 107, name: 'Plaid Flannel Shirt', price: 749, image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=400&h=533&fit=crop', category: 'Shirts', sizes: ['S', 'M', 'L'] },
  { id: 108, name: 'Brown Leather Belt', price: 399, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=533&fit=crop', category: 'Accessories', sizes: ['M', 'L'] },
];

export default function MenPage({ onProductClick, isWishlisted, onToggleWishlist }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = activeFilter === 'All'
    ? menProducts
    : menProducts.filter(p => p.category === activeFilter);

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.hero}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.heroSplit}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
            alt="Men's Collection"
            className={styles.heroImage}
          />
          <div className={styles.heroContent}>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Structured<br />restraint
            </motion.h1>
            <motion.p
              className={styles.heroStats}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {menProducts.length} one-of-a-kind pieces
            </motion.p>
          </div>
        </div>
        <div className={styles.heroOverlay} />
        <span className={styles.categoryLabel}>men&apos;s</span>
      </motion.div>

      <div className={styles.container} style={{ background: 'rgba(45, 58, 46, 0.08)' }}>
        <motion.div className={styles.filterBar}>
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div
                  className={styles.filterUnderline}
                  layoutId="menFilterUnderline"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <p className={styles.countText}>
          {filteredProducts.length} pieces found
        </p>

        <motion.div className={styles.grid}>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <ProductCard
                product={product}
                index={index}
                onProductClick={onProductClick}
                isWishlisted={isWishlisted?.(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}