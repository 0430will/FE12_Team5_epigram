export default function TodayEmotionHeader() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;
  console.log(formattedDate);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[22px]">
      <div className="flex w-full items-center justify-between">
        <p className="text-pre-lg pc:text-pre-2xl font-semibold">오늘의 감정</p>
        <p className="text-pre-lg font-regular pc:text-mon-sm text-blue-400">{formattedDate}</p>
      </div>
    </div>
  );
}
