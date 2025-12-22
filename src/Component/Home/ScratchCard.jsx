import { useEffect, useRef, useState } from "react";

const ScratchCard = ({
  width = 300,
  height = 200,
  coverColor = "#999",
  brushSize = 25,
  revealPercent = 50,
  onComplete,
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawing = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    // Cover layer
    ctx.fillStyle = coverColor;
    ctx.fillRect(0, 0, width, height);

    // Erase mode
    ctx.globalCompositeOperation = "destination-out";
  }, [width, height, coverColor]);

  const getXY = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: x - rect.left,
      y: y - rect.top,
    };
  };

  const scratch = (x, y) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleStart = (e) => {
    isDrawing.current = true;
    const { x, y } = getXY(e);
    scratch(x, y);
  };

  const handleMove = (e) => {
    if (!isDrawing.current || revealed) return;
    e.preventDefault();
    const { x, y } = getXY(e);
    scratch(x, y);
  };

  const handleEnd = () => {
    isDrawing.current = false;
    checkReveal();
  };

  const checkReveal = () => {
    const ctx = ctxRef.current;
    const imageData = ctx.getImageData(0, 0, width, height);
    let cleared = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++;
    }

    const percent = (cleared / (width * height)) * 100;

    if (percent >= revealPercent) {
      setRevealed(true);
      onComplete && onComplete();
    }
  };

  return (
    <div style={{ position: "relative", width, height }}>
      {/* Hidden Content */}
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: "bold",
          background: "#fff",
        }}
      >
        🎉 You Won ₹100 🎉
      </div>

      {!revealed && (
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      )}
    </div>
  );
};

export default ScratchCard;
