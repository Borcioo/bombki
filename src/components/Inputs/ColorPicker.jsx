import { useRef } from "react";
const ColorPicker = ({ onChange, value }) => {
  const inputRef = useRef();

  const handleButtonClickStroke = () => {
    inputRef.current.click();
  };

  return (
    <button
      onClick={handleButtonClickStroke}
      className="w-full flex justify-between items-center relative  border-b-[1px] border-[#E0E0E0] py-[19px]"
    >
      <div className="flex flex-row gap-[14px] justify-center items-center">
        <input
          className="min-w-[36px] min-h-[36px] bg-[#E0E0E0] rounded-[3px] webkit-appearance-none appearance-none border border-gray-400 border-1"
          type="color"
          value={value}
          onChange={onChange}
          ref={inputRef}
        />
        <p>{value.toUpperCase()}</p>
      </div>
      <div className="px-[6px] py-[6px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M14.9999 8.33332L11.6666 4.99999M2.08325 17.9167L4.90356 17.6033C5.24813 17.565 5.42042 17.5459 5.58146 17.4937C5.72433 17.4475 5.86029 17.3821 5.98566 17.2995C6.12696 17.2063 6.24954 17.0837 6.49469 16.8386L17.4999 5.83332C18.4204 4.91285 18.4204 3.42046 17.4999 2.49999C16.5795 1.57951 15.0871 1.57951 14.1666 2.49999L3.16136 13.5052C2.91621 13.7504 2.79363 13.8729 2.70045 14.0142C2.61778 14.1396 2.55243 14.2756 2.50618 14.4185C2.45405 14.5795 2.43491 14.7518 2.39662 15.0964L2.08325 17.9167Z"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
};

export default ColorPicker;
