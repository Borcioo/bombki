import { cn } from "lib/utils";
import { useState, useEffect } from "react";

export const MoveButton = ({ name, onClick, className }) => {
  const [holding, setHolding] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    let interval;
    if (holding) {
      interval = setInterval(onClick, 100);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [holding, onClick, timer]);

  const handleMouseDown = () => {
    setTimer(setTimeout(() => setHolding(true), 200));
  };

  const handleMouseUp = () => {
    clearTimeout(timer);
    setHolding(false);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className={cn(
        "bg-[#FCFDFF] rounded-[5px] text-center py-4 border-[1px] border-[#E0E0E0]",
        "hover:bg-[#2ca3f2] hover:border-[#fff] hover:text-[#fff] focus:bg-[#2ca3f2] focus:border-[#fff] focus:text-[#fff] active:bg-[#2ca3f2] active:border-[#fff] active:text-[#fff]",
        className
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
