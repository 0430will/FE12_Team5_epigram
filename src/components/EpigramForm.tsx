'use client';

import { TagsInputWithList } from '@/components/TagsInputWithList';
import { PatchEpigram, PostEpigram } from '@/lib/Epigram';
import { EpigramTag } from '@/types/Epigram';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export interface AddEpigram {
  tags: EpigramTag[];
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  authorSelected: string;
}

interface EpigramData extends AddEpigram {
  id: number;
}

export default function EpigramForm({
  initialValue,
  submitType,
}: {
  initialValue?: EpigramData;
  submitType: '작성하기' | '수정하기';
}) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
  } = useForm<AddEpigram>({
    mode: 'onChange',
    defaultValues: {
      tags: initialValue?.tags || [],
      referenceUrl: initialValue?.referenceUrl || '',
      referenceTitle: initialValue?.referenceTitle || '',
      author: initialValue?.author || '',
      content: initialValue?.content || '',
      authorSelected: initialValue?.authorSelected || '직접 입력',
    },
  });

  const { data: session, status } = useSession();
  const router = useRouter();
  const token = status === 'authenticated' ? session?.user.accessToken : null;

  const selectedOption = watch('authorSelected');
  const author = watch('author');
  const content = watch('content');
  const maxLength = 500;

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length <= maxLength) {
      setValue('content', value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const SubmitPostForm = async () => {
    if (!token) return;
    const allValues = watch();
    const response = await PostEpigram(allValues, token);
    if (!response) return;
    router.push(`/feed/${response.id}`);
  };

  const SubmitPatchForm = async () => {
    if (!initialValue?.id || !token) return;
    const allValues = watch();
    const response = await PatchEpigram(allValues, initialValue.id, token);
    if (!response) return;
    router.push(`/feed/${response.id}`);
  };

  const SelectForm = submitType === '작성하기' ? SubmitPostForm : SubmitPatchForm;

  useEffect(() => {
    if (selectedOption === '알 수 없음' || selectedOption === '본인') {
      setValue('author', selectedOption);
    } else {
      setValue('author', initialValue?.author || '');
    }
  }, [selectedOption, setValue]);

  return (
    <div className="tablet:max-w-[384px] pc:max-w-[640px] tablet:gap-[32px] pc:gap-[40px] flex w-full flex-col gap-[24px]">
      <h1 className="text-pre-lg text-black-700 tablet:text-pre-xl pc:text-pre-2xl font-semibold">
        에피그램 {submitType === '작성하기' ? '만들기' : '수정'}
      </h1>
      <form
        onSubmit={handleSubmit(SelectForm)}
        onKeyDown={handleKeyDown}
        className="pc:gap-[40px] flex flex-col gap-[24px]"
      >
        <div className="pc:gap-[54px] flex flex-col gap-[40px]">
          <div className="pc:gap-[24px] flex flex-col gap-[8px]">
            <div className="flex justify-between">
              <div className="flex gap-[4px]">
                <label
                  htmlFor="content"
                  className="text-pre-md text-black-600 tablet:text-pre-lg pc:text-pre-xl font-semibold"
                >
                  내용
                </label>
                <div className="relative">
                  <span className="text-pre-lg text-state-error tablet:text-pre-lg pc:text-pre-xl absolute top-[2px] font-medium">
                    *
                  </span>
                </div>
              </div>
              <span className="text-pre-md tablet:text-pre-lg font-regular flex items-center text-blue-400">
                {content.length} / {maxLength}자
              </span>
            </div>
            <textarea
              id="content"
              className="text-pre-lg font-regular text-black-950 pc:text-pre-xl custom-scrollbar pc:h-[148px] h-[132px] w-full resize-none rounded-[12px] border border-blue-300 px-[16px] py-[10px] placeholder:text-blue-400 focus:outline-blue-600"
              placeholder="500자 이내로 입력해주세요."
              {...register('content', { required: '내용을 입력해주세요' })}
              value={content}
              onChange={handleInputChange}
            />
          </div>
          <div className="pc:gap-[16px] flex flex-col gap-[8px]">
            <div className="flex gap-[4px]">
              <label
                htmlFor="author"
                className="text-pre-md text-black-600 tablet:text-pre-lg pc:text-pre-xl font-semibold"
              >
                저자
              </label>
              <div className="relative">
                <span className="text-pre-lg text-state-error absolute top-[2px] font-medium">*</span>
              </div>
            </div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex gap-[16px]">
                <label htmlFor="직접 입력" className="relative flex cursor-pointer items-center gap-[8px]">
                  <input
                    id="직접 입력"
                    type="radio"
                    value="직접 입력"
                    className="peer hidden"
                    {...register('authorSelected')}
                    defaultChecked
                  />
                  <div className="pc:h-[24px] pc:w-[24px] pc:peer-checked:border-5 h-5 w-5 rounded-full border-2 border-blue-300 bg-transparent peer-checked:border-4 peer-checked:border-blue-100 peer-checked:bg-blue-800 peer-checked:shadow-[0_0_0_2px_#CBD3E1]"></div>
                  <span className="text-pre-lg text-black-600 pc:text-pre-xl font-medium">직접 입력</span>
                </label>
                <label htmlFor="알 수 없음" className="relative flex cursor-pointer items-center gap-[8px]">
                  <input
                    id="알 수 없음"
                    type="radio"
                    value="알 수 없음"
                    className="peer hidden"
                    {...register('authorSelected')}
                  />
                  <div className="pc:h-[24px] pc:w-[24px] pc:peer-checked:border-5 h-5 w-5 rounded-full border-2 border-blue-300 bg-transparent peer-checked:border-4 peer-checked:border-blue-100 peer-checked:bg-blue-800 peer-checked:shadow-[0_0_0_2px_#CBD3E1]"></div>
                  <span className="text-pre-lg text-black-600 pc:text-pre-xl font-medium">알 수 없음</span>
                </label>
                <label htmlFor="본인" className="relative flex cursor-pointer items-center gap-[8px]">
                  <input id="본인" type="radio" value="본인" className="peer hidden" {...register('authorSelected')} />
                  <div className="pc:h-[24px] pc:w-[24px] pc:peer-checked:border-5 h-5 w-5 rounded-full border-2 border-blue-300 bg-transparent peer-checked:border-4 peer-checked:border-blue-100 peer-checked:bg-blue-800 peer-checked:shadow-[0_0_0_2px_#CBD3E1]"></div>
                  <span className="text-pre-lg text-black-600 pc:text-pre-xl font-medium">본인</span>
                </label>
              </div>
              <input
                id="author"
                className={`text-pre-lg font-regular pc:text-pre-xl pc:h-[64px] h-[44px] rounded-[12px] border border-blue-300 px-[16px] placeholder:text-blue-400 focus:outline-blue-600 ${selectedOption !== '직접 입력' ? 'bg-blue-200 text-blue-400' : 'text-black-950'}`}
                placeholder="저자 이름 입력"
                value={author}
                disabled={selectedOption !== '직접 입력'}
                {...register('author', { required: '저자를 입력해주세요' })}
              />
            </div>
          </div>
          <div className="pc:gap-[16px] flex flex-col gap-[8px]">
            <label
              htmlFor="referenceTitle"
              className="text-pre-md text-black-600 tablet:text-pre-lg pc:text-pre-xl font-semibold"
            >
              출처
            </label>
            <input
              id="referenceTitle"
              className="text-pre-lg font-regular text-black-950 pc:text-pre-xl pc:h-[64px] h-[44px] rounded-[12px] border border-blue-300 px-[16px] placeholder:text-blue-400 focus:outline-blue-600"
              placeholder="출저 제목 입력"
              {...register('referenceTitle')}
            />
            <input
              id="referenceUrl"
              className="text-pre-lg font-regular text-black-950 pc:text-pre-xl pc:h-[64px] h-[44px] rounded-[12px] border border-blue-300 px-[16px] placeholder:text-blue-400 focus:outline-blue-600"
              placeholder="URL (ex. https://www.website.com)"
              {...register('referenceUrl')}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="tags"
              className="text-pre-md text-black-600 tablet:text-pre-lg pc:text-pre-xl font-semibold"
            >
              태그
            </label>
            <TagsInputWithList tags={watch('tags')} setTags={(newTags) => setValue('tags', newTags)} />
          </div>
        </div>
        <button
          className={`text-pre-lg pc:text-pre-xl pc:py-[16px] rounded-[12px] px-[16px] py-[9px] font-semibold text-blue-100 ${isValid ? `bg-black-500 cursor-pointer` : `bg-blue-300`}`}
          type="submit"
          disabled={!isValid}
        >
          {submitType === '작성하기' ? '작성 완료' : '수정 완료'}
        </button>
      </form>
    </div>
  );
}
