import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signinSchema, signupSchema } from '@/lib/validation/auth';

export const auth = NextAuth({
  debug: true, // 디버깅 활성화
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
          try {
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
            const text = await res.text();
            console.log('API 응답:', text); // api를 불러오는 것 제대로 불러옴.

            if (res.status >= 400 && res.status < 500) {
              // 서버에서 400에러로 응답시..
              throw new Error('로그인하는데 실패하였습니다.');
            }

            if (!res.ok) {
              // API 응답이 실패했을 경우, 메시지를 직접 사용
              let errorMessage = '로그인에 실패하였습니다.';
              try {
                const errorResponse = JSON.parse(text);
                if (errorResponse.message) {
                  errorMessage = errorResponse.message;
                }
              } catch (parseError) {
                console.error('API 응답 파싱 오류:', parseError);
              }
              throw new Error(errorMessage); // 에러 메시지를 직접 던짐
            }

            const user = JSON.parse(text);
            console.log('서버 응답:', user);

            if (!user || !user.user || !user.accessToken) {
              console.error('잘못된 응답 구조:', user);
              throw new Error('서버에서 잘못된 데이터를 반환하였습니다.');
            }

            return {
              //user데이터를 받아오는 것이라서 user.user로 해야한다.
              id: user.user.id,
              email: user.user.email,
              accessToken: user.user.accessToken,
              refreshToken: user.user.refreshToken,
            };
          } catch (error) {
            if (error instanceof Error) {
              console.error('로그인 오류:', error);
              throw new Error(error.message || '알 수 없는 오류가 발생하였습니다.');
            }
          }
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
        console.log('JWT 콜백에서 받은 user:', user); //받은 유저 객체확인
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = Number(user.id);
        token.email = user.email;
      }
      console.log('JWT 콜백에서 반환된 token:', token); // 반환된 토큰 확인.
      return token;
    },
    async session({ session, token }) {
      console.log('Session 콜백에서 받은 token:', token); // 받은 토큰 확인
      session.user.id = token.id;
      session.user.email = token.email ?? '';
      session.accessToken = token.accessToken;
      console.log('Session 콜백에서 설정된 session:', session); // 설정된 session 객체 확인
      return session;
    },
  },
});
