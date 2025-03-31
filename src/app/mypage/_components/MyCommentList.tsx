'use client';

import React, { useEffect, useState } from 'react';
import { Comment } from '@/types/Comment';
import { CommentItem } from '@/components/Comment/CommentItem';
import { getUserComments } from '@/lib/User';
import { useSession } from 'next-auth/react';

export default function MyCommentList() {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0);

  useEffect(() => {
    const fetchMyComments = async () => {
      if (!session || !session.user?.accessToken || !session.user?.id) return;
      if (nextCursor === null) return;

      try {
        const userId = Number(session.user.id);
        const response = await getUserComments(session.user.accessToken, userId, 4, nextCursor);

        if (!response.list.length) return;

        setComments((prev) => [...prev, ...response.list]);
        setNextCursor(response.nextCursor);
      } catch (error) {
        console.error('내 댓글 불러오기 실패:', error);
      }
    };

    fetchMyComments();
  }, [session, nextCursor]);

  if (status === 'loading') {
    return <div>로딩중...</div>;
  }

  if (!session) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="w-full">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          token={session.user.accessToken}
          onDelete={(id) => setComments((prev) => prev.filter((c) => c.id !== id))} // 삭제 시 필터링
          onSave={(updated) => setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))} // 수정 시 상태 업데이트
        />
      ))}
    </div>
  );
}
