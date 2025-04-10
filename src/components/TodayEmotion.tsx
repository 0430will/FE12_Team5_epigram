'use client';

import { PostTodayEmotion } from '@/lib/Emotionlog';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useEmotionContext } from '@/app/mypage/_components/EmotionContext';
import { notify } from '@/util/toast';

const EmotionData = {
  감동: {
    image: '/assets/icons/heart_face.svg',
    name: 'MOVED',
    hover: 'border-yellow',
  },
  기쁨: {
    image: '/assets/icons/smiling_face.svg',
    name: 'HAPPY',
    hover: 'border-green',
  },
  고민: {
    image: '/assets/icons/thinking_face.svg',
    name: 'WORRIED',
    hover: 'border-purple',
  },
  슬픔: {
    image: '/assets/icons/sad_face.svg',
    name: 'SAD',
    hover: 'border-blue',
  },
  분노: {
    image: '/assets/icons/angry_face.svg',
    name: 'ANGRY',
    hover: 'border-red',
  },
};

type EmotionKey = keyof typeof EmotionData;

interface TodayEmotionProps {
  emotionType: 'main' | 'mypage';
}

interface EmotionProps {
  emotion: EmotionKey;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

function Emotion({ emotion, isSelected, isDisabled, onClick }: EmotionProps) {
  return (
    <div
      className={`flex cursor-pointer flex-col items-center gap-[8px] ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={isDisabled ? undefined : onClick}
    >
      <div
        className={`tablet:h-[64px] tablet:w-[64px] pc:w-[96px] pc:h-[96px] flex h-[56px] w-[56px] items-center justify-center rounded-[16px] ${isSelected ? `relative` : `bg-[#AFBACD]/15`}`}
      >
        <div className="pc:h-[48px] pc:w-[48px] relative h-[32px] w-[32px] object-contain">
          <Image
            priority
            src={EmotionData[emotion].image}
            fill
            alt={`${emotion} 아이콘`}
            sizes="(max-width: 767px) 32px, 48px"
          />
        </div>
        {isSelected && (
          <div
            className={`${EmotionData[emotion].hover} pc:border-[4px] absolute top-0 right-0 bottom-0 left-0 rounded-[16px] border-[3px]`}
          ></div>
        )}
      </div>
      <span
        className={`text-pre-xs tablet:text-pre-md pc:text-pre-xl font-semibold ${isSelected ? `text-sub-blue-1` : `text-gray-300`}`}
      >
        {emotion}
      </span>
    </div>
  );
}

export default function TodayEmotion({ emotionType }: TodayEmotionProps) {
  const { data: session } = useSession();
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey | null>(null);
  const { setTodayEmotion } = useEmotionContext();

  useEffect(() => {
    const storageEmotion = localStorage.getItem('todayEmotion') as EmotionKey | null;
    if (storageEmotion && EmotionData[storageEmotion]) {
      setSelectedEmotion(storageEmotion);
    }
  }, [emotionType]);

  const OnClickEmotion = async (emotion: EmotionKey) => {
    if (!session?.user.accessToken) {
      notify({ type: 'error', message: '토큰이 유효하지 않습니다.' });
      return;
    }

    if (emotionType === 'main' && selectedEmotion) return;

    const response = await PostTodayEmotion(EmotionData[emotion].name, session.user.accessToken);
    if (!response) return;

    setSelectedEmotion(emotion);

    if (emotionType) {
      localStorage.setItem('todayEmotion', emotion);
    }
    setTodayEmotion(EmotionData[emotion].name);
  };

  return (
    <div className="pc:gap-[16px] flex justify-center gap-[8px]">
      {Object.keys(EmotionData).map((emotion) => (
        <Emotion
          key={emotion}
          emotion={emotion as EmotionKey}
          isSelected={selectedEmotion === emotion}
          isDisabled={emotionType === 'main' ? !!selectedEmotion : false}
          onClick={() => OnClickEmotion(emotion as EmotionKey)}
        />
      ))}
    </div>
  );
}
