'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SignUp {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
}

export default function Page() {
  const [isPwVisible, setIsPwVisible] = useState(false);
  const [isPwConfirmVisible, setIsPwConfirmVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignUp>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      nickname: '',
    },
  });

  const { password } = watch();

  const SubmitForm = () => {
    console.log('폼 제출');
  };

  return (
    <form onSubmit={handleSubmit(SubmitForm)} className="flex flex-col gap-[20px]">
      <div className="relative flex flex-col gap-[16px]">
        <label className="text-pre-md font-medium text-blue-900" htmlFor="email">
          이메일
        </label>
        <input
          className={`text-pre-lg font-regular text-black-950 h-[44px] rounded-[12px] bg-blue-200 px-[16px] placeholder:text-blue-400 focus:outline-blue-600 ${errors.email && 'border-state-error border'}`}
          placeholder="이메일"
          type="email"
          id="email"
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식에 맞지 않습니다.',
            },
          })}
        />
        {errors?.email && (
          <p className="text-state-error text-pre-xs font-regular absolute bottom-[-18px]">{errors.email?.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-[16px]">
        <label className="text-pre-md font-medium text-blue-900" htmlFor="password">
          비밀번호
        </label>
        <div className="relative flex flex-col gap-[10px]">
          <div className="relative">
            <input
              className={`text-pre-lg font-regular text-black-950 h-[44px] w-full rounded-[12px] bg-blue-200 px-[16px] placeholder:text-blue-400 focus:outline-blue-600 ${errors.password && 'border-state-error border'}`}
              placeholder="비밀번호"
              type={isPwVisible ? 'text' : 'password'}
              id="password"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/,
                  message: '숫자, 영어, 특수문자를 포함하여 12자 이상 입력해주세요.',
                },
              })}
            />
            <Image
              className="absolute top-[10px] right-[16px] cursor-pointer"
              src={`/assets/icons/visibility_${isPwVisible ? 'on' : 'off'}.svg`}
              width={24}
              height={24}
              alt="비밀번호 보임"
              onClick={() => setIsPwVisible((pre) => !pre)}
            />
          </div>
          <div className="relative">
            <input
              className={`text-pre-lg font-regular text-black-950 h-[44px] w-full rounded-[12px] bg-blue-200 px-[16px] placeholder:text-blue-400 focus:outline-blue-600 ${!errors.password && errors.passwordConfirmation && 'border-state-error border'}`}
              placeholder="비밀번호 확인"
              type={isPwConfirmVisible ? 'text' : 'password'}
              id="passwordConfirmation"
              {...register('passwordConfirmation', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
              })}
            />
            <Image
              className="absolute top-[10px] right-[16px] cursor-pointer"
              src={`/assets/icons/visibility_${isPwConfirmVisible ? 'on' : 'off'}.svg`}
              width={24}
              height={24}
              alt="비밀번호 보임"
              onClick={() => setIsPwConfirmVisible((pre) => !pre)}
            />
          </div>
          {errors.password ? (
            <p className="text-state-error text-pre-xs font-regular absolute bottom-[-18px]">
              {errors.password.message}
            </p>
          ) : errors.passwordConfirmation ? (
            <p className="text-state-error text-pre-xs font-regular absolute bottom-[-18px]">
              {errors.passwordConfirmation.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="relative flex flex-col gap-[16px]">
        <label className="text-pre-md font-medium text-blue-900" htmlFor="nickname">
          닉네임
        </label>
        <input
          className={`text-pre-lg font-regular text-black-950 h-[44px] rounded-[12px] bg-blue-200 px-[16px] placeholder:text-blue-400 focus:outline-blue-600 ${errors.nickname && 'border-state-error border'}`}
          placeholder="닉네임"
          type="text"
          id="nickname"
          {...register('nickname', { required: '닉네임을 입력해주세요.' })}
        />
        {errors?.nickname && (
          <p className="text-state-error text-pre-xs font-regular absolute bottom-[-18px]">
            {errors.nickname?.message}
          </p>
        )}
      </div>
      <button
        className={`text-pre-lg h-[44px] rounded-[12px] px-[16px] font-semibold text-blue-100 ${isValid ? `bg-black-500 cursor-pointer` : `bg-blue-300`}`}
        type="submit"
        disabled={!isValid}
      >
        가입하기
      </button>
    </form>
  );
}
