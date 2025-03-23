"use client";

import InfiniteList from "./InfiniteList";
import { EpigramComment } from "@/types/Epigram";

interface ApiResponse {
  list: EpigramComment[];
  nextCursor: number | null;
  totalCount: number;
}

// cursor 기반 댓글 API
async function fetchComments(
  epigramId: number,
  cursor: number | null,
  limit: number
): Promise<{ list: EpigramComment[]; nextCursor: number | null; hasMore: boolean }> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/epigrams/${epigramId}/comments`);
  url.searchParams.append("limit", String(limit));
  if (cursor !== null) {
    url.searchParams.append("cursor", String(cursor));
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("댓글 불러오기 실패");
  }

  const data: ApiResponse = await response.json();

  return {
    list: data.list,
    nextCursor: data.nextCursor,
    hasMore: data.nextCursor !== null,
  };
}

export default function CommentList({ epigramId }: { epigramId: number }) {
  return (
    <InfiniteList<EpigramComment>
      fetchItems={(cursor, limit) => fetchComments(epigramId, cursor, limit)}
      renderItem={(comment) => (
        <li key={comment.id} className="p-2 bg-gray-100 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <img
              src={comment.writer.image}
              alt={comment.writer.nickname}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium">{comment.writer.nickname}</span>
          </div>
          <p className="text-gray-700 text-sm">{comment.content}</p>
        </li>
      )}
      buttonText="+ 댓글 더보기"
      storageKey={`comments_${epigramId}`} // 댓글은 epigramId별로 키를 나눠 저장
    />
  );
}
