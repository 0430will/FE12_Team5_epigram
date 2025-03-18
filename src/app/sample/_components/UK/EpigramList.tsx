"use client";

import InfiniteList from "./InfiniteList";
import { fetchEpigrams } from "@/lib/api";

interface Epigram {
  id: number;
  author: string;
  content: string;
  referenceTitle: string;
  referenceUrl: string;
  likeCount: number;
}

export default function EpigramList() {
  return (
    <InfiniteList<Epigram>
      fetchItems={async (page, limit) => {
        const data = await fetchEpigrams(page, limit);
        return {
          list: data.list,
          hasMore: data.hasMore && data.list.length === limit
        };
      }}
      renderItem={(epigram) => (
        <li key={epigram.id} className="p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">{epigram.author}</h2>
          <p className="text-gray-600">{epigram.content}</p>
          <a href={epigram.referenceUrl} className="text-blue-500">
            {epigram.referenceTitle}
          </a>
          <div className="text-sm text-gray-400">❤️ {epigram.likeCount} likes</div>
        </li>
      )}
    />
  );
}
