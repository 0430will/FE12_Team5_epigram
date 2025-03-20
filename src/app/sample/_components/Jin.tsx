import { TagsInputWithList } from '@/components/TagsInputWithList';
import { useState } from 'react';

export default function Jin() {
  // 테스트용 데이터 (태그 배열)
  const [tags, setTags] = useState([
    { id: 1, name: 'React' },
    { id: 2, name: 'JavaScript' },
    { id: 3, name: 'TypeScript' },
  ]);

  // 태그 삭제 함수 (부모 컴포넌트에서 처리)
  const onRemoveTag = (tag: { id: number; name: string }) => {
    setTags((prevTags) => prevTags.filter((t) => t.id !== tag.id));
  };

  return (
    <div className="border border-gray-200 bg-gray-50 p-5">
      <h3 className="mb-5 text-xl font-bold"></h3>
      <p className="mb-5 leading-7"></p>
      <div className="bg-white p-5">
        <TagsInputWithList />
      </div>
    </div>
  );
}
