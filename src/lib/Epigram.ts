import { AddEpigram, Epigram } from '@/types/Epigram';
// @ts-expect-error : 타입스크립트가 notFound를 오류로 인식합니다. 작동은 잘 됩니다.
import { notFound } from 'next/navigation';
import { CommentList } from '@/types/Comment';
import { notify } from '@/util/toast';

interface EpigramRequestBody {
  tags: string[];
  referenceTitle: string;
  author: string;
  content: string;
  referenceUrl?: string;
}

interface EpigramRequestBody {
  tags: string[];
  referenceTitle: string;
  author: string;
  content: string;
  referenceUrl?: string;
}

// 에피그램 post
export async function PostEpigram(epigrams: AddEpigram, token: string) {
  const { tags, referenceUrl, referenceTitle, author, content } = epigrams;

  const tagslist = tags.map((item) => item.name);

  const requestBody: EpigramRequestBody = {
    tags: tagslist,
    referenceTitle: referenceTitle,
    author: author,
    content: content,
  };

  if (referenceUrl) {
    requestBody.referenceUrl = referenceUrl;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
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
      notify({ type: 'error', message: error.message });
    } else {
      notify({ type: 'error', message: '에피그램을 등록하는데 실패했습니다.' });
    }
  }
}

export async function PatchEpigram(epigrams: AddEpigram, id: number, token: string) {
  const { tags, referenceUrl, referenceTitle, author, content } = epigrams;

  const tagslist = tags.map((item) => item.name);

  const requestBody: EpigramRequestBody = {
    tags: tagslist,
    referenceTitle: referenceTitle,
    author: author,
    content: content,
  };

  if (referenceUrl) {
    requestBody.referenceUrl = referenceUrl;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
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
      notify({ type: 'error', message: error.message });
    } else {
      notify({ type: 'error', message: '에피그램을 수정하는데 실패했습니다.' });
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

export async function GetEpigram(id: number, token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
}

//에피그램 댓글목록 조회
export async function getEpigramComments(
  token: string,
  epigramId: number,
  limit: number,
  cursor?: number,
): Promise<CommentList> {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/epigrams/${epigramId}/comments?limit=${limit}`;
  if (cursor !== undefined) {
    url += `&cursor=${cursor}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('에피그램 댓글 목록 조회 실패');
  }

  const data: CommentList = await response.json();
  return data;
}

export async function LikeEpigram(method: string, id: number, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/${id}/like`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
      notify({ type: 'error', message: '좋아요에 실패했습니다.' });
    } else {
      notify({ type: 'error', message: '좋아요에 실패했습니다.' });
    }
  }
}

export async function DeleteEpigram(id: number, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error('서버 오류가 발생했습니다.');
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      notify({ type: 'error', message: error.message });
    } else {
      notify({ type: 'error', message: '좋아요에 실패했습니다.' });
    }
  }
}
