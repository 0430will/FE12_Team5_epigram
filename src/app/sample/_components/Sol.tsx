'use client';

import { useRef } from 'react';
import { Modal, ModalHandle } from '@/components/Modal';
import { notify } from '@/util/toast';
import Spinner from '@/components/Spinner';

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
            className="cursor-pointer rounded-md bg-gray-600 px-5 py-2 font-semibold text-white"
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
      <div className="mt-[15px] border border-gray-200 bg-gray-50 p-5">
        <h3 className="mb-5 text-xl font-bold">2. Toast</h3>
        <p className="mb-5 leading-7">
          <b>✨ 기본형으로 통일하면 좋을 거 같아요. (but, 일단 type에 따라 아이콘이 나오게 설정해두었습니다😀)</b>
          <br />
          <b>✅ 임포트 : {`import { notify } from '@/util/toast';`}</b>
          <br />
          1️⃣ 기본 토스트 : {`notify({ message: '기본 타입 알림입니다!' })`}
          <br />
          2️⃣ 성공 토스트 : {`notify({ type: 'success', message: '기본 타입 알림입니다!' })`}
          <br />
          3️⃣ 에러 토스트 : {`notify({ type: 'error', message: '기본 타입 알림입니다!' })`}
          <br />
          4️⃣ 알림 토스트 : {`notify({ type: 'info', message: '기본 타입 알림입니다!' })`}
        </p>
        <div className="bg-white p-5">
          <button
            onClick={() => notify({ message: '기본 타입 알림입니다!' })}
            className="cursor-pointer rounded-md bg-gray-800 px-5 py-2 font-semibold text-white"
          >
            기본 토스트
          </button>
          <button
            onClick={() => notify({ type: 'success', message: '기본 타입 알림입니다!' })}
            className="ml-[10px] cursor-pointer rounded-md bg-gray-800 px-5 py-2 font-semibold text-white"
          >
            성공 토스트
          </button>
          <button
            onClick={() => notify({ type: 'error', message: '기본 타입 알림입니다!' })}
            className="ml-[10px] cursor-pointer rounded-md bg-gray-800 px-5 py-2 font-semibold text-white"
          >
            에러 토스트
          </button>
          <button
            onClick={() => notify({ type: 'info', message: '기본 타입 알림입니다!' })}
            className="ml-[10px] cursor-pointer rounded-md bg-gray-800 px-5 py-2 font-semibold text-white"
          >
            알림 토스트
          </button>
        </div>
      </div>
      <div className="mt-[15px] border border-gray-200 bg-gray-50 p-5">
        <h3 className="mb-5 text-xl font-bold">3. Spinner</h3>
        <p className="mb-5 leading-7">
          <b>✅ Props</b>
          <br />
          1️⃣ size : number;
          <br />
          3️⃣ className? : string;
        </p>
        <div className="bg-white p-5">
          <Spinner size={60} className="tablet:w-[90px]" />
        </div>
      </div>
    </>
  );
}
