import React from "react";
import { ImageListContainer, ImageItem } from "./ImageList.style";

const ImageList = ({
  images,
  currentImageImg,
  changeCurrentImage,
  currentImageId,
}) => {
  const handleSelectImage = (image) => {
    if (image !== currentImageImg) {
      changeCurrentImage(image);
    }
  };

  return (
    <ImageListContainer>
      {images?.length > 0 &&
        images.map((image) => (
          <ImageItem
            key={image.image}
            $imageUrl={`url(${image?.image})`}
            $isCurrentImage={image.id === currentImageId}
            onClick={() => handleSelectImage(image.image)}
          />
        ))}
    </ImageListContainer>
  );
};

export default ImageList;
