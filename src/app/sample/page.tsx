"use client";

import Gyeong from './_components/Gyeong';
import Jin from './_components/Jin';
import Seop from './_components/Seop';
import Sol from './_components/Sol';
import Su from './_components/Su';
import EpigramList from './_components/UK/EpigramList';
// 📌 build 오류제거와 공통컴포넌트 사용을 위해 주석 처리해놓았습니다!
// InfiniteList와 Item은 각자가 페이지에서 컴포넌트 만들 때 참고해주세요.
// import InfiniteList from './_components/UK/InfiniteList';
// import { Item } from '@/types/common';

export default function Page() {
  return (
    <main className="mx-auto max-w-[1000px] p-10">
      <h1 className="mb-10 text-3xl font-bold">Epigram 공용 컴포넌트 샘플</h1>
      <section className="mb-10 border border-gray-200 p-5">
        <h2 className="mb-5 text-xl font-bold">동욱 컴포넌트 </h2>
        <EpigramList />
      </section>

      <section className="mb-10 border border-gray-200 p-5">
        <h2 className="mb-5 text-xl font-bold">은경 컴포넌트 </h2>
        <Gyeong />
      </section>

      <section className="mb-10 border border-gray-200 p-5">
        <h2 className="mb-5 text-xl font-bold">경수 컴포넌트 </h2>
        <Su />
      </section>

      <section className="mb-10 border border-gray-200 p-5">
        <h2 className="mb-5 text-xl font-bold">주섭 컴포넌트 </h2>
        <Seop />
      </section>

      <section className="mb-10 border border-gray-200 p-5">
        <h2 className="mb-5 text-xl font-bold">병진 컴포넌트 </h2>
        <Jin />
      </section>

      <section className="mb-10 border border-gray-200 p-5">
        <h2 className="mb-5 text-xl font-bold">한솔 컴포넌트 </h2>
        <Sol />
      </section>
    </main>
  );
}
