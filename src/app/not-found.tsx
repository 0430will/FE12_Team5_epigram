'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ClientButton from '@/components/Button/ClientButton';
import Image from 'next/image';

export default function NotFoundPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const token = status === 'authenticated' ? session?.user.accessToken : null;

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoToMain = () => {
    if (token) {
      router.push('/main');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex h-[calc(100vh-78px)] flex-col items-center justify-center px-[24px] text-center">
      <Image
        className="tablet:w-[280px] tablet:h-[280px]"
        src="/assets/icons/empty.svg"
        alt="찾을 수 없음 아이콘"
        width={180}
        height={180}
      />
      <h1 className="tablet:text-[70px] text-[55px] leading-[1] font-bold text-blue-400">404</h1>
      <p className="tablet:text-pre-xl text-pre-l mt-[20px] text-blue-400">
        찾을 수 없는 페이지입니다.
        <br />
        요청하신 페이지가 사라졌거나, 잘못된 경로입니다.
      </p>
      <div className="tablet:mt-[46px] mt-[30px] flex justify-between gap-[10px]">
        <ClientButton
          isValid
          onClick={handleGoToMain}
          className="tablet:text-pre-xl! tablet:py-[12px]! tablet:px-[28px] px-[24px]"
        >
          메인 페이지로
        </ClientButton>
        <ClientButton
          isValid
          onClick={handleGoBack}
          className="tablet:text-pre-xl! tablet:py-[12px]! tablet:px-[28px] px-[24px]"
        >
          이전 페이지로
        </ClientButton>
      </div>
    </div>
  );
}
