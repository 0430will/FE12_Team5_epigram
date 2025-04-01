import EpigramCommentSection from './_component/EpigramCommentSection';
import EpigramDetail from './_component/EpigramDetail';

type PageParams = Promise<{ id: string }>;

export default function DetailPage({ params }: { params: PageParams }) {
  return (
    <>
      <EpigramDetail params={params} />
      <section className="mb-12 pt-6">
        <h2 className="mb-3 text-xl font-semibold">에피그램 댓글</h2>
        <EpigramCommentSection />
      </section>
    </>
  );
}
