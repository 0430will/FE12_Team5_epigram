'use client';

import { PropsWithChildren } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalButtons from './ModalButton';

export interface ModalProps {
  type: 'confirm' | 'alert' | 'content';
  title?: string;
  description?: string;
  children?: React.ReactNode;
  actionLabel?: string;
  onClose?: () => void;
  onAction?: () => void;
}

const overlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const container = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1 },
};

const ModalLayout = ({
  type,
  title,
  description,
  children,
  actionLabel,
  onClose,
  onAction,
}: ModalProps & PropsWithChildren) => {
  const containerStyle =
    type === 'content'
      ? 'pc:px-[32px] pc:pb-[32px] pc:pt-[52px] px-[24px] pb-[24px] pt-[44px] bg-bg-100'
      : 'pc:py-[40px] tablet:px-[38px] tablet:py-[32px] px-[16px] py-[24px] bg-white';

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      variants={overlay}
      initial="hidden"
      animate="show"
      onClick={handleBackgroundClick}
      className="fixed top-[0px] left-[0px] z-999 flex h-full w-full items-center justify-center bg-[#00000099] p-5"
    >
      <motion.div
        variants={container}
        className={`pc:max-w-[452px] tablet:max-w-[372px] relative flex w-full max-w-[320px] flex-col items-center rounded-3xl p-6 ${containerStyle}`}
      >
        {type === 'confirm' && (
          <>
            <Image
              className="pc:w-[56px] pc:h-[56px] tablet:mb-[24px] mb-[16px]"
              src="/assets/icons/warning.svg"
              width={44}
              height={44}
              alt="경고 이미지"
            />
            <ModalHeader type={type} title={title} description={description} />
            <ModalButtons type="confirm" onClose={onClose} actionLabel={actionLabel} onAction={onAction} />
          </>
        )}

        {type === 'alert' && (
          <>
            <ModalHeader type={type} title={title} />
            <ModalButtons type="alert" onClose={onClose} actionLabel={actionLabel} onAction={onAction} />
          </>
        )}

        {type === 'content' && (
          <>
            <button className="absolute top-[16px] right-[24px] cursor-pointer" onClick={onClose}>
              <Image src="/assets/icons/close.svg" width={20} height={20} alt="닫기 이미지" />
            </button>
            <ModalContent>{children}</ModalContent>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ModalLayout;
