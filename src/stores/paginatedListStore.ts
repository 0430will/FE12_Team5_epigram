import { create } from 'zustand';

export interface PaginatedListState<T> {
  items: T[];
  hasMore: boolean;
  isGridView: boolean;
  cursor?: number;
  setState: (state: Partial<PaginatedListState<T>>) => void;
  reset: () => void;
}

export function createPaginatedListStore<T>() {
  return create<PaginatedListState<T>>((set) => ({
    items: [],
    hasMore: true,
    isGridView: true,
    cursor: undefined,
    setState: (state) => set((prev) => ({ ...prev, ...state })),
    reset: () =>
      set({
        items: [],
        hasMore: true,
        isGridView: true,
        cursor: undefined,
      }),
  }));
}
