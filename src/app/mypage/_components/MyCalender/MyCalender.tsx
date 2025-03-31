'use client';

import { EmotionLog } from '@/types/Emotionlog';
import CustomCalender from './CustomCalender';
import { useEffect, useState } from 'react';
import { GetMonthEmotion } from '@/lib/Emotionlog';
import moment from 'moment';

export default function MyCalender() {
  const [data, setData] = useState<EmotionLog[]>();
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

  const getData = async () => {
    const response = await GetMonthEmotion(1349, moment(displayMonth).year(), moment(displayMonth).month() + 1);
    if (!response) return;

    setData(response);
  };

  useEffect(() => {
    getData();
  }, [displayMonth]);

  if (!data) return;

  return <CustomCalender data={data} displayMonth={displayMonth} setDisplayMonth={setDisplayMonth} />;
}
