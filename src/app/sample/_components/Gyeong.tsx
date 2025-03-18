import TodayEmotion from '@/components/TodayEmotion';

export default function Gyeong() {
  return (
    <>
      <div className="border border-gray-200 bg-gray-50 p-5">
        <h3 className="mb-5 text-xl font-bold">1. 오늘의 감정</h3>
        <p className="mb-5 leading-7">
          메인 페이지와 마이 페이지에서 활용하는 오늘의 감정 컴포넌트입니다.
          <br /> 메인 페이지에서 사용할 경우 emotionType=main 으로 활용하셔야합니다.
          <br /> 마이 페이지에서 사용할 경우 emotionType=mypage 로 활용하시면 됩니다.
          <br /> 클릭시 서버에 api요청도 보내게됩니다. 이때 header에 acessToken이 필요합니다!
          <br /> 로그인 기능이 아직 구현 전이라서 테스트를 원하실 경우 직접 api에 토큰을 넣어주세요.
        </p>
        <div className="bg-white p-5">
          <TodayEmotion emotionType="main" />
          <TodayEmotion emotionType="mypage" />
        </div>
      </div>
    </>
  );
}
