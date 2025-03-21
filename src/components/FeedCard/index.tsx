import { Epigram } from '@/types/Epigram';
import Link from 'next/link';

interface FeedCardProps {
  data: Epigram;
}

export default function FeedCard({ data }: FeedCardProps) {
  return (
    <>
      <div className="pc:text-iro-2xl tablet:text-iro-lg text-iro-md font-medium">
        <Link href={`/feed/${data.id}`}>
          <div className="pc:min-h-[231px] tablet:min-h-[147px] tablet:px-[24px] tablet:py-[23px] flex min-h-[131px] flex-col justify-between gap-[5px] rounded-[16px] bg-blue-100 bg-[repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_24px,#F2F2F2_24px,#F2F2F2_25px)] px-[16px] py-[15px] shadow-xs">
            <p className="pc:leading-[36px] pc:line-clamp-4 font-iropke text-black-600 line-clamp-3 text-left leading-[24px]">
              {data.content}
            </p>
            <cite className="pc:leading-[36px] font-iropke line-clamp-1 text-right leading-[24px] text-blue-400 not-italic">
              -{data.author}-
            </cite>
          </div>
          <ul className="tablet:line-clamp-1 font-iropke mt-[8px] line-clamp-2 text-right text-blue-400">
            {data.tags.map((tag) => (
              <li key={tag.id} className="ml-[8px] inline-block">
                #{tag.name}
              </li>
            ))}
          </ul>
        </Link>
      </div>
    </>
  );
}
