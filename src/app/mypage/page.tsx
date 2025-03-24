import MyTabMenu from './_components/MyTabMenu';

export default function MyPage() {
  return (
    <main>
      <div className="pc:mt-[120px] shadow-[0px 0px 36px 0px rgba(0, 0, 0, 0.05)] mt-[64px] rounded-3xl bg-white">
        <div className="relative top-[-53px] m-auto max-w-[680px] px-[24px]">
          {/* TODO: 프로필 컴포넌트, 오늘의 감정 컴포넌트 구현 */}
          {/* ✅ 프로필 <section> 코드는 예시 입니다. 지우고 작업해주세요:-) */}
          <section className="flex flex-col items-center">
            <div className="mb-[16px] h-[120px] w-[120px] rounded-full bg-amber-300"></div>
            <span>프로필</span>
          </section>
        </div>
      </div>
      <div className="pc:pt-[103px] m-auto max-w-[680px] px-[24px] pt-[56px] pb-[114px]">
        <MyTabMenu />
      </div>
    </main>
  );
}
