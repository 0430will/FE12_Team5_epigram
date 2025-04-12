export default function SkeletonMyProfile() {
  return (
    <section className="pc:mb-[96px] mb-[56px] flex flex-col items-center">
      <div className="mb-[16px] h-[120px] w-[120px] animate-pulse rounded-full bg-blue-300">
        <div className="h-full w-full animate-pulse rounded-full"></div>
      </div>
      <div className="pc:mb-[24px] mb-[16px] h-[24px] w-[80px] animate-pulse rounded-full bg-blue-300"></div>
      <div className="flex gap-4">
        <div className="pc:h-[48px] pc:w-[100px] h-[38px] w-[77px] animate-pulse items-center justify-center rounded-[100px] bg-blue-300"></div>
        <div className="pc:h-[48px] pc:w-[100px] h-[38px] w-[77px] animate-pulse items-center justify-center rounded-[100px] bg-blue-300"></div>
      </div>
    </section>
  );
}
