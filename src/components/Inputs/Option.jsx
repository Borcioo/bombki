export const Option = ({ onClick, option }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row justify-start px-[24px] py-[14px] items-center gap-[12px] w-full z-[100] hover:bg-[rgba(0,0,0,0.1)]"
    >
      <span>{option.name}</span>
    </button>
  );
};
