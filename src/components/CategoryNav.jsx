import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './CategoryNav.module.css';

const categories = [
  { id: 'women', label: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop', route: '/women' },
  { id: 'men', label: 'Men', image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&h=500&fit=crop', route: '/men' },
  { id: 'unisex', label: 'Unisex', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop', route: '/unisex' },
  { id: 'home', label: 'Home', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop', route: '/home-decor' }
];

export default function CategoryNav() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Shop by Category
        </motion.h2>

        <div className={styles.grid}>
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link to={cat.route} className={styles.card}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className={styles.image}
                      loading="lazy"
                    />
                    <div className={styles.overlay} />
                  </div>
                  <span className={styles.label}>{cat.label}</span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}