import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/next-auth/auth_provider';
import PageBackground from '@/components/PageBackground';
import ClientHeader from '@/components/header/ClientHeader';
import { SessionProvider } from 'next-auth/react';

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
    <SessionProvider>
      <html lang="ko">
        <body>
          <PageBackground>
            <ClientHeader />
            <AuthProvider>{children}</AuthProvider>
          </PageBackground>
        </body>
      </html>
    </SessionProvider>
  );
}
