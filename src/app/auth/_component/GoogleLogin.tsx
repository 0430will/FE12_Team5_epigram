'use client';
import Image from 'next/image';

export default function GoogleLogin() {
  function doGoogleLogin() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    const scope = 'email profile openid';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    console.log(`authUrl : ${authUrl}`);
    window.location.href = authUrl;
  }
  return (
    <div
      className="pc:w-[60px] pc:h-[60px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border border-solid border-[#E6E6EA]"
      onClick={doGoogleLogin}
    >
      <Image
        className="pc:w-[27px] pc:h-[27px]"
        src="/assets/icons/google.svg"
        width={18}
        height={18}
        alt="구글 로고 이미지"
      />
    </div>
  );
}
