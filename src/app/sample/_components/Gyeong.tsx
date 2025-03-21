import ClientButton from '@/components/Button/ClientButton';
import ServerButton from '@/components/Button/ServerButton';
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
        <div className="mb-5 bg-white p-5">
          <TodayEmotion emotionType="main" />
          <TodayEmotion emotionType="mypage" />
        </div>
        <h3 className="mb-5 text-xl font-bold">2. 버튼</h3>
        <p className="mb-5 leading-7">
          서버 컴포넌트용 ServerButton과 클라이언트 컴포넌트용 ClientButton입니다.
          <br />두 컴포넌트의 디자인은 동일하지만 감싸져있는 태그가 다릅니다. <br />
          서버: Link, span
          <br />
          클라이언트: Button
          <br />
          서버 컴포넌트나 페이지 내부에서 다른 주소로 이동만 시켜주는 버튼의 경우 서버버튼을 활용하시면 됩니다!
          <br />
          버튼에 onClick속성이 필요하시거나 form 제출의 경우 클라이언트 버튼을 활용해주세요!
          <br />
        </p>
        <div className="bg-white">
          <ServerButton isValid href={'/'}>
            서버버튼
          </ServerButton>
          <ServerButton isValid={false} href={'/'}>
            서버버튼
          </ServerButton>
          <ServerButton isValid href={'/'} isRounded>
            서버버튼
          </ServerButton>
          <ServerButton isValid={false} href={'/'} isRounded>
            서버버튼
          </ServerButton>
          <ClientButton isValid className="w-full">
            클라이언트
          </ClientButton>
          <ClientButton isValid={false} className="w-full">
            클라이언트
          </ClientButton>
        </div>
      </div>
    </>
  );
}
