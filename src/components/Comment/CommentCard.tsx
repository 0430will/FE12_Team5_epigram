'use client';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function CommentCard({ children, className }: CardProps) {
  return <div className={`${className}`}>{children}</div>;
}
