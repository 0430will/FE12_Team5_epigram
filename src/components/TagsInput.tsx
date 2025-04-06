'use client';

import { useState } from 'react';
import { EpigramTag } from '@/types/Epigram';
import { z } from 'zod';

interface TagsInputProps {
  onAddTag: (tag: EpigramTag) => void; // 부모로부터 태그 추가 함수 받기
  tags: EpigramTag[];
}

export function TagsInput({ onAddTag, tags }: TagsInputProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const tagSchema = z
    .string()
    .max(10, '최대 10자까지 입력할 수 있습니다.')
    .transform((value) => value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g, ''));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = tagSchema.safeParse(e.target.value);
    if (result.success) {
      setInputValue(result.data);
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
