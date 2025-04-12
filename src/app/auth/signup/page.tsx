'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogins from '../_component/SocialLogins';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupInput } from '@/lib/validation/auth';
import { notify } from '@/util/toast';
import Spinner from '@/components/Spinner';

export default function Page() {
  const [isPwVisible, setIsPwVisible] = useState(false);
  const [isPwConfirmVisible, setIsPwConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupInput>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      nickname: '',
    },
  });

  const SubmitForm = async (data: SignupInput) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        //회원가입 실패
        notify({ type: 'error', message: errorData.error || '회원가입에 실패하셨습니다.' });
        return;
      }
      // 회원가입 후 바로 로그인 처리
      const signInResponse = await signIn('credentials', {
        redirect: false, // 페이지 이동을 방지
        email: data.email,
        password: data.password,
      });

      if (signInResponse?.error) {
        throw new Error(signInResponse.error);
      }

      // 로그인 성공 시 홈으로 이동
      router.push('/');
      notify({ type: 'success', message: '회원가입 되었습니다.' });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tablet:max-w-[384px] pc:max-w-[640px] tablet:gap-[60px] flex w-full flex-col gap-[50px]">
      <form onSubmit={handleSubmit(SubmitForm)} className="tablet:gap-[40px] flex flex-col gap-[30px]">
        <div className="tablet:gap-[40px] flex flex-col gap-[20px]">
          <div className="tablet:gap-[20px] relative flex flex-col gap-[16px]">
            <label
              className="text-pre-md tablet:text-pre-lg pc:text-pre-xl pc:font-medium font-medium text-blue-900"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              className={`text-pre-lg font-regular text-black-950 pc:text-pre-xl pc:h-[64px] h-[44px] rounded-[12px] bg-blue-200 px-[16px] placeholder:text-blue-400 focus:outline-blue-600 ${errors.email && 'border-state-error border'}`}
              placeholder="이메일"
              type="email"
              id="email"
              {...register('email')}
            />
            {errors?.email && (
              <p className="text-state-error text-pre-xs font-regular tablet:text-pre-md pc:text-pre-lg tablet:bottom-[-26px] pc:bottom-[-28px] absolute bottom-[-22px]">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-[16px]">
            <label
              className="text-pre-md tablet:text-pre-lg pc:text-pre-xl pc:font-medium font-medium text-blue-900"
              htmlFor="password"
            >
              비밀번호
            </label>
            <div className="tablet:gap-[16px] relative flex flex-col gap-[10px]">
              <div className="relative">
                <input
                  className={`text-pre-lg font-regular text-black-950 pc:text-pre-xl pc:h-[64px] h-[44px] w-full rounded-[12px] bg-blue-200 px-[16px] placeholder:text-blue-400 focus:outline-blue-600 ${errors.password && 'border-state-error border'}`}
                  placeholder="비밀번호"
                  type={isPwVisible ? 'text' : 'password'}
                  id="password"
                  {...register('password')}
                />
                <Image
                  className="absolute top-1/2 right-[16px] -translate-y-1/2 cursor-pointer"
                  src={`/assets/icons/visibility_${isPwVisible ? 'on' : 'off'}.svg`}
                  width={24}
                  height={24}
                  alt="비밀번호 보임"
                  onClick={() => setIsPwVisible((pre) => !pre)}
                />
              </div>
              <div className="relative">
                <input
                  className={`text-pre-lg font-regular text-black-950 pc:text-pre-xl pc:h-[64px] h-[44px] w-full rounded-[12px] bg-blue-200 px-[16px] placeholder:text-blue-400 focus:outline-blue-600 ${!errors.password && errors.passwordConfirmation && 'border-state-error border'}`}
                  placeholder="비밀번호 확인"
                  type={isPwConfirmVisible ? 'text' : 'password'}
                  id="passwordConfirmation"
                  {...register('passwordConfirmation')}
                />
                <Image
                  className="absolute top-1/2 right-[16px] -translate-y-1/2 cursor-pointer"
                  src={`/assets/icons/visibility_${isPwConfirmVisible ? 'on' : 'off'}.svg`}
                  width={24}
                  height={24}
                  alt="비밀번호 보임"
                  onClick={() => setIsPwConfirmVisible((pre) => !pre)}
                />
              </div>
              {errors.password ? (
                <p className="text-state-error text-pre-xs font-regular tablet:text-pre-md pc:text-pre-lg tablet:bottom-[-26px] pc:bottom-[-28px] absolute bottom-[-22px]">
                  {errors.password.message}
                </p>
              ) : errors.passwordConfirmation ? (
                <p className="text-state-error text-pre-xs font-regular tablet:text-pre-md pc:text-pre-lg tablet:bottom-[-26px] pc:bottom-[-28px] absolute bottom-[-22px]">
                  {errors.passwordConfirmation.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="relative flex flex-col gap-[16px]">
            <label
              className="text-pre-md tablet:text-pre-lg pc:text-pre-xl pc:font-medium font-medium text-blue-900"
              htmlFor="nickname"
            >
              닉네임
            </label>
            <input
              className={`text-pre-lg font-regular text-black-950 pc:text-pre-xl pc:h-[64px] h-[44px] rounded-[12px] bg-blue-200 px-[16px] placeholder:text-blue-400 focus:outline-blue-600 ${errors.nickname && 'border-state-error border'}`}
              placeholder="닉네임"
              type="text"
              id="nickname"
              {...register('nickname')}
            />
            {errors?.nickname && (
              <p className="text-state-error text-pre-xs font-regular tablet:text-pre-md pc:text-pre-lg tablet:bottom-[-26px] pc:bottom-[-28px] absolute bottom-[-22px]">
                {errors.nickname?.message}
              </p>
            )}
          </div>
        </div>
        <button
          className={`text-pre-lg pc:text-pre-xl pc:py-[16px] relative rounded-[12px] px-[16px] py-[9px] font-semibold text-blue-100 ${isValid ? `bg-black-500 cursor-pointer` : `bg-blue-300`}`}
          type="submit"
          disabled={!isValid}
        >
          가입하기
        </button>
      </form>
      <SocialLogins authType={'SIGNUP'} />
      {isLoading && (
        <div className="bg-black-600/20 fixed inset-0 z-2 flex items-center justify-center">
          <div className="bg-bg-100 pc:h-[100px] pc:w-[100px] flex h-[80px] w-[80px] items-center justify-center rounded-[16px]">
            <Spinner size={60} className="pc:h-[56px] pc:w-[90px] h-[30px]" />
          </div>
        </div>
      )}
    </div>
  );
}
