export async function uploadImage(image: File, token: string | undefined): Promise<string> {
  if (!token) throw new Error('Access token이 없습니다.');

  const formData = new FormData();
  formData.append('image', image);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('이미지 업로드 실패');
  }

  const data = await response.json();
  console.log('url:', data.url);
  return data.url; // 서버에서 반환하는 이미지 URL
}
