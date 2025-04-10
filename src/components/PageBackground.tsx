'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const backgroundColors: Record<string, string> = {
  '/': 'bg-bg-100',
  '/auth': 'bg-bg-100',
  '/main': 'bg-bg-100',
  '/feed': 'bg-bg-100',
  '/search': 'bg-white',
  '/mypage': 'bg-bg-100',
  '/addepigram': 'bg-white',
};

export default function PageBackground({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bgColor = backgroundColors[pathname] || (pathname.startsWith('/addepigram/') ? 'bg-white' : 'bg-bg-100');

  return <div className={`${bgColor} min-h-screen`}>{children}</div>;
}
