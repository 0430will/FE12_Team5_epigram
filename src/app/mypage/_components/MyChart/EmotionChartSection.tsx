'use client';

import EmotionPieChart from './EmotionPieChart';
import EmotionList from './EmotionRankList';
import { useMonthEmotion } from '@/hooks/useMonthEmotion';
import SkeletonMyCart from '@/components/skeletons/SkeletonMyCart';
import NonEmotionChart from './NonEmotionChart';

export default function EmotionChartSection() {
  const { isLoading, hasData } = useMonthEmotion();

  if (isLoading) {
    return <SkeletonMyCart />;
  }

  if (!hasData) {
    return <NonEmotionChart message="이번달의 감정 기록이 없습니다." />;
  }
  return (
    <div>
      <h1 className="pc:text-pre-2xl text-pre-lg font-semibold">감정 차트</h1>
      <div className="border-line-100 pc:h-[264px] tablet:h-[230px] flex h-full w-full items-center justify-between rounded-lg border p-[30px]">
        <EmotionPieChart />
        <EmotionList />
      </div>
    </div>
  );
}
