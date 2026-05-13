import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export function useLQIP(src, placeholderSrc) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const localRef = useRef(null);
  const inView = useInView(localRef, { once: true, margin: '200px' });

  useEffect(() => {
    if (inView && !hasEnteredView) {
      setHasEnteredView(true);
    }
  }, [inView, hasEnteredView]);

  useEffect(() => {
    if (!src || !hasEnteredView) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setIsLoaded(true);
    };
  }, [src, hasEnteredView]);

  return {
    ref: localRef,
    isLoaded,
    shouldShowPlaceholder: !isLoaded && hasEnteredView,
    shouldShowFullImage: isLoaded,
  };
}

export default useLQIP;