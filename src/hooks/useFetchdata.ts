import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import { GetUserInfo } from '@/lib/User';

export default function useFetchUser() {
  //user의 정보를 가져오는 hook입니다. 필요한곳에 useFetchUser를 불러서 쓰면 됩니다.
  //활용 예시는 MyUserProfile.tsx를 확인해주세요
  const { data: session, status } = useSession();
  const userId = Number(session?.user?.id);
  const [userData, setUserData] = useState<{
    isLoading: boolean;
    user: User | null;
  }>({
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    if (status === 'loading') return;

    const fetchUser = async () => {
      try {
        const data = await GetUserInfo(userId);

        if (data) {
          setUserData({
            isLoading: false,
            user: data,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData({
          isLoading: false,
          user: null,
        });
      }
    };

    fetchUser();
  }, [status, session]);

  return { ...userData, setUser: (user: User) => setUserData({ isLoading: false, user }) };
}
