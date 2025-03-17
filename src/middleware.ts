import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

const protectedPaths = ['/mypage', '/epigrams'];
const authPaths = ['/auth/login', '/auth/signup', '/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    const session = await auth();
    const isAuthenticated = !!session;

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
  } catch (error) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/epigrams', '/epigrams/:path*', '/auth/login', '/auth/signup', '/login', '/signup'],
};
