'use client';

import { CommentItem } from '@/components/Comment/CommentItem';
import type { Comment } from '@/types/Comment';
import { useSession } from 'next-auth/react';

interface EpigramCommentListProps {
  epigramId: number;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function EpigramCommentList({ epigramId, comments, setComments }: EpigramCommentListProps) {
  const { data: session, status } = useSession();

  const token = status === 'authenticated' ? session?.user.accessToken : undefined;

  const filteredComments = comments.filter((comment) => comment.epigramId === epigramId);

  return (
    <div>
      {filteredComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          token={token}
          onDelete={(id) => setComments((prev) => prev.filter((c) => c.id !== id))}
          onSave={(updated) => setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))}
        />
      ))}
    </div>
  );
}
