import { Epigram } from '@/types/Epigram';
<<<<<<< HEAD
=======
import { auth } from '@/lib/next-auth/auth';
import { AddEpigram } from '@/components/EpigramForm';
// @ts-expect-error : 타입스크립트가 notFound를 오류로 인식합니다. 작동은 잘 됩니다.
import { notFound } from 'next/navigation';
>>>>>>> 7ca279f (Feat: 수정하기 initial값 연결)

// 에피그램 post
export async function PostEpigram(epigrams: AddEpigram) {
  const { tags, referenceUrl, referenceTitle, author, content } = epigrams;

  const tagslist = tags.map((item) => item.name);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 토큰`,
      },
      body: JSON.stringify({
        tags: tagslist,
        referenceUrl: referenceUrl,
        referenceTitle: referenceTitle,
        author: author,
        content: content,
      }),
    });

    if (response.status === 401) {
      throw new Error('로그인이 만료되었습니다.');
    }

    if (!response.ok || response === null) {
      throw new Error('서버 오류가 발생하였습니다.');
    }
    const data = response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`${error.message}`);
    } else {
      console.error('에피그램을 등록하는데 실패했습니다.');
    }
  }
}

export async function PatchEpigram(epigrams: AddEpigram, id: number) {
  const { tags, referenceUrl, referenceTitle, author, content } = epigrams;

  const tagslist = tags.map((item) => item.name);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 토큰`,
      },
      body: JSON.stringify({
        tags: tagslist,
        referenceUrl: referenceUrl,
        referenceTitle: referenceTitle,
        author: author,
        content: content,
      }),
    });

    if (response.status === 401) {
      throw new Error('로그인이 만료되었습니다.');
    }

    if (!response.ok || response === null) {
      throw new Error('서버 오류가 발생하였습니다.');
    }
    const data = response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`${error.message}`);
    } else {
      console.error('에피그램을 등록하는데 실패했습니다.');
    }
  }
}

// 에피그램 목록 조회
export async function getEpigramsList(
  token: string | undefined,
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

    if (!token) {
      throw new Error('토큰이 없습니다. 로그인해주세요.');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('데이터를 불러오는 중 문제가 발생했습니다.');
    }

    const data = await response.json();
    return {
      list: data.list || [],
      totalCount: data.totalCount || 0,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`에피그램 목록을 불러오는 중 오류 발생: ${error.message}`);
    } else {
      console.error('에피그램 목록을 불러오는 데 실패했습니다.');
    }
    return {
      list: [],
      totalCount: 0,
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

export async function GetEpigram(id: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 토큰`,
      },
    });

    if (!response.ok) {
      if (response.status == 404) {
        notFound();
      }
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`${error.message}`);
    }
    return null;
  }
}
