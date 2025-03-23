// pages/auth/kakao.tsx (또는 js)
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function KakaoCallback() {
  const router = useRouter();
  const { code } = router.query; // ?code=xxxxx

  useEffect(() => {
    if (code) {
      // 백엔드에서 요구하는 형식에 맞춰 POST
      // (예: fe-project-epigram-api.vercel.app/12-5/auth/signIn/KAKAO)
      const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

      fetch('https://fe-project-epigram-api.vercel.app/12-5/auth/signIn/KAKAO', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          redirectUri, // 카카오 로그인 시 사용했던 redirect_uri
          token: code, // 카카오에서는 인가 코드가 token 역할
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('백엔드 응답:', data);
          // 로그인 성공 시, 메인 페이지 등으로 이동
          router.push('/');
        })
        .catch((err) => {
          console.error('백엔드 에러:', err);
        });
    }
  }, [code, router]);

  return <div>카카오 로그인 처리 중...</div>;
}
