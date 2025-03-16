import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-bg-100 tablet:py-[80px] flex min-h-screen w-full items-center justify-center py-[58px]">
      <div className="tablet:gap-[80px] box-border flex w-full max-w-[680px] flex-col items-center gap-[50px] px-[20px]">
        <Link href="/" className="pc:pb-[80px] relative h-[48px] w-[174px] pb-[50px]">
          <Image className="object-contain" src="/assets/images/logo-text.svg" fill alt="로고 이미지" priority />
        </Link>
        {children}
      </div>
    </main>
  );
}
