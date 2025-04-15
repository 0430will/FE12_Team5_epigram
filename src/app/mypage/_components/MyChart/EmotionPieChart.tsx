'use client';

import { useMonthEmotion } from '@/hooks/useMonthEmotion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import Image from 'next/image';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6B6B'];

const emotionMapping: Record<string, { image: string; name: string }> = {
  MOVED: { image: '/assets/icons/heart_face.svg', name: '감동' },
  HAPPY: { image: '/assets/icons/smiling_face.svg', name: '기쁨' },
  WORRIED: { image: '/assets/icons/thinking_face.svg', name: '고민' },
  SAD: { image: '/assets/icons/sad_face.svg', name: '슬픔' },
  ANGRY: { image: '/assets/icons/angry_face.svg', name: '분노' },
};

export default function EmotionPieChart() {
  const { chartData } = useMonthEmotion();

  const topEmotionName = chartData.reduce((prev, curr) => (prev.value > curr.value ? prev : curr), {
    name: '',
    value: 0,
  }).name;

  const topEmotion = emotionMapping[topEmotionName];

  return (
    <div className="pc:h-[180px] relative flex h-[120px] w-full flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="80%"
            outerRadius="100%"
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
          <img src={topEmotion.image} alt={topEmotion.name} className="pc:w-[40px] pc:h-[40px] h-[24px] w-[24px]" />
          <span className="text-pre-lg font-weight-bold">{topEmotion.name}</span>
        </div>
      )}
    </div>
  );
}
