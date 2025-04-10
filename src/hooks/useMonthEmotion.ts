'use client';

import { useEmotionContext } from '@/app/mypage/_components/EmotionContext';
import { useEffect, useState } from 'react';
import { GetMonthEmotion } from '@/lib/Emotionlog';
import { useSession } from 'next-auth/react';

interface EmottionRawData {
  emotion: string;
}

interface EmotionProcessed {
  name: string;
  value: number;
}

interface EmotionPercentage {
  key: string;
  percentage: number;
}

export const useMonthEmotion = () => {
  const { data: session } = useSession();
  const { todayEmotion } = useEmotionContext();
  const [rawData, setRawData] = useState<EmottionRawData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    if (!session?.user) return;

    const fetch = async () => {
      setIsLoading(true);
      try {
        const userId = Number(session.user.id);
        const now = new Date();
        const response = await GetMonthEmotion(userId, now.getFullYear(), now.getMonth() + 1);

        if (response.length === 0) {
          setHasData(false);
        } else {
          setRawData(response);
          setHasData(true);
        }
      } catch (err) {
        console.error('감정 데이터 불러오기 실패', err);
        setHasData(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [session, todayEmotion]);

  const chartData: EmotionProcessed[] = rawData.reduce((acc, cur) => {
    const found = acc.find((item) => item.name === cur.emotion);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: cur.emotion, value: 1 });
    }
    return acc;
  }, [] as EmotionProcessed[]);

  const percentageData: EmotionPercentage[] = (() => {
    const total = rawData.length;
    const counts: Record<string, number> = {};
    rawData.forEach((log) => {
      counts[log.emotion] = (counts[log.emotion] || 0) + 1;
    });
    return Object.keys(counts)
      .map((key) => ({
        key,
        percentage: parseFloat(((counts[key] / total) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.percentage - a.percentage);
  })();
  return { chartData, percentageData, isLoading, hasData };
};
