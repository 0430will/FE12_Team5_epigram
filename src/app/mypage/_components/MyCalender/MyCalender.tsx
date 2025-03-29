import { EmotionLog } from '@/types/Emotionlog';
import CustomCalender from './CustomCalender';

export default async function MyCalender() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/emotionLogs/monthly?userId=1349&year=2025&month=3`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: EmotionLog[] = await response.json();

  return (
    <div>
      <CustomCalender data={data} />
    </div>
  );
}
