// 인증 API
// lib/googleAuth.ts
import { OAuth2Client } from 'google-auth-library';

// Google Cloud Console에 등록한 클라이언트 ID 사용
const client = new OAuth2Client(process.env.AUTH_GOOGLE_ID);

/**
 * Google ID 토큰을 검증하는 함수
 * @param idToken - 클라이언트에서 받은 Google ID 토큰 (JWT)
 * @returns 검증된 토큰의 payload (유효하면 객체, 아니면 오류 발생)
 */
export async function verifyGoogleIdToken(idToken: string) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.AUTH_GOOGLE_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}
