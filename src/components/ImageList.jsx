import React from "react";
import { BASE_URL } from "../store/actions/imagesAction";
import { ImageListContainer, ImageItem } from "./ImageList.style";

const ImageList = ({ images, currentImageId, changeCurrentImage }) => {
  const handleSelectImage = (id) => {
    changeCurrentImage(id);
  };

  return (
    <ImageListContainer>
      {images.length &&
        images.map((image) => (
          <ImageItem
            key={image.id}
            $imageUrl={`url(${BASE_URL}/${image.image})`}
            $isCurrentImage={image.id === currentImageId}
            onClick={() => handleSelectImage(image.id)}
          ></ImageItem>
        ))}
    </ImageListContainer>
  );
};

export default ImageList;
