'use client';

import LatestCommentSection from '@/app/main/_conponents/LatestCommentSection';
import EpigramCommentSection from '@/app/feed/[id]/_component/EpigramCommentSection';
import MyCommentList from '@/app/mypage/_components/MyCommentList';
import { SessionProvider } from 'next-auth/react';

export default function Jin() {
  return (
    <SessionProvider>
      <div className="border border-gray-200 bg-gray-50 p-5">
        <h3 className="mb-5 text-xl font-bold"></h3>
        <p className="mb-5 leading-7"></p>
        <div className="bg-white p-5">
          <LatestCommentSection />
          <br></br>
          <EpigramCommentSection />
          <br></br>
          <h1>내 댓글 목록</h1>
          <MyCommentList />
          <br></br>
        </div>
      </div>
    </SessionProvider>
  );
}
