import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-[1000px] flex-col bg-blue-200">
      <section>
        <div className="border-line-100 relative z-1 flex h-[672px] w-full items-center justify-center border-b-[1px] bg-blue-100 bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_23px,#F2F2F2_23px,#F2F2F2_24px)]">
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
      {/* 세번째 세션 */}
      <section className="% bg-blue-200">
        <div className="pc:mx-[33%] pc:w-[640px] tablet:w-[384px] tablet:mx-[33%] pc:mt-[270px] tablet:mt-[191px] pc:h-[1056px] mx-[24px] mt-[80px] flex h-[680px] w-[full] flex-col gap-[40px] text-center">
          <h1 className="text-black-950 text-pre-2xl font-bold">
            사용자들이 직접
            <br />
            인용한 에피그램들
          </h1>
          <div className="pc:gap-[60px] tablet:gap-[20px] flex h-[full] w-[full] flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <div className="pc:h-[148px] h-[120px] rounded-[16px] bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_23px,#F2F2F2_23px,#F2F2F2_24px)]">
                <div>
                  <div className="tablet:gap-[20px] mx-[24px] my-[24px] flex flex-col">
                    <h2 className="font-iropke text-black-600 text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-left leading-[24px]">
                      오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
                    </h2>
                    <h3 className="font-iropke text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-right text-blue-400">
                      -앙드레 말로-
                    </h3>
                  </div>
                </div>
              </div>
              <div className="font-regular text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] flex justify-end gap-[8px] text-blue-400">
                <h3>#나아가야할때</h3>
                <h3>#꿈을이루고싶을때</h3>
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <div className="pc:h-[228px] h-[166px] rounded-[16px] bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_23px,#F2F2F2_23px,#F2F2F2_24px)]">
                <div>
                  <div className="tablet:gap-[20px] mx-[24px] my-[24px] flex flex-col">
                    <h2 className="font-iropke text-black-600 text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-left leading-[24px]">
                      이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는거야.
                      무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지.
                    </h2>
                    <h3 className="font-iropke text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-right text-blue-400">
                      -파울로 코엘료-
                    </h3>
                  </div>
                </div>
              </div>
              <div className="font-regular text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] flex justify-end gap-[8px] text-blue-400">
                <h3 className="">#나아가야할때</h3>
                <h3>#꿈을이루고싶을때</h3>
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <div className="pc:h-[148px] h-[120px] rounded-[16px] bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_23px,#F2F2F2_23px,#F2F2F2_24px)]">
                <div>
                  <div className="tablet:gap-[20px] mx-[24px] my-[24px] flex flex-col">
                    <h2 className="font-iropke text-black-600 text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-left leading-[24px]">
                      오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
                    </h2>
                    <h3 className="font-iropke text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] font-regular text-right text-blue-400">
                      -앙드레 말로-
                    </h3>
                  </div>
                </div>
              </div>
              <div className="font-regular text-iro-md tablet:text-iro-lg pc:text-iro-2xl pc:leading-[40px] flex justify-end gap-[8px] text-blue-400">
                <h3>#나아가야할때</h3>
                <h3>#꿈을이루고싶을때</h3>
              </div>
            </div>
            <div className="flex justify-center">
              <Image src="/assets/icons/kebab.svg" alt="케밥 아이콘" width={24} height={24} />
            </div>
          </div>
        </div>
        <div className="mt-[24px] h-[15px] w-full rotate-180 bg-[url('/assets/images/pattern.png')] bg-repeat drop-shadow-xl"></div>
      </section>
    </div>
  );
}
