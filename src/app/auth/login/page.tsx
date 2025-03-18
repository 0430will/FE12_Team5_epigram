'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } else {
      router.push('/'); // 로그인 성공 시 홈으로 이동
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold">로그인</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border p-2"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border p-2"
          />
          <button type="submit" className="w-full rounded-md bg-blue-500 p-2 text-white">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
