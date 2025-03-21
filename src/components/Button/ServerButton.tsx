import Link from 'next/link';
import { ReactNode } from 'react';

interface ServerButtonProps {
  isValid: boolean;
  href: string;
  className?: string;
  isRounded?: boolean;
  children: ReactNode;
}

export default function ServerButton({
  isValid,
  href,
  className = '',
  isRounded = false,
  children,
}: ServerButtonProps) {
  return (
    <>
      {isValid ? (
        <Link
          className={`text-pre-lg pc:text-pre-xl bg-black-500 hover:bg-black-400 inline-block max-w-[640px] cursor-pointer transition-colors duration-300 ${isRounded ? 'rounded-[100px]' : 'rounded-[12px]'} px-[28px] py-[11px] font-semibold text-blue-100 ${className}`}
          href={href}
        >
          {children}
        </Link>
      ) : (
        <span
          className={`text-pre-lg pc:text-pre-xl inline-block max-w-[640px] ${isRounded ? 'rounded-[100px]' : 'rounded-[12px]'} bg-blue-300 px-[28px] py-[11px] font-semibold text-blue-100 ${className}`}
        >
          {children}
        </span>
      )}
    </>
  );
}
