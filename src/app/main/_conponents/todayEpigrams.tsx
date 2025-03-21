'use client';

import { useState, useEffect } from 'react';
import { GetTodayEpigram } from '@/lib/Epigram';
import { EpigramDetail } from '@/types/Epigram';

export default function TodayEpirams() {
  const [epigram, setEpigram] = useState<EpigramDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function Epigram() {
      setLoading(true);
      const data = await GetTodayEpigram();
      if (data) {
        setEpigram(data);
      }
      setLoading(false);
    }
    Epigram();
  }, []);

  if (loading) return <p>로딩중 ...</p>;
  if (!epigram) return <p>오늘의 에피그램이 없습니다.</p>;

  return (
    <div>
      {/*제목*/}
      <h2>오늘의 에피그램</h2>
      <div>
        <p>{epigram.content}</p>
      </div>
      <div>
        <p>{epigram.referenceTitle}</p>
      </div>
    </div>
  );
}
