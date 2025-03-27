//오타수정 eamil > email
export interface User {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  teamId: string;
  updateAt: string;
  createAt: string;
  image: string | null;
}

//로그인 & 회원가입 응답타입
export interface Auth {
  accessToken: string;
  refreshToken: string;
  user: User;
}

//토큰 갱신 타입
export interface accessToken {
  accessToken: string;
}

//간편 로그인 응답 타입 (오타수정: ScialLogin > SocialLogin)
export interface SocialLogin {
  state: string;
  redirectUri: string;
  token: string;
}

export interface Session {
  user: {
    id: number;
    email: string;
    name?: string | null | undefined;
    image?: string | null | undefined;
  };
  accessToken: string;
  refreshToken: string;
}
