'use client';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

export function Avatar({ src, alt, className }: AvatarProps) {
  const fallbackSrc = '/assets/icons/comment-user.svg';
  const imageSrc = src && src.trim() !== '' ? src : fallbackSrc;

  return <img src={imageSrc} alt={alt} className={`rounded-full ${className}`} />;
}
