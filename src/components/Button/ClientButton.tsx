'use client';

import { ReactNode } from 'react';

interface ClientButtonProps {
  isValid: boolean;
  children: ReactNode;
  type?: 'submit' | 'button';
  onClick?: () => void;
  className?: string;
  isRounded?: boolean;
}

export default function ClientButton({
  isValid,
  children,
  type = 'button',
  onClick,
  className = '',
  isRounded = false,
}: ClientButtonProps) {
  return (
    <button
      className={`text-pre-lg pc:text-pre-xl pc:py-[16px] max-w-[640px] transition-colors duration-300 ${isRounded ? 'rounded-[100px]' : 'rounded-[12px]'} px-[16px] py-[9px] font-semibold text-blue-100 ${isValid ? `bg-black-500 hover:bg-black-400 cursor-pointer` : `bg-blue-300`} ${className}`}
      type={type}
      disabled={!isValid}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
}
