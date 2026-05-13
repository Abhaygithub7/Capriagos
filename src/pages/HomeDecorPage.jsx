import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import styles from './CollectionPage.module.css';

const tabs = ['All', 'Textiles', 'Ceramics', 'Art', 'Books', 'Decor'];

const homeProducts = [
  { id: 301, name: 'Handwoven Throw', price: 1299, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=533&fit=crop', category: 'Textiles', sizes: ['One Size'], featured: true },
  { id: 302, name: 'Ceramic Vase Set', price: 899, image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=533&fit=crop', category: 'Ceramics', sizes: ['Set'] },
  { id: 303, name: 'Vintage Art Print', price: 1499, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=533&fit=crop', category: 'Art', sizes: ['A3', 'A2'] },
  { id: 304, name: 'Linen Cushion Cover', price: 399, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=533&fit=crop', category: 'Textiles', sizes: ['45x45'] },
  { id: 305, name: 'Brass Candle Holder', price: 599, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=533&fit=crop', category: 'Decor', sizes: ['Small', 'Large'] },
  { id: 306, name: 'Antique Book Collection', price: 2499, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=533&fit=crop', category: 'Books', sizes: ['Set of 3'], featured: true },
];

const curatedSets = [
  { name: 'A Sunday Morning', items: [homeProducts[0], homeProducts[1], homeProducts[3]] },
  { name: 'Evening Ambience', items: [homeProducts[4], homeProducts[5]] },
];

export default function HomeDecorPage({ onProductClick, isWishlisted, onToggleWishlist }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProducts = activeTab === 'All'
    ? homeProducts
    : homeProducts.filter(p => p.category === activeTab);

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.hero}
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop"
          alt="Home Collection"
          className={styles.heroImage}
          style={{ transform: 'scale(1.08)' }}
        />
        <motion.div
          className={styles.heroOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Objects with<br />a past life
        </motion.h1>
        <span className={styles.categoryLabel}>home</span>
      </motion.div>

      <div className={styles.container}>
        <motion.div className={styles.tabBar} style={{ display: 'flex', gap: '24px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
          {tabs.map((tab, index) => (
            <motion.button
              key={tab}
              className={`${styles.filterBtn} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        <motion.div className={styles.grid} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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

        <div style={{ marginTop: '80px' }}>
          <h2 style={{ fontFamily: 'var(--font-handwritten)', fontSize: '32px', color: 'var(--color-cream)', marginBottom: '40px', textAlign: 'center' }}>
            Style It Together
          </h2>
          {curatedSets.map((set, index) => (
            <motion.div
              key={set.name}
              className={styles.curatedSet}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              style={{ marginBottom: '60px' }}
            >
              <h3 style={{ fontFamily: 'Caveat', fontSize: '24px', color: 'var(--color-rust)', marginBottom: '24px' }}>{set.name}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {set.items.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    index={0}
                    onProductClick={onProductClick}
                    isWishlisted={isWishlisted?.(item.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}