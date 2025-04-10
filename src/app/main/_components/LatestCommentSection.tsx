import CommentList from '@/components/Comment/CommentList';

export default function LatestCommentSection() {
  return (
    <section className="w-full">
      <h2 className="tablet:mb-4 pc:mb-10 tablet:text-lg pc:text-2xl mb-4 text-lg font-semibold">최신 댓글</h2>
      <CommentList />
    </section>
  );
}
