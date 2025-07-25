'use client';

import { useState } from 'react';
import { Avatar } from './Avatar';
import { CommentCard } from './CommentCard';
import { deleteComment, updateComment } from '@/lib/Comment';
import type { Comment } from '@/types/Comment';
import ClientButton from '../Button/ClientButton';
import ModalLayout from '../Modal/ModalLayout';
import ModalUserProfile from '../Modal/ModalUserProfile';
import { notify } from '@/util/toast';
import moment from 'moment';
import 'moment/locale/ko';

moment.updateLocale('ko', {
  relativeTime: {
    d: '1일',
    dd: '%d일',
  },
});
moment.locale('ko');

interface Props {
  comment: Comment;
  token?: string;
  writerId?: number;
  onDelete: (id: number) => void;
  onSave: (updated: Comment) => void;
  onClick?: () => void;
  userImage?: string | null;
  userNickname?: string | null;
}

export function CommentItem({ comment, token, writerId, onDelete, onSave, onClick, userImage, userNickname }: Props) {
  const [modalState, setModalState] = useState<'none' | 'profile' | 'delete'>('none');
  const [editState, setEditState] = useState({
    isEditing: false,
    content: comment.content,
    isPrivate: comment.isPrivate
  });

  const handleSave = async () => {
    if (!token) {
      console.error('토큰이 없습니다. 댓글 수정 요청이 중단됩니다');
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      console.log('저장 전송:', {
        content: editState.content,
        isPrivate: editState.isPrivate,
      });

      await updateComment(token, comment.id, editState.content, editState.isPrivate);
      onSave({ ...comment, content: editState.content, isPrivate: editState.isPrivate });
      setEditState(prev => ({ ...prev, isEditing: false }));
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!token) {
      alert('로그인이 필요합니다');
      return;
    }

    try {
      await deleteComment(token, comment.id);
      onDelete(comment.id); // 삭제 후 부모에 알림
      setModalState('none');

      notify({ message: '댓글이 삭제되었습니다.', type: 'success' });
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      notify({ message: '댓글 삭제에 실패했습니다.', type: 'error' });
    }
  };

  const isMyComment = writerId === comment.writer.id;

  function formatTime(createdAt: string) {
    return moment(createdAt).fromNow();
  }

  return (
    <>
      <CommentCard
        onClick={() => {
          if (!editState.isEditing && onClick) {
            onClick();
          }
        }}
        className={`border-line-200 bg-bg-100 tablet:py-6 pc:py-[35px] flex items-start border-t px-6 py-4 ${onClick && !editState.isEditing ? 'cursor-pointer' : ''}`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setModalState('profile');
          }}
        >
          <Avatar
            src={userImage ?? comment.writer.image}
            alt={'프로필 이미지'}
            className="mr-4 h-12 w-12 cursor-pointer rounded-full transition-transform duration-200 hover:scale-105 hover:shadow-md"
          />
        </button>
        <div className="flex-1">
          <div className="tablet:mb-3 pc:mb-4 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalState('profile');
                }}
                className="text-pre-xs tablet:text-pre-lg pc:text-pre-lg font-regular text-black-300 cursor-pointer hover:underline"
              >
                {userNickname ?? comment.writer.nickname}
              </button>
              <span className="text-pre-xs tablet:text-pre-lg pc:text-pre-lg font-regular text-black-300">
                {formatTime(comment.createdAt)}
              </span>

              {comment.isPrivate && (
                <img
                  src="/assets/icons/lock.svg"
                  alt="비공개"
                  className="tablet:h-4 tablet:w-4 pc:h-5 pc:w-5 ml-1 h-3 w-3 opacity-60"
                  title="비공개 댓글"
                />
              )}
            </div>

            {isMyComment && !editState.isEditing && (
              <div className="flex gap-4 text-xs">
                <span
                  className="text-pre-xs tablet:text-pre-lg pc:text-pre-lg font-regular text-black-600 cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditState(prev => ({ ...prev, isEditing: true }));
                  }}
                >
                  수정
                </span>
                <span
                  className="text-pre-xs tablet:text-pre-lg pc:text-pre-lg font-regular cursor-pointer text-[color:var(--color-state-error)] hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalState('delete');
                  }}
                >
                  삭제
                </span>
              </div>
            )}
          </div>

          {editState.isEditing ? (
            <>
              <textarea
                className="custom-scrollbar border-line-200 text-pre-lg leading-text-pre-lg font-regular text-black-700 pc:text-pre-xl pc:leading-text-pre-xl w-full resize-none rounded-md border px-3 py-2 outline-none focus:border-blue-600"
                value={editState.content}
                onChange={(e) => setEditState(prev => ({ ...prev, content: e.target.value }))}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-pre-xs tablet:text-pre-md pc:text-pre-lg w-12 text-center text-gray-400">
                    {editState.isPrivate ? '비공개' : '공개'}
                  </span>
                  <button
                    onClick={() => setEditState(prev => ({ ...prev, isPrivate: !prev.isPrivate }))}
                    className={`h-5 w-10 rounded-full transition-colors duration-200 ${
                      editState.isPrivate ? 'bg-gray-400' : 'bg-black-600'
                    }`}
                  >
                    <div
                      className={`h-4 w-4 transform rounded-full bg-blue-100 shadow transition-transform duration-200 ${
                        editState.isPrivate ? 'translate-x-1' : 'translate-x-5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-2">
                  <ClientButton
                    isValid={true}
                    className="text-pre-xs tablet:text-pre-md pc:text-pre-lg tablet:h-[32px] pc:h-[44px] tablet:w-[53px] pc:w-[60px] flex h-[32px] w-[53px] items-center justify-center font-semibold whitespace-nowrap"
                    onClick={handleSave}
                  >
                    저장
                  </ClientButton>
                  <ClientButton
                    isValid={true}
                    className="text-pre-xs tablet:text-pre-md pc:text-pre-lg tablet:h-[32px] pc:h-[44px] tablet:w-[53px] pc:w-[60px] flex h-[32px] w-[53px] items-center justify-center font-semibold whitespace-nowrap"
                    onClick={() => {
                      setEditState({
                        isEditing: false,
                        content: comment.content,
                        isPrivate: comment.isPrivate
                      });
                    }}
                  >
                    취소
                  </ClientButton>
                </div>
              </div>
            </>
          ) : (
            <p className="text-pre-md tablet:text-pre-lg pc:text-pre-xl font-regular leading-text-pre-md tablet:leading-text-pre-lg pc:leading-text-pre-xl text-black-700">
              {comment.content}
            </p>
          )}
        </div>
      </CommentCard>
      {modalState === 'profile' && (
        <ModalLayout type="content" onClose={() => setModalState('none')}>
          <ModalUserProfile
            nickname={userNickname ?? comment.writer.nickname}
            image={userImage ?? comment.writer.image}
          />
        </ModalLayout>
      )}

      {modalState === 'delete' && (
        <ModalLayout
          type="confirm"
          title="댓글을 삭제하시겠어요?."
          description="댓글은 삭제 후 복구할 수 없어요."
          actionLabel="삭제하기"
          onClose={() => setModalState('none')}
          onAction={handleDeleteConfirm}
        />
      )}
    </>
  );
}
