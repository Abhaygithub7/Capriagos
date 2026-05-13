import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 28 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const tagName = target.tagName.toLowerCase();

      if (target.closest('a') || target.closest('button') || tagName === 'button' || tagName === 'a') {
        setIsHovering(true);
        setCursorText('');
      } else if (target.closest('[data-cursor="product"]')) {
        setIsHovering(true);
        setCursorText('VIEW');
      } else if (target.closest('[data-cursor="drag"]')) {
        setIsDragging(true);
        setCursorText('DRAG →');
      } else {
        setIsHovering(false);
        setIsDragging(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      <motion.div
        className={styles.cursorRing}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovering || isDragging ? 1.5 : 1,
        }}
      >
        {cursorText && (
          <span className={styles.cursorText}>{cursorText}</span>
        )}
      </motion.div>
      <motion.div
        className={styles.cursorDot}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}

export default CustomCursor;