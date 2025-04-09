'use client';

import Lottie from 'lottie-react';
import loadingAnimation from './loading.json';

interface LoaderProps {
  size: number;
  align: 'left' | 'center' | 'right';
}

export default function Loader({ size, align }: LoaderProps) {
  const justifyClass = align === 'left' ? 'justify-start' : align === 'center' ? 'justify-center' : 'justify-end';

  return (
    <div className={`flex w-full ${justifyClass}`}>
      <div style={{ width: size, height: size }}>
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
}
