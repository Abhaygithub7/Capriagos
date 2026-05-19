import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export function useLQIP(src) {
  const [isLoaded, setIsLoaded] = useState(false);
  const localRef = useRef(null);
  const inView = useInView(localRef, { once: true, margin: '200px' });

  useEffect(() => {
    if (!src || !inView) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setIsLoaded(true);
    };
  }, [src, inView]);

  return {
    ref: localRef,
    isLoaded,
    shouldShowPlaceholder: !isLoaded && inView,
    shouldShowFullImage: isLoaded,
  };
}

export default useLQIP;