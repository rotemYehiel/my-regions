import React, { useEffect, useRef, useState } from "react";
import { STROKE_WIDTH } from "../constants/canvas";
import { CanvasWrapper } from "./Canvas.style";

const Canvas = ({ containerWidth, containerHeight }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const startX = useRef(null);
  const startY = useRef(null);
  const endX = useRef(null);
  const endY = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    const context = canvas.getContext("2d");
    contextRef.current = context;
  }, [containerWidth, containerHeight]);

  const startDrawingRectangle = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    startX.current = offsetX;
    startY.current = offsetY;

    setIsDrawing(true);
  };

  const drawRectangle = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;

    endX.current = offsetX;
    endY.current = offsetY;
  };

  const stopDrawingRectangle = () => {
    const ctx = contextRef.current;

    if (!isDrawing) return;
    setIsDrawing(false);

    // beacuse i need to create only one region in each call
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw rectangle
    let width = endX.current - startX.current;
    let height = endY.current - startY.current;

    let cords = [startX.current, startY.current, width, height];

    ctx.beginPath();
    ctx.rect(...cords);
    ctx.strokeStyle = "red";
    ctx.lineWidth = STROKE_WIDTH;
    ctx.stroke();
  };

  return (
    <CanvasWrapper className="canvas wrapper">
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={startDrawingRectangle}
        onMouseMove={drawRectangle}
        onMouseUp={stopDrawingRectangle}
        onMouseLeave={stopDrawingRectangle}
      />
    </CanvasWrapper>
  );
};

export default Canvas;
