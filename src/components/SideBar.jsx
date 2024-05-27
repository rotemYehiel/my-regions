import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage, getImages } from "../store/actions/imagesAction";
import { imagesSelector } from "../store/selectors/imagesSelectors";
import ImageList from "./ImageList";
import { SideBarContainer, UploadImageInput } from "./SideBar.style";
import { currentImageIdSelector } from "../store/selectors/editorSelectors";
import { setCurrentImage } from "../store/actions/editorAction";

const SideBar = () => {
  const dispatch = useDispatch();
  const images = useSelector(imagesSelector);
  const currentImageId = useSelector(currentImageIdSelector);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    dispatch(getImages());
  };

  const changeCurrentImage = (id) => {
    let newImage = images.filter((image) => image.id === id)[0];
    dispatch(setCurrentImage(newImage));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      dispatch(addImage(imageUrl));
    }
  };

  return (
    <SideBarContainer>
      <>
        <UploadImageInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button onClick={() => fileInputRef.current.click()}>+</button>
      </>
      {images && (
        <ImageList
          images={images}
          currentImageId={currentImageId}
          changeCurrentImage={changeCurrentImage}
        />
      )}
    </SideBarContainer>
  );
};

export default SideBar;
