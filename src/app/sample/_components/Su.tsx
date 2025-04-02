'use client';

import { signOut } from 'next-auth/react';
export default function Su() {
  return (
    <>
      <div className="border border-gray-200 bg-gray-50 p-5">
        <p className="mb-5 leading-7">설명</p>
        <div
          className="text-pre-md font-weight-regular cursor-pointer"
          onClick={() => signOut()} //로그아웃
        >
          로그아웃
        </div>
        <div className="bg-white p-5">컴포넌트 구현</div>
      </div>
    </>
  );
}
