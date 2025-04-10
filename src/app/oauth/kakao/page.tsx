'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Spinner from '@/components/Spinner';

export default function KakaoRedirection() {
  const [code, setCode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const codeFromUrl = params.get('code');
      console.log(codeFromUrl);
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

  // 카카오 인가 코드를 signIn으로 넘기기
  const handleSignInWithCode = async (code: string) => {
    const result = await signIn('kakao', {
      code: code,
      redirect: false,
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
      <div className="flex items-center justify-center">
        <Spinner size={100} className="pc:h-[76px] pc:w-[150px] mt-[30%] h-[50px]" />
      </div>
    </div>
  );
}
