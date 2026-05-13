import { useEffect, useState } from 'react';
import { useAnimate, useInView } from 'framer-motion';

export function usePageEntrance() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const sequence = async () => {
    if (!scope.current) return;

    const elements = scope.current.querySelectorAll('[data-animate]');
    const entranceOrder = parseInt(elements[0]?.dataset.animate || '0', 10);

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const order = parseInt(el.dataset.animate || '0', 10);

      if (order === entranceOrder) {
        await animate(
          el,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        );
      }
    }
  };

  useEffect(() => {
    if (isLoaded) {
      sequence();
    }
  }, [isLoaded, scope]);

  return { scope, isLoaded, animate };
}

export function useStaggeredEntrance(itemCount, options = {}) {
  const {
    initialDelay = 0,
    staggerDelay = 0.06,
    duration = 0.5,
    ease = [0.22, 1, 0.36, 1],
  } = options;

  const [isInView, setIsInView] = useState(false);
  const ref = useInView({ once: true, margin: '-100px' });

  useEffect(() => {
    if (ref) {
      setIsInView(true);
    }
  }, [ref]);

  return { ref, isInView, staggerDelay, duration, ease, initialDelay };
}

export default usePageEntrance;