import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signinSchema, signupSchema } from '@/lib/validation/auth';
import { User } from '@/types/Oauth';

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt', //jwt 기반 인증
  },
  pages: {
    signIn: '/auth/login', // 인증이 필요하면 login로 이동
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
        passwordConfirmation: { label: 'Confirm Password', type: 'password', required: false },
        nickname: { label: 'Nickname', type: 'text', required: false },
      },
      async authorize(credentials) {
        // 로그인부분
        const loginParse = signinSchema.safeParse(credentials); //zod스키마를 활용한 유효성 검사 적용.
        if (loginParse.success) {
          //유효성 검사 성공 시
          const loginData = {
            email: loginParse.data.email,
            password: loginParse.data.password,
          };
          //json형식으로
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // JSON 타입 명시
            },
            body: JSON.stringify(loginData),
          });

          //비밀번호나 이메일이 틀릴시 401응답을 보내는게 정상
          if (res.status >= 400 && res.status < 500) {
            // 서버에서 400에러로 응답시..
            throw new Error('이메일 또는 비밀번호가 다릅니다.');
          }

          if (!res?.ok || res === null) {
            throw new Error('서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
          }

          const data = await res.json();

          const user = {
            id: String(data.user.id),
            email: data.user.email ?? '',
            nickname: data.user.nickname ?? '',
            image: data.user.image ?? null,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
          return user;
        }
        // 회원가입부분
        const signUpParse = signupSchema.safeParse(credentials); //zod스키마를 통한 유효성 검사
        if (signUpParse.success) {
          //스키마 검사 성공했을 때
          try {
            const { email, password, passwordConfirmation, nickname } = signUpParse.data;
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signUp`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password, confirm: passwordConfirmation, nickname }),
            });

            if (res.status >= 400 && res.status < 500) {
              throw new Error('회원가입하는데 실패하였습니다.');
            }

            if (!res?.ok || res === null) {
              throw new Error('서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
            }

            const data = await res.json();
            const user = {
              id: String(data.user.id),
              email: data.user.email ?? '',
              nickname: data.user.nickname ?? '',
              image: data.user.image ?? null,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            };
            return user;
          } catch (error: unknown) {
            if (error instanceof Error) throw new Error('알 수 없는 오류가 발생하였습니다.');
          }
        }

        return null; // 우선 로그인/회원가입 실패시 null을 반환
      },
    }),
    CredentialsProvider({
      id: 'kakao',
      name: 'Kakao Login',
      credentials: {
        accessToken: { label: 'Access Token', type: 'text' },
        refreshToken: { label: 'Refresh Token', type: 'text' },
        id: { label: 'ID', type: 'text' },
        email: { label: 'Email', type: 'text' },
        nickname: { label: 'Nickname', type: 'text' },
        image: { label: 'Image', type: 'text' },
      },
      async authorize(credentials): Promise<User | null> {
        console.log('Received credentials:', credentials); // credentials 로그 확인
        if (credentials) {
          const user: User = {
            id: credentials.id as string, // credentials의 필드 값이 문자열임을 명확히 지정
            email: credentials.email as string, // credentials의 필드 값이 문자열임을 명확히 지정
            nickname: credentials.nickname as string, // credentials의 필드 값이 문자열임을 명확히 지정
            image: credentials.image as string | null, // credentials의 필드 값이 이미지 URL일 경우, 문자열 또는 null
            accessToken: credentials.accessToken as string, // accessToken을 문자열로 지정
            refreshToken: credentials.refreshToken as string, // refreshToken을 문자열로 지정
          };

          // 반환된 user 객체는 이제 `User` 타입임을 보장합니다.
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Google 로그인 시, OAuth 제공자에서 받은 토큰을 user 객체에 저장
      if (account?.provider === 'google') {
        const googleToken = account.id_token ?? account.access_token;
        if (googleToken) {
          user.accessToken = googleToken;
          user.refreshToken = account.refresh_token ?? '';
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? '';
        token.email = user.email ?? '';
        token.nickname = (user as { nickname?: string }).nickname ?? '';
        token.image = user.image ?? '';
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      const isAccessTokenExpired = Date.now() >= ((token.accessTokenExpires as number) ?? 0);
      if (isAccessTokenExpired) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: token.refreshToken }),
          });

          if (!res.ok) throw new Error('토큰 갱신 실패');

          const data = await res.json();
          token.accessToken = data.accessToken;
        } catch (error) {
          console.error('토큰 갱신 실패:', error);
          return token;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email ?? '',
        nickname: token.nickname ?? '',
        image: token.image ?? null,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        emailVerified: null,
      };
      return session;
    },
    async redirect() {
      return `${process.env.NEXTAUTH_URL}/main`;
    },
  },
});
