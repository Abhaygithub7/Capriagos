import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import styles from './CollectionPage.module.css';

const sortOptions = ['Newest', 'Price', 'Colour'];

const unisexProducts = [
  { id: 201, name: 'Oversized Tee Bundle', price: 599, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=533&fit=crop', category: 'Tops', sizes: ['XS', 'S', 'M', 'L', 'XL'], featured: true },
  { id: 202, name: 'Utility Jumpsuit', price: 1599, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=533&fit=crop', category: 'Dresses', sizes: ['S', 'M', 'L'] },
  { id: 203, name: 'Wide Linen Pants', price: 899, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=533&fit=crop', category: 'Bottoms', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 204, name: 'Mesh Overlay Top', price: 699, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=533&fit=crop', category: 'Tops', sizes: ['S', 'M', 'L'] },
  { id: 205, name: 'Cargo Skirt', price: 749, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=533&fit=crop', category: 'Bottoms', sizes: ['XS', 'S', 'M', 'L'] },
  { id: 206, name: 'Cropped Hoodie', price: 799, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=533&fit=crop', category: 'Tops', sizes: ['S', 'M', 'L'], featured: true },
];

export default function UnisexPage({ onProductClick, isWishlisted, onToggleWishlist }) {
  const [activeSort, setActiveSort] = useState('Newest');

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <img
          src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&h=800&fit=crop"
          alt="Unisex Collection"
          className={styles.heroImage}
        />
        <motion.h1
          className={styles.heroTitle}
          style={{ textAlign: 'center', bottom: '50%', transform: 'translateY(50%)' }}
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Wear what speaks<br />to you
        </motion.h1>
        <span className={styles.categoryLabel}>unisex</span>

        <div className={styles.ambientRing}>
          pre-loved · sustainable · one of a kind · pre-loved · sustainable ·
        </div>
      </motion.div>

      <div className={styles.container}>
        <div className={styles.sortBar}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '1px' }}>Sort by:</span>
          {sortOptions.map((option) => (
            <button
              key={option}
              className={`${styles.filterBtn} ${activeSort === option ? styles.active : ''}`}
              onClick={() => setActiveSort(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <p className={styles.countText}>
          {unisexProducts.length} pieces found
        </p>

        <motion.div
          className={styles.masonryGrid}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
        >
          {unisexProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
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