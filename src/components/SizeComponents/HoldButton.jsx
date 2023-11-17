import { useState, useEffect } from "react";

const HoldButton = ({ onHold, children }) => {
  const [holding, setHolding] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    let interval;
    if (holding) {
      interval = setInterval(onHold, 100);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [holding, onHold, timer]);

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
      onClick={onHold}
    >
      {children}
    </button>
  );
};

export default HoldButton;
