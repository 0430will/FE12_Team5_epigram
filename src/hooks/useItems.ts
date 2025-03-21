// /hooks/useItems.ts
import { useState, useEffect } from 'react';

export function useItems<T>(
  initialLimit: number,
  fetchData: (limit: number) => Promise<{ list: T[]; totalCount: number }>, // 반환 타입이 null을 포함하지 않음
) {
  const [loadingState, setLoadingState] = useState({
    isLoading: true,
    items: [] as T[],
    totalCount: 0,
  });
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    const fetchItems = async () => {
      setLoadingState((prev) => ({ ...prev, isLoading: true }));
      const data = await fetchData(limit);

      if (data) {
        setLoadingState({
          isLoading: false,
          items: data.list || [], // list가 null일 경우 빈 배열
          totalCount: data.totalCount || 0, // totalCount가 null일 경우 0
        });
      } else {
        setLoadingState((prev) => ({ ...prev, isLoading: false }));
      }
    };
    fetchItems();
  }, [limit, fetchData]);

  const loadMore = () => {
    setLimit((prev) => prev + initialLimit); // 더보기 버튼 클릭 시, limit을 늘려서 더 많은 데이터를 불러옴
  };

  return {
    loadingState,
    loadMore,
  };
}
