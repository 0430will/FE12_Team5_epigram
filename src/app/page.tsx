'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ScrollInMotion = {
  hidden: { opacity: 0, y: 70 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 1.5 },
};

const DampingMotion = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
  transition: { type: 'spring', stiffness: 400, damping: 10 },
};

export default function Home() {
  return (
    <div className="flex flex-col bg-blue-200">
      <section>
        <div className="border-line-100 relative z-1 flex h-[672px] w-full items-center justify-center border-b-[1px] bg-blue-100 bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_24px,#F2F2F2_24px,#F2F2F2_25px)]">
          <div className="tablet:gap-[32px] pc:gap-[48px] flex flex-col items-center justify-center gap-[24px]">
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <div className="tablet:gap-[24px] pc:gap-[40px] flex flex-col gap-[6px]">
                <h1 className="font-iropke text-iro-2xl text-black-500 tablet:text-iro-3xl pc:text-iro-4xl pc:leading-[64px] flex justify-center text-center font-normal">
                  나만 갖고 있기엔
                  <br /> 아까운 글이 있지 않나요?
                </h1>
                <p className="text-black-300 font-iropke text-iro-tablet tablet:text-iro-xl text-center font-normal">
                  다른 사람들과 감정을 공유해 보세요.
                </p>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <motion.div {...DampingMotion}>
                <Link
                  href={'/epigrams'}
                  className="bg-black-500 text-pre-lg pc:text-pre-xl pc:px-[108px] pc:py-[16px] rounded-[12px] px-[28px] py-[11px] font-semibold text-blue-100"
                >
                  시작하기
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-[20px] flex flex-col items-center justify-center gap-[4px]">
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <p className="text-pre-xs tablet:text-pre-lg font-semibold text-blue-400">더 알아보기</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <Image src="/assets/icons/chevron.svg" alt="화살표" width={24} height={24} />
            </motion.div>
          </div>
        </div>
        <div className="h-[15px] w-full bg-[url('/assets/images/pattern.png')] bg-repeat drop-shadow-xl"></div>
      </section>
      <section className="bg-bg-100">
        <div className="min-h-screen w-full max-w-[1316px] px-[24px] mx-auto flex flex-col items-center justify-center tablet:gap-[380px] mt-[131px] mb-[210px] tablet:mt-[254px] pt-[124px]">

          <div className="flex flex-col tablet:flex-row items-center justify-center ml-[68px] m-[24px] min-w-[312px] max-w-[1400px] h-auto tablet:gap-[80px]">
            <img
              src="/assets/images/rending/img_Desktop_landing01.png"
              alt="명언, 글귀 등 공유글 예시 이미지"
              className="w-full tablet:min-w-[480px] h-auto object-contain tablet:mt-[50px]"
            />
            <div className="w-full min-w-[429px] tablet:w-1/2 font-pretendard font-bold text-black-950 text-left flex flex-col justify-center gap-[24px] mt-auto">
              <h5 className="text-[clamp(20px,2vw,32px)] leading-[clamp(24px,2.5vw,40px)]">
                명언이나 글귀,
                <br />토막 상식들을 공유해 보세요.
              </h5>
              <p className="font-medium text-[clamp(12px,1.2vw,24px)] text-blue-600">
                나만 알던 소중한 글들을
                <br />다른 사람들에게 전파하세요.
              </p>
            </div>
          </div>

          <div className="flex flex-col tablet:flex-row-reverse items-center justify-center m-[24px] min-w-[312px] max-w-[1400px] h-auto tablet:gap-[80px]">
            <img
              src="/assets/images/rending/img_Desktop_landing02.png"
              alt="감정 상태 선택 예시 이미지"
              className="w-full max-w-full tablet:min-w-[480px] h-auto object-contain overflow-hidden tablet:mt-[50px]"
            />
            <div className="w-full min-w-[438px] tablet:w-1/2 font-pretendard font-bold text-black-950 text-right flex flex-col justify-center gap-[24px] mt-auto">
              <h5 className="text-[clamp(20px,2vw,32px)] leading-[clamp(24px,2.5vw,40px)]">
                감정 상태에 따라,
                <br />알맞은 위로를 받을 수 있어요.
              </h5>
              <p className="font-medium text-[clamp(12px,1.2vw,24px)] text-blue-600">
                태그를 통해 글을 모아 볼 수 있어요.
              </p>
            </div>
          </div>

          <div className="flex flex-col tablet:flex-row items-center justify-center ml-[68px] m-[24px] min-w-[312px] max-w-[1400px] h-auto tablet:gap-[80px]">
            <img
              src="/assets/images/rending/img_Desktop_landing03.png"
              alt="감정 상태 통계 예시 이미지"
              className="w-full max-w-full tablet:min-w-[480px] h-auto object-contain overflow-hidden tablet:mt-[50px]"
            />
            <div className="w-full min-w-[429px] font-pretendard font-bold text-black-950 text-left flex flex-col justify-center gap-[24px] mt-auto">
              <h5 className="text-[clamp(20px,2vw,32px)] leading-[clamp(24px,2.5vw,40px)]">
                내가 요즘 어떤 감정 상태인지
                <br />통계로 한눈에 볼 수 있어요.
              </h5>
              <p className="font-medium text-[clamp(12px,1.2vw,24px)] text-blue-600">
                감정 달력으로
                <br />내 마음에 담긴 감정을 확인해보세요.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="h-[15px] w-full scale-y-[-1] bg-[url('/assets/images/pattern.png')] bg-repeat drop-shadow-xl"></div>
        <div className="border-line-100 relative z-1 flex h-[672px] w-full items-center justify-center border-b-[1px] bg-blue-100 bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_24px,#F2F2F2_24px,#F2F2F2_25px)]">
          <div className="pc:gap-[48px] flex flex-col items-center justify-center gap-[32px]">
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <Image
                className="pc:w-[182px] pc:h-[104px]"
                src="/assets/images/slogan-text.svg"
                width={122}
                height={70}
                alt="날마다 에피그램"
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" variants={ScrollInMotion} viewport={{ once: true }}>
              <motion.div {...DampingMotion}>
                <Link
                  href={'/epigrams'}
                  className="pc:text-pre-xl pc:px-[108px] pc:py-[16px] bg-black-500 text-pre-lg rounded-[12px] px-[28px] py-[11px] font-semibold text-blue-100"
                >
                  시작하기
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}