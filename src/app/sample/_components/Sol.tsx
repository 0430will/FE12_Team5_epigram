'use client';

import { useRef } from 'react';
import { Modal, ModalHandle } from '@/components/Modal';

export default function Sol() {
  const modalRef = useRef<ModalHandle | null>(null);

  function handleAction() {
    console.log('⚡⚡⚡액션 수행⚡⚡⚡');
    modalRef.current?.close();
  }

  return (
    <>
      <div className="border border-gray-200 bg-gray-50 p-5">
        <h3 className="mb-5 text-xl font-bold">1. Modal</h3>
        <p className="mb-5 leading-7">
          <b>
            ✅ Props : type(타입:confirm,alert,content) | title(제목) | description(설명) | actionLabel(버튼명) |
            onAction(버튼액션함수)
          </b>
          <br />
          1️⃣ 컨펌 모달 : type === confirm | title | description | actionLabel | onAction
          <br />
          2️⃣ 확인 모달 : type === alert | title | description
          <br />
          3️⃣ 콘텐츠 모달 : type === content | children
        </p>
        <div className="bg-white p-5">
          <button
            onClick={() => modalRef.current?.open()}
            className="cursor-pointer rounded-md bg-gray-400 px-5 py-2 font-bold text-white"
          >
            모달 열기
          </button>
          <Modal
            ref={modalRef}
            type="confirm"
            title="댓글을 삭제하시겠어요?"
            description="댓글은 삭제 후 복구할 수 없어요."
            actionLabel="삭제하기"
            onAction={handleAction}
          />
        </div>
      </div>
    </>
  );
}
