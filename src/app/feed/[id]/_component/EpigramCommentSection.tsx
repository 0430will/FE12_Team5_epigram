'use client';

import { useEffect, useState } from 'react';
import EpigramCommentList from './EpigramCommentList';
import { createComment, getComments } from '@/lib/Comment';
import type { Comment } from '@/types/Comment';
import CommentCount from './CommentCount';
import CommentInput from './CommentInput';
import { useSession } from 'next-auth/react';
// @ts-expect-error : 타입스크립트가 notFound를 오류로 인식합니다. 작동은 잘 됩니다.
import { useParams } from 'next/navigation';

export default function EpigramCommentSection() {
  const { data: session, status } = useSession();
  const { id } = useParams();
  const epigramId = Number(id);

  const [comments, setComments] = useState<Comment[]>([]);

  const token = status === 'authenticated' ? session?.user.accessToken : null;
  const userImage = session?.user?.image;

  useEffect(() => {
    if (!token || !epigramId) return;

    const fetch = async () => {
      try {
        const res = await getComments(token, 50, 0, epigramId.toString());

        setComments(res.list);
      } catch (err) {
        console.error('댓글 불러오기 실패', err);
      }
    };

    fetch();
  }, [epigramId, token]);

  const handleCreate = async (content: string, isPrivate: boolean) => {
    if (!token || !epigramId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await createComment(token, epigramId, content, isPrivate);

      setComments((prev) => [response, ...prev]); // 새 댓글 맨 위에 추가
    } catch (err) {
      console.error('댓글 작성 실패', err);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  if (status === 'loading') {
    return <div>로딩 중...</div>;
  }

  if (!session || !token) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="rounded-md bg-[#F5F7FA] px-4 py-6">
      <CommentCount count={comments.length} />

      <CommentInput userImage={userImage} onSubmit={handleCreate} />

      <EpigramCommentList epigramId={epigramId} comments={comments} setComments={setComments} />
    </div>
  );
}
