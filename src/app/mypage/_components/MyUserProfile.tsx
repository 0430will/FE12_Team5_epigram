'use client';
import useFetchUser from '@/hooks/useFetchdata';
import { signOut } from 'next-auth/react';

export default function MyUserProfile() {
  const { isLoading, user } = useFetchUser(); //isLoading을 불러 null값 방지. user.~~로 user의 정보 불러옴

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (!user) {
    return <p>사용자 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <section className="pc:mb-[96px] mb-[56px] flex flex-col items-center">
        {/* 프로필 이미지 */}
        <div className="mb-[16px] h-[120px] w-[120px] rounded-full bg-amber-300">
          <img
            src={user.image ?? '/assets/images/defaultUser.png'}
            alt="User Image"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <span className="pc:mb-[24px] mb-[16px]">{user.nickname}</span> {/* 사용자 닉네임 */}
        <div
          className="text-pre-xs--line-height font-weight-regular pc:font-weight-medium pc:text-pre-md--line-height pc:h-[54px] pc:w-[114px] bg-line-100 flex h-[42px] w-[91px] cursor-pointer items-center justify-center rounded-[100px] text-blue-400 hover:bg-gray-200 hover:text-black"
          onClick={() => signOut()} //로그아웃
        >
          로그아웃
        </div>
      </section>
    </div>
  );
}

// const [user, setUser] = useState<User | null>(null);

// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       const response = await fetch('/api/user/', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch user data, status: ${response.status}`);
//       }

//       const data = await response.json();
//       setUser(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchUserData();
// }, []);
