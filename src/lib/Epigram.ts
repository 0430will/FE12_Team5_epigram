// 에피그램 API
export async function GetTodayEpigram() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/today`, {
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
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`${error.message}`);
    } else {
      console.error('에피그램을 불러오는데 실패했습니다.');
    }
  }
}
