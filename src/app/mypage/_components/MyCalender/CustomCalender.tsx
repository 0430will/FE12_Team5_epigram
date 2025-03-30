'use client';

import Image from 'next/image';
import Calendar from 'react-calendar';
import './custom-calendar.css';
import moment from 'moment';
import { JSX, useState } from 'react';
import { EmotionLog } from '@/types/Emotionlog';
import EmotionFilter, { EmotionKey } from './EmotionFilter';

const EmotionData = {
  MOVED: {
    image: '/assets/images/heartFace.png',
    name: '감동',
  },
  HAPPY: { image: '/assets/images/smiling.png', name: '기쁨' },
  WORRIED: { image: '/assets/images/thinking.png', name: '걱정' },
  SAD: { image: '/assets/images/sad.png', name: '슬픔' },
  ANGRY: { image: '/assets/images/angry.png', name: '화남' },
};

export default function CustomCalender({
  data,
  displayMonth,
  setDisplayMonth,
}: {
  data: EmotionLog[];
  displayMonth: Date;
  setDisplayMonth: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey | null>(null);
  const filteredData = data.filter((item) => selectedEmotion === null || item.emotion === selectedEmotion);
  const createdAtArray = filteredData.map((item) => moment(item.createdAt).format('YYYY-MM-DD'));

  const goToNextMonth = () => {
    const nextMonth = moment(displayMonth).add(1, 'month').toDate();
    setDisplayMonth(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(displayMonth).subtract(1, 'month').toDate();
    setDisplayMonth(prevMonth);
  };

  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const addContent = ({ date }: { date: Date | string }) => {
    const contents: JSX.Element[] = [];

    filteredData.map((day) => {
      if (moment(day.createdAt).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD')) {
        contents.push(
          <div key={day.id} className="pc:w-[36px] pc:h-[36px] relative h-[24px] w-[24px]">
            <Image
              src={`${EmotionData[day.emotion].image}`}
              fill
              alt="오늘의 감정"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 100px"
            />
          </div>,
        );
      }
    });
    return <div className="flex items-center justify-center">{contents}</div>;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-[22px]">
      <div className="relative flex w-full items-center justify-between">
        <span className="text-pre-lg text-black-600 pc:text-pre-2xl font-semibold">
          {moment(displayMonth).format('YYYY년 M월')}
        </span>
        <div className="flex items-center justify-center gap-[16px]">
          <div
            onClick={toggleFilter}
            className={`bg-bg-100 pc:h-[52px] pc:w-[144px] pc:rounded-[14px] flex h-[30px] w-[88px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] py-[5px] ${selectedEmotion ? 'border-black-600 border-[3px] pr-[5px] pl-[9px]' : 'pr-[8px] pl-[12px]'}`}
          >
            <span
              className={`text-pre-xs pc:text-pre-xl font-semibold ${selectedEmotion ? 'text-black-600' : 'text-gray-200'}`}
            >
              필터: {selectedEmotion ? `${EmotionData[selectedEmotion].name}` : '없음'}
            </span>
            <div className="pc:w-[36px] pc:h-[36px] relative h-[16px] w-[16px]">
              <Image src={`/assets/icons/down${selectedEmotion ? '' : '_gray'}.svg`} fill alt="토글" />
            </div>
          </div>
          <div className="pc:w-[36px] pc:h-[36px] relative h-[20px] w-[20px]">
            <Image
              className="cursor-pointer"
              onClick={goToPrevMonth}
              src="/assets/icons/left.svg"
              fill
              alt="왼쪽 버튼"
            />
          </div>
          <div className="pc:w-[36px] pc:h-[36px] relative h-[20px] w-[20px]">
            <Image
              className="cursor-pointer"
              onClick={goToNextMonth}
              src="/assets/icons/right.svg"
              fill
              alt="오른쪽 버튼"
            />
          </div>
        </div>
        {isFilterVisible && <EmotionFilter selectedEmotion={selectedEmotion} setSelectedEmotion={setSelectedEmotion} />}
      </div>
      <Calendar
        locale="ko"
        formatDay={(local, date) => moment(date).format('D')}
        value={new Date()}
        next2Label={null}
        prev2Label={null}
        tileContent={addContent}
        className={`tablet:w-[379px] pc:w-[637px] w-[308px] rounded-xl bg-white`}
        tileClassName={({ date, view }) => {
          const dateString = moment(date).format('YYYY-MM-DD');
          const isSpecialDay = createdAtArray.includes(dateString);

          return view === 'month'
            ? `font-semibold text-gray-200 w-[44px] h-[44px] tablet:w-[54px] tablet:h-[54px] pc:w-[91px] pc:h-[91px] flex flex-col justify-center items-center text-center border-b border-blue-200 pc:text-pre-2xl ${isSpecialDay ? 'text-[8px] pc:text-[16px]' : 'text-pre-lg'}`
            : '';
        }}
        nextLabel={null}
        prevLabel={null}
        activeStartDate={displayMonth}
      />
    </div>
  );
}
