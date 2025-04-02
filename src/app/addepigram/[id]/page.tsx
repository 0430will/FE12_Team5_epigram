import EpigramForm from '@/components/EpigramForm';
import { GetEpigram } from '@/lib/Epigram';
import { auth } from '@/lib/next-auth/auth';
// @ts-expect-error : 타입스크립트가 notFound를 오류로 인식합니다. 작동은 잘 됩니다.
import { notFound } from 'next/navigation';

type PageParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: PageParams }) {
  const { id } = await params;
  const session = await auth();
  const token = session?.user.accessToken;

  if (isNaN(Number(id))) return notFound();

  if (!token) return;
  const data = await GetEpigram(Number(id), token);
  if (!data) return <div>오류가 발생했습니다.</div>;

  return <EpigramForm initialValue={data} submitType="수정하기" />;
}
