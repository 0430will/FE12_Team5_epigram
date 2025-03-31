import Image from 'next/image';
import ClientButton from '../Button/ClientButton';

export default function TopScrollButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ClientButton
      isValid
      className="pc:right-[120px] tablet:right-[72px] fixed right-[24px] bottom-[50px] h-[48px] w-[48px] bg-blue-900 shadow-md hover:bg-blue-950"
      isRounded
      onClick={handleClick}
    >
      <Image src="/assets/icons/top.svg" alt="화살표 아이콘" width={16} height={8} />
    </ClientButton>
  );
}
