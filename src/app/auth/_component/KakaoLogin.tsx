import Image from 'next/image';

export default function KakaoLogin() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const loginWithKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code`;
  };
  return (
    <div
      className="pc:w-[60px] pc:h-[60px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border border-solid border-[#E6E6EA]"
      onClick={loginWithKakao}
    >
      <Image
        className="pc:w-[30px] pc:h-[27px]"
        src="/assets/icons/kakao.svg"
        width={20}
        height={18}
        alt="카카오 로고 이미지"
      />
    </div>
  );
}
