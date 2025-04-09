'use client';

import Image from 'next/image';

interface LoaderProps {
  size: number;
  align: 'left' | 'center' | 'right';
}

export default function Loader({ size, align }: LoaderProps) {
  const originalWidth = 840;
  const originalHeight = 525;
  const targetWidth = 400;

  const aspectRatio = originalHeight / originalWidth;
  const calculatedHeight = targetWidth * aspectRatio;

  const justifyClass = align === 'left' ? 'justify-start' : align === 'center' ? 'justify-center' : 'justify-end';

  return (
    <div className={`flex w-full ${justifyClass}`}>
      <Image src="/assets/images/loading.gif" width={size} height={calculatedHeight} alt="로딩중" />
    </div>
  );
}
