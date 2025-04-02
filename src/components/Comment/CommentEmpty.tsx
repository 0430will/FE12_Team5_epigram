'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CommentEmptyProps {
  showButton?: boolean;
}

export default function CommentEmpty({ showButton = true }: CommentEmptyProps) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-center py-20 text-center">
      <Image
        src="assets/images/empty.svg"
        alt="댓글 없음"
        width={80}
        height={80}
        className="pc:w-[144px] pc:h-[144px] mb-6 h-[96px] w-[96px] opacity-60"
      />
      <p className="pc:text-[20px] pc:leading-[32px] text-black-600 text-[14px] leading-[24px] font-normal">
        아직 작성한 댓글이 없어요!
      </p>
      <p className="pc:text-[20px] pc:leading-[32px] text-black-600 tablet:mb-[40px] pc:mb-[48px] mb-[32px] text-[14px] leading-[24px] font-normal">
        댓글을 달고 다른 사람들과 교류해보세요.
      </p>
      {showButton && (
        <button
          onClick={() => router.push('/feed')}
          className="pc:text-pre-xl pc:px-[40px] text-pre-md bg-bg-100 flex cursor-pointer gap-[4px] rounded-full border border-blue-500 px-[18px] py-[11.5px] font-medium text-blue-500 transition hover:bg-blue-900 hover:text-white"
        >
          에피그램 둘러보기
        </button>
      )}
    </div>
  );
}
