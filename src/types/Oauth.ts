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
