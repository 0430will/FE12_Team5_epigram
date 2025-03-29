'use client';

import React, { useEffect, useState } from 'react';
import { getComments } from '@/lib/Comment';
import type { Comment } from '@/types/Comment';
import { CommentItem } from './CommentItem';

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);

  const testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU0NywidGVhbUlkIjoiMTItNSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzQzMjg1MDE1LCJleHAiOjE3NDMyODY4MTUsImlzcyI6InNwLWVwaWdyYW0ifQ.2NEpLQRb23IxQSNBpdI4RoSrJ8fRYKaGkEpx5X8NLEA';

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
