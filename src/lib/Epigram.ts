import { EpigramList } from '@/types/Epigram';
import { auth } from '@/lib/next-auth/auth';

// 에피그램 목록 조회
export async function getEpigramsList(
  limit: number = 6,
  cursor?: number,
  keyword?: string,
  writerId?: number,
): Promise<{ list: Epigram[]; totalCount: number }> {
  try {
    const query = new URLSearchParams({
      limit: String(limit),
      ...(cursor !== undefined && { cursor: String(cursor) }),
      ...(keyword && { keyword }),
      ...(writerId !== undefined && { writerId: String(writerId) }),
    });

    // TODO: auth 완료된 후 getSession으로 변경
    const session = await auth();
    const token = session?.accessToken;

    if (!token) {
      throw new Error('토큰이 없습니다. 로그인해주세요.');
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('데이터를 불러오는 중 문제가 발생했습니다.');
    }

    const data = await response.json();
    return {
      list: data.list || [],
      totalCount: data.totalCount || 0
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`에피그램 목록을 불러오는 중 오류 발생: ${error.message}`);
    } else {
      console.error('에피그램 목록을 불러오는 데 실패했습니다.');
    }
    return {
      list: [],
      totalCount: 0
    };
  }
}

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
    }
  }
}
