'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import FeedCard from '@/components/FeedCard';
import Image from 'next/image';
import SkeletonFeedCard from '@/components/skeletons/SkeletonFeedCard';
import EmptyState from '@/components/EmptyState';
import { getEpigramsList } from '@/lib/Epigram';
import { useMinFeedStore } from '@/stores/pageStores';
import { usePaginatedList } from '@/hooks/usePaginatedList';
import { Epigram } from '@/types/Epigram';

export default function FeedList() {
  const pathname = usePathname();
  const { items: epigrams, hasMore } = useMinFeedStore();

  const { data: session, status } = useSession();
  const token = status === 'authenticated' ? session?.user.accessToken : null;

  const fetchEpigrams = async (cursor?: number) => {
    if (!token) return { list: [], totalCount: 0 };

    const writerId = pathname.startsWith('/mypage') && session?.user.id ? Number(session.user.id) : undefined;
    return await getEpigramsList(token, 3, cursor, undefined, writerId);
  };

  const { loadMore, loading, initialLoading } = usePaginatedList<Epigram>({
    store: useMinFeedStore.getState(),
    fetchFn: fetchEpigrams,
  });

  useEffect(() => {
    if (status === 'authenticated' && token && epigrams.length === 0) {
      loadMore();
    }
  }, [status, token, epigrams.length]);

  return (
    <>
      <div className="pc:gap-[32px] grid gap-[16px]">
        {initialLoading ? (
          <SkeletonFeedCard count={3} />
        ) : epigrams.length === 0 ? (
          <EmptyState message={`아직 작성한 에피그램이 없어요!<br/>에피그램을 작성하고 감정을 공유해보세요.`} />
        ) : (
          epigrams.map((item) => <FeedCard key={item.id} data={item} />)
        )}
      </div>
      {hasMore && (
        <div className="pc:mt-[72px] mt-[40px] flex justify-center">
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
  );
}
