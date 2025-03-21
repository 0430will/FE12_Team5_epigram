import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
    user: {
      id: string;
      email: string;
    };
  }

  interface User {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string | undefined;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string | number;
    email: string | null | undefined;
    accessToken: string;
    refreshToken: string | undefined;
  }
}
