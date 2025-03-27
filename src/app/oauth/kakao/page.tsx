'use client'; // 이 파일은 클라이언트 전용 코드입니다.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function KakaoRedirection() {
  const [code, setCode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    //카카오톡 로그인시 redirect uri에서 ?뒤에있는 인가코드를 받아옴
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
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    console.log(redirectUri);
    const provider = 'KAKAO';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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

      router.push('/epigrams');
    } catch (error) {
      console.error('액세스 토큰 요청 중 에러 발생:', error);
      router.push('/auth/login?error=AccessTokenRequestFailed');
    }
  };

  return (
    <div>
      <h1>카카오 로그인 중...</h1>
      <p>로그인 처리 중입니다. 잠시만 기다려 주세요.</p>
    </div>
  );
}
