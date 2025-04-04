'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { GetMonthEmotion } from '@/lib/Emotionlog'; // 경로 맞게 수정
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import NonEmotionChart from './NonEmotionChart';
import { useEmotionContext } from '../EmotionContext';
// import Image from 'next/image';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6B6B'];

const emotionMapping: Record<string, { image: string; name: string }> = {
  MOVED: { image: '/assets/images/heartFace.png', name: '감동' },
  HAPPY: { image: '/assets/images/smiling.png', name: '기쁨' },
  WORRIED: { image: '/assets/images/thinking.png', name: '고민' },
  SAD: { image: '/assets/images/sad.png', name: '슬픔' },
  ANGRY: { image: '/assets/images/angry.png', name: '분노' },
};

export default function EmotionPieChart() {
  const { data: session } = useSession();
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [topEmotion, setTopEmotion] = useState<{ image: string; name: string } | null>(null);
  const [hasData, setHasData] = useState(true);
  const { todayEmotion } = useEmotionContext();

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  //현재년도와 월 가져오기

  useEffect(() => {
    if (!session?.user) return;

    const fetchData = async () => {
      const userId = Number(session.user.id);
      if (isNaN(userId)) {
        console.error('userId가 유효하지 않습니다.');
        return;
      }
      const response = await GetMonthEmotion(userId, currentYear, currentMonth);
      if (response.length > 0) {
        const emotionCount: Record<string, number> = {};
        //감정 데이터 개수 카운트
        response.forEach((log: { emotion: string }) => {
          emotionCount[log.emotion] = (emotionCount[log.emotion] || 0) + 1;
        });
        // 차트 데이터 변환
        const formattedData = Object.keys(emotionCount).map((emotion) => ({
          name: emotion,
          value: emotionCount[emotion],
        }));
        setChartData(formattedData);
        //퍼센트가 가장 높은 감정(chartData에서 value가 가장 높은 값)
        const topEmotionKey = formattedData.reduce((prev, current) =>
          prev.value > current.value ? prev : current,
        ).name;
        setTopEmotion(emotionMapping[topEmotionKey] || null);
      } else {
        setHasData(false);
      }
    };
    fetchData();
  }, [session, todayEmotion]);

  if (!hasData) {
    return <NonEmotionChart message="이번달의 감정 기록이 없습니다." />;
  }

  return (
    <div className="pc:h-[180px] relative flex h-[120px] w-full flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={50}
            fill="#88884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {topEmotion && (
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <img src={topEmotion.image} alt={topEmotion.name} className="h-[24px] w-[24px]" />
          <span className="text-pre-lg font-weight-bold">{topEmotion.name}</span>
        </div>
      )}
    </div>
  );
}
