'use client';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function CommentCard({ children, className, onClick }: CardProps) {
  return (
    <div className={`${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
