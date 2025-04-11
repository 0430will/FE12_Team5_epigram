import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      'k.kakaocdn.net',
      'img1.kakaocdn.net',
      'kakaocdn.net',
    ],
  },
};

export default nextConfig;
