export async function GoogleToken(code: string): Promise<string | null> {
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth/google-callback';
  // URLSearchParams를 사용해 요청 파라미터 구성
  const params = new URLSearchParams({
    code: code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  try {
    // Google OAuth 토큰 엔드포인트에 POST 요청
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    // 응답에서 id_token(JWT)을 반환합니다.
    return data.id_token;
  } catch (error) {
    console.error('Error converting Google token:', error);
    return null;
  }
}
