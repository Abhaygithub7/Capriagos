import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import styles from './CollectionPage.module.css';

const filters = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories'];

const womenProducts = [
  { id: 1, name: 'Rust Silk Slip', price: 799, image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=400&h=533&fit=crop', category: 'Dresses', sizes: ['XS', 'S', 'M'], featured: true },
  { id: 2, name: 'Cream Linen Blouse', price: 649, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=533&fit=crop', category: 'Tops', sizes: ['S', 'M', 'L'] },
  { id: 3, name: 'Terracotta Wrap Dress', price: 1149, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=533&fit=crop', category: 'Dresses', sizes: ['S', 'M', 'L', 'XL'], featured: true },
  { id: 4, name: 'Vintage Floral Midi', price: 899, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=533&fit=crop', category: 'Dresses', sizes: ['S', 'M', 'L'] },
  { id: 5, name: 'Beige Wide Leg Trousers', price: 749, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=533&fit=crop', category: 'Bottoms', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 6, name: 'Sage Green Cardigan', price: 899, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=533&fit=crop', category: 'Outerwear', sizes: ['S', 'M', 'L'] },
  { id: 7, name: 'Rust Corduroy Skirt', price: 599, image: 'https://images.unsplash.com/photo-1551028919-ac66e6a33654?w=400&h=533&fit=crop', category: 'Bottoms', sizes: ['XS', 'S', 'M', 'L'] },
  { id: 8, name: 'Embroidered Kaftan', price: 1599, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=533&fit=crop', category: 'Dresses', sizes: ['M', 'L', 'XL'], featured: true },
];

export default function WomenPage({ onProductClick, isWishlisted, onToggleWishlist }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = activeFilter === 'All'
    ? womenProducts
    : womenProducts.filter(p => p.category === activeFilter);

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.hero}
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=800&fit=crop"
          alt="Women's Collection"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Dressed with intention
        </motion.h1>
        <span className={styles.categoryLabel}>women&apos;s</span>
      </motion.div>

      <div className={styles.container}>
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
                  layoutId="womenFilterUnderline"
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
              className={product.featured ? styles.featuredCard : ''}
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