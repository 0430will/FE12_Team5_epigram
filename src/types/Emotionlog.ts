// 감정 타입
export type EmotionType = 'MOVED' | 'HAPPY' | 'SAD' | 'ANGRY' | 'CALM';

// 감정 로그 기본 타입
// 1. 오늘의 감정 기록 생성 (POST /{teamId}/emotionLogs/today)
// 2. 오늘의 감정 기록 조회 (GET /{teamId}/emotionLogs/today)
export interface EmotionLog {
  id: number;
  userId: number;
  createdAt: string;
  emotion: EmotionType;
}

// 3. 월별 감정 기록 조회 (GET /{teamId}/emotionLogs/monthly)
export type MonthlyEmotionLogs = EmotionLog[];
