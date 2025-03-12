import Image from 'next/image';
import Link from 'next/link';

export default function MainHeader() {
  return (
    <header className="tablet:px-18 tablet:py-[17px] pc:px-[120px] pc:py-[22px] border-b border-[var(--color-line-100)] bg-[var(--color-blue-100)] px-6 py-[13px]">
      <div className="flex w-full items-center justify-between">
        {/* 왼쪽: 로고 + Epigram 텍스트 + 네비게이션 메뉴 */}
        <div className="flex items-center gap-[12px]">
          {/* 모바일에서만 보이는 메뉴 아이콘 */}
          <div className="mobile:flex mobile:items-center tablet:hidden h-8 w-auto">
            <Image src="/assets/icons/gnb-menu.svg" alt="Menu Icon" width={24} height={24} className="object-cover" />
          </div>
          {/* 로고 + Epigram 텍스트 */}
          <div className="flex items-center gap-[4px]">
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
          </div>
          {/* 네비게이션 메뉴 (피드, 검색) */}
          <nav
            className="mobile:hidden tablet:flex pc:flex pc:ml-[36px] pc:text-[var(--text-pre-lg)] pc:leading-[26px] gap-4 text-center leading-[24px] font-semibold tracking-normal text-[var(--text-pre-md)]"
            style={{ color: 'var(--color-black-600)' }}
          >
            <Link href="../feed/page.tsx" className="hover:text-[var(--color-black-900)]">
              피드
            </Link>
            <Link href="/" className="hover:text-[var(--color-black-900)]">
              검색
            </Link>
          </nav>
        </div>

        {/* 유저 프로필 */}
        <div className="flex items-center gap-2">
          <Image
            src="/assets/icons/user.svg"
            width={16}
            height={16}
            alt="User Icon"
            className="h-6 w-6 text-[var(--color-black-600)]"
          />
          <span className="text-pre-md mobile:hidden tablet:inline text-[var(--color-black-500)]">김코드</span>
        </div>
      </div>
    </header>
  );
}
