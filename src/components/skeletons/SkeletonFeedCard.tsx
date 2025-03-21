export default function SkeletonFeedCard({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="pc:min-h-[231px] tablet:min-h-[147px] tablet:px-[24px] tablet:py-[23px] flex min-h-[131px] flex-col justify-between gap-[5px] rounded-[16px] bg-blue-200 px-[16px] py-[15px] shadow-xs">
            <div className="pc:h-[144px] h-[72px] rounded-md bg-blue-300"></div>
            <div className="pc:h-[36px] ml-auto h-[24px] w-5/7 rounded-md bg-blue-300"></div>
          </div>
          <div className="mt-[8px] ml-auto flex justify-end gap-[8px]">
            <div className="pc:h-[36px] h-[24px] w-1/5 rounded-md bg-blue-300"></div>
            <div className="pc:h-[36px] h-[24px] w-1/6 rounded-md bg-blue-300"></div>
            <div className="pc:h-[36px] h-[24px] w-1/7 rounded-md bg-blue-300"></div>
          </div>
        </div>
      ))}
    </>
  );
}
