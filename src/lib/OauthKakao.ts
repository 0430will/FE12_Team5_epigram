// // pages/api/kakao.js
// export default async function handler(req, res) {
//   const { code } = req.query;
//   const REST_API_KEY = process.env.KAKAO_REST_API_KEY; // 서버에서만 접근 가능한 변수
//   const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

//   // 토큰 교환 엔드포인트 URL
//   const tokenUrl = 'https://kauth.kakao.com/oauth/token';

//   // POST 요청을 위한 파라미터 설정
//   const params = new URLSearchParams({
//     grant_type: 'authorization_code',
//     client_id: REST_API_KEY || '', // string이어야 함
//     redirect_uri: redirectUri || '', // string
//   });

//   try {
//     // 토큰 교환 요청
//     const tokenResponse = await fetch(tokenUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: params.toString(),
//     });
//     const tokenData = await tokenResponse.json();

//     // access token을 사용하여 사용자 정보 요청
//     const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${tokenData.access_token}`,
//         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
//       },
//     });
//     const userData = await userResponse.json();

//     // 필요한 경우, 토큰 및 사용자 정보를 DB에 저장하거나 세션을 생성합니다.
//     res.status(200).json({ tokenData, userData });
//   } catch (error) {
//     console.error('Kakao 로그인 처리 에러:', error);
//     res.status(500).json({ error: '카카오 로그인 실패' });
//   }
// }
