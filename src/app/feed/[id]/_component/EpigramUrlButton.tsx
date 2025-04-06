'use client';

import ClientButton from '@/components/Button/ClientButton';
import ServerButton from '@/components/Button/ServerButton';
import { notify } from '@/util/toast';
import Image from 'next/image';

interface EpigramUrlButtonProps {
  isUrl?: boolean;
  href?: string;
  title: string;
}

export default function EpigramUrlButton({ isUrl = false, href = '/', title }: EpigramUrlButtonProps) {
  return (
    <>
      {isUrl ? (
        <ServerButton
          isValid
          isRounded
          className="bg-line-100 pc:!pl-[16px] inline-flex items-center justify-center gap-[5px] !px-[14px] !py-[6px] hover:bg-gray-100"
          href={href}
        >
          <span className="font-regular text-pre-md pc:text-pre-xl text-gray-300">{title}로 가는길</span>
          <div className="pc:w-[36px] pc:h-[36px] relative h-[20px] w-[20px]">
            <Image src="/assets/icons/link.svg" fill alt="출처" />
          </div>
        </ServerButton>
      ) : (
        <ClientButton
          isValid
          isRounded
          className="bg-line-100 pc:!pl-[16px] inline-flex items-center justify-center gap-[5px] !px-[14px] !py-[6px] hover:bg-gray-100"
          onClick={() => notify({ type: 'error', message: '출처 URL이 등록되어 있지 않습니다.' })}
        >
          <span className="font-regular text-pre-md pc:text-pre-xl text-gray-300">{title}로 가는길</span>
          <div className="pc:w-[36px] pc:h-[36px] relative h-[20px] w-[20px]">
            <Image src="/assets/icons/link.svg" fill alt="출처" />
          </div>
        </ClientButton>
      )}
    </>
  );
}
