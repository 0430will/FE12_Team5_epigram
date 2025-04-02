'user client';

import { useEffect, useState } from 'react';

export default function TodayEmotionHeader() {
  const [headerData, setHeaderData] = useState<{ data: string; emotion: string }>({ data: '', emotion: '' });

  useEffect(() => {
    const storedData = localStorage.getItem('todayEmotion');

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setHeaderData({
        data: parsedData.data,
        emotion: parsedData.emotion,
      });
    } else {
      console.log('No data found in localStorage');
    }
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="tablet:w-[384px] pc:w-[640px] pc:h-[32px] pc:mb-[48px] mb-[24px] flex h-[26px] w-[312px] justify-between">
        <p className="text-pre-lg font-weight-semibold pc:text-pre-2xl">오늘의 감정</p>
        <p className="text-pre-lg font-weight-regular pc:text-mon-sm text-blue-400">
          {headerData?.data || '등록된 날짜가 없습니다.'}
        </p>
      </div>
    </div>
  );
}
