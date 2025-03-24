'use client';

import { useState, useEffect } from 'react';
import { GetTodayEpigram } from '@/lib/Epigram';
import { EpigramDetail } from '@/types/Epigram';
import FeedCard from '@/components/FeedCard';

export default function TodayEpirams() {
  const [todayEpigram, setTodayEpigram] = useState<EpigramDetail | null>(null);

  useEffect(() => {
    async function Epigram() {
      const data = await GetTodayEpigram();
      if (data) {
        setTodayEpigram(data);
      }
    }
    Epigram();
  }, []);

  if (!todayEpigram) {
    return <div className="text-center">오늘의 에피그램을 불러오는중..</div>;
  }

  return (
    <section className="pc:gap-[40px] mt-[24px] grid h-full w-full gap-[24px]">
      <h2 className="text-pre-lg font-weight-semibold txt-color-black-900 pc:text-iro-2xl">오늘의 에피그램</h2>
      <div className="bg-color-blue-100 tablet:h-[146px] pc:h-[148px] h-[152px] w-full rounded-[16px] border border-white">
        <FeedCard data={todayEpigram} />
      </div>
    </section>
  );
}
