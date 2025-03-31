'use client';
import useFetchUser from '@/hooks/useFetchdata';

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
      <section className="flex flex-col items-center">
        {/* 프로필 이미지 */}
        <div className="mb-[16px] h-[120px] w-[120px] rounded-full bg-amber-300">
          <img
            src={user.image ?? '/assets/images/defaultUser.png'}
            alt="User Image"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <span>{user.nickname}</span> {/* 사용자 닉네임 */}
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
