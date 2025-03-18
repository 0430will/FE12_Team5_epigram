"use client";

import React, { useEffect, useState, JSX } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

// 📌 데이터를 가져올 때 필요한 기본 형태
interface FetchResult<T> {
  list: T[]; // 데이터를 배열로 가져옴
  hasMore: boolean; // 다음 데이터가 더 있는지 여부
}

// 📌 무한스크롤 리스트의 기본 타입
interface InfiniteListProps<T> {
  fetchItems: (page: number, limit: number) => Promise<FetchResult<T>>; // 데이터를 가져오는 함수
  renderItem: (item: T) => JSX.Element; // 화면에 표시할 방법
  limit?: number; // 한 번에 몇 개의 데이터를 불러올지 (기본값: 4)
  buttonText?: string; // ✅ 버튼 문구 변경을 위한 추가 props
}

// 📌 무한스크롤 공통 컴포넌트
export default function InfiniteList<T>({
  fetchItems,
  renderItem,
  limit = 3, // 기본 limit 설정
  buttonText = "+ 에피그램 더보기", // ✅ 기본값 설정
}: InfiniteListProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // ✅ 데이터를 불러오는 함수
  const loadMore = async () => {
    if (loading || !hasMore) return; // 중복 요청 방지 & 데이터가 더 없으면 종료
    setLoading(true);

    const data = await fetchItems(page, page === 1 ? 3 : 4); // ✅ 첫 페이지는 3개, 이후에는 4개씩 로드
    setItems((prev) => [...prev, ...data.list]); // 기존 데이터에 추가
    setHasMore(data.hasMore); // 다음 데이터가 있는지 확인
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  // ✅ 무한스크롤 감지 Hook 적용
  const observerRef = useInfiniteScroll({ loadMore, hasMore });

  // ✅ 새로고침 시 기존 데이터를 유지하도록 설정
  useEffect(() => {
    if (items.length === 0 && !loading) loadMore();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* ✅ 데이터가 없고, 로딩 중이 아닐 때 "데이터가 없습니다" 메시지 표시 */}
      {items.length === 0 && !loading && <p className="text-center text-gray-500">데이터가 없습니다.</p>}

      <ul className="space-y-4">
        {items.map((item) => renderItem(item))}
      </ul>

      <div ref={observerRef} className="h-10" />

      {/* ✅ 데이터가 없거나, 로딩 중일 때 버튼을 유지 */}
      {(hasMore || loading) && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="w-[238px] h-[56px] flex justify-center items-center px-[40px] py-[12px] gap-[8px] bg-100 border border-line-200 rounded-full text-blue-500 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : buttonText} {/*✅ 동적으로 문구 변경 가능!*/}
        </button>
      )}
    </div>
  );
}
