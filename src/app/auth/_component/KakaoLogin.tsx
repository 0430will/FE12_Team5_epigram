import Image from 'next/image';

export default function KakaoLogin() {
  return (
    <div className="pc:w-[60px] pc:h-[60px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border border-solid border-[#E6E6EA]">
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
