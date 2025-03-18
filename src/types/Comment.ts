// 댓글 작성자 정보 타입
export interface CommentWriter {
  id: number;
  nickname: string;
  image: string;
}

// 댓글 기본 타입
// 1. 댓글 작성 (POST /{teamId}/comments)
// 3. 댓글 수정 (PATCH /{teamId}/comments/{id})
export interface Comment {
  id: number;
  epigramId: number;
  writer: CommentWriter;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
  content: string;
}

// 2. 댓글 목록 조회 (GET /{teamId}/comments)
export interface CommentList {
  totalCount: number;
  nextCursor: number;
  list: Comment[];
}

// 4. 댓글 삭제 (DELETE /{teamId}/comments/{id})
export interface DeleteComment {
  id: number;
}
