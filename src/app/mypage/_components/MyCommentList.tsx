'use client';

import React, { useEffect, useState } from 'react';
import { CommentItem } from '@/components/Comment/CommentItem';
import { fetchUserProfile, getUserComments } from '@/lib/User';
import { useSession } from 'next-auth/react';
import { useMyCommentStore } from '@/stores/pageStores';
import { usePaginatedList } from '@/hooks/usePaginatedList';
import Image from 'next/image';
import EmptyState from '@/components/EmptyState';
import { useRouter } from 'next/navigation';
import SkeletonCommentCard from '@/components/skeletons/SkeletonCommentCard';

export default function MyCommentList() {
  const { data: session, status } = useSession();
  const token = session?.user.accessToken;
  const userId = session?.user.id ? Number(session.user.id) : undefined;
  const router = useRouter();

  const { items: comments, hasMore } = useMyCommentStore();

  const fetchMyComments = async (cursor?: number) => {
    if (!token || !userId) return { list: [], totalCount: 0 };
    return await getUserComments(token, userId, 4, cursor ?? 0);
  };

  const { loadMore, loading } = usePaginatedList({
    store: useMyCommentStore.getState(),
    fetchFn: fetchMyComments,
  });

  const [userImage, setUserImage] = useState<string | null>(null);
  const [userNickname, setUserNickname] = useState<string | null>(null);

  const updateUserProfile = async () => {
    if (!token) return;
    try {
      const data = await fetchUserProfile(token);
      setUserImage(data?.image || '');
      setUserNickname(data?.nickname || '');
    } catch (error) {
      console.error('프로필 정보를 불러오는 데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && token && userId) {
      updateUserProfile();
    }
  }, [status, token, userId]);

  if (status === 'loading') return <div>로딩 중...</div>;
  if (!session) return <div>로그인이 필요합니다.</div>;

  return comments.length === 0 ? (
    <div className="flex flex-col items-center justify-center">
      <EmptyState message={`아직 작성한 댓글이 없어요!<br/>댓글을 달고 다른 사람들과 교류해보세요.`} />
      <button
        onClick={() => router.push('/feed')}
        className="pc:text-pre-xl pc:px-[40px] text-pre-md bg-bg-100 flex cursor-pointer gap-[4px] rounded-full border border-blue-500 px-[18px] py-[11.5px] font-medium text-blue-500 transition hover:bg-blue-900 hover:text-white"
      >
        <Image src={'/assets/icons/plus.svg'} width={24} height={24} alt={'플러스 아이콘'} />
        에피그램 둘러보기
      </button>
    </div>
  ) : (
    <>
      <SkeletonCommentCard count={4} />

      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          token={token!}
          userImage={userImage}
          userNickname={userNickname}
          onDelete={(id) => useMyCommentStore.getState().setState({ items: comments.filter((c) => c.id !== id) })}
          onSave={(updated) =>
            useMyCommentStore.getState().setState({ items: comments.map((c) => (c.id === updated.id ? updated : c)) })
          }
          writerId={userId}
          onClick={() => router.push(`/feed/${comment.epigramId}`)}
        />
      ))}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="pc:text-pre-xl pc:px-[40px] text-pre-md bg-bg-100 flex cursor-pointer gap-[4px] rounded-full border border-blue-500 px-[18px] py-[11.5px] font-medium text-blue-500 transition hover:bg-blue-900 hover:text-white"
          >
            <Image src="/assets/icons/plus.svg" width={24} height={24} alt="더보기" />
            {loading ? '불러오는 중...' : '내 댓글 더보기'}
          </button>
        </div>
      )}
    </>
  );
}
