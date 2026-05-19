import { useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export function useScrollProgress(options = {}) {
  const {
    target = undefined,
    offset = ['start end', 'end start'],
  } = options;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: target || containerRef,
    offset,
  });

  const getClampedProgress = (min = 0, max = 1) => {
    return Math.max(min, Math.min(max, scrollYProgress.get()));
  };

  return {
    containerRef,
    scrollYProgress,
    getClampedProgress,
  };
}

export function useSectionScrollProgress(sectionRef) {
  const progress = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', () => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const start = rect.top - windowHeight;
    const end = rect.bottom;
    const total = end - start;

    progress.current = Math.max(0, Math.min(1, -start / total));
  });

  return progress;
}

export default useScrollProgress;