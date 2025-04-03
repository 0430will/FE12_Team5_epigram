'use client';

import { Modal, ModalHandle } from '@/components/Modal';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
// @ts-expect-error : 타입스크립트가 next/navigation를 오류로 인식합니다. 작동은 잘 됩니다.
import { useParams } from 'next/navigation';
import { DeleteEpigram } from '@/lib/Epigram';
import { useSession } from 'next-auth/react';

export default function EpigramDetailKebab() {
  const [isKebab, setIsKebab] = useState(false);
  const modalRef = useRef<ModalHandle | null>(null);
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const id = params.id;
  const token = status === 'authenticated' ? session?.user.accessToken : null;

  const handleAction = async () => {
    if (!token) return;
    const response = await DeleteEpigram(id, token);
    if (!response) return;
    modalRef.current?.close();
    router.push(`/feed`);
  };

  return (
    <div className="relative">
      <Image
        className="cursor-pointer"
        src="/assets/icons/kebab.svg"
        width={24}
        height={24}
        alt="더보기"
        onClick={() => setIsKebab((pre) => !pre)}
      />
      {isKebab && (
        <div className="bg-bg-100 absolute top-[31px] right-0 flex h-[80px] w-[97px] flex-col overflow-hidden rounded-[16px] border border-blue-300">
          <div
            className="hover:bg-sub-gray-2 text-pre-md font-regular text-black-600 flex flex-1 cursor-pointer items-center justify-center"
            onClick={() => {
              router.push(`/addepigram/${id}`);
            }}
          >
            수정하기
          </div>
          <div
            className="hover:bg-sub-gray-2 text-pre-md font-regular text-black-600 flex flex-1 cursor-pointer items-center justify-center"
            onClick={() => {
              modalRef.current?.open();
            }}
          >
            삭제하기
          </div>
          <Modal
            ref={modalRef}
            type="confirm"
            title="게시물을 삭제하시겠어요?"
            description="게시물은 삭제 후 복구할 수 없어요."
            actionLabel="삭제하기"
            onAction={handleAction}
          />
        </div>
      )}
    </div>
  );
}
