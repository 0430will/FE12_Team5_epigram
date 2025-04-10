export default function SkeletonCommentCard({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="border-line-200 tablet:py-6 pc:py-[35px] flex cursor-pointer items-start border-t bg-blue-200 px-6 py-4">
            <div className="pc:w-14 pc:h-14 mr-4 h-12 w-12 rounded-full bg-blue-300"></div>
            <div className="flex-1">
              <div className="tablet:mb-3 pc:mb-4 mb-2 flex gap-2">
                <div className="pc:h-[26px] h-[20px] w-[100px] rounded-md bg-blue-300"></div>
                <div className="pc:h-[26px] h-[20px] w-[40px] rounded-md bg-blue-300"></div>
              </div>
              <div className="pc:h-[60px] h-[45px] w-full rounded-md bg-blue-300"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
