// 유저 API

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
