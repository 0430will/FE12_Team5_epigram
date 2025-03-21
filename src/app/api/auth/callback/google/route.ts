// app/api/auth/signIn/GOOGLE/route.ts
import { NextResponse } from 'next/server';
import { verifyGoogleIdToken } from '@/lib/Oauth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body; // Swagger API 요청의 token 필드 (Google ID 토큰)
    if (!token) {
      return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
    }

    // Google ID 토큰 검증
    const payload = await verifyGoogleIdToken(token);

    // payload가 유효하면 원하는 로직 수행 (예: 가입/로그인 처리)
    return NextResponse.json({ message: 'Token is valid', payload });
  } catch (error) {
    console.error('Error verifying token', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
