export default function SkeletonMyCart() {
  return (
    <div className="pc:h-[264px] tablet:h-[230px] flex h-full w-full animate-pulse items-center justify-between rounded-lg bg-blue-200 p-[30px]">
      <div className="flex w-full flex-col items-center">
        <div className="pc:w-[170px] pc:h-[170px] h-[110px] w-[110px] rounded-full bg-blue-300"></div>
      </div>
      <div className="flex h-full w-full flex-col justify-center gap-[8px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center justify-center gap-2">
            <div className="pc:w-[24px] pc:h-[24px] h-[16px] w-[16px] rounded-full bg-blue-300"></div>
            <div className="pc:w-[42px] pc:h-[24px] h-[16px] w-[25px] rounded-md bg-blue-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
