// 1. OAuth 앱 조회 (GET /{teamId}/oauthApps)
export interface OauthApp {
  id: number;
  teamId: string;
  provider: 'GOOGLE' | 'KAKAO' | 'GITHUB' | 'FACEBOOK';
  appKey: string;
  appSecret: string;
  createdAt: string;
  updatedAt: string;
}

export interface KakaoCredentials {
  code: string;
}

export interface User {
  id: string;
  email: string;
  nickname: string;
  image: string | null;
  accessToken: string;
  refreshToken: string;
}
