import { EpigramTag } from '../types/Epigram';

interface TagsProps {
  tags: EpigramTag[];
  onRemoveTag: (tag: EpigramTag) => void;
}

export function Tags({ tags, onRemoveTag }: TagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <div
          key={tag.id}
          className="mobile:px-[12px] mobile:py-[8px] mobile:rounded-[20px] mobile:text-[16px] mobile:leading-[26px] tablet:px-[12px] tablet:py-[8px] tablet:rounded-[20px] tablet:text-[20px] tablet:leading-[32px] pc:px-[14px] pc:py-[12px] pc:rounded-[22px] pc:text-[24px] pc:leading-[32px] flex items-center gap-2 rounded-[18px] bg-[var(--color-bg-100)] text-[#5E5E5E]"
        >
          <span className="mobile:text-[16px] mobile:leading-[26px] tablet:text-[20px] tablet:leading-[32px] pc:text-[24px] pc:leading-[32px] text-[16px] leading-[26px] font-normal text-[#5E5E5E]">
            {tag.name}
          </span>
          <button
            type="button"
            onClick={() => onRemoveTag(tag)}
            className="text-[var(--color-blue-500)] hover:text-[var(--color-blue-9500)]"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
