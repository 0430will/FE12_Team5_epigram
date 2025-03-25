'use client'; // 이 파일은 클라이언트 전용 코드입니다.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function KakaoRedirection() {
  const [code, setCode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const codeFromUrl = params.get('code');
      if (codeFromUrl) {
        setCode(codeFromUrl);
      }
    }
  }, []);

  // code가 있을 때 액세스 토큰을 요청하는 함수 호출
  useEffect(() => {
    if (code) {
      fetchAccessToken(code); // 액세스 토큰 요청
      console.log(code);
    }
  }, [code]);

  // 액세스 토큰 요청 함수
  const fetchAccessToken = async (code: string) => {
    const redirectUri = 'http://localhost:3000/oauth/kakao'; // 리디렉션 URI
    const provider = 'KAKAO'; // 카카오 제공자 설정
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 환경 변수에서 API URL 불러오기
    const url = `${apiUrl}/auth/signIn/${provider}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          redirectUri: redirectUri,
          token: code,
        }),
      });

      if (!response.ok) {
        throw new Error('액세스 토큰 요청 실패');
      }

      const data = await response.json();

      const { accessToken, refreshToken, user } = data;
      const nickname = user.nickname;
      Cookies.set('accessToken', accessToken, { expires: 7, path: '/' });
      Cookies.set('refreshToken', refreshToken, { expires: 7, path: '/' });

      console.log(data);
      localStorage.setItem('nickname', nickname);
      console.log('Redirecting to /epigrams');

      router.push('/epigrams'); // 토큰을 받았다면 /epigrams 페이지로 리디렉션
    } catch (error) {
      console.error('액세스 토큰 요청 중 에러 발생:', error);
      router.push('/auth/login?error=AccessTokenRequestFailed'); // 실패 시 로그인 페이지로 리디렉션
    }
  };

  return (
    <div>
      <h1>카카오 로그인 중...</h1>
      <p>로그인 처리 중입니다. 잠시만 기다려 주세요.</p>
    </div>
  );
}
