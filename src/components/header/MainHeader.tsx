'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useState, useRef } from 'react';
import Kebab from '../Kebab';
import useFetchUser from '@/hooks/useFetchdata';
import { useRouter } from 'next/navigation';

export default function MainHeader() {
  const { user, isLoading } = useFetchUser();
  const [isSidebar, setIsSidebar] = useState(false);
  const [isKebab, setIsKebab] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null); //사이드바 & 드롭다운 감지
  const router = useRouter();

  if (isLoading) return null;
  return (
    <div
      className="relative w-full"
      onClick={(e) => {
        //사이드바 & 드롭다운 바깥 클릭 감지 후 닫기)
        if (containerRef.current?.contains(e.target as Node)) return;
        setIsKebab(false);
        setIsSidebar(false);
      }}
    >
      <header className="tablet:px-18 tablet:py-[17px] pc:px-[120px] pc:py-[22px] border-b border-[var(--color-line-100)] bg-[var(--color-blue-100)] px-6 py-[13px]">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div
              className="mobile:flex mobile:items-center tablet:hidden h-8 w-auto cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsSidebar(true);
              }}
            >
              <Image src="/assets/icons/gnb-menu.svg" alt="Menu Icon" width={24} height={24} className="object-cover" />
            </div>
            <div>
              <Link href="/main" className="flex items-center gap-[4px]">
                <div className="h-8 w-8">
                  <Image
                    src="/assets/images/logo.png"
                    alt="Epigram Logo"
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                </div>
                <span
                  className="tablet:text-[var(--text-mon-xxs)] tablet:leading-[var(--text-mon-lg--line-height)] pc:text-[var(--text-mon-sm)] pc:leading-[var(--text-mon-lg--line-height)] leading-[var(--text-mon-lg--line-height)] font-black tracking-normal text-[var(--text-mon-xxs)]"
                  style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--color-black-900)', fontWeight: '900' }}
                >
                  Epigram
                </span>
              </Link>
            </div>
            <nav
              className="mobile:hidden tablet:flex pc:flex pc:ml-[36px] pc:text-[var(--text-pre-lg)] pc:leading-[26px] gap-4 text-center leading-[24px] font-semibold tracking-normal text-[var(--text-pre-md)]"
              style={{ color: 'var(--color-black-600)' }}
            >
              <Link href="/feed" className="hover:text-[var(--color-black-900)]">
                피드
              </Link>
              <Link href="/search" className="hover:text-[var(--color-black-900)]">
                검색
              </Link>
            </nav>
          </div>
          <div className="relative">
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setIsKebab(!isKebab);
              }}
            >
              <Image
                src={user?.image || '/assets/icons/user.svg'}
                width={24}
                height={24}
                alt="User Icon"
                className="pc:h-6 pc:w-6 h-4 w-4 rounded-full object-cover"
              />
              <span className="text-pre-sm pc:text-pre-md text-gray-300">{user?.nickname}</span>
            </div>
            {isKebab && (
              <Kebab
                label1="마이 페이지"
                onCLick1={() => {
                  router.push('/mypage');
                }}
                label2="로그아웃"
                onClick2={() => {
                  signOut();
                }}
              />
            )}
          </div>
        </div>
      </header>
      {isSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute top-4 left-0 h-full" onClick={() => setIsSidebar(false)}>
            <aside className="relative z-50 flex h-full w-[220px] flex-col bg-white p-4 shadow-lg">
              <div className="h-[20px] border-b p-[15px]">
                <button className="absolute top-2 right-4" onClick={() => setIsSidebar(false)}>
                  <Image src="/assets/icons/x.svg" alt="엑스버튼" width={24} height={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-[24px] py-[30px] text-lg">
                <Link href="/feed" className="hover:text-black" onClick={() => setIsSidebar(false)}>
                  피드
                </Link>
                <Link href="/search" className="hover: text-black" onClick={() => setIsSidebar(false)}>
                  검색
                </Link>
              </nav>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
