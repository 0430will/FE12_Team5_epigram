export function SkeletonCommentCard({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="border-line-200 tablet:py-6 pc:py-[35px] flex cursor-pointer items-start border-t px-6 py-4">
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

export function SkeletonCommentInput() {
  return (
    <div className="tablet:mb-8 pc:mb-10 bg-bg-100 tablet:px-0 pc:px-0 mb-3 flex animate-pulse items-start gap-4 rounded-md px-6 py-4">
      <div className="h-12 w-12 rounded-full bg-blue-300" />
      <div className="flex flex-1 flex-col gap-3">
        <div className="h-[88px] w-full rounded-md bg-blue-300" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 rounded-md bg-blue-300" />
            <div className="h-5 w-10 rounded-full bg-blue-300" />
          </div>
          <div className="tablet:h-[32px] tablet:w-[53px] pc:h-[44px] pc:w-[60px] h-[32px] w-[53px] rounded-md bg-blue-300" />
        </div>
      </div>
    </div>
  );
}
