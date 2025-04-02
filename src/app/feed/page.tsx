'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import FeedCard from '@/components/FeedCard';
import SkeletonFeedCard from '@/components/skeletons/SkeletonFeedCard';
import EmptyState from '@/components/EmptyState';
import { getEpigramsList } from '@/lib/Epigram';
import { useFeedStore } from '@/stores/pageStores';
import { usePaginatedList } from '@/hooks/usePaginatedList';
import { Epigram } from '@/types/Epigram';

export default function FeedPage() {
  const { items: epigrams, hasMore, isGridView, setState } = useFeedStore();

  const { data: session, status } = useSession();
  const token = status === 'authenticated' ? session?.user.accessToken : null;

  const fetchEpigrams = async (cursor?: number) => {
    if (!token) return { list: [], totalCount: 0 };
    return await getEpigramsList(token, 6, cursor);
  };

  const { loadMore, loading, initialLoading } = usePaginatedList<Epigram>({
    store: useFeedStore.getState(),
    fetchFn: fetchEpigrams,
  });

  useEffect(() => {
    if (status === 'authenticated' && token && epigrams.length === 0) {
      loadMore();
    }
  }, [status, token, epigrams.length]);

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
              <div className="pc:mt-[80px] mt-[56px] flex justify-center">
                <button
                  onClick={loadMore}
                  className="pc:text-pre-xl pc:px-[40px] text-pre-md bg-bg-100 flex cursor-pointer gap-[4px] rounded-full border border-blue-500 px-[18px] py-[11.5px] font-medium text-blue-500 transition hover:bg-blue-900 hover:text-white"
                  disabled={loading}
                >
                  <Image src={'/assets/icons/plus.svg'} width={24} height={24} alt={'플러스 아이콘'} />
                  {loading ? '불러오는 중...' : '에피그램 더보기'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
