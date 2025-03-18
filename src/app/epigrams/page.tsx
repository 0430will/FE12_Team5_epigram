import MainHeader from '@/components/header/MainHeader';
import TodayEmotion from '@/components/TodayEmotion';

export default function Page() {
  return (
    <>
      <MainHeader />
      <div>메인페이지</div>
      <TodayEmotion emotionType="main" />
    </>
  );
}
