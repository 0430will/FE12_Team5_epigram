'use client';

import React, { useEffect, useState, JSX } from 'react';

interface FetchResult<T> {
  list: T[];
  nextCursor: number | null;
  hasMore: boolean;
}

interface InfiniteListProps<T extends { id: string | number }> {
  fetchItems: (cursor: number | null, limit: number) => Promise<FetchResult<T>>;
  renderItem: (item: T, index: number) => JSX.Element;
  limit?: number;
  buttonText?: string;
  storageKey?: string;
}

export default function InfiniteList<T extends { id: string | number }>({
  fetchItems,
  renderItem,
  limit = 5,
  buttonText = '+ 더보기',
  storageKey = 'infinite_list',
}: InfiniteListProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shouldAutoLoad, setShouldAutoLoad] = useState(false);

  const isRefresh = (() => {
    if (typeof window === 'undefined') return false;
    const entries = window.performance.getEntriesByType('navigation');
    const nav = entries.length > 0 ? (entries[0] as PerformanceNavigationTiming) : null;
    return nav?.type === 'reload';
  })();

  useEffect(() => {
    if (typeof window !== 'undefined' && isRefresh) {
      localStorage.removeItem(`${storageKey}_items`);
      localStorage.removeItem(`${storageKey}_cursor`);
      localStorage.removeItem(`${storageKey}_hasMore`);
    }
  }, []);

  useEffect(() => {
    const restore = () => {
      const savedItems = localStorage.getItem(`${storageKey}_items`);
      const savedCursor = localStorage.getItem(`${storageKey}_cursor`);
      const savedHasMore = localStorage.getItem(`${storageKey}_hasMore`);

      if (savedItems) {
        const parsed: T[] = JSON.parse(savedItems);
        const unique = Array.from(new Map(parsed.map((item) => [item.id, item])).values());
        setItems(unique);
      }

      if (savedCursor) setCursor(JSON.parse(savedCursor));
      if (savedHasMore) setHasMore(JSON.parse(savedHasMore));

      const shouldLoad = !savedItems || JSON.parse(savedItems).length === 0;
      setShouldAutoLoad(shouldLoad);
    };

    if (typeof window !== 'undefined') {
      restore();
    }
  }, []);

  useEffect(() => {
    if (shouldAutoLoad && !loading) {
      loadMore();
    }
  }, [shouldAutoLoad]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${storageKey}_items`, JSON.stringify(items));
      localStorage.setItem(`${storageKey}_cursor`, JSON.stringify(cursor));
      localStorage.setItem(`${storageKey}_hasMore`, JSON.stringify(hasMore));
    }
  }, [items, cursor, hasMore]);

  useEffect(() => {
    const state = window.history.state;
    const savedScroll = state?.scrollPosition;

    if (savedScroll && items.length > 0) {
      setTimeout(() => {
        window.scrollTo(0, savedScroll);
      }, 50);
    }
  }, [items]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const scrollPosition = window.scrollY;
      window.history.replaceState({ scrollPosition }, '', window.location.pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await fetchItems(cursor, limit);
      if (data.list.length === 0) {
        setHasMore(false);
        return;
      }

      const newItems = data.list.filter((item) => !items.some((existing) => existing.id === item.id));

      setItems((prev) => [...prev, ...newItems]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ul className="space-y-4">
        {items.map((item, index) =>
          React.cloneElement(renderItem(item, index), {
            key: `${item.id}_${index}`,
          }),
        )}
      </ul>

      {loading && <p className="mt-4 text-center text-gray-500">로딩 중...</p>}

      {!loading && hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            className="rounded-full border border-blue-300 bg-blue-100 px-6 py-3 text-blue-600 transition hover:bg-blue-200"
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}
