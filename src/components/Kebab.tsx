'use client';

interface KebabProps {
  label1: string;
  label2: string;
  onCLick1: () => void;
  onClick2: () => void;
}

export default function Kebab({ label1, label2, onCLick1, onClick2 }: KebabProps) {
  return (
    <div className="bg-bg-100 pc:h-[112px] pc:w-[134px] pc:top-[44px] absolute top-[31px] right-0 z-1 flex h-[80px] w-[97px] flex-col overflow-hidden rounded-[16px] border border-blue-300">
      <div
        className="hover:bg-sub-gray-2 text-pre-md font-regular text-black-600 pc:text-pre-xl flex flex-1 cursor-pointer items-center justify-center"
        onClick={() => onCLick1()}
      >
        {label1}
      </div>
      <div
        className="hover:bg-sub-gray-2 text-pre-md font-regular text-black-600 pc:text-pre-xl flex flex-1 cursor-pointer items-center justify-center"
        onClick={() => onClick2()}
      >
        {label2}
      </div>
    </div>
  );
}
