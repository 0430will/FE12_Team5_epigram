import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getToken } from 'next-auth/jwt'; // getToken을 사용하여 JWT 토큰 확인

export const middleware = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  // JWT 토큰을 가져오기 위한 getToken 사용
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://'),
  });
<<<<<<< HEAD
  console.log('Token:', token); // token을 확인해봄

  const isAuthenticated = !!(accessToken?.value || refreshToken?.value || token);
  console.log(isAuthenticated);
=======
  const isAuthenticated = !!(accessToken?.value || refreshToken?.value || token); // 쿠키 또는 JWT 토큰으로 인증 여부 확인
>>>>>>> develop

  const pathname = request.nextUrl.pathname;

  // 로그인 전 접근 가능한 경로 (로그인 전 경로에 대해서만 리디렉션을 처리)
  const isBeforeLoginRoute = pathname === '/auth/login' || pathname === '/auth/signup' || pathname === '/';

  // 로그인 후 접근 가능한 경로 (로그인 후 경로에 대해서만 리디렉션을 처리)
  const isAfterLoginRoute =
    pathname.startsWith('/mypage') || pathname.startsWith('/main') || pathname.startsWith('/feed');

  // 로그인 전 경로에 로그인된 상태로 접근 시 홈 페이지로 리디렉션
  if (isBeforeLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/main', request.nextUrl)); // 홈 페이지로 리디렉션
  }

  // 로그인 후 경로에 로그인되지 않은 상태로 접근 시 로그인 페이지로 리디렉션
  if (isAfterLoginRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl)); // 로그인 페이지로 리디렉션
  }

  // 기본적으로 리디렉션 없이 진행
  return NextResponse.next();
};

export const config = {
<<<<<<< HEAD
  matcher: ['/login', '/signup', '/mypage', '/auth/login', '/auth/signup', '/main', '/:path*'],
=======
  matcher: ['/login', '/signup', '/mypage', '/epigrams', '/auth/login', '/auth/signup', '/main', '/feed', '/:path*'],
>>>>>>> develop
};
