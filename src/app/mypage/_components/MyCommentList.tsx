'use client';

import React, { useEffect, useState } from 'react';
import { CommentList, Comment } from '@/types/Comment';
import { CommentItem } from '@/components/Comment/CommentItem';
import { getUserComments } from '@/lib/User';

export default function MyCommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0);

  const testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU0NywidGVhbUlkIjoiMTItNSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzQzMjg4NjQ2LCJleHAiOjE3NDMyOTA0NDYsImlzcyI6InNwLWVwaWdyYW0ifQ.68JapyeOHJOixV-QZA9w3AQtfJdHXGpEAWWT27rgyBw';

  const userId = JSON.parse(atob(testToken.split('.')[1])).id;

  useEffect(() => {
    const fetchMyComments = async () => {
      try {
        if (nextCursor === null) return;

        const response = await getUserComments(testToken, userId, 4, nextCursor);
        if (!response.list.length) return;

        setComments((prev) => [...prev, ...response.list]);
        setNextCursor(response.nextCursor);
      } catch (error) {
        console.error('내 댓글 불러오기 실패:', error);
      }
    };

    fetchMyComments();
  }, [nextCursor]);

  return (
    <div className="w-full">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          token={testToken}
          onDelete={(id) => setComments((prev) => prev.filter((c) => c.id !== id))} // 삭제 시 필터링
          onSave={(updated) => setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))} // 수정 시 상태 업데이트
        />
      ))}
    </div>
  );
}
