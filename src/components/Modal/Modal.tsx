import { ReactNode } from 'react';
import Image from 'next/image';
import ModalHeader from './ModalHeader';
import ModalButtons from './ModalButtons';
import ModalContent from './ModalContent';

interface ModalProps {
  type: 'confirm' | 'alert' | 'content';
  title?: string;
  description?: string;
  children?: ReactNode;
}

const Modal = ({ type, title, description, children }: ModalProps) => {
  const containerStyle =
    type === 'content'
      ? 'pc:px-[32px] pc:pb-[32px] pc:pt-[52px] px-[24px] pb-[24px] pt-[44px] bg-bg-100'
      : 'pc:py-[40px] tablet:px-[38px] tablet:py-[32px] px-[16px] py-[24px] bg-white';

  return (
    <div className="fixed top-[0px] left-[0px] z-999 flex h-full w-full items-center justify-center bg-[#00000099] p-5">
      <div
        className={`pc:max-w-[452px] tablet:max-w-[372px] relative flex w-full max-w-[320px] flex-col items-center rounded-3xl ${containerStyle}`}
      >
        {type === 'confirm' && (
          <>
            <Image
              className="pc:w-[56px] pc:h-[56px] mb-[16px]"
              src="/assets/icons/warning.svg"
              width={44}
              height={44}
              alt="경고 이미지"
            />
            <ModalHeader type={type} title={title} description={description} />
            <ModalButtons type="confirm" />
          </>
        )}

        {type === 'alert' && (
          <>
            <ModalHeader type={type} title={title} />
            <ModalButtons type="alert" />
          </>
        )}

        {type === 'content' && (
          <>
            <button className="absolute top-[16px] right-[24px] cursor-pointer">
              <Image src="/assets/icons/close.svg" width={20} height={20} alt="닫기 이미지" />
            </button>
            <ModalContent>{children}</ModalContent>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
