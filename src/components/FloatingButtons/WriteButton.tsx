import Image from 'next/image';
import ServerButton from '../Button/ServerButton';

export default function WriteButton() {
  return (
    <ServerButton
      className="pc:right-[120px] tablet:right-[72px] fixed right-[24px] bottom-[104px] flex! gap-[4px] bg-blue-900 pr-[18px] pl-[14px] shadow-md hover:bg-blue-950"
      isValid
      href={'/addepigram'}
      isRounded
    >
      <Image src="/assets/icons/add.svg" alt="플러스 아이콘" width={24} height={24} />
      에피그램 만들기
    </ServerButton>
  );
}
