import { useRef, useEffect } from "react";

export const TestCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {}, []);
  return (
    <div>
      <canvas ref={canvasRef} className="w-32 h-32" />
    </div>
  );
};
