import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

// Define protected paths that require authentication
const protectedPaths = ['/mypage', '/epigrams'];
const authPaths = ['/auth/login', '/auth/signup', '/login', '/signup'];

export async function middleware(request: NextRequest) {
  console.log('🔄 Middleware executing...');
  console.log(`📍 Request path: ${request.nextUrl.pathname}`);

  const { pathname } = request.nextUrl;

  try {
    // Pass the request to the auth() function
    console.log('🔑 Checking authentication...');
    const session = await auth({ req: request });
    const isAuthenticated = !!session;
    console.log(`👤 Authentication status: ${isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);

    if (session) {
      console.log(`👤 User: ${session.user?.email || 'Unknown'}`);
    }

    // Check if the current path is protected
    const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
    console.log(`🛡️ Is protected path: ${isProtectedPath}`);

    // Check if the current path is an auth path
    const isAuthPath = authPaths.some((path) => pathname === path);
    console.log(`🔒 Is auth path: ${isAuthPath}`);

    // Redirect unauthenticated users from protected paths to login
    if (!isAuthenticated && isProtectedPath) {
      console.log('⚠️ Unauthenticated user trying to access protected path');
      console.log('🔀 Redirecting to login page...');
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', encodeURIComponent(pathname));
      return NextResponse.redirect(url);
    }

    // Redirect authenticated users from auth paths to home
    if (isAuthenticated && isAuthPath) {
      console.log('ℹ️ Authenticated user trying to access auth path');
      console.log('🔀 Redirecting to epigrams page...');
      return NextResponse.redirect(new URL('/epigrams', request.url));
    }

    console.log('✅ Continuing with the request');
    return NextResponse.next();
  } catch (error) {
    console.error('❌ Error in middleware:', error);
    // In case of error, allow the request to proceed
    // You might want to handle this differently based on your requirements
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Match exact paths and their sub-paths
    '/mypage',
    '/mypage/:path*',
    '/epigrams',
    '/epigrams/:path*',
    '/auth/login',
    '/auth/signup',
    '/login',
    '/signup',
  ],
};
