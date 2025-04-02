'use client';

import { CommentItem } from '@/components/Comment/CommentItem';
import type { Comment } from '@/types/Comment';
import { useSession } from 'next-auth/react';

interface EpigramCommentListProps {
  epigramId: number;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function EpigramCommentList({ comments, setComments, setTotalCount }: EpigramCommentListProps) {
  const { data: session, status } = useSession();

  const token = status === 'authenticated' ? session?.user.accessToken : undefined;
  const writerId = session?.user.id ? Number(session.user.id) : undefined;

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          token={token}
          writerId={writerId}
          onDelete={(id) => {
            setComments((prev) => prev.filter((c) => c.id !== id));
            setTotalCount((prev) => prev - 1);
          }}
          onSave={(updated) => setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))}
        />
      ))}
    </div>
  );
}
