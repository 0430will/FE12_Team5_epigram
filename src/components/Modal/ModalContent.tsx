import { ReactNode } from 'react';

interface ModalContentProps {
  children: ReactNode;
}

const ModalContent = ({ children }: ModalContentProps) => {
  return <div>{children}</div>;
};

export default ModalContent;
