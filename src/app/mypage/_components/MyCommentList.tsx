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
import { SkeletonCommentCard } from '@/components/skeletons/SkeletonComment';

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

  const { loadMore, loading, initialLoading } = usePaginatedList({
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
    const initialize = async () => {
      if (status === 'authenticated' && token && userId) {
        try {
          await loadMore();
        } catch (e) {
          console.error('댓글 로딩 실패', e);
        }
        updateUserProfile();
      }
    };

    initialize();
  }, [status, token, userId]);

  useEffect(() => {
    if (comments.length === 0 && !loading && initialLoading) {
      loadMore(); // 비어있으면 한 번 더 로딩 시도
    }
  }, [comments, loading, initialLoading, loadMore]);

  //세션 로딩중
  if (status === 'loading') return <SkeletonCommentCard count={4} />;
  if (!session) return <div>로그인이 필요합니다.</div>;

  // 초기 로딩중
  if (comments.length === 0 && (loading || initialLoading)) {
    return <SkeletonCommentCard count={4} />;
  }

  // 댓글이 없고 초기 로딩도 끝난 상태
  if (comments.length === 0) {
    return (
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
    );
  }
  return (
    <>
      {/* 댓글 리스트 렌더링 중 추가 로딩 시 > 스켈레톤 노출 */}
      {loading && <SkeletonCommentCard count={4} />}

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
