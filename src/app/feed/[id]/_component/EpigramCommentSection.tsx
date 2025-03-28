'use client';

import { useEffect, useState } from 'react';
import EpigramCommentList from './EpigramCommentList';
import { createComment, getComments } from '@/lib/Comment';
import type { Comment } from '@/types/Comment';
import CommentCount from './CommentCount';
import CommentInput from './CommentInput';

interface Props {
  epigramId: number;
  token: string;
  userImage?: string;
}

export default function EpigramCommentSection({ epigramId, token, userImage }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getComments(token, 50, 0, epigramId.toString());
        setComments(res.list);
      } catch (err) {
        console.error('댓글 불러오기 실패', err);
      }
    };

    fetch();
  }, [epigramId]);

  const handleCreate = async (content: string, isPrivate: boolean) => {
    try {
      const response = await createComment(token, epigramId, content, isPrivate);

      setComments((prev) => [response, ...prev]); // 새 댓글 맨 위에 추가
    } catch (err) {
      console.error('댓글 작성 실패', err);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="rounded-md bg-[#F5F7FA] px-4 py-6">
      <CommentCount count={comments.length} />

      <CommentInput userImage={userImage} onSubmit={handleCreate} />

      <EpigramCommentList epigramId={epigramId} token={token} comments={comments} setComments={setComments} />
    </div>
  );
}
