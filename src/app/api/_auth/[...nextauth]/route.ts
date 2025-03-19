import { handlers } from './auth'; // ✅ auth.ts에서 가져오기

export const { GET, POST } = handlers; // ✅ NextAuth의 API 핸들러 등록
