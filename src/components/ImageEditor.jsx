import React, { useEffect, useRef } from "react";
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

const ImageEditor = () => {
  const dispatch = useDispatch();
  const currentImage = useSelector(currentImageSelector);
  const containerRef = useRef(null);
  const regions = useSelector(regionsSelector);

  const containerWidth = containerRef?.current?.offsetWidth;
  const containerHeight = containerRef?.current?.offsetHeight;

  useEffect(() => {
    if (!regions && currentImage && currentImage?.id) {
      getCurrentImageRegions();
    }
  }, [regions, currentImage]);

  const getCurrentImageRegions = () => {
    dispatch(getRegions(currentImage.id));
  };

  if (!currentImage) {
    return <div>Loading...</div>;
  }

  console.log("h", containerRef.current?.offsetHeight);

  return (
    <ImageEditorContainer>
      {currentImage && (
        <CurrentImageContainer
          ref={containerRef}
          className="CurrentImageContainer"
        >
          <BackgroundImage
            src={`${BASE_URL}/${currentImage?.image}`}
            alt={currentImage?.id}
          />
          {regions && <Regions regions={regions} />}
          {containerWidth && containerHeight && (
            <Canvas
              containerWidth={containerWidth}
              containerHeight={containerHeight}
            />
          )}
        </CurrentImageContainer>
      )}

      <button>save</button>
    </ImageEditorContainer>
  );
};

export default ImageEditor;
