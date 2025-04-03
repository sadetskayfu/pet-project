import { useState, useEffect, useCallback } from 'react';
import throttle from 'lodash/throttle';

export const useWindowWidth = (throttleDelay: number = 500) => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const throttledHandleResize = throttle(handleResize, throttleDelay, {
      leading: true,
      trailing: true,
    });

    window.addEventListener('resize', throttledHandleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', throttledHandleResize);
      throttledHandleResize.cancel();
    };
  }, [handleResize, throttleDelay]);

  return { windowWidth: width };
};