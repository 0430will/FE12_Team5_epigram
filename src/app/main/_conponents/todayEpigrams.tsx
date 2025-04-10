'use client';

import { useState, useEffect } from 'react';
import { GetTodayEpigram } from '@/lib/Epigram';
import { EpigramDetail } from '@/types/Epigram';
import FeedCard from '@/components/FeedCard';
import EmptyState from '@/components/EmptyState';

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
    return <EmptyState message={`아직 작성한 에피그램이 없어요!<br/>에피그램을 작성하고 감정을 공유해보세요.`} />;
  }

  return (
    <section className="pc:gap-[40px] pc:mt-[120px] mt-[24px] grid h-full w-full gap-[24px]">
      <h2 className="text-pre-lg txt-color-black-900 pc:text-iro-2xl font-semibold">오늘의 에피그램</h2>
      <div className="bg-color-blue-100 h-full w-full rounded-[16px]">
        <FeedCard data={todayEpigram} />
      </div>
    </section>
  );
}
