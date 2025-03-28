import EmotionPieChart from './_components/EmotionPieChart';
import EmotionRankList from './_components/EmotionRankList';
import MyTabMenu from './_components/MyTabMenu';

export default function MyPage() {
  return (
    <main>
      <div className="pc:mt-[120px] shadow-[0px 0px 36px 0px rgba(0, 0, 0, 0.05)] mt-[64px] rounded-3xl bg-white">
        <div className="relative top-[-53px] m-auto max-w-[680px] px-[24px]">
          {/* ✅ 여기에 프로필 컴포넌트과 오늘의 감정 컴포넌트를 구현해주세요. */}
          {/* ✅ <section> 코드는 예시 입니다. 지우고 작업해주세요:-) */}
          <section className="flex flex-col items-center">
            <div className="mb-[16px] h-[120px] w-[120px] rounded-full bg-amber-300"></div>
            <span>프로필</span>
          </section>
        </div>
        <div className="flex h-full w-full flex-col justify-center p-[24px] pb-[40px]">
          <h1>감정 차트</h1>
          <div className="flex h-full w-full items-center border">
            <EmotionPieChart />
            <EmotionRankList />
          </div>
        </div>
      </div>
      <div className="pc:pt-[103px] m-auto max-w-[680px] px-[24px] pt-[56px] pb-[114px]">
        <MyTabMenu />
      </div>
    </main>
  );
}
