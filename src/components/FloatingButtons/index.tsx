'use client';

import { usePathname } from 'next/navigation';
import WriteButton from './WriteButton';
import TopScrollButton from './TopScrollButton';

export default function FloatingButtons() {
  const pathname = usePathname();
  const showFloatingButtons = ['/main', '/feed'].includes(pathname);

  if (!showFloatingButtons) return null;

  return (
    <>
      <WriteButton />
      <TopScrollButton />
    </>
  );
}
