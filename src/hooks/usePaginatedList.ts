import { useCallback, useState } from 'react';
import { PaginatedListState } from '@/stores/paginatedListStore';

interface UsePaginatedListProps<T extends { id: number }> {
  store: PaginatedListState<T>;
  fetchFn: (cursor?: number) => Promise<{ list: T[]; totalCount: number }>;
}

export function usePaginatedList<T extends { id: number }>({ store, fetchFn }: UsePaginatedListProps<T>) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(store.items.length === 0);

  const loadMore = useCallback(async () => {
    if (!store.hasMore || loading) return;

    setLoading(true);

    try {
      const { list, totalCount } = await fetchFn(store.cursor);

      store.setState({ totalCount });

      if (list.length === 0 || store.items.length + list.length >= totalCount) {
        store.setState({ hasMore: false });
      }

      if (list.length > 0) {
        store.setState({
          items: [...store.items, ...list],
          cursor: list[list.length - 1].id,
        });
      }
    } catch (err) {
      console.error('usePaginatedList fetch 실패:', err);
      store.setState({ hasMore: false });
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [store, fetchFn, loading]);

  return {
    loadMore,
    loading,
    initialLoading,
  };
}

// import { useCallback, useState } from 'react';
// import { PaginatedListState } from '@/stores/paginatedListStore';

// interface UsePaginatedListProps<T extends { id: number }> {
//   store: PaginatedListState<T>;
//   fetchFn: (cursor?: number) => Promise<{ list: T[]; totalCount: number }>;
// }

// export function usePaginatedList<T extends { id: number }>({ store, fetchFn }: UsePaginatedListProps<T>) {
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(store.items.length === 0);

//   const loadMore = useCallback(async () => {
//     if (!store.hasMore || loading) return;

//     setLoading(true);
//     const { list, totalCount } = await fetchFn(store.cursor);

//     store.setState({ totalCount });

//     if (list.length === 0 || store.items.length + list.length >= totalCount) {
//       store.setState({ hasMore: false });
//     }

//     if (list.length > 0) {
//       store.setState({
//         items: [...store.items, ...list],
//         cursor: list[list.length - 1].id,
//       });
//     }

//     setLoading(false);
//     setInitialLoading(false);
//   }, [store, fetchFn, loading]);

//   return {
//     loadMore,
//     loading,
//     initialLoading,
//   };
// }
