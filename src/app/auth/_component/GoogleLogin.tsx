'use client';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function GoogleLogin() {
  return (
    <div
      className="pc:w-[60px] pc:h-[60px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border border-solid border-[#E6E6EA]"
      onClick={() => signIn('google')}
    >
      <Image
        className="pc:w-[27px] pc:h-[27px]"
        src="/assets/icons/google.svg"
        width={18}
        height={18}
        alt="구글 로고 이미지"
      />
    </div>
  );
}
