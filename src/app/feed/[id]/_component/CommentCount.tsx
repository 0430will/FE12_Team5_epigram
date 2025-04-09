interface CommentCountProps {
  label?: string; // 기본값: "댓글"
  count: number;
}

export default function CommentCount({ label = '댓글', count }: CommentCountProps) {
  return (
    <div className="tablet:px-0 tablet:mb-6 pc:mb-6 tablet:text-base pc:text-lg mb-4 px-6 text-sm font-semibold text-gray-800">
      {label} <span className="text-black">({count})</span>
    </div>
  );
}
