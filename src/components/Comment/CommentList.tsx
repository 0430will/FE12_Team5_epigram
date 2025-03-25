'use client';

import React, { useEffect, useState } from 'react';
import { getComments } from '@/lib/Comment';
import type { Comment } from '@/types/Comment';
import { CommentItem } from './CommentItem';

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);

  const testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU0NywidGVhbUlkIjoiMTItNSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzQyODA1ODEzLCJleHAiOjE3NDI4MDc2MTMsImlzcyI6InNwLWVwaWdyYW0ifQ.LqxJtnn_zuqnPTu-INBDLr9yY6vODBKuX2DLg4HZCU0';

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(testToken, 4, 0);
        setComments(response.list);
      } catch (error) {
        console.error('댓글 불러오기 실패:', error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="w-full">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          token={testToken}
          onDelete={(id) => setComments((prev) => prev.filter((c) => c.id !== id))}
          onSave={(updated) => setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))}
        />
      ))}
    </div>
  );
}
