'use client';

import React, { useEffect, useState } from 'react';
import { getComments } from '@/lib/Comment';
import type { Comment } from '@/types/Comment';
import { CommentItem } from './CommentItem';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function CommentList() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [comments, setComments] = useState<Comment[]>([]);

  const token = status === 'authenticated' ? session?.user.accessToken : null;

  const writerId = pathname.startsWith('/mypage') && session?.user.id ? Number(session.user.id) : undefined;

  useEffect(() => {
    const fetchComments = async () => {
      if (!token) return;

      try {
        const response = await getComments(token, 4, 0);
        setComments(response.list);
      } catch (error) {
        console.error('댓글 불러오기 실패:', error);
      }
    };

    fetchComments();
  }, [token]); //세션이 바뀌면 댓글 다시 불러옴

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
          token={token!}
          onDelete={(id) => setComments((prev) => prev.filter((c) => c.id !== id))}
          onSave={(updated) => setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))}
          writerId={writerId}
        />
      ))}
    </div>
  );
}
