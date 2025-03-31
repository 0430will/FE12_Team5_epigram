'use client';

import { PostTodayEmotion } from '@/lib/Emotionlog';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const EmotionData = {
  감동: {
    image: '/assets/images/heartFace.png',
    name: 'MOVED',
  },
  기쁨: {
    image: '/assets/images/smiling.png',
    name: 'HAPPY',
  },
  고민: {
    image: '/assets/images/thinking.png',
    name: 'WORRIED',
  },
  슬픔: {
    image: '/assets/images/sad.png',
    name: 'SAD',
  },
  분노: {
    image: '/assets/images/angry.png',
    name: 'ANGRY',
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
  emotionType: string;
}

function Emotion({ emotion, isSelected, onClick, emotionType }: EmotionProps) {
  return (
    <div className="flex cursor-pointer flex-col items-center gap-[8px]" onClick={onClick}>
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
            className={`${emotionType === 'main' ? 'border-yellow' : 'border-green'} pc:border-[4px] absolute top-0 right-0 bottom-0 left-0 rounded-[16px] border-[3px]`}
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
  const { data: session, status } = useSession();
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey | null>(null);
  const [isEmotionLogged, setIsEmotionLogged] = useState(false);

  const token = status === 'authenticated' ? session?.user.accessToken : null;
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  useEffect(() => {
    const savedEmotion = localStorage.getItem('todayEmtion');

    if (savedEmotion) {
      const { date, emotion } = JSON.parse(savedEmotion);
      if (date === getTodayDate()) {
        setSelectedEmotion(emotion);
        setIsEmotionLogged(true);
      } else {
        localStorage.removeItem('todayEmotion');
      }
    }
  }, []);

  const OnClickEmotion = async (emotion: EmotionKey) => {
    if (isEmotionLogged) return;
    if (!token) {
      console.error('Access token is undefined');
      return;
    }

    const response = await PostTodayEmotion(EmotionData[emotion].name, token);
    if (!response) return;

    console.log(`오늘의 감정 등록 완료: ${emotion}`);
    setSelectedEmotion(emotion);
    setIsEmotionLogged(true);

    localStorage.setItem('todayEmotion', JSON.stringify({ data: getTodayDate(), emotion }));
  };

  return (
    <div className="pc:gap-[16px] flex justify-center gap-[8px]">
      {Object.keys(EmotionData).map((emotion) => (
        <Emotion
          key={emotion}
          emotion={emotion as EmotionKey}
          emotionType={emotionType}
          isSelected={selectedEmotion === emotion}
          isDisabled={isEmotionLogged}
          onClick={() => OnClickEmotion(emotion as EmotionKey)}
        />
      ))}
    </div>
  );
}
