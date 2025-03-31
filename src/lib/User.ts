// 유저 API

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

export async function GetUserInfo(id: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      throw new Error('로그인이 만료되었습니다.');
    }

    if (!response.ok || response === null) {
      throw new Error('서버 오류가 발생하였습니다.');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`${error.message}`);
    }
  }
}

// 유저 댓글 목록 조회 API
export async function getUserComments(token: string, userId: number, limit: number, cursor?: number) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/comments?limit=${limit}`;
  if (cursor !== undefined) {
    url += `&cursor=${cursor}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('유저 댓글 불러오기 실패');
  }

  const data = await response.json();
  return data;
}
