'use client';

import { CommentItem } from '@/components/Comment/CommentItem';
import type { Comment } from '@/types/Comment';

interface EpigramCommentListProps {
  epigramId: string;
  token: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function EpigramCommentList({ epigramId, token, comments, setComments }: EpigramCommentListProps) {
  return (
    <div>
      {comments.map((comment) => (
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
