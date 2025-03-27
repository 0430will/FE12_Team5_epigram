import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      nickname?: string;
      image?: string;
      accessToken?: string;
      refreshToken?: string;
    };
  }
  interface CustomUser {
    id: string;
    email: string;
    nickname: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
    image: string | null;
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: number;
    email: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    nickname: string;
    image: string;
    accessToken: string;
    refreshToken: string;
  }
}
