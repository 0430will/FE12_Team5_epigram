import GoogleLogin from './GoogleLogin';
import KakaoLogin from './KakaoLogin';

export default function SocialLogins({ authType }: { authType: 'LOGIN' | 'SIGNUP' }) {
  const actionText = authType === 'LOGIN' ? '로그인하기' : '가입하기';

  return (
    <section className="w-full text-center">
      <div className="pc:mb-[40px] relative mb-[24px] after:absolute after:top-1/2 after:left-0 after:h-[1px] after:w-full after:-translate-y-1/2 after:bg-[#E0E0E0] after:content-['']">
        <h2 className="pc:pr-[25px] pc:pl-[25px] pc:text-pre-xl bg-bg-100 text-pre-xs relative z-1 inline-block pr-[20px] pl-[20px] text-blue-400">
          SNS 계정으로 간편 {actionText}
        </h2>
      </div>
      <div className="flex justify-center gap-[16px]">
        <GoogleLogin />
        <KakaoLogin />
      </div>
    </section>
  );
}
