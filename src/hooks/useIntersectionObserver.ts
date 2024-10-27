import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  root?: Element;
  rootMargin?: string;
  onIntersect?(): void;
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export function useIntersectionObserver(options: Options = {}): HookReturnType {
  const {
    threshold = 1.0,
    root = null,
    rootMargin = '0px',
    onIntersect,
  } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setEntry(entry);

        if (entry.isIntersecting) {
          onIntersect?.();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    const currentRef = targetRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [onIntersect, root, rootMargin, threshold]);

  return [targetRef, entry];
}
