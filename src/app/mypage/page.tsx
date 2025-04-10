import EmotionPieChart from './_components/MyChart/EmotionPieChart';
import EmotionRankList from './_components/MyChart/EmotionRankList';
import MyCalender from './_components/MyCalender/MyCalender';
import MyTabMenu from './_components/MyTabMenu';
import TodayEmotion from '@/components/TodayEmotion';
import MyUserProfile from './_components/MyUserProfile';
import TodayEmotionHeader from './_components/TodayEmotionHeader';
import { auth } from '@/lib/next-auth/auth';
import { EmotionProvider } from './_components/EmotionContext';
import SkeletonMyCart from '@/components/skeletons/SkeletonMyCart';
import SkeletonMyCalender from '@/components/skeletons/SkeletonMyCalender';

export default async function MyPage() {
  const session = await auth();
  const writerId = session?.user.id;
  if (!writerId) return;

  return (
    <main>
      <div className="pc:mt-[120px] shadow-[0px 0px 36px 0px rgba(0, 0, 0, 0.05)] mt-[64px] rounded-3xl bg-white">
        <div className="relative top-[-53px] m-auto max-w-[680px] px-[24px]">
          <MyUserProfile />
        </div>
        <EmotionProvider>
          <div className="pc:pb-[82px] tablet:pb-[56px] pc:gap-[164px] tablet:gap-[60px] m-auto flex h-full w-full max-w-[680px] flex-col justify-center gap-[56px] px-[24px] pb-[40px]">
            <div className="pc:gap-[48px] flex flex-col gap-[24px]">
              <TodayEmotionHeader />
              <TodayEmotion emotionType="mypage" />
            </div>
            <MyCalender writerId={writerId} />
            <SkeletonMyCalender />
            <div className="pc:gap-[48px] flex flex-col gap-[16px]">
              <h1 className="pc:text-pre-2xl text-pre-lg font-semibold">감정 차트</h1>
              <div className="border-line-100 pc:h-[264px] tablet:h-[230px] flex h-full w-full items-center justify-between rounded-lg border p-[30px]">
                <EmotionPieChart />
                <EmotionRankList />
              </div>
              <SkeletonMyCart />
            </div>
          </div>
        </EmotionProvider>
      </div>
      <div className="pc:pt-[103px] m-auto max-w-[680px] px-[24px] pt-[56px] pb-[114px]">
        <MyTabMenu />
      </div>
    </main>
  );
}
