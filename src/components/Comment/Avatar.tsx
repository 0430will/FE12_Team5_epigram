'use client';

import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

export function Avatar({ src, alt, className }: AvatarProps) {
  const fallbackSrc = '/assets/images/defaultUser.png';
  const imageSrc = src && src.trim() !== '' ? src : fallbackSrc;

  return (
    <div className={className}>
      <Image
        src={imageSrc}
        alt={alt}
        width={48}
        height={48}
        className="h-full w-full rounded-full object-cover"
        unoptimized
      />
    </div>
  );
}
