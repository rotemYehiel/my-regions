import React, { memo, useEffect, useRef, useState } from "react";
import { STROKE_WIDTH } from "../../constants/canvas";
import { CanvasWrapper } from "./Canvas.style";
import {
  convertToCordsInPercentage,
  convertToCordsInPixel,
} from "../../functions/utils";

const Canvas = ({
  containerWidth,
  containerHeight,
  setRectanglePoints,
  isReset,
  setIsReset,
  rectanglePoints,
}) => {
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

    if (rectanglePoints) {
      reDrawingRectangle();
    }
  }, [containerWidth, containerHeight]);

  useEffect(() => {
    if (isReset) clearDrawings();
  }, [isReset]);

  const reDrawingRectangle = () => {
    const ctx = contextRef.current;

    let cords = convertToCordsInPixel(
      rectanglePoints,
      containerWidth,
      containerHeight
    );

    ctx.beginPath();
    ctx.rect(...cords);
    ctx.strokeStyle = "red";
    ctx.lineWidth = STROKE_WIDTH;
    ctx.stroke();
  };

  const startDrawingRectangle = (ev) => {
    const { nativeEvent } = ev;

    const { clientX, clientY } = nativeEvent?.touches
      ? nativeEvent?.touches[0]
      : nativeEvent;
    const { left, top } = canvasRef.current.getBoundingClientRect();

    startX.current = clientX - left;
    startY.current = clientY - top;

    setIsDrawing(true);
  };

  const drawRectangle = (ev) => {
    const { nativeEvent } = ev;
    if (!isDrawing) return;

    const { clientX, clientY } = nativeEvent?.touches
      ? nativeEvent?.touches[0]
      : nativeEvent;

    const { left, top } = canvasRef.current.getBoundingClientRect();

    endX.current = clientX - left;
    endY.current = clientY - top;
  };

  const stopDrawingRectangle = () => {
    const ctx = contextRef.current;

    if (!isDrawing) return;
    setIsDrawing(false);

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let width = endX.current - startX.current;
    let height = endY.current - startY.current;

    let cords = [startX.current, startY.current, width, height];

    ctx.beginPath();
    ctx.rect(...cords);
    ctx.strokeStyle = "red";
    ctx.lineWidth = STROKE_WIDTH;
    ctx.stroke();

    const cordsInPercentage = convertToCordsInPercentage(
      cords,
      canvasRef.current.width,
      canvasRef.current.height
    );

    setRectanglePoints(cordsInPercentage);
  };

  const clearDrawings = () => {
    const ctx = contextRef.current;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    setIsReset(false);
  };

  return (
    <CanvasWrapper>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawingRectangle}
        onMouseMove={drawRectangle}
        onMouseUp={stopDrawingRectangle}
        onMouseLeave={stopDrawingRectangle}
        onTouchStart={startDrawingRectangle}
        onTouchMove={drawRectangle}
        onTouchEnd={stopDrawingRectangle}
      />
    </CanvasWrapper>
  );
};

export default memo(Canvas);
