import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentImageSelector } from "../store/selectors/editorSelectors";
import { regionsSelector } from "../store/selectors/regionsSelectors";
import { CanvasContainer, ImageEditorContainer } from "./ImageEditor.style";
import Canvas from "./Canvas";
import { BASE_URL } from "../constants/api";
import { getRegions } from "../store/actions/regionsAction";

const ImageEditor = () => {
  const dispatch = useDispatch();
  const currentImage = useSelector(currentImageSelector);
  const regions = useSelector(regionsSelector);

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
      {currentImage && regions && (
        <CanvasContainer>
          <Canvas
            backgroundImageUrl={`${BASE_URL}/${currentImage.image}`}
            regions={regions}
          />
        </CanvasContainer>
      )}
      <button>save</button>
    </ImageEditorContainer>
  );
};

export default ImageEditor;
