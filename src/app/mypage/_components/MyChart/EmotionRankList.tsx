'use client';

import { useMonthEmotion } from '@/hooks/useMonthEmotion';
// import Image from 'next/image';

const emotionMapping: Record<string, { image: string; name: string }> = {
  MOVED: {
    image: '/assets/icons/heart_face.svg',
    name: '감동',
  },
  HAPPY: { image: '/assets/icons/smiling_face.svg', name: '기쁨' },
  WORRIED: { image: '/assets/icons/thinking_face.svg', name: '고민' },
  SAD: { image: '/assets/icons/sad_face.svg', name: '슬픔' },
  ANGRY: { image: '/assets/icons/angry_face.svg', name: '분노' },
};

export default function EmotionList() {
  const { percentageData } = useMonthEmotion();

  return (
    <div className="flex h-full w-full flex-col justify-center gap-[8px] empty:hidden">
      {percentageData.map((emotion, index) => {
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
