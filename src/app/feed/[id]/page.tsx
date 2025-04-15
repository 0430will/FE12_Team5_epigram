import EpigramCommentSection from './_component/EpigramCommentSection';
import EpigramDetail from './_component/EpigramDetail';

type PageParams = Promise<{ id: string }>;

export default function DetailPage({ params }: { params: PageParams }) {
  return (
    <>
      <EpigramDetail params={params} />

      <EpigramCommentSection />
    </>
  );
}
