import Image from 'next/image';
import Link from 'next/link';

export default function LandingHeader() {
  return (
    <div className="border-line-200 pc:h-[80px] tablet:h-[60px] flex h-[52px] w-full items-center justify-around border-b-1 bg-blue-100 px-[24px]">
      <Link href="/search">
        <Image className="pc:h-[36px] pc:w-[36px]" src="/assets/icons/search.svg" alt="돋보기" width={20} height={20} />
      </Link>
      <Link href="/" className="color-blue-100 font-iropke flex h-[36px] w-full items-center justify-center">
        <Image className="pc:w-[48px] pc:h-[48px]" src="/assets/images/logo.png" alt="책" width={36} height={36} />
        <h1 className="font-weight-bold text-iro-xs--line-height font-montserrat pc:text-iro-lg--line-height ml-[2px] font-extrabold">
          Epigram
        </h1>
      </Link>
      <Link href="/mypage">
        <Image className="pc:h-[36px] pc:w-[36px]" src="assets/icons/user.svg" alt="사람" width={20} height={20} />
      </Link>
    </div>
  );
}
