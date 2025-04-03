'use client';

import ClientButton from '@/components/Button/ClientButton';
import { LikeEpigram } from '@/lib/Epigram';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
// @ts-expect-error : 타입스크립트가 next/navigation를 오류로 인식합니다. 작동은 잘 됩니다.
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function EpigramLikedButton({ isLiked, likeCount }: { isLiked: boolean; likeCount: number }) {
  const [count, setCount] = useState(likeCount);
  const [islike, setIslike] = useState(isLiked);
  const { data: session, status } = useSession();
  const params = useParams();

  const token = status === 'authenticated' ? session?.user.accessToken : null;
  if (!token) return;
  const id = params.id;

  const OnClickLiked = async () => {
    if (islike) {
      const response = await LikeEpigram('DELETE', Number(id), token);
      if (!response) {
        alert('좋아요를 취소하는데 오류가 발생했습니다.');
        return;
      }
      setCount((pre) => pre - 1);
      setIslike((pre) => !pre);
    } else {
      const response = await LikeEpigram('POST', Number(id), token);
      if (!response) {
        alert('좋아요를 누르는데 오류가 발생했습니다.');
        return;
      }
      setCount((pre) => pre + 1);
      setIslike((pre) => !pre);
    }
  };

  return (
    <ClientButton
      isValid
      isRounded
      onClick={() => OnClickLiked()}
      className={`${islike ? 'bg-black-600' : 'bg-blue-500'} flex items-center justify-center gap-[4px] !px-[14px] !py-[6px]`}
    >
      <Image src="/assets/icons/like.svg" width={20} height={20} alt="좋아요" />
      <span className="text-pre-lg leading-[24px] font-semibold text-blue-100">{count}</span>
    </ClientButton>
  );
}
