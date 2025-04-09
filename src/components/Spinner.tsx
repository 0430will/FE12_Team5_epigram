'use client';

import Image from 'next/image';

interface SpinnerProps {
  size: number;
  className?: string;
}

export default function Spinner({ size, className = '' }: SpinnerProps) {
  const originalWidth = 840;
  const originalHeight = 525;
  const targetWidth = 400;

  const aspectRatio = originalHeight / originalWidth;
  const calculatedHeight = targetWidth * aspectRatio;

  return (
    <Image src="/assets/images/loading.gif" width={size} height={calculatedHeight} alt="로딩중" className={className} />
  );
}
