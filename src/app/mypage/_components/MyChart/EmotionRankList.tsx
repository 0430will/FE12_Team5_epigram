'use client';

import { GetMonthEmotion } from '@/lib/Emotionlog';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// import Image from 'next/image';

interface EmotionData {
  key: string;
  percentage: number;
}

const emotionMapping: Record<string, { image: string; name: string }> = {
  MOVED: { image: '/assets/images/heartFace.png', name: '감동' },
  HAPPY: { image: '/assets/images/smiling.png', name: '기쁨' },
  WORRIED: { image: '/assets/images/thinking.png', name: '고민' },
  SAD: { image: '/assets/images/sad.png', name: '슬픔' },
  ANGRY: { image: '/assets/images/angry.png', name: '분노' },
};

export default function EmotionList() {
  const [emotions, setEmotions] = useState<EmotionData[]>([]);
  const { data: session } = useSession();

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  useEffect(() => {
    if (!session?.user) return;

    const fetchEmotions = async () => {
      const userId = Number(session.user.id);
      try {
        //사용자의 이번달 감정 데이터 불러오기
        const response = await GetMonthEmotion(userId, currentYear, currentMonth);
        if (response.length > 0) {
          // 감정 개수 카운트(emotionCount객체에 저장)
          const emotionCount: Record<string, number> = {};
          response.forEach((log: { emotion: string }) => {
            emotionCount[log.emotion] = (emotionCount[log.emotion] || 0) + 1;
          });
          // 전체 감정 개수 합산(퍼센트 계산을 위해)
          const totalEmotions = Object.values(emotionCount).reduce((acc, cur) => acc + cur, 0);
          // 퍼센트 변환 후 정렬
          const sortedData = Object.keys(emotionCount)
            .map((emotion) => ({
              key: emotion,
              percentage: parseFloat(((emotionCount[emotion] / totalEmotions) * 100).toFixed(1)), // 소수점 1자리
            }))
            .sort((a, b) => b.percentage - a.percentage); // 내림차순 정렬
          setEmotions(sortedData);
        }
      } catch {
        console.error('감정 데이터를 불러오는 중 오류 발생');
      }
    };

    fetchEmotions();
  }, [session]);

  return (
    <div className="flex h-full w-full flex-col justify-center gap-[8px] empty:hidden">
      {emotions.map((emotion, index) => {
        const mapped = emotionMapping[emotion.key];
        if (!mapped) return null;
        return (
          <div key={index} className="flex items-center justify-center gap-2">
            <img src={mapped.image} alt={mapped.name} className="pc:w-[24px] pc:h-[24px] h-[16px] w-[16px]" />
            <span className="text-pre-xs font-weight-semibold pc:text-pre-xl">{emotion.percentage}%</span>
          </div>
        );
      })}
    </div>
  );
}
