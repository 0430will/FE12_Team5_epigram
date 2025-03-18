import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
}

export function useInfiniteScroll({ loadMore, hasMore }: UseInfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loadMore]);

  return observerRef;
}
