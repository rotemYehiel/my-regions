import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { currentImageSelector } from "../store/selectors/editorSelectors";
import { regionsSelector } from "../store/selectors/regionsSelectors";
import {
  ImageEditorContainer,
  CurrentImageContainer,
  BackgroundImage,
} from "./ImageEditor.style";
import Canvas from "./Canvas";
import { BASE_URL } from "../constants/api";
import { getEmptyRegions, getRegions } from "../store/actions/regionsAction";
import Regions from "./Regions";
import { postImage, updateCurrentImage } from "../store/actions/editorAction";

const ImageEditor = () => {
  const dispatch = useDispatch();
  const currentImage = useSelector(currentImageSelector);
  const containerRef = useRef(null);
  const regions = useSelector(regionsSelector);

  const [containerWidth, setContainerWidth] = useState(null);
  const [containerHeight, setContainerHeight] = useState(null);
  const [newPoints, setNewPoints] = useState(null);
  const [newLable, setNewLable] = useState("");

  const isEditImage = useMemo(() => !!currentImage?.id, [currentImage]);

  useEffect(() => {
    if (currentImage) {
      getCurrentImageRegions();
    }
  }, [currentImage]);

  const reset = () => {
    setNewPoints(null);
    setNewLable("");
    setContainerWidth(null);
    setContainerHeight(null);
  };

  const getCurrentImageRegions = () => {
    currentImage?.id
      ? dispatch(getRegions(currentImage?.id))
      : dispatch(getEmptyRegions());
  };

  const handleImageLoad = () => {
    setContainerWidth(containerRef.current?.offsetWidth);
    setContainerHeight(containerRef.current?.offsetHeight);
  };

  const handleLabelChange = (ev) => {
    setNewLable(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (newPoints.length && newLable) {
      const uniqueId = uuidv4();
      const newRegion = { id: uniqueId, label: newLable, points: newPoints };
      let newRegions = [...regions, newRegion];

      if (currentImage.id) {
        dispatch(updateCurrentImage(currentImage.id, newRegions));
      } else {
        dispatch(postImage(currentImage.image, newRegions));
      }

      reset();
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
            src={
              isEditImage
                ? `${BASE_URL}/${currentImage?.image}`
                : currentImage.image
            }
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

export default ImageEditor;
