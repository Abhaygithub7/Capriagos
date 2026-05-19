import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export function useCountUp(end, options = {}) {
  const {
    duration = 2,
    start = 0,
    decimalPlaces = 0,
    prefix = '',
    suffix = '',
    shouldAnimate = true,
  } = options;

  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isInView || !shouldAnimate) {
      return;
    }

    const startTime = performance.now();
    const difference = end - start;

    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + difference * easeOut;

      setCount(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, end, start, duration, shouldAnimate]);

  const formatted = decimalPlaces > 0
    ? count.toFixed(decimalPlaces)
    : Math.round(count).toLocaleString();

  return {
    ref,
    count: `${prefix}${formatted}${suffix}`,
    rawCount: count,
    isInView,
  };
}

export default useCountUp;