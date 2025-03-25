import MainHeader from '@/components/header/MainHeader';
import TodayEmotion from '@/components/TodayEmotion';
import LatestCommentSection from './_component/LatestCommentSection';

export default function Page() {
  return (
    <>
      <MainHeader />
      <div>메인페이지</div>
      <TodayEmotion emotionType="main" />
      <LatestCommentSection />
    </>
  );
}
