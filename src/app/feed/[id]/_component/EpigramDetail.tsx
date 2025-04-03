import ServerButton from '@/components/Button/ServerButton';
import type { EpigramDetail } from '@/types/Epigram';
import Image from 'next/image';
// @ts-expect-error : 타입스크립트가 notFound를 오류로 인식합니다. 작동은 잘 됩니다.
import { notFound } from 'next/navigation';
import { GetEpigram } from '@/lib/Epigram';
import { auth } from '@/lib/next-auth/auth';
import EpigramLikedButton from './EpigramLikedButton';
import EpigramDetailKebab from './EpigramDetailKebab';

type PageParams = Promise<{ id: string }>;

export default async function EpigramDetail({ params }: { params: PageParams }) {
  const { id } = await params;
  const session = await auth();
  const token = session?.user.accessToken;
  const writerId = session?.user.id;

  if (isNaN(Number(id))) return notFound();
  if (!token || !writerId) return;

  const data: EpigramDetail = await GetEpigram(Number(id), token);
  if (!data) return <div>오류가 발생했습니다.</div>;

  return (
    <div>
      <div className="border-line-100 relative flex w-full items-center justify-center border-b-[1px] bg-blue-100 bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_24px,#F2F2F2_24px,#F2F2F2_25px)]">
        <div className="flex w-full flex-col gap-[32px] px-[24px] pt-[40px] pb-[16px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex w-full items-start justify-between">
              <div className="flex flex-wrap gap-[16px]">
                {data.tags.map((value) => (
                  <span className="text-pre-lg font-regular flex whitespace-nowrap text-blue-400" key={value.id}>
                    #{value.name}
                  </span>
                ))}
              </div>
              {Number(writerId) === data.writerId && <EpigramDetailKebab />}
            </div>
            <h1 className="text-iro-2xl text-black-700 font-iropke font-normal">{data.content}</h1>
            <p className="text-iro-lg font-regular font-iropke text-end text-blue-400">- {data.author} -</p>
          </div>
          <div className="flex items-center justify-center gap-[16px]">
            <EpigramLikedButton isLiked={data.isLiked} likeCount={data.likeCount} />
            <ServerButton
              isValid
              isRounded
              className="bg-line-100 inline-flex items-center justify-center gap-[5px] !px-[14px] !py-[6px] hover:bg-blue-200"
              href={data.referenceUrl}
            >
              <span className="font-regular text-pre-md text-gray-300">왕도로 가는길</span>
              <Image src="/assets/icons/link.svg" width={20} height={20} alt="출처" />
            </ServerButton>
          </div>
        </div>
      </div>
      <div className="h-[15px] w-full bg-[url('/assets/images/pattern.png')] bg-repeat drop-shadow-xl"></div>
    </div>
  );
}
