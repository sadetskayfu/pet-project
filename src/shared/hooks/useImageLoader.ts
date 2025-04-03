import { useEffect, useState, useRef } from 'react';

const imageLoadCache = new Map<string, boolean>();

export const useImageLoader = (src: string | null | undefined, onError?: () => void) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current

    if(!img || !src) return

    if(imageLoadCache.get(src)) {
      setIsLoaded(true)
      return
    }

    if (img.complete) {
      setIsLoaded(true);
      imageLoadCache.set(src, true);
      return;
    }

    const handleLoad = () => {
      setIsLoaded(true)
      imageLoadCache.set(src, true)
    }

    const handleError = () => {
      onError?.()
      setIsLoaded(true)
      imageLoadCache.set(src, false)
    }

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [src]);

  return { isLoaded, ref: imgRef };
};