export function TabMenu({
  menuArr,
  currentTab,
  selectMenuHandler,
}: {
  menuArr: { name: string; content: React.ReactNode }[];
  currentTab: number;
  selectMenuHandler: (index: number) => void;
}) {
  return (
    <ul className="pc:pb-[48px] tablet:pb-[32px] flex gap-[16px] pb-[24px]">
      {menuArr.map((el, index) => (
        <li
          key={index}
          className={`cursor-pointer ${
            index === currentTab ? 'text-black-600 font-semibold' : 'font-medium text-gray-300'
          }`}
          onClick={() => selectMenuHandler(index)}
        >
          {el.name}
        </li>
      ))}
    </ul>
  );
}

export function TabPanel({ content }: { content: React.ReactNode }) {
  return <div>{content}</div>;
}
