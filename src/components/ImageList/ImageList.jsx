import React from "react";
import { ImageListContainer, ImageItem } from "./ImageList.style";
import { BASE_URL } from "../../constants/api";

const ImageList = ({ images, currentImageImg, changeCurrentImage }) => {
  const handleSelectImage = (image) => {
    if (image !== currentImageImg) {
      changeCurrentImage(image);
    }
  };

  return (
    <ImageListContainer>
      {images.length &&
        images.map((image) => (
          <ImageItem
            key={image.image}
            $imageUrl={
              image?.id
                ? `url(${BASE_URL}/${image.image})`
                : `url(${image?.image})`
            }
            $isCurrentImage={image.image === currentImageImg}
            onClick={() => handleSelectImage(image.image)}
          />
        ))}
    </ImageListContainer>
  );
};

export default ImageList;
