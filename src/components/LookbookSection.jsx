import { useRef, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import styles from './LookbookSection.module.css';

const LOOKBOOK_IMAGES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    caption: 'The Art of Layering',
    description: 'Building depth with textures from different eras',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    caption: 'Silk & Stone',
    description: 'The interplay of luxurious fabric against raw earth tones',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
    caption: 'Evening Drift',
    description: 'Transition pieces that carry you from day to night',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
    caption: 'Quiet Revolution',
    description: 'Subtle silhouettes that speak volumes',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80',
    caption: 'The Archive',
    description: 'Recalling the classics, reimagined for today',
  },
];

export function LookbookSection() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  return (
    <section className={styles.lookbook}>
      <div className={styles.header}>
        <h2 className={styles.title}>The Lookbook</h2>
        <p className={styles.subtitle}>Editorial moments from our latest collection</p>
      </div>

      <div
        ref={containerRef}
        className={styles.scrollContainer}
        data-cursor="drag"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <motion.div
          className={styles.cards}
          drag="x"
          dragConstraints={{ left: -1200, right: 0 }}
          dragElastic={0.05}
          dragTransition={{ power: 0.3, timeConstant: 200 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {LOOKBOOK_IMAGES.map((item, index) => (
            <motion.article
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.caption} />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.caption}>
                <span className={styles.number}>0{index + 1}</span>
                <h3 className={styles.captionTitle}>{item.caption}</h3>
                <p className={styles.captionDesc}>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className={styles.dragHint}>
        <span className={isDragging ? styles.hidden : ''}>← Drag to explore →</span>
      </div>
    </section>
  );
}

export default LookbookSection;