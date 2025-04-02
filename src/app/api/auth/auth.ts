import Cookies from 'js-cookie';

// refreshToken을 사용해 새로운 accessToken을 받아오는 함수
export async function refreshAccessToken(refreshToken: string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`; // refresh-token API
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    Cookies.set('accessToken', data.accessToken, { expires: 7, path: '/' });
    console.log(`새로운 accesstoken 발급 성공`, data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw new Error('Unable to refresh access token');
  }
}
