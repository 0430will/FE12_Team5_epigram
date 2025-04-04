'use client';

import { Modal, ModalHandle } from '@/components/Modal';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
// @ts-expect-error : 타입스크립트가 next/navigation를 오류로 인식합니다. 작동은 잘 됩니다.
import { useParams } from 'next/navigation';
import { DeleteEpigram } from '@/lib/Epigram';
import { useSession } from 'next-auth/react';
import Kebab from '@/components/Kebab';
import { notify } from '@/util/toast';

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
    notify({ type: 'success', message: '게시물이 삭제되었습니다.' });
    router.push(`/feed`);
  };

  return (
    <div className="relative">
      <div className="pc:h-[36px] pc:w-[36px] relative h-[24px] w-[24px]">
        <Image
          className="cursor-pointer"
          src="/assets/icons/kebab.svg"
          fill
          alt="더보기"
          onClick={() => setIsKebab((pre) => !pre)}
        />
      </div>
      {isKebab && (
        <Kebab
          label1="수정하기"
          onCLick1={() => {
            router.push(`/addepigram/${id}`);
          }}
          label2="삭제하기"
          onClick2={() => {
            setIsKebab(false);
            modalRef.current?.open();
          }}
        />
      )}
      <Modal
        ref={modalRef}
        type="confirm"
        title="게시물을 삭제하시겠어요?"
        description="게시물은 삭제 후 복구할 수 없어요."
        actionLabel="삭제하기"
        onAction={handleAction}
      />
    </div>
  );
}
