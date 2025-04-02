'use client';

import Image from 'next/image';

interface ModalUSerProfileProps {
  nickname: string;
  avatarUrl?: string;
}

export default function ModalUSerProfile({ nickname, avatarUrl }: ModalUSerProfileProps) {
  const fallbackSrc = '/assets/images/defaultUser.png';
  const imageSrc = avatarUrl && avatarUrl.trim() !== '' ? avatarUrl : fallbackSrc;

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-100">
        <Image src={imageSrc} alt="아바타" width={48} height={48} unoptimized />
      </div>
      <p className="text-pre-md tablet:text-pre-lg pc:text-pre-xl text-black-800 font-semibold">{nickname}</p>
    </div>
  );
}
