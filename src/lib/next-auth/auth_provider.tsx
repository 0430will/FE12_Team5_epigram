'use client';

import { SessionProvider, getSession } from 'next-auth/react';
import { useEffect, useState, type ReactNode } from 'react';
import { Session } from 'next-auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    getSession().then(setSession); // 세션 정보를 직접 가져와 상태에 저장
  }, []);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
