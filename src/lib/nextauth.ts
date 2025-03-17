import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SignInSchema, SignUpCredential } from '@/lib/validation';

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt', //jwt 기반 인증
  },
  pages: {
    signIn: '/login', // 인증이 필요하면 login로 이동
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
        confirm: { label: 'Confirm Password', type: 'password', required: false },
        nickname: { label: 'Nickname', type: 'text', required: false },
      },
      async authorize(credentials) {
        //로그인부분
        const loginParse = SignInSchema.safeParse(credentials); //zod스키마를 활용한 유효성 검사 적용.
        if (loginParse.success) {
          const { email, password } = loginParse.data;
          //유효성 검사 성공 시
          try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`, {
              method: 'POST',
              body: formData,
            });

            if (!res?.ok || res === null) {
              //서버에서 반응오지 않을시..
              throw new Error('서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
            }
            if (res.status >= 400 && res.status < 500) {
              // 서버에서 400에러로 응답시..
              throw new Error('로그인하는데 실패하였습니다.');
            }
            const user = await res.json();
            return {
              //
              id: user.id,
              email: user.email,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
            };
          } catch (error: unknown) {
            if (error instanceof Error) throw new Error('알 수 없는 오류가 발생하였습니다.');
          }
        }
        //회원가입부분
        const signUpParse = SignUpCredential.safeParse(credentials); //zod스키마를 통한 유효성 검사
        if (signUpParse.success) {
          //스키마 검사 성공했을 시
          const { email, password, passwordConfirmation, nickname } = signUpParse.data;
          try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('nickname', nickname);
            formData.append('confirm', passwordConfirmation);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signUp`, {
              method: 'POST',
              body: formData,
            });

            if (!res?.ok || res === null) {
              throw new Error('서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
            }
            if (res.status >= 400 && res.status < 500) {
              throw new Error('회원가입하는데 실패하였습니다.');
            }

            const user = await res.json();

            return {
              id: user.id,
              email: user.email,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
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

// 스키마를 활용하지 않고 nextauth에서 사용하는 credential을 활용해서 코드 작성
// import NextAuth, { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/login',
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email', required: true },
//         password: { label: 'Password', type: 'password', required: true },
//         confirm: { label: 'Confirm Password', type: 'password', required: false },
//         nickname: { label: 'Nickname', type: 'text', required: false },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('이메일과 비밀번호를 입력해주세요.');
//         }

//         // 로그인 처리 (스키마 없이 credentials 사용)
//         if (!credentials.confirm && !credentials.nickname) {
//           try {
//             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({
//                 email: credentials.email,
//                 password: credentials.password,
//               }),
//             });

//             const user = await res.json();

//             if (!res.ok) {
//               throw new Error(user.message || '로그인 실패');
//             }

//             return {
//               id: user.id,
//               email: user.email,
//               accessToken: user.accessToken,
//               refreshToken: user.refreshToken,
//             };
//           } catch (error) {
//             throw new Error(error instanceof Error ? error.message : '서버 오류');
//           }
//         }

//         // 회원가입 처리 (스키마 없이 credentials 사용)
//         if (credentials.confirm && credentials.nickname) {
//           if (credentials.password !== credentials.confirm) {
//             throw new Error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
//           }

//           try {
//             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({
//                 email: credentials.email,
//                 password: credentials.password,
//                 nickname: credentials.nickname,
//               }),
//             });

//             const user = await res.json();

//             if (!res.ok) {
//               throw new Error(user.message || '회원가입 실패');
//             }

//             return {
//               id: user.id,
//               email: user.email,
//               accessToken: user.accessToken,
//               refreshToken: user.refreshToken,
//             };
//           } catch (error) {
//             throw new Error(error instanceof Error ? error.message : '서버 오류');
//           }
//         }

//         throw new Error('잘못된 요청입니다.');
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id;
//         session.user.email = token.email;
//         session.accessToken = token.accessToken;
//         session.refreshToken = token.refreshToken;
//       }
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);
