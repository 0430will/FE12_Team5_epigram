'use client';

import FeedCard from '@/components/FeedCard';
import Image from 'next/image';
import { useState, useCallback, useEffect, useRef } from 'react';
import EmptyState from '@/components/EmptyState';
import SkeletonFeedCard from '@/components/skeletons/SkeletonFeedCard';
import { useSession } from 'next-auth/react';
import { Virtuoso } from 'react-virtuoso';
import { Epigram } from '@/types/Epigram';
import { getEpigramsList } from '@/lib/Epigram';

export default function Page() {
  const [isGridView, setIsGridView] = useState(true);
  const gridStyle = isGridView ? 'grid grid-cols-2' : 'grid grid-cols-1';

  const { data: session, status } = useSession();
  const token = session?.accessToken;

  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const cursorRef = useRef<number | undefined>(undefined);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || !token) return;

    setLoading(true);
    const { list } = await getEpigramsList(token, 6, cursorRef.current);

    if (list.length === 0) {
      setHasMore(false);
    } else {
      setEpigrams((prev) => [...prev, ...list]);
      cursorRef.current = list[list.length - 1].id;
    }

    setLoading(false);
  }, [token, hasMore, loading]);

  useEffect(() => {
    if (status === 'authenticated' && token) {
      loadMore().then(() => setInitialLoading(false));
    }
  }, [status, token]);

  return (
    <main>
      <div className="pc:pt-[120px] tablet:pb-[114px] m-auto max-w-[1240px] px-[24px] pt-[32px] pb-[56px]">
        <div className="pc:mb-[40px] mb-[24px] flex content-center justify-between">
          <h1 className="pc:text-pre-2xl text-pre-lg font-semibold">피드</h1>
          <div>
            <button onClick={() => setIsGridView((prev) => !prev)} className="tablet:hidden cursor-pointer">
              <Image
                src={isGridView ? '/assets/icons/list.svg' : '/assets/icons/feed.svg'}
                width={24}
                height={24}
                alt={isGridView ? '리스트 아이콘' : '피드 아이콘'}
              />
            </button>
          </div>
        </div>

        {initialLoading ? (
          <div
            className={`${gridStyle} pc:gap-x-[30px] pc:gap-y-[40px] tablet:gap-x-[12px] tablet:gap-y-[24px] gap-x-[8px] gap-y-[16px] md:grid-cols-2`}
          >
            <SkeletonFeedCard count={6} />
          </div>
        ) : epigrams.length === 0 ? (
          <EmptyState message={`아직 작성한 에피그램이 없어요!<br/>에피그램을 작성하고 감정을 공유해보세요.`} />
        ) : (
          <Virtuoso
            style={{ height: '100vh' }}
            data={epigrams}
            endReached={loadMore}
            itemContent={(index, item) => (
              <div
                className={`${gridStyle} pc:gap-x-[30px] pc:gap-y-[40px] tablet:gap-x-[12px] tablet:gap-y-[24px] gap-x-[8px] gap-y-[16px] md:grid-cols-2`}
              >
                <FeedCard key={item.id} data={item} />
              </div>
            )}
            components={{
              Footer: () => (loading ? <div className="p-8 text-center text-gray-500">불러오는 중...</div> : null),
            }}
          />
        )}
      </div>
    </main>
  );
}
