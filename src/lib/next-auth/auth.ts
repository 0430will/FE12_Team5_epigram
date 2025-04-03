import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signinSchema, signupSchema } from '@/lib/validation/auth';

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
        console.log('🔄 토큰 만료됨, 갱신 시도');
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
      console.log('✅ 저장된 토큰:', token);
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
      return 'http://localhost:3000/main';
    },
  },
});
