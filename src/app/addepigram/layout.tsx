import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="tablet:py-[32px] pc:py-[56px] flex w-full justify-center p-[24px]">{children}</div>;
}
