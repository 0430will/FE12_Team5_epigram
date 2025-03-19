import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/next-auth/auth_provider';

export const metadata: Metadata = {
  title: 'Cowokers',
  description: '함께 만들어가는 투두 리스트 - Coworkes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
