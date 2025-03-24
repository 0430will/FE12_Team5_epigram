'use client';

import { useState } from 'react';
import { EpigramTag } from '@/types/Epigram';

interface TagsInputProps {
  onAddTag: (tag: EpigramTag) => void; // 부모로부터 태그 추가 함수 받기
  tags: EpigramTag[];
}

export function TagsInput({ onAddTag, tags }: TagsInputProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setInputValue(e.target.value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim().length > 0 && inputValue.length <= 10) {
      const isDuplicate = tags.some((tag) => tag.name === inputValue.trim());
      if (isDuplicate) {
        alert('이 태그는 이미 존재합니다.');
        return;
      }

      const newTag: EpigramTag = {
        id: Date.now(),
        name: inputValue.trim(),
      };
      onAddTag(newTag); // 부모에게 태그 추가 요청
      setInputValue(''); // 입력창 초기화
    }
  };

  return (
    <input
      id="tags"
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      className="text-pre-lg font-regular text-black-950 pc:text-pre-xl pc:h-[64px] h-[44px] rounded-[12px] border border-blue-300 px-[16px] placeholder:text-blue-400 focus:outline-blue-600"
      placeholder="입력하여 태그 작성 (최대 10자)"
    />
  );
}
