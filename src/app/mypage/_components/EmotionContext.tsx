'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface EmotionContextType {
  todayEmotion: string;
  setTodayEmotion: Dispatch<SetStateAction<string>>;
}

const EmotionContext = createContext<EmotionContextType>({
  todayEmotion: '',
  setTodayEmotion: () => {},
});

export const EmotionProvider = ({ children }: { children: React.ReactNode }) => {
  const [todayEmotion, setTodayEmotion] = useState(''); //HAPPY

  return <EmotionContext.Provider value={{ todayEmotion, setTodayEmotion }}>{children}</EmotionContext.Provider>;
};

export const useEmotionContext = () => useContext(EmotionContext);
