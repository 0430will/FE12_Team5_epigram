import EpigramForm from '@/components/EpigramForm';
import { GetEpigram } from '@/lib/Epigram';

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;

  const data = await GetEpigram(id);
  if (!data) return <div>오류가 발생했습니다.</div>;

  return <EpigramForm initialValue={data} submitType="수정하기" />;
}
