import { EpigramTag } from '@/types/Epigram';
import Image from 'next/image';

interface TagsProps {
  tags: EpigramTag[];
  onRemoveTag: (tag: EpigramTag) => void;
  onClickTag?: (tag: EpigramTag) => void; // 클릭 이벤트 prop
}

export function Tags({ tags, onRemoveTag, onClickTag }: TagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <div
          key={tag.id}
          className="mobile:px-[12px] mobile:py-[8px] mobile:rounded-[20px] mobile:text-[16px] mobile:leading-[26px] 
            tablet:px-[12px] tablet:py-[8px] tablet:rounded-[20px] tablet:text-[20px] tablet:leading-[32px] 
            pc:px-[14px] pc:py-[12px] pc:rounded-[22px] pc:text-[24px] pc:leading-[32px] 
            text-black-300 bg-bg-100 flex items-center gap-2 rounded-[18px] cursor-pointer hover:bg-blue-300 transition-colors duration-200"
          onClick={() => onClickTag?.(tag)} // 클릭 시 실행
        >
          <span className="text-[16px] font-normal leading-[26px]">
            {tag.name}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // 삭제 버튼 누를 때 상위 클릭 막기
              onRemoveTag(tag);
            }}
            className="hover:text-blue-9500 cursor-pointer text-blue-500"
          >
            <Image src="/assets/icons/x_gray.svg" width={20} height={20} alt="닫기 아이콘" />
          </button>
        </div>
      ))}
    </div>
  );
}
