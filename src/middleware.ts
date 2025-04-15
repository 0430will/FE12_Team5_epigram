import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const middleware = async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://'),
  });
  const isAuthenticated = !!token;

  const pathname = request.nextUrl.pathname;

  const beforeLogin = pathname === '/auth/login' || pathname === '/auth/signup' || pathname === '/';
  //로그인 전 접근 가능 경로로

  // 로그인 후 접근 가능한 경로
  const afterLogin = pathname.startsWith('/mypage') || pathname.startsWith('/main') || pathname.startsWith('/feed');

  if (beforeLogin && isAuthenticated) {
    return NextResponse.redirect(new URL('/main', request.nextUrl));
  }

  if (afterLogin && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/login', '/signup', '/mypage', '/auth/login', '/auth/signup', '/main', '/feed', '/:path*'],
};
