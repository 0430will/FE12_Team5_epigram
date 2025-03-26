import { create } from 'zustand';
import { Epigram } from '@/types/Epigram';

interface EpigramFeedState {
  epigrams: Epigram[];
  hasMore: boolean;
  isGridView: boolean;
  cursor?: number;
  setState: (state: Partial<EpigramFeedState>) => void;
  reset: () => void;
}

export const useEpigramFeedStore = create<EpigramFeedState>((set) => ({
  epigrams: [],
  hasMore: true,
  isGridView: true,
  cursor: undefined,
  setState: (state) => set((prev) => ({ ...prev, ...state })),
  reset: () =>
    set({
      epigrams: [],
      hasMore: true,
      isGridView: true,
      cursor: undefined,
    }),
}));
