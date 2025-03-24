'use client';
import FeedCard from '@/components/FeedCard';
import useFetchEpigrams from '@/hooks/useFetchEpigrams';
import SkeletonFeedCard from '@/components/skeletons/SkeletonFeedCard';

export default function MyEpigrams() {
  const writerId = 1496;
  const { isLoading, epigrams } = useFetchEpigrams(3, writerId);

  return (
    <div className="grid gap-[16px]">
      {isLoading ? <SkeletonFeedCard count={3} /> : epigrams.map((item) => <FeedCard key={item.id} data={item} />)}
    </div>
  );
}
