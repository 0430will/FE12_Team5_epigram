import { create } from 'zustand';

export interface PaginatedListState<T> {
  items: T[];
  hasMore: boolean;
  isGridView: boolean;
  cursor?: number;
  setState: (state: Partial<PaginatedListState<T>>) => void;
  reset: () => void;
}

export function createPaginatedListStore<T extends { id: number }>() {
  return create<PaginatedListState<T> & { removeItem: (id: number) => void; updateItem: (updatedItem: T) => void }>(
    (set) => ({
      items: [],
      hasMore: true,
      isGridView: true,
      cursor: undefined,

      setState: (state) => set((prev) => ({ ...prev, ...state })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateItem: (updatedItem) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
        })),

      reset: () =>
        set({
          items: [],
          hasMore: true,
          isGridView: true,
          cursor: undefined,
        }),
    }),
  );
}

// export function createPaginatedListStore<T>() {
//   return create<PaginatedListState<T>>((set) => ({
//     items: [],
//     hasMore: true,
//     isGridView: true,
//     cursor: undefined,
//     setState: (state) => set((prev) => ({ ...prev, ...state })),
//     reset: () =>
//       set({
//         items: [],
//         hasMore: true,
//         isGridView: true,
//         cursor: undefined,
//       }),
//   }));
// }
