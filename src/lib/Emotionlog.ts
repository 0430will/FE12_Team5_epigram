//오늘의 감정

export async function PostTodayEmotion(emotionName: string, token: string) {
  try {
    if (!token) {
      throw new Error('토큰이 없습니다. 로그인이 필요합니다.');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/emotionLogs/today`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        emotion: emotionName,
      }),
    });

    if (response.status === 401) {
      throw new Error('로그인이 만료되었습니다.');
    }

    if (!response.ok) {
      throw new Error('서버 오류가 발생하였습니다.');
    }

    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`${error.message}`);
    } else {
      console.error('감정을 등록하는데 실패했습니다.');
    }
  }
}
