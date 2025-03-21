import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signinSchema, signupSchema } from '@/lib/validation/auth';

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt', //jwt 기반 인증
  },
  pages: {
    signIn: '/login', // 인증이 필요하면 login로 이동
  },
  secret: process.env.NEXTAUTH_SECRET,
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

          const user = await res.json();

          return {
            //user데이터를 받아오는 것이라서 user.user로 해야한다.
            id: user.user.id,
            email: user.user.email,
            accessToken: user.user.accessToken,
            refreshToken: user.user.refreshToken,
          };
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

            const user = await res.json();

            return {
              id: user.user.id,
              email: user.user.email,
              accessToken: user.user.accessToken,
              refreshToken: user.user.refreshToken,
            };
          } catch (error: unknown) {
            if (error instanceof Error) throw new Error('알 수 없는 오류가 발생하였습니다.');
          }
        }

        return null; // 우선 로그인/회원가입 실패시 null을 반환
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = Number(user.id);
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email ?? '';
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
