import { useState, useEffect } from 'react';

export function useScrollable(ref, deps = []) {
  const [canScroll, setCanScroll] = useState(false);

  const checkForOverflow = () => {
    if (!ref.current) {
      return;
    }
    const { scrollWidth, clientWidth } = ref.current;
    setCanScroll(scrollWidth > clientWidth);
  };

  useEffect(() => {
    checkForOverflow();
    window.addEventListener('resize', checkForOverflow);
    return () => window.removeEventListener('resize', checkForOverflow);
  }, [ref, ...deps]);

  return canScroll;
}
