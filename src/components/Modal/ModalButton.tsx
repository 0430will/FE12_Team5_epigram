interface ModalButtonProps {
  type: 'confirm' | 'alert' | 'content';
  actionLabel?: string;
  onClose?: () => void;
  onAction?: () => void;
}

const ModalButton = ({ type, actionLabel, onClose, onAction }: ModalButtonProps) => {
  const basicButtonStyle = 'pc:text-pre-xl flex-1 rounded-xl py-[12px] cursor-pointer';
  const darkButtonStyle = 'bg-blue-900 text-white font-semibold';
  const lightButtonStyle = 'bg-blue-200 text-black-700';

  const buttonStyle = type === 'confirm' ? lightButtonStyle : darkButtonStyle;

  const buttonText = type === 'confirm' ? '취소' : '확인';

  return (
    <div className="pc:gap-[16px] flex w-full gap-[8px]">
      <button onClick={onClose} className={`${basicButtonStyle} ${buttonStyle}`}>
        {buttonText}
      </button>
      {type === 'confirm' && onAction && actionLabel && (
        <button onClick={onAction} className={`${basicButtonStyle} ${darkButtonStyle}`}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default ModalButton;
