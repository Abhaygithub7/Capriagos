import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

const products = [
  {
    id: 1,
    name: 'Rust Orange Top',
    price: 799,
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=400&h=533&fit=crop',
    category: 'Tops',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 2,
    name: 'Red Wavy Knit',
    price: 649,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=533&fit=crop',
    category: 'Tops',
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 3,
    name: 'Criss Cross Back Pink',
    price: 899,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=533&fit=crop',
    category: 'Tops',
    featured: true,
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 4,
    name: 'Plaid Pattern Shirt',
    price: 749,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=533&fit=crop',
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 5,
    name: 'Vintage Denim Jacket',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=533&fit=crop',
    category: 'Outerwear',
    featured: true,
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 6,
    name: 'Cream Cable Sweater',
    price: 899,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=533&fit=crop',
    category: 'Tops',
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 7,
    name: 'Olive Cargo Pants',
    price: 999,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=533&fit=crop',
    category: 'Bottoms',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 8,
    name: 'Floral Midi Dress',
    price: 1149,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=533&fit=crop',
    category: 'Dresses',
    featured: true,
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 9,
    name: 'Brown Corduroy Set',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1551028919-ac66e6a33654?w=400&h=533&fit=crop',
    category: 'Outerwear',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 10,
    name: 'Pink Hoodie Premium',
    price: 849,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=533&fit=crop',
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 11,
    name: 'Navy Linen Blazer',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=533&fit=crop',
    category: 'Outerwear',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 12,
    name: 'Beige Wide Leg Trousers',
    price: 949,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=533&fit=crop',
    category: 'Bottoms',
    sizes: ['S', 'M', 'L', 'XL'],
  }
];

const filters = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Dresses'];

export default function ProductGrid({ onProductClick, isWishlisted, onToggleWishlist }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = activeFilter === 'All'
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Latest Arrivals</h2>
          <p className={styles.subtitle}>Curated just for you</p>
        </motion.div>

        <motion.div className={styles.filters}>
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div
                  className={styles.filterUnderline}
                  layoutId="filterUnderline"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
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
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}