import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-bg-100 flex h-screen w-screen items-center justify-center">
      <div className="box-border flex w-full max-w-[660px] flex-col items-center px-[20px]">
        <Link href="/" className="pc:pb-[80px] pb-[50px]">
          <Image src="/assets/images/logo-text.svg" width={174} height={48} alt="로고 이미지" />
        </Link>
        {children}
      </div>
    </main>
  );
}
