"use client";

import InfiniteList from "./InfiniteList";
import { Epigram } from "@/types/Epigram";

interface ApiResponse {
  list: Epigram[];
  nextCursor: number | null;
  totalCount: number;
}

// cursor 기반 에피그램 API
async function fetchEpigrams(
  cursor: number | null,
  limit: number
): Promise<{ list: Epigram[]; nextCursor: number | null; hasMore: boolean }> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/epigrams`);
  url.searchParams.append("limit", String(limit));
  if (cursor !== null) {
    url.searchParams.append("cursor", String(cursor));
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("에피그램 불러오기 실패");
  }

  const data: ApiResponse = await response.json();

  return {
    list: data.list,
    nextCursor: data.nextCursor,
    hasMore: data.nextCursor !== null,
  };
}

export default function EpigramList() {
  return (
    <InfiniteList<Epigram>
      fetchItems={(cursor, limit) => fetchEpigrams(cursor, limit)}
      renderItem={(epigram) => (
        <li
          key={epigram.id}
          className="p-4 border rounded-lg shadow-md bg-white"
        >
          <h2 className="text-lg font-semibold">{epigram.author}</h2>
          <p className="text-gray-600">{epigram.content}</p>
          {epigram.referenceUrl && (
            <a
              href={epigram.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {epigram.referenceTitle}
            </a>
          )}
          <div className="text-sm text-gray-400">
            ❤️ {epigram.likeCount} likes
          </div>
        </li>
      )}
      buttonText="+ 에피그램 더보기"
      storageKey="epigram_list"
    />
  );
}
