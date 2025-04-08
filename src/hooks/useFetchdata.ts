'use client';

import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { GetUserInfo } from '@/lib/User';

const fetcher = async (userId: number) => {
  return await GetUserInfo(userId);
};

export default function useFetchUser() {
  //user의 정보를 가져오는 hook입니다. 필요한곳에 useFetchUser를 불러서 쓰면 됩니다.
  //활용 예시는 MyUserProfile.tsx를 확인해주세요
  const { data: session } = useSession();
  const userId = Number(session?.user?.id);

  const {
    data: user,
    error,
    isLoading,
    mutate: refetchUser,
  } = useSWR(userId ? `/user/${userId}` : null, () => fetcher(userId));

  return {
    user,
    isLoading,
    error,
    refetchUser,
  };
}
