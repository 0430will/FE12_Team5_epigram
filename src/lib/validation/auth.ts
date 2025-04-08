import { z } from 'zod';

// 이메일 검증 스키마 (공용)
const emailSchema = z.string().min(1, '이메일은 필수 입력입니다.').email('이메일 형식으로 작성해 주세요');

// 비밀번호 검증 스키마 (공용)
// - 특수문자 (!@#$%^&* 만 허용
const passwordSchema = (minLength: number) =>
  z
    .string()
    .min(minLength, `비밀번호는 최소 ${minLength}자 이상입니다.`)
    .regex(/^[A-Za-z\d!@#$%^&*]+$/, '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.');

// 닉네임 검증 스키마 (공용)
const nicknameSchema = z.string().min(1, '닉네임은 필수 입력입니다.').max(20, '닉네임은 최대 20자까지 가능합니다.');

// 회원가입 스키마
export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema(8),
    passwordConfirmation: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    nickname: nicknameSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

// 로그인 스키마
export const signinSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'),
});

// 타입 추출
export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
