'use client';

import Image from 'next/image';

export const EmotionData = {
  MOVED: {
    image: '/assets/icons/heart_face.svg',
    name: '감동',
    hover: 'border-yellow',
  },
  HAPPY: { image: '/assets/icons/smiling_face.svg', name: '기쁨', hover: 'border-green' },
  WORRIED: { image: '/assets/icons/thinking_face.svg', name: '고민', hover: 'border-purple' },
  SAD: { image: '/assets/icons/sad_face.svg', name: '슬픔', hover: 'border-blue' },
  ANGRY: { image: '/assets/icons/angry_face.svg', name: '분노', hover: 'border-red' },
};

export type EmotionKey = keyof typeof EmotionData;

function Emotion({
  emotion,
  isSelected,
  onClick,
}: {
  emotion: EmotionKey;
  isSelected: boolean;
  onClick: (key: EmotionKey) => void;
}) {
  return (
    <div className="flex cursor-pointer flex-col items-center gap-[8px]" onClick={() => onClick(emotion)}>
      <div
        className={`tablet:h-[56px] tablet:w-[56px] pc:w-[96px] pc:h-[96px] flex h-[48px] w-[48px] items-center justify-center rounded-[8px] ${isSelected ? `relative` : `bg-[#AFBACD]/15`}`}
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
            className={`${EmotionData[emotion].hover} pc:border-[4px] absolute top-0 right-0 bottom-0 left-0 rounded-[8px] border-[3px]`}
          ></div>
        )}
      </div>
    </div>
  );
}

interface EmotionFilterProps {
  selectedEmotion: EmotionKey | null;
  setSelectedEmotion: React.Dispatch<React.SetStateAction<EmotionKey | null>>;
}

export default function EmotionFilter({ selectedEmotion, setSelectedEmotion }: EmotionFilterProps) {
  const OnClickEmotion = (key: EmotionKey) => {
    if (selectedEmotion === key) {
      setSelectedEmotion(null);
      return;
    }
    setSelectedEmotion(key);
  };

  return (
    <div
      className="pc:gap-[16px] absolute top-[36px] left-1/2 flex -translate-x-1/2 justify-center gap-[8px] rounded-[16px] bg-blue-100 p-[16px]"
      style={{ boxShadow: '0px 3px 16px rgba(0, 0, 0, 0.1)' }}
    >
      {Object.keys(EmotionData).map((key) => (
        <Emotion
          key={key}
          emotion={key as EmotionKey}
          isSelected={selectedEmotion === key}
          onClick={() => OnClickEmotion(key as EmotionKey)}
        />
      ))}
    </div>
  );
}
