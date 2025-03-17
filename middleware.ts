import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

const protectedPaths = ['/mypage/:path*', '/epigrams/:path*', '/auth/:path*', '/login', '/signup'];
const authPaths = ['/auth/login', '/auth/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth();
  console.log('🔍 현재 요청된 경로:', pathname);
  console.log('🔑 세션 정보:', session);
  const isAuthenticated = !!session;

  if (!isAuthenticated && protectedPaths.some((path) => pathname.includes(path))) {
    console.log('🚨 비로그인 사용자가 보호된 경로 접근 -> 로그인 페이지로 리디렉트');
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }

  // 로그인한 사용자가 로그인/회원가입 페이지에 접근하면 홈으로 리디렉트
  if (isAuthenticated && authPaths.some((path) => pathname.startsWith(path))) {
    console.log('✅ 로그인 상태에서 로그인/회원가입 페이지 접근 -> 홈으로 리디렉트');
    return NextResponse.redirect(new URL('/epigrams', request.url));
  }

  // 요청을 그대로 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage', '/mypage/:path*', '/epigrams', '/epigrams/:path*', '/auth', '/auth/:path*', '/login', '/signup'],
};
