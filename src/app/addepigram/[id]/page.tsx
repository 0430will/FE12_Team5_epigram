import EpigramForm from '@/components/EpigramForm';
import { GetEpigram } from '@/lib/Epigram';
// @ts-expect-error : 타입스크립트가 notFound를 오류로 인식합니다. 작동은 잘 됩니다.
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  if (isNaN(Number(id))) return notFound();

  const data = await GetEpigram(Number(id));
  if (!data) return <div>오류가 발생했습니다.</div>;

  return <EpigramForm initialValue={data} submitType="수정하기" />;
}
