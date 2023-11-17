import { useState } from "react";
import HoldButton from "./HoldButton";

const SizeChanger = ({ value, onChange, title = "", min = 0 }) => {
  const [localSize, setLocalSize] = useState(value);

  const handleSizeChange = (amount) => {
    const newValue = Math.max(parseInt(localSize, 10) + amount, min);
    onChange(newValue);
    setLocalSize(newValue);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setLocalSize(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "e" || e.key === "-" || e.key === "+" || e.key === ".") {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full flex justify-between items-center relative border-b-[1px] border-[#E0E0E0] py-[19px]">
      <p>{title}</p>
      <div className="flex gap-[20px] flex-row">
        <HoldButton onHold={() => handleSizeChange(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4.16663 10H15.8333"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </HoldButton>
        <input
          onKeyDown={handleKeyDown}
          type="number"
          value={localSize}
          onChange={handleInputChange}
          min={min}
          className="number-input w-[100px] h-[40px] border-[1px] border-[#E0E0E0] rounded-[4px] outline-none text-[16px] px-[10px] py-[10px] text-center bg-white"
        />
        <HoldButton onHold={() => handleSizeChange(1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M9.99996 4.16663V15.8333M4.16663 9.99996H15.8333"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </HoldButton>
      </div>
    </div>
  );
};

export default SizeChanger;
