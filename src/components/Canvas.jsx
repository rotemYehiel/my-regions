import React, { useEffect, useRef } from "react";

const Canvas = ({ backgroundImageUrl, regions }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(new Image());

  const setCanvasSize = (ctx) => {
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, 0, 0, canvasWidth, canvasHeight);

    drawRegions(ctx, naturalWidth, naturalHeight, canvasWidth, canvasHeight);
  };

  const drawRegions = (
    ctx,
    naturalWidth,
    naturalHeight,
    canvasWidth,
    canvasHeight
  ) => {
    regions.forEach((region) => {
      const [x1, y1, x2, y2] = region.points;

      const rectX1 = (x1 / naturalWidth) * canvasWidth;
      const rectY1 = (y1 / naturalHeight) * canvasHeight;
      const rectX2 = (x2 / naturalWidth) * canvasWidth;
      const rectY2 = (y2 / naturalHeight) * canvasHeight;

      const rectWidth = rectX2 - rectX1;
      const rectHeight = rectY2 - rectY1;

      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(rectX1, rectY1, rectWidth, rectHeight);
    });
  };

  const loadImage = (ctx) => {
    imageRef.current.src = backgroundImageUrl;
    imageRef.current.onload = () => {
      setCanvasSize(ctx);
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleResize = () => setCanvasSize(ctx);

    loadImage(ctx);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [backgroundImageUrl, regions]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default Canvas;
