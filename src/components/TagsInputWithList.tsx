'use client';

import { EpigramTag } from '@/types/Epigram';
import { TagsInput } from './TagsInput';
import { Tags } from './Tag/Tags';

export function TagsInputWithList({ tags, setTags }: { tags: EpigramTag[]; setTags: (tags: EpigramTag[]) => void }) {
  const handleAddTag = (newTag: EpigramTag) => {
    if (tags.some((tag) => tag.name === newTag.name)) {
      alert('이 태그는 이미 추가되어 있습니다.');
      return;
    }
    if (tags.length >= 3) {
      alert('태그는 최대 3개까지 가능합니다.');
      return;
    }
    const updatedTags = [...tags, newTag];
    setTags(updatedTags); // react-hook-form 상태 업데이트
  };

  const handleRemoveTag = (tag: EpigramTag) => {
    const updatedTags = tags.filter((t) => t.id !== tag.id);
    setTags(updatedTags); // react-hook-form 상태 업데이트
  };

  return (
    <div className="flex flex-col gap-[15px]">
      <TagsInput onAddTag={handleAddTag} tags={tags} />
      <Tags tags={tags} onRemoveTag={handleRemoveTag} />
    </div>
  );
}
