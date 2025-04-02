import EpigramCommentSection from './_component/EpigramCommentSection';

export default function DetailPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">상세페이지</h1>

      {/* 동욱님 – 에피그램 상세 */}
      <section className="mb-12 border-t pt-6">
        <h2 className="mb-3 text-xl font-semibold"></h2>
      </section>

      <section className="mb-12 border-t pt-6">
        <h2 className="mb-3 text-xl font-semibold">에피그램 댓글</h2>
        <EpigramCommentSection />
      </section>
    </>
  );
}
