// 태그 타입
export interface EpigramTag {
  id: number;
  name: string;
}

// 에피그램 기본 타입
// 1. 에피그램 생성 (POST /{teamId}/epigrams)
// 5. 에피그램 수정 (PATCH /{teamId}/epigrams/{id})
export interface Epigram {
  id: number;
  content: string;
  author: string;
  referenceTitle: string;
  referenceUrl: string;
  writerId: number;
  likeCount: number;
  tags: EpigramTag[];
}

// 에피그램 상세 타입 (isLiked 포함)
// 3. 오늘의 에피그램 조회 (GET /{teamId}/epigrams/today)
// 4. 특정 에피그램 조회 (GET /{teamId}/epigrams/{id})
// 7. 에피그램 좋아요 (POST /{teamId}/epigrams/{id}/like)
// 8. 에피그램 좋아요 취소 (DELETE /{teamId}/epigrams/{id}/like)
export interface EpigramDetail extends Epigram {
  isLiked: boolean;
}

// 2. 에피그램 목록 조회 (GET /{teamId}/epigrams)
export interface EpigramList {
  totalCount: number;
  nextCursor: number;
  list: Epigram[];
}

// 6. 에피그램 삭제 (DELETE /{teamId}/epigrams/{id})
export interface DeleteEpigram {
  id: number;
}

// 댓글 타입
export interface EpigramComment {
  id: number;
  epigramId: number;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
}

// 9. 에피그램 댓글 목록 조회 (GET /{teamId}/epigrams/{id}/comments)
export interface EpigramCommentList {
  totalCount: number;
  nextCursor: number;
  list: EpigramComment[];
}
