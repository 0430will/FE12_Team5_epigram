'use client';

import LatestCommentSection from '@/app/epigrams/_component/LatestCommentSection';
import EpigramCommentSection from '@/app/feed/[id]/_component/EpigramCommentSection';
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
          <EpigramCommentSection
            epigramId="1067"
            token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU0NywidGVhbUlkIjoiMTItNSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzQyODA1ODEzLCJleHAiOjE3NDI4MDc2MTMsImlzcyI6InNwLWVwaWdyYW0ifQ.LqxJtnn_zuqnPTu-INBDLr9yY6vODBKuX2DLg4HZCU0"
          />
        </div>
      </div>
    </SessionProvider>
  );
}
