import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedPaths = ['/mypage', '/epigrams'];
const authPaths = ['/auth/login', '/auth/signup', '/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Edge 환경에서는 getToken()을 사용하고, 공개 secret을 전달합니다.
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;

  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  const isAuthPath = authPaths.some((path) => pathname === path);

  if (!isAuthenticated && isProtectedPath) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL('/epigrams', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/epigrams', '/epigrams/:path*'],
};
