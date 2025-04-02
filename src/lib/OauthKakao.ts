export const kakaoSignIn = async (code: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/KAKAO`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      redirectUri: process.env.KAKAO_REDIRECT_URI,
      token: code,
    }),
  });

  if (!response.ok) {
    throw new Error('카카오 로그인에 실패했습니다');
  }

  // JSON 응답을 반환
  const data = await response.json();
  return data;
};
