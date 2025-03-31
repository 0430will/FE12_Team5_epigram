'use client';

import React, { useEffect, useState } from 'react';
import { getComments } from '@/lib/Comment';
import type { Comment } from '@/types/Comment';
import { CommentItem } from './CommentItem';
import { useSession } from 'next-auth/react';

export default function CommentList() {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      //세션이 없거나 토큰이 없으면 요청X
      if (!session || !session.accessToken) return;
      try {
        const response = await getComments(session.accessToken, 4, 0);
        setComments(response.list);
      } catch (error) {
        console.error('댓글 불러오기 실패:', error);
      }
    };

    fetchComments();
  }, [session]); //세션이 바뀌면 댓글 다시 불러옴

  if (status === 'loading') {
    return <div>로딩 중...</div>;
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
          token={session.accessToken ?? ''}
          onDelete={(id) => setComments((prev) => prev.filter((c) => c.id !== id))}
          onSave={(updated) => setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))}
        />
      ))}
    </div>
  );
}
