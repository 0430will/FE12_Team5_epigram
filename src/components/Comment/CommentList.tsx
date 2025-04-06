'use client';

import React, { useEffect } from 'react';
import { CommentItem } from './CommentItem';
import { useSession } from 'next-auth/react';
import { useCommentStore } from '@/stores/pageStores';
import { getComments } from '@/lib/Comment';
import { usePaginatedList } from '@/hooks/usePaginatedList';
import Image from 'next/image';
import { Comment } from '@/types/Comment';

export default function CommentList() {
  const { data: session, status } = useSession();
  const token = status === 'authenticated' ? session?.user.accessToken : null;

  const writerId = session?.user.id ? Number(session.user.id) : undefined;

  const { items: comments, hasMore } = useCommentStore();

  const fetchComments = async (cursor?: number) => {
    if (!token) return { list: [], totalCount: 0 };

    const realCursor = cursor ?? 0;
    return await getComments(token, 4, realCursor);
  };

  const { loadMore, loading } = usePaginatedList<Comment>({
    store: useCommentStore.getState(),
    fetchFn: fetchComments,
  });

  useEffect(() => {
    if (status === 'authenticated' && token && comments.length === 0) {
      loadMore();
    }
  }, [status, token, comments.length]);

  if (status === 'loading') return <div>로딩 중...</div>;
  if (!session) return <div>로그인이 필요합니다.</div>;

  return (
    <div className="w-full space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          token={token!}
          onDelete={(id) => {
            console.log('removeItem:', useCommentStore.getState().removeItem);
            console.log('store keys:', Object.keys(useCommentStore.getState()));
            useCommentStore.getState().removeItem(id); // store에서 제거
          }}
          onSave={(updated) => {
            useCommentStore.getState().updateItem(updated); // 수정 반영
          }}
          writerId={writerId}
        />
      ))}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            className="pc:text-pre-xl pc:px-[40px] text-pre-md bg-bg-100 flex cursor-pointer gap-[4px] rounded-full border border-blue-500 px-[18px] py-[11.5px] font-medium text-blue-500 transition hover:bg-blue-900 hover:text-white"
            disabled={loading}
          >
            <Image src="/assets/icons/plus.svg" width={24} height={24} alt="더보기" />
            최신 댓글 더보기
          </button>
        </div>
      )}
    </div>
  );
}
