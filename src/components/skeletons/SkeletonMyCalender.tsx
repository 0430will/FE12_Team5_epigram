export default function SkeletonMyCalender() {
  return (
    <div className="flex w-full animate-pulse justify-center">
      <div className="pc:p-[16px] tablet:p-[10px] pc:w-full pc:h-[546px] tablet:w-[379px] tablet:h-[324px] grid h-[264px] w-[308px] gap-2 rounded-lg bg-blue-200 p-[8px]">
        <div className="pc:gap-3 grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="aspect-square rounded-full bg-blue-300"></div>
          ))}
        </div>
        <div className="pc:gap-3 grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, index) => {
            const isEmpty = index < 4 || index > 31;
            return (
              <div key={index} className={`aspect-square rounded-md ${isEmpty ? 'bg-transparent' : 'bg-blue-300'}`} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
