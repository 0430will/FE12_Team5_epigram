import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // 쿠키에서 토큰을 읽어오기 위한 Next.js API
import { refreshAccessToken } from '../auth/auth'; // refreshAccessToken 함수 불러오기

export async function GET() {
  try {
    // 쿠키에서 accessToken과 refreshToken 가져오기
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');
    console.log(token);
    const refreshToken = cookieStore.get('refreshToken')?.value; // 쿠키에서 refreshToken 가져오기

    if (!token) {
      return NextResponse.json({ error: 'Authorization token is missing or invalid' }, { status: 401 });
    }

    // 외부 API 호출 URL
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/me`; // 외부 API 주소
    let response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // accessToken이 만료되어 400 에러가 발생하면 refreshToken을 사용하여 갱신
    if (response.status === 401 && refreshToken) {
      const newAccessToken = await refreshAccessToken(refreshToken); // 새로운 accessToken 받기

      // 새로운 accessToken으로 다시 요청
      response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${newAccessToken}`, // 새로 받은 accessToken 사용
          'Content-Type': 'application/json',
        },
      });
    }

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 }); // 외부 API 응답 반환
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
