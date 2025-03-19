// 1. 내 정보 조회 (GET /{teamId}/users/me)
// 2. 내 정보 수정 (PATCH /{teamId}/users/me)
// 3. 특정 유저 정보 조회 (GET /{teamId}/users/{id})
export interface User {
  id: number;
  nickname: string;
  teamId: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// 유저 댓글 정보 타입
export interface UserComment {
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

// 4. 유저 댓글 목록 조회 (GET /{teamId}/users/{id}/comments)
export interface UserCommentList {
  totalCount: number;
  nextCursor: number;
  list: UserComment[];
}
