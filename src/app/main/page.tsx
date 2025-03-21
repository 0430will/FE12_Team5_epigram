import MainHeader from '@/components/header/MainHeader';
import TodayEmotion from '@/components/TodayEmotion';
import TodayEpirams from './_conponents/todayEpigrams';

export default function Page() {
  return (
    <>
      <MainHeader />
      <TodayEpirams />
      <TodayEmotion emotionType="main" />
    </>
  );
}
