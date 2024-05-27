import React from "react";
import { ImageListContainer, ImageItem } from "./ImageList.style";
import { BASE_URL } from "../constants/api";

const ImageList = ({ images, currentImageId, changeCurrentImage }) => {
  const handleSelectImage = (id) => {
    if (id !== currentImageId) {
      changeCurrentImage(id);
    }
  };

  return (
    <ImageListContainer>
      {images.length &&
        images.map((image) => (
          <ImageItem
            key={image.image}
            src={image?.id ? `${BASE_URL}/${image.image}` : image?.image}
            $isCurrentImage={image.id === currentImageId}
            onClick={() => handleSelectImage(image.id)}
          />
        ))}
    </ImageListContainer>
  );
};

export default ImageList;
