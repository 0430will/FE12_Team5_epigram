'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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

  useEffect(() => {
    if (code) {
      handleSignInWithCode(code);
    }
  }, [code]);

  const handleSignInWithCode = async (code: string) => {
    const result = await signIn('kakao', {
      code: code,
      redirect: false,
    });

    if (result?.error) {
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
