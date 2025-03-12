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
