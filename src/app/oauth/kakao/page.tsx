'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // next-auth를 통해 세션 관리

export default function KakaoRedirection() {
  const [code, setCode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 카카오톡 로그인시 redirect uri에서 ?뒤에 있는 인가코드를 받아옴
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const codeFromUrl = params.get('code');
      console.log(codeFromUrl);
      if (codeFromUrl) {
        setCode(codeFromUrl);
      }
    }
  }, []);

  // code가 있을 때 signIn 함수 호출
  useEffect(() => {
    if (code) {
      handleSignInWithCode(code); // signIn 호출
    }
  }, [code]);

  // 카카오 인가 코드를 signIn으로 넘기기
  const handleSignInWithCode = async (code: string) => {
    const result = await signIn('kakao', {
      code: code, // 인가 코드를 signIn에 넘김
      redirect: false, // 리디렉션을 수동으로 처리
    });

    if (result?.error) {
      console.error('로그인 실패:', result.error);
      router.push('/auth/login?error=LoginFailed');
    } else {
      router.push('/main');
    }
  };

  return (
    <div>
      <h1>카카오 로그인 중...</h1>
      <p>로그인 처리 중입니다. 잠시만 기다려 주세요.</p>
    </div>
  );
}
