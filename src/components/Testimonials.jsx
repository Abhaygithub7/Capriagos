import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    text: "The quality is amazing! Each piece feels so special, and I love that I'm contributing to sustainable fashion.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    location: 'Delhi',
    text: "Best thrift experience ever. The handwritten note with my order was such a thoughtful touch!",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Sofia Rahman',
    location: 'Bangalore',
    text: "Finally a pre-loved brand that gets it right. Beautiful curation and excellent condition of all items.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Chennai',
    text: "The packaging was incredible - felt like opening a gift. Will definitely order again!",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  }
];

export default function Testimonials() {
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
          <span className={styles.tag}>Testimonials</span>
          <h2 className={styles.title}>Loved by You</h2>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className={styles.quoteIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
                </svg>
              </div>

              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>

              <p className={styles.text}>"{testimonial.text}"</p>

              <div className={styles.author}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className={styles.avatar}
                />
                <div className={styles.authorInfo}>
                  <span className={styles.name}>{testimonial.name}</span>
                  <span className={styles.location}>{testimonial.location}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}