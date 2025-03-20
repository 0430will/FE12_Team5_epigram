import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/next-auth/auth_provider';

export const metadata: Metadata = {
  title: 'Epigram',
  description: '날마다 에피그램 - Epigram',
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
