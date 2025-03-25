'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import FeedCard from '@/components/FeedCard';
import Image from 'next/image';
import EmptyState from '@/components/EmptyState';
import SkeletonFeedCard from '@/components/skeletons/SkeletonFeedCard';
import { getEpigramsList } from '@/lib/Epigram';
import { useEpigramFeedStore } from '@/stores/epigramFeedStore';

export default function Page() {
  const { epigrams, hasMore, isGridView, cursor, setState } = useEpigramFeedStore();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(epigrams.length === 0);
  const { data: session, status } = useSession();
  const token = session?.accessToken;

  const loadMore = useCallback(async () => {
    if (!token || loading || !hasMore) return;

    setLoading(true);
    const { list, totalCount } = await getEpigramsList(token, 6, cursor);

    if (list.length === 0 || epigrams.length + list.length >= totalCount) {
      setState({ hasMore: false });
    }

    if (list.length > 0) {
      setState({
        epigrams: [...epigrams, ...list],
        cursor: list[list.length - 1].id,
      });
    }

    setLoading(false);
    setInitialLoading(false);
  }, [token, loading, hasMore, epigrams, cursor, setState]);

  useEffect(() => {
    if (status === 'authenticated' && token && epigrams.length === 0) {
      loadMore();
    }
  }, [status, token]);

  const gridStyle = isGridView ? 'grid grid-cols-2' : 'grid grid-cols-1';
  const gridGapStyle =
    'pc:gap-x-[30px] pc:gap-y-[40px] tablet:gap-x-[12px] tablet:gap-y-[24px] gap-x-[8px] gap-y-[16px] md:grid-cols-2';

  return (
    <main>
      <div className="pc:pt-[120px] tablet:pb-[114px] m-auto max-w-[1240px] px-[24px] pt-[32px] pb-[56px]">
        <div className="pc:mb-[40px] mb-[24px] flex content-center justify-between">
          <h1 className="pc:text-pre-2xl text-pre-lg font-semibold">피드</h1>
          <button onClick={() => setState({ isGridView: !isGridView })} className="tablet:hidden cursor-pointer">
            <Image
              src={isGridView ? '/assets/icons/list.svg' : '/assets/icons/feed.svg'}
              width={24}
              height={24}
              alt={isGridView ? '리스트 아이콘' : '피드 아이콘'}
            />
          </button>
        </div>

        {initialLoading ? (
          <div className={`${gridStyle} ${gridGapStyle}`}>
            <SkeletonFeedCard count={6} />
          </div>
        ) : epigrams.length === 0 ? (
          <EmptyState message={`아직 작성한 에피그램이 없어요!<br/>에피그램을 작성하고 감정을 공유해보세요.`} />
        ) : (
          <>
            <div className={`${gridStyle} ${gridGapStyle}`}>
              {epigrams.map((item) => (
                <FeedCard key={item.id} data={item} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={loadMore}
                  className="rounded-md bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-700"
                  disabled={loading}
                >
                  {loading ? '불러오는 중...' : '더 보기'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
