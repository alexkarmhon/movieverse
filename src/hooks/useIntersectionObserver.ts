import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  root?: Element;
  rootMargin?: string;
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export function useIntersectionObserver(options: Options = {}): HookReturnType {
  const { threshold = 1.0, root = null, rootMargin = '0px' } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const targetRef = useRef(null);

  const callbackFn = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setEntry(entry);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, {
      threshold,
      root,
      rootMargin,
    });

    const currentRef = targetRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [root, rootMargin, threshold]);

  return [targetRef, entry];
}
