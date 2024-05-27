import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentImageSelector } from "../store/selectors/editorSelectors";
import { regionsSelector } from "../store/selectors/regionsSelectors";
import {
  ImageEditorContainer,
  CurrentImageContainer,
  BackgroundImage,
} from "./ImageEditor.style";
import Canvas from "./Canvas";
import { BASE_URL } from "../constants/api";
import { getRegions } from "../store/actions/regionsAction";
import Regions from "./Regions";
import { updateCurrentImage } from "../store/actions/editorAction";

const ImageEditor = () => {
  const dispatch = useDispatch();
  const currentImage = useSelector(currentImageSelector);
  const containerRef = useRef(null);
  const regions = useSelector(regionsSelector);

  const [containerWidth, setContainerWidth] = useState(null);
  const [containerHeight, setContainerHeight] = useState(null);
  const [newPoints, setNewPoints] = useState(null);
  const [newLable, setNewLable] = useState("");

  useEffect(() => {
    if (!regions && currentImage && currentImage?.id) {
      getCurrentImageRegions();
    }
  }, [regions, currentImage]);

  const getCurrentImageRegions = () => {
    dispatch(getRegions(currentImage?.id));
  };

  const handleImageLoad = () => {
    console.log("handleImageLoad:", containerRef.current?.offsetHeight);
    setContainerWidth(containerRef.current?.offsetWidth);
    setContainerHeight(containerRef.current?.offsetHeight);
  };

  const handleLabelChange = (ev) => {
    setNewLable(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (newPoints.length && newLable) {
      const newRegion = { label: newLable, points: newPoints };
      let newRegions = [...regions, newRegion];

      dispatch(updateCurrentImage(currentImage?.id, newRegions));
    }
  };

  if (!currentImage) {
    return <div>Loading...</div>;
  }

  return (
    <ImageEditorContainer onSubmit={handleSubmit}>
      {currentImage && (
        <CurrentImageContainer
          ref={containerRef}
          className="CurrentImageContainer"
        >
          <BackgroundImage
            src={`${BASE_URL}/${currentImage?.image}`}
            alt={currentImage?.id}
            onLoad={handleImageLoad}
          />
          {regions && <Regions regions={regions} />}
          {containerWidth && containerHeight && (
            <Canvas
              containerWidth={containerWidth}
              containerHeight={containerHeight}
              setRectanglePoints={setNewPoints}
            />
          )}
        </CurrentImageContainer>
      )}
      <input
        placeholder="enter label here"
        value={newLable}
        onChange={handleLabelChange}
      />

      <button type="submit">save</button>
    </ImageEditorContainer>
  );
};

export default memo(ImageEditor);
