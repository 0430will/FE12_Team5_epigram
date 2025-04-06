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
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
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
    <div className="mobile:gap-[8px] tablet:gap-[8px] pc:gap-[8px] flex items-center gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="mobile:px-[16px] mobile:py-[8px] mobile:rounded-[12px] mobile:border-[1px] mobile:border-blue-300 mobile:bg-white mobile:text-text-pre-lg mobile:leading-[26px] mobile:font-normal mobile:tracking-[0%] mobile:mb-[15px] tablet:px-[16px] tablet:py-[8px] tablet:rounded-[12px] tablet:border-[1px] tablet:border-blue-300 tablet:bg-white tablet:text-text-pre-lg tablet:leading-[26px] tablet:font-normal tablet:tracking-[0%] tablet:mb-[16px] pc:px-[16px] pc:py-[8px] pc:rounded-[12px] pc:border-[1px] pc:border-blue-300 pc:bg-white pc:text-text-pre-lg pc:leading-[32px] pc:font-normal pc:tracking-[0%] pc:mb-[22px] focus:outline-2 focus:outline-blue-600"
        placeholder="입력하여 태그 작성 (최대 10자)"
      />
    </div>
  );
}
