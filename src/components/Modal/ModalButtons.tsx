interface ModalButtonsProps {
  type: 'confirm' | 'alert' | 'content';
  // onClose: () => void;
  // onConfirm?: () => void;
}

const ModalButtons = ({ type }: ModalButtonsProps) => {
  return (
    <div className="modal-buttons">
      <button>{type === 'confirm' ? '취소' : '확인'}</button>
      {/* {onConfirm && <button onClick={onConfirm}>확인</button>} */}
    </div>
  );
};

export default ModalButtons;
