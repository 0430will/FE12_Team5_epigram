import Image from 'next/image';

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="tablet:py-[80px] py-[36px] text-center">
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
