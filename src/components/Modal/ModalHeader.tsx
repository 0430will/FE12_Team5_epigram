interface ModalHeaderProps {
  type: 'alert' | 'confirm' | 'content';
  title?: string;
  description?: string;
}

const ModalHeader = ({ type, title, description }: ModalHeaderProps) => {
  const titleMargin = type === 'confirm' ? 'pc:mb-[16px] mb-[8px]' : 'pc:mb-[48px] tablet:mb-[36px] mb-[24px]';

  return (
    <>
      {title && <strong className={`pc:text-pre-2xl tablet:text-pre-xl text-black-700 ${titleMargin}`}>{title}</strong>}
      {description && (
        <p className="pc:mb-[40px] pc:text-pre-2lg tablet:mb-[36px] tablet:text-pre-lg text-pre-md mb-[24px] block text-gray-400">
          {description}
        </p>
      )}
    </>
  );
};

export default ModalHeader;
