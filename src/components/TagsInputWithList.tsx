'use client';

import { useState } from 'react';
import { EpigramTag } from '@/types/Epigram';
import { TagsInput } from './TagsInput';
import { Tags } from './Tags';

export function TagsInputWithList() {
  const [tags, setTags] = useState<EpigramTag[]>([]); // 초기값 없이 빈배열로 시작

  const handleAddTag = (newTag: EpigramTag) => {
    // 중복 태그 체크
    const isDuplicate = tags.some((tag) => tag.name === newTag.name);
    if (isDuplicate) {
      alert('이 태그는 이미 추가되어 있습니다.');
      return; // 중복이 있을 경우 추가하지 않음
    }

    setTags([...tags, newTag]); // 새로운 태그 추가
  };

  const handleRemoveTag = (tag: EpigramTag) => {
    setTags(tags.filter((t) => t.id !== tag.id)); // 태그 삭제
  };

  return (
    <div>
      <TagsInput onAddTag={handleAddTag} tags={tags} />
      <Tags tags={tags} onRemoveTag={handleRemoveTag} />
    </div>
  );
}
