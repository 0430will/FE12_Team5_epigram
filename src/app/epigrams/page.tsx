import TodayEmotion from '@/components/TodayEmotion';
import LatestCommentSection from './_component/LatestCommentSection';

export default function Page() {
  return (
    <>
      <div>메인페이지</div>
      <TodayEmotion emotionType="main" />
      <LatestCommentSection />
    </>
  );
}
