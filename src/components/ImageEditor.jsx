import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentImageSelector } from "../store/selectors/editorSelectors";
import { regionsSelector } from "../store/selectors/regionsSelectors";
import {
  CanvasContainer,
  ImageEditorContainer,
  CurrentImageContainer,
  BackgroundImage,
} from "./ImageEditor.style";
import Canvas from "./Canvas";
import { BASE_URL } from "../constants/api";
import { getRegions } from "../store/actions/regionsAction";
// import useDynamicImageSize from "./hooks/useDynamicImageSize";
import Regions from "./Regions";

const ImageEditor = () => {
  const dispatch = useDispatch();
  const currentImage = useSelector(currentImageSelector);
  const containerRef = useRef(null); // Ref for ImageEditorContainer
  const regions = useSelector(regionsSelector);
  // const imageSize = useDynamicImageSize(
  //   containerRef,
  //   `${BASE_URL}/${currentImage?.image}`
  // );

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

  return (
    <ImageEditorContainer>
      {currentImage && (
        <CurrentImageContainer ref={containerRef}>
          <BackgroundImage
            src={`${BASE_URL}/${currentImage?.image}`}
            alt={currentImage?.id}
          />
          {regions && (
            <Regions regions={regions} imageContainer={containerRef} />
          )}
        </CurrentImageContainer>
      )}

      {/* {currentImage && regions && (
        <CanvasContainer>
          <Canvas
            backgroundImageUrl={`${BASE_URL}/${currentImage.image}`}
            regions={regions}
          />
        </CanvasContainer>
      )} */}
      <button>save</button>
    </ImageEditorContainer>
  );
};

export default ImageEditor;
