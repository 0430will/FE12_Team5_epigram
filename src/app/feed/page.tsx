'use client';

import FeedCard from '@/components/FeedCard';
import MainHeader from '@/components/header/MainHeader';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getEpigramsList } from '@/lib/Epigram';
import EmptyState from '@/components/EmptyState';
import { Epigram } from '@/types/Epigram';

export default function Page() {
  const [isGridView, setIsGridView] = useState(true);
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const gridStyle = isGridView ? 'grid grid-cols-2' : 'grid grid-cols-1';

  useEffect(() => {
    const fetchEpigrams = async () => {
      const data = await getEpigramsList(6);
      if (!data) return;
      setEpigrams(data.list);
      setTotalCount(data.totalCount);
    };
    fetchEpigrams();
  }, []);

  console.log(epigrams);
  console.log(totalCount);

  return (
    <>
      <MainHeader />
      <main className="bg-bg-100">
        <div className="pc:pt-[120px] tablet:pb-[114px] m-auto max-w-[1240px] px-[24px] pt-[32px] pb-[56px]">
          <div className="pc:mb-[40px] mb-[24px] flex content-center justify-between">
            <h1 className="pc:text-pre-2xl text-pre-lg font-semibold">피드</h1>
            <div>
              {!isGridView && (
                <button onClick={() => setIsGridView(true)} className="tablet:hidden cursor-pointer">
                  <Image src="/assets/icons/feed.svg" width={24} height={24} alt="피드 아이콘" />
                </button>
              )}
              {isGridView && (
                <button className="tablet:hidden cursor-pointer">
                  <Image
                    onClick={() => setIsGridView(false)}
                    src="/assets/icons/list.svg"
                    width={24}
                    height={24}
                    alt="리스트 아이콘"
                  />
                </button>
              )}
            </div>
          </div>
          {totalCount === 0 ? (
            <EmptyState message={`아직 작성한 에피그램이 없어요!<br/>에피그램을 적성하고 검정을 공유해보세요.`} />
          ) : (
            <div
              className={`${gridStyle} pc:gap-x-[30px] pc:gap-y-[40px] tablet:gap-x-[12px] tablet:gap-y-[24px] gap-x-[8px] gap-y-[16px] md:grid-cols-2`}
            >
              {epigrams.map((item) => (
                <FeedCard key={item.id} data={item} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
