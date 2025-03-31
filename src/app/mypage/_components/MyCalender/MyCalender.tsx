'use client';

import { EmotionLog } from '@/types/Emotionlog';
import CustomCalender from './CustomCalender';
import { useEffect, useState } from 'react';
import { GetMonthEmotion } from '@/lib/Emotionlog';
import moment from 'moment';
import { useSession } from 'next-auth/react';

export default function MyCalender() {
  const [data, setData] = useState<EmotionLog[]>();
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());
  const { data: session } = useSession();
  const writerId = session?.user.id ? Number(session.user.id) : undefined;

  const getData = async () => {
    if (!writerId) return;
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
