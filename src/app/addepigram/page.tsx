'use client';

import { PostEpigram } from '@/lib/Epigram';
import { ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export interface AddEpigram {
  tags: string[];
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  authorSelected: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
  } = useForm<AddEpigram>({
    mode: 'onChange',
    defaultValues: {
      tags: [],
      referenceUrl: '',
      referenceTitle: '',
      author: '',
      content: '',
      authorSelected: '직접 입력',
    },
  });

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

  const SubmitForm = async () => {
    const allValues = watch();
    const response = await PostEpigram(allValues);
    if (!response) return;
    console.log('폼 제출');
  };

  useEffect(() => {
    if (selectedOption === '알 수 없음' || selectedOption === '본인') {
      setValue('author', selectedOption);
    } else {
      setValue('author', '');
    }
  }, [selectedOption, setValue]);

  return (
    <div className="flex flex-col gap-[24px]">
      <h1 className="text-pre-lg text-black-700 font-semibold">에피그램 만들기</h1>
      <form onSubmit={handleSubmit(SubmitForm)} className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[4px]">
              <label htmlFor="content" className="text-pre-md text-black-600 font-semibold">
                내용
              </label>
              <div className="relative">
                <span className="text-pre-lg text-state-error absolute top-[2px] font-medium">*</span>
              </div>
            </div>
            <textarea
              id="content"
              className="text-pre-lg font-regular text-black-950 pc:text-pre-xl h-[132px] resize-none rounded-[12px] border border-blue-300 px-[16px] py-[10px] placeholder:text-blue-400 focus:outline-blue-600"
              placeholder="500자 이내로 입력해주세요."
              {...register('content', { required: '내용을 입력해주세요' })}
              value={content}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="author" className="text-pre-md text-black-600 font-semibold">
              저자
            </label>
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
                  <div className="h-5 w-5 rounded-full border-2 border-blue-300 bg-transparent peer-checked:border-4 peer-checked:border-blue-100 peer-checked:bg-blue-800 peer-checked:shadow-[0_0_0_2px_#CBD3E1]"></div>
                  <span className="text-pre-lg text-black-600 font-medium">직접 입력</span>
                </label>
                <label htmlFor="알 수 없음" className="relative flex cursor-pointer items-center gap-[8px]">
                  <input
                    id="알 수 없음"
                    type="radio"
                    value="알 수 없음"
                    className="peer hidden"
                    {...register('authorSelected')}
                  />
                  <div className="h-5 w-5 rounded-full border-2 border-blue-300 bg-transparent peer-checked:border-4 peer-checked:border-blue-100 peer-checked:bg-blue-800 peer-checked:shadow-[0_0_0_2px_#CBD3E1]"></div>
                  <span className="text-pre-lg text-black-600 font-medium">알 수 없음</span>
                </label>
                <label htmlFor="본인" className="relative flex cursor-pointer items-center gap-[8px]">
                  <input id="본인" type="radio" value="본인" className="peer hidden" {...register('authorSelected')} />
                  <div className="h-5 w-5 rounded-full border-2 border-blue-300 bg-transparent peer-checked:border-4 peer-checked:border-blue-100 peer-checked:bg-blue-800 peer-checked:shadow-[0_0_0_2px_#CBD3E1]"></div>
                  <span className="text-pre-lg text-black-600 font-medium">본인</span>
                </label>
              </div>
              <input
                id="author"
                className="text-pre-lg font-regular text-black-950 pc:text-pre-xl h-[44px] rounded-[12px] border border-blue-300 px-[16px] placeholder:text-blue-400 focus:outline-blue-600"
                placeholder="저자 이름 입력"
                value={author}
                disabled={selectedOption !== '직접 입력'}
                {...register('author', { required: '저자를 입력해주세요' })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="referenceTitle" className="text-pre-md text-black-600 font-semibold">
              출처
            </label>
            <input
              id="referenceTitle"
              className="text-pre-lg font-regular text-black-950 pc:text-pre-xl h-[44px] rounded-[12px] border border-blue-300 px-[16px] placeholder:text-blue-400 focus:outline-blue-600"
              placeholder="출저 제목 입력"
              {...register('referenceTitle', { required: '출처를 입력해주세요' })}
            />
            <input
              id="referenceUrl"
              className="text-pre-lg font-regular text-black-950 pc:text-pre-xl h-[44px] rounded-[12px] border border-blue-300 px-[16px] placeholder:text-blue-400 focus:outline-blue-600"
              placeholder="URL (ex. https://www.website.com)"
              {...register('referenceUrl', { required: 'URL을 입력해주세요' })}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="tags" className="text-pre-md text-black-600 font-semibold">
              태그
            </label>
            <input
              id="tags"
              className="text-pre-lg font-regular text-black-950 pc:text-pre-xl h-[44px] rounded-[12px] border border-blue-300 px-[16px] placeholder:text-blue-400 focus:outline-blue-600"
              placeholder="입력하여 태그 작성 (최대 10자)"
              {...register('tags', { required: '태그를 입력해주세요' })}
            />
          </div>
        </div>
        <button
          className={`text-pre-lg pc:text-pre-xl pc:py-[16px] rounded-[12px] px-[16px] py-[9px] font-semibold text-blue-100 ${isValid ? `bg-black-500 cursor-pointer` : `bg-blue-300`}`}
          type="submit"
          disabled={!isValid}
        >
          작성완료
        </button>
      </form>
    </div>
  );
}
