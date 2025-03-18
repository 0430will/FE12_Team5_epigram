"use client";

import InfiniteList from "./InfiniteList";
import { fetchComments } from "@/lib/api";

interface Comment {
  id: number;
  writer: {
    nickname: string;
    image: string;
  };
  content: string;
  createdAt: string;
}

export default function CommentList({ epigramId }: { epigramId: number }) {
  return (
    <InfiniteList<Comment>
      fetchItems={(page, limit) => fetchComments(epigramId, page, limit)}
      renderItem={(comment) => (
        <li key={comment.id} className="p-2 bg-gray-100 rounded-lg">
          <div className="flex items-center space-x-2">
            <img src={comment.writer.image} alt={comment.writer.nickname} className="w-6 h-6 rounded-full" />
            <span className="text-sm font-medium">{comment.writer.nickname}</span>
          </div>
          <p className="text-gray-700 text-sm">{comment.content}</p>
        </li>
      )}
      buttonText="+ 최신 댓글 더보기" // ✅ 댓글에만 다른 문구 적용
    />
  );
}
