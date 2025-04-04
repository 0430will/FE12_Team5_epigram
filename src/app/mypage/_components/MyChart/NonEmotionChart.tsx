import Image from 'next/image';

interface NonChartProps {
  message: string;
}

export default function NonEmotionChart({ message }: NonChartProps) {
  return (
    <div className="pc:py-[10px] tablet:py-[10px] h-full w-full justify-items-center py-[36px]">
      <Image
        className="tablet:w-[114px] tablet:mb-[24px] mb-[8px] inline-block"
        src="/assets/images/empty.svg"
        alt="빈 데이터 이미지"
        width={96}
        height={96}
      />
      <p className="tablet:text-pre-xl text-pre-md block" dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
}
