'use client';

import { Avatar } from '../Comment/Avatar';

interface ModalUserProfileProps {
  nickname: string;
  image?: string;
}

export default function ModalUserProfile({ nickname, image }: ModalUserProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-100">
        <Avatar src={image ?? ''} alt="프로필 이미지" className="h-12 w-12" />
      </div>
      <p className="text-pre-md tablet:text-pre-lg pc:text-pre-xl text-black-800 font-semibold">{nickname}</p>
    </div>
  );
}
