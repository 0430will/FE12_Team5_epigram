'use client';

import { usePathname } from 'next/navigation';
import MainHeader from '@/components/header/MainHeader';
import LandingHeader from '@/components/header/LandingHeader';

export default function ClientHeader() {
  const pathname = usePathname();

  if (pathname === '/') {
    return <LandingHeader />;
  }

  const mainHeaderPaths = ['/main', '/feed', '/mypage', '/addepigram', '/search'];
  if (mainHeaderPaths.some((path) => pathname.startsWith(path))) {
    return <MainHeader />;
  }

  return null;
}
