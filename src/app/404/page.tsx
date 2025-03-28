import Image from 'next/image';

export default function page() {
  return (
    <div className="flex h-[calc(100vh-78px)] flex-col items-center justify-center px-[24px] text-center">
      <Image
        className="tablet:w-[280px] tablet:h-[280px]"
        src="/assets/icons/empty.svg"
        alt="찾을 수 없음 아이콘"
        width={180}
        height={180}
      />
      <h1 className="tablet:text-[70px] text-[55px] leading-[1] font-bold text-blue-400">404</h1>
      <p className="tablet:text-pre-xl text-pre-l mt-[20px] text-blue-400">
        찾을 수 없는 페이지입니다.
        <br />
        요청하신 페이지가 사라졌거나, 잘못된 경로입니다.
      </p>
    </div>
  );
}
