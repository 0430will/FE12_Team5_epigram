import MyTabMenu from './_components/MyTabMenu';
import TodayEmotion from '@/components/TodayEmotion';
import MyUserProfile from './_components/MyUserProfile';

export default function MyPage() {
  return (
    <main>
      <div className="pc:mt-[120px] shadow-[0px 0px 36px 0px rgba(0, 0, 0, 0.05)] mt-[64px] rounded-3xl bg-white">
        <div className="relative top-[-53px] m-auto max-w-[680px] px-[24px]">
          <MyUserProfile />
        </div>
        <TodayEmotion emotionType="mypage" />
      </div>
      <div className="pc:pt-[103px] m-auto max-w-[680px] px-[24px] pt-[56px] pb-[114px]">
        <MyTabMenu />
      </div>
    </main>
  );
}
