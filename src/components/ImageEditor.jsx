import React from "react";
import { useSelector } from "react-redux";
import { currentImageSelector } from "../store/selectors/editorSelectors";
import { CurrentImage, ImageEditorContainer } from "./ImageEditor.style";

const ImageEditor = () => {
  const currentImage = useSelector(currentImageSelector);

  if (!currentImage) {
    return <div>Loading...</div>;
  }

  return (
    <ImageEditorContainer>
      <CurrentImage $currentImage={currentImage.image} />
      <button>save</button>
    </ImageEditorContainer>
  );
};

export default ImageEditor;
