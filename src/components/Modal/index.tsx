'use client';

import { useState, useImperativeHandle, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import ModalLayout, { ModalProps } from './ModalLayout';

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
  }));

  if (!isOpen) return null;

  return createPortal(<ModalLayout {...props} onClose={() => setIsOpen(false)} />, document.body);
});

Modal.displayName = 'Modal';

export { Modal };
