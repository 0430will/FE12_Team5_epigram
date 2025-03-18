import Modal from '@/components/Modal/Modal';

export default function Sol() {
  return (
    <>
      <div className="border border-gray-200 bg-gray-50 p-5">
        <h3 className="mb-5 text-xl font-bold">1. Modal</h3>
        <p className="mb-5 leading-7">
          props
          <br />
          1️⃣
        </p>
        <div className="bg-white p-5">
          <button className="cursor-pointer rounded-md bg-pink-500 px-5 py-2 font-bold text-white">모달 열기</button>
          <Modal type="confirm" title="댓글을 삭제하겠어요?" description="댓글은 삭제 후 복구할 수 없어요." />
        </div>
      </div>
    </>
  );
}
