import { Epigram } from '@/types/Epigram';
import { Comment } from '@/types/Comment';
import { createPaginatedListStore } from './paginatedListStore';

export const useFeedStore = createPaginatedListStore<Epigram>();
export const useMainFeedStore = createPaginatedListStore<Epigram>();
export const useMyFeedStore = createPaginatedListStore<Epigram>();
export const useCommentStore = createPaginatedListStore<Comment>();
export const useMyCommentStore = createPaginatedListStore<Comment>();
