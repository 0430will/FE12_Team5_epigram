'use client';

import Image from 'next/image';
import Calendar from 'react-calendar';
import './custom-calendar.css';
import moment from 'moment';
import { JSX, useState } from 'react';
import { EmotionLog } from '@/types/Emotionlog';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EmotionData = {
  MOVED: '/assets/images/heartFace.png',
  HAPPY: '/assets/images/smiling.png',
  WORRIED: '/assets/images/thinking.png',
  SAD: '/assets/images/sad.png',
  ANGRY: '/assets/images/angry.png',
};

export default function CustomCalender({ data }: { data: EmotionLog[] }) {
  const [value, onChange] = useState<Value>(new Date());
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());
  const createdAtArray = data.map((item) => moment(item.createdAt).format('YYYY-MM-DD'));

  const goToNextMonth = () => {
    const nextMonth = moment(displayMonth).add(1, 'month').toDate();
    setDisplayMonth(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(displayMonth).subtract(1, 'month').toDate();
    setDisplayMonth(prevMonth);
  };

  const addContent = ({ date }: { date: Date | string }) => {
    const contents: JSX.Element[] = [];
    data.map((day) => {
      if (moment(day.createdAt).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD')) {
        contents.push(
          <Image key={day.id} src={`${EmotionData[day.emotion]}`} width="24" height="24" alt="오늘의 감정" />,
        );
      }
    });
    return <div className="flex items-center justify-center">{contents}</div>;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-[22px]">
      <div className="flex w-[312px] items-center justify-between">
        <span className="text-pre-lg text-black-600 font-semibold">{moment(displayMonth).format('YYYY년 M월')}</span>
        <div className="flex gap-[16px]">
          <div className="bg-bg-100 flex items-center justify-center gap-[4px] rounded-[8px] py-[5px] pr-[8px] pl-[12px]">
            <span className="text-pre-xs font-semibold text-gray-200">필터: 없음</span>
            <Image src="/assets/icons/down.svg" width={16} height={16} alt="토글" />
          </div>
          <Image
            className="cursor-pointer"
            onClick={goToPrevMonth}
            src="/assets/icons/left.svg"
            width={20}
            height={20}
            alt="왼쪽 버튼"
          />
          <Image
            className="cursor-pointer"
            onClick={goToNextMonth}
            src="/assets/icons/right.svg"
            width={20}
            height={20}
            alt="오른쪽 버튼"
          />
        </div>
      </div>
      <Calendar
        locale="ko"
        formatDay={(local, date) => moment(date).format('D')}
        value={value}
        onChange={onChange}
        next2Label={null}
        prev2Label={null}
        tileContent={addContent}
        className={`w-[312px] rounded-xl bg-white`}
        tileClassName={({ date, view }) => {
          const dateString = moment(date).format('YYYY-MM-DD');
          const isSpecialDay = createdAtArray.includes(dateString);

          return view === 'month'
            ? `font-semibold text-gray-200 w-[44px] h-[44px] flex flex-col justify-center items-center text-center border-b border-blue-200 ${isSpecialDay ? 'text-[8px]' : 'text-pre-lg'}`
            : '';
        }}
        nextLabel={null}
        prevLabel={null}
        activeStartDate={displayMonth}
      />
    </div>
  );
}
