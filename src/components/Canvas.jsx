import React, { useEffect, useRef, useState } from "react";
import { PADDING_LABEL, STROKE_WIDTH } from "../constants/canvas";

const Canvas = ({ backgroundImageUrl, regions }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imageRef = useRef(new Image());

  const canvasOffSetX = useRef(null);
  const canvasOffSetY = useRef(null);
  const startX = useRef(null);
  const startY = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastRect, setLastRect] = useState(null);

  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const { naturalWidth, naturalHeight } = imageRef.current;
    const aspectRatio = naturalWidth / naturalHeight;

    let canvasWidth, canvasHeight;
    if (windowWidth / windowHeight < aspectRatio) {
      canvasWidth = windowWidth;
      canvasHeight = windowWidth / aspectRatio;
    } else {
      canvasHeight = windowHeight;
      canvasWidth = windowHeight * aspectRatio;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    contextRef.current.drawImage(
      imageRef.current,
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    const offset = canvasRef.current.getBoundingClientRect();

    // canvas farness from the window
    canvasOffSetX.current = offset.left;
    canvasOffSetY.current = offset.top;

    if (regions.length)
      regions.forEach((region) => drawRegion(region.points, region.label));
  };

  const createRectangle = (points) => {
    const { naturalWidth, naturalHeight } = imageRef.current;
    const canvas = canvasRef.current;
    const [x1, y1, x2, y2] = points;

    const rectX1 = (x1 / naturalWidth) * canvas.width;
    const rectY1 = (y1 / naturalHeight) * canvas.height;
    const rectX2 = (x2 / naturalWidth) * canvas.width;
    const rectY2 = (y2 / naturalHeight) * canvas.height;

    const rectWidth = rectX2 - rectX1;
    const rectHeight = rectY2 - rectY1;

    contextRef.current.strokeStyle = "red";
    contextRef.current.lineWidth = STROKE_WIDTH;
    contextRef.current.strokeRect(rectX1, rectY1, rectWidth, rectHeight);
  };

  const loadImage = () => {
    imageRef.current.src = backgroundImageUrl;
    imageRef.current.onload = () => {
      setCanvasSize(contextRef.current);
    };
  };

  const drawLabel = (x1, y1, label) => {
    const { naturalWidth, naturalHeight } = imageRef.current;
    const canvas = canvasRef.current;

    const rectX1 = (x1 / naturalWidth) * canvas.width;
    const rectY1 = (y1 / naturalHeight) * canvas.height;

    contextRef.current.font = "16px Arial";
    contextRef.current.textBaseline = "top";

    const textWidth =
      contextRef.current.measureText(label).width + PADDING_LABEL;
    const textHeight = 16;

    contextRef.current.fillStyle = "red";
    contextRef.current.fillRect(
      rectX1 - STROKE_WIDTH / 2,
      rectY1 - textHeight,
      textWidth + 2 * PADDING_LABEL,
      textHeight
    );

    contextRef.current.fillStyle = "white";
    contextRef.current.fillText(
      label,
      rectX1 + PADDING_LABEL,
      rectY1 - textHeight
    );
  };

  const drawRegion = (points, lable) => {
    createRectangle(points);
    drawLabel(points[0], points[1], lable);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    contextRef.current = canvas.getContext("2d");

    const handleResize = () => setCanvasSize();

    loadImage();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [backgroundImageUrl, regions]);

  const startDrawingRectangle = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    startX.current = nativeEvent.clientX - canvasOffSetX.current;
    startY.current = nativeEvent.clientY - canvasOffSetY.current;

    // console.log({ canvasOffSetX, canvasOffSetY, startX, startY });
    setIsDrawing(true);

    // console.log({ nativeEvent, canvasRef: canvasRef.current });
  };

  const drawRectangle = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    // remove older rec
    // contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // console.log("befor:", {
    //   canvasOffSetX,
    //   canvasOffSetY,
    //   startX,
    //   startY,
    // });

    const newMouseX = nativeEvent.clientX - canvasOffSetX.current;
    const newMouseY = nativeEvent.clientY - canvasOffSetY.current;

    const rectWidht = newMouseX - startX.current;
    const rectHeight = newMouseY - startY.current;

    // console.log({
    //   canvasOffSetX,
    //   canvasOffSetY,
    //   startX,
    //   startY,
    //   newMouseX,
    //   newMouseY,
    // });

    if (lastRect) {
      contextRef.current.clearRect(
        lastRect.x,
        lastRect.y,
        lastRect.width,
        lastRect.height
      );

      contextRef.current.drawImage(
        imageRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

    contextRef.current.strokeStyle = "red";
    contextRef.current.lineWidth = STROKE_WIDTH;
    contextRef.current.strokeRect(
      startX.current,
      startY.current,
      rectWidht,
      rectHeight
    );

    setLastRect({
      x: startX.current,
      y: startY.current,
      width: rectWidht,
      height: rectHeight,
    });
  };

  const stopDrawingRectangle = () => {
    setIsDrawing(false);
  };

  // console.log({ regions });

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
      onMouseDown={startDrawingRectangle}
      onMouseMove={drawRectangle}
      onMouseUp={stopDrawingRectangle}
      onMouseLeave={stopDrawingRectangle}
    />
  );
};

export default Canvas;
