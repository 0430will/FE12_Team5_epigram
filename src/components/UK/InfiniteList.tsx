'use client';

import React, { useEffect, useState, JSX } from 'react';

interface FetchResult<T> {
  list: T[];
  nextCursor: number | null;
  hasMore: boolean;
}

interface InfiniteListProps<T> {
  fetchItems: (cursor: number | null, limit: number) => Promise<FetchResult<T>>;
  renderItem: (item: T, index: number) => JSX.Element;
  limit?: number;
  buttonText?: string;
  storageKey?: string;
}

export default function InfiniteList<T>({
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

  // 새로고침 여부 감지
  const isRefresh = (() => {
    if (typeof window === 'undefined') return false;
    const nav = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return nav?.type === 'reload';
  })();

  // 로컬스토리지 초기화 (새로고침 시에만)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isRefresh) {
        localStorage.removeItem(`${storageKey}_items`);
        localStorage.removeItem(`${storageKey}_cursor`);
        localStorage.removeItem(`${storageKey}_hasMore`);
      }
    }
  }, []);

  // 복원
  useEffect(() => {
    const restore = () => {
      const savedItems = localStorage.getItem(`${storageKey}_items`);
      const savedCursor = localStorage.getItem(`${storageKey}_cursor`);
      const savedHasMore = localStorage.getItem(`${storageKey}_hasMore`);

      if (savedItems) {
        const parsed = JSON.parse(savedItems);
        const unique = Array.from(new Map((parsed as T[]).map((item) => [(item as any).id, item])).values()) as T[];
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

  // 복원 후 loadMore 실행
  useEffect(() => {
    if (shouldAutoLoad && !loading) {
      loadMore();
    }
  }, [shouldAutoLoad]);

  // 로컬스토리지 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${storageKey}_items`, JSON.stringify(items));
      localStorage.setItem(`${storageKey}_cursor`, JSON.stringify(cursor));
      localStorage.setItem(`${storageKey}_hasMore`, JSON.stringify(hasMore));
    }
  }, [items, cursor, hasMore]);

  // 스크롤 복원 (데이터 렌더링 후)
  useEffect(() => {
    const state = window.history.state;
    const savedScroll = state?.scrollPosition;

    if (savedScroll && items.length > 0) {
      setTimeout(() => {
        window.scrollTo(0, savedScroll);
      }, 50); // 렌더 후 실행
    }
  }, [items]);

  // 스크롤 위치 저장
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

      const newItems = data.list.filter((item) => !items.some((existing) => (existing as any).id === (item as any).id));

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
            key: `${(item as any).id}_${index}`,
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
