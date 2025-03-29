'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleToken } from '@/lib/GoogleToken'; // 여러분이 직접 만든 변환 함수

export default function GoogleOAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function processCallback() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state') || '';
      const scope = params.get('scope') || '';

      if (!code) {
        console.error('인가 코드가 존재하지 않습니다.');
        router.push('/auth/login?error=NoCode');
        return;
      }
      console.log('받은 인가 코드:', code);
      console.log('받은 state:', state);
      console.log('받은 scope:', scope);

      // 여러분이 구현한 토큰 변환 로직을 호출합니다.
      const idToken = await GoogleToken(code);
      if (!idToken) {
        console.error('Google 토큰 변환에 실패했습니다.');
        router.push('/auth/login?error=' + encodeURIComponent('TokenConversionFailed'));
        return;
      }
      console.log('변환된 Google ID 토큰:', idToken);

      // Swagger API가 요구하는 JSON 형식에 맞춰 요청 본문 구성
      const requestBody = {
        state: state,
        redirectUri: '', // 필요 없으면 빈 문자열; Swagger 스펙에 맞춰 조정
        token: idToken, // 변환된 Google ID 토큰(JWT)
      };

      const provider = 'GOOGLE';
      const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 예: "https://fe-project-epigram-api.vercel.app/12-5"
      const url = `${apiUrl}/auth/signIn/${provider}`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        const data = await response.json();
        console.log('Swagger API 응답:', data);
        // 성공 시, 원하는 페이지로 리디렉션
        router.push('/epigrams');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Swagger API 호출 에러:', error.message);
          router.push('/auth/login?error=' + encodeURIComponent(error.message));
        } else {
          console.error('Swagger API 호출 에러:', error);
          router.push('/auth/login?error=' + encodeURIComponent('Unknown error'));
        }
      }
    }

    processCallback();
  }, [router]);

  return (
    <div>
      <h1>구글 로그인 처리 중...</h1>
      <p>잠시만 기다려 주세요...</p>
    </div>
  );
}
