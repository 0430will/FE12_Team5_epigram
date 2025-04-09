'use client';

import useFetchUser from '@/hooks/useFetchdata';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { uploadImage } from '@/lib/UploadImage';
import { patchUserInfo } from '@/lib/patchUserInfo';
import { notify } from '@/util/toast';


export default function MyUserProfile() {
  const { isLoading, user, refetchUser } = useFetchUser();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  if (isLoading) return <p>로딩 중...</p>;
  if (!user) return <p>사용자 정보를 찾을 수 없습니다.</p>;

  const handleImageClick = () => {
    if (editMode) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
    console.log(file);
  };

  const handleSave = async () => {
    try {
      let imageUrl = user.image;

      // 1. 이미지가 변경됐으면 업로드
      if (selectedImageFile) {
        if (!token) {
          console.error('access Token이 없습니다.');
          return;
        }
        imageUrl = await uploadImage(selectedImageFile, token);
        console.log(imageUrl);
      }

      // 2. 유저 정보 수정
      await patchUserInfo({ nickname: nickname || user.nickname, image: imageUrl, token: token });

      // 저장 후 새로 서버에서 유저 정보 가져오기
      await refetchUser();

      setEditMode(false);
      setPreviewImage(null);
      setSelectedImageFile(null);
    } catch (error) {
      console.error('프로필 저장 실패', error);
    }
  };

  const handleCancel = () => {
    setNickname(user.nickname); // 원래 닉네임으로 초기화
    setPreviewImage(null); // 미리보기 이미지 제거
    setSelectedImageFile(null); // 선택한 파일 제거
    setEditMode(false); // 수정모드 해제
  };

  return (
    <section className="pc:mb-[96px] mb-[56px] flex flex-col items-center">
      <div
        className="mb-[16px] h-[120px] w-[120px] cursor-pointer overflow-hidden rounded-full"
        onClick={handleImageClick}
      >
        <Image
          src={previewImage || user.image || '/assets/images/defaultUser.png'}
          alt="User Image"
          width={192}
          height={192}
          className="h-full w-full cursor-default rounded-full object-cover"
        />
        {editMode && (
          <div className="pc:bottom-[105px] absolute bottom-[95px] mb-[16px] flex h-[120px] w-[120px] items-center justify-center rounded-full bg-black opacity-20 hover:opacity-55">
            <Image
              src="/assets/images/camera_lg.png"
              alt="수정 아이콘"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        )}
        <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
      </div>

      {editMode ? (
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mb-[16px] rounded px-4 py-2"
        />
      ) : (
        <span className="pc:mb-[24px] mb-[16px]">{user.nickname}</span>
      )}

      <div className="flex gap-4">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="text-pre-md font-weight-regular pc:font-weight-medium pc:text-pre-xl pc:h-[48px] pc:w-[100px] bg-line-100 h-[38px] w-[77px] cursor-pointer items-center justify-center rounded-[100px] text-blue-400 hover:bg-gray-200 hover:text-black"
            >
              저장
            </button>
            <button
              onClick={() => {
                notify({ type: 'info', message: '프로필 변경이 취소되었습니다!' });
                handleCancel();
              }}
              className="text-pre-md font-weight-regular pc:font-weight-medium pc:text-pre-xl pc:h-[48px] pc:w-[100px] bg-line-100 h-[38px] w-[77px] cursor-pointer items-center justify-center rounded-[100px] text-blue-400 hover:bg-gray-200 hover:text-black"
            >
              취소
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setEditMode(true);
              setNickname(user.nickname);
            }}
            className="text-pre-md font-weight-regular pc:font-weight-medium pc:text-pre-xl pc:h-[48px] pc:w-[100px] bg-line-100 h-[38px] w-[77px] cursor-pointer items-center justify-center rounded-[100px] text-blue-400 hover:bg-gray-200 hover:text-black"
          >
            수정하기
          </button>
        )}
        <button
          onClick={() => signOut()}
          className="text-pre-md font-weight-regular pc:font-weight-medium pc:text-pre-xl pc:h-[48px] pc:w-[100px] bg-line-100 h-[38px] w-[77px] cursor-pointer items-center justify-center rounded-[100px] text-blue-400 hover:bg-gray-200 hover:text-black"
        >
          로그아웃
        </button>
      </div>
    </section>
  );
}
