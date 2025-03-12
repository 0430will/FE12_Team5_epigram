import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-[1000px] flex-col bg-blue-200">
      <section>
        <div className="border-line-100 relative z-1 flex h-[672px] w-full items-center justify-center border-b-[1px] bg-blue-100 bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_24px,#F2F2F2_24px,#F2F2F2_25px)]">
          <div className="flex flex-col items-center justify-center gap-[24px]">
            <div className="flex flex-col gap-[6px]">
              <h1 className="font-iropke text-iro-2xl text-black-500 flex justify-center text-center font-normal">
                나만 갖고 있기엔
                <br /> 아까운 글이 있지 않나요?
              </h1>
              <p className="text-black-300 font-iropke text-iro-md text-center font-normal">
                다른 사람들과 감정을 공유해 보세요.
              </p>
            </div>
            <Link
              href={'/epigrams'}
              className="bg-black-500 text-pre-lg rounded-[12px] px-[28px] py-[11px] font-semibold text-blue-100"
            >
              시작하기
            </Link>
          </div>
          <div className="absolute bottom-[20px] flex flex-col items-center justify-center gap-[4px]">
            <p className="text-pre-xs font-semibold text-blue-400">더 알아보기</p>
            <Image src="/assets/icons/chevron.svg" alt="화살표" width={24} height={24} />
          </div>
        </div>
        <div className="h-[15px] w-full bg-[url('/assets/images/pattern.png')] bg-repeat drop-shadow-xl"></div>
      </section>
    </div>
  );
}
