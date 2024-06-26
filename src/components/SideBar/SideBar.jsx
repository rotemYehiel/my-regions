import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage, getImages } from "../../store/actions/imagesAction";
import { imagesSelector } from "../../store/selectors/imagesSelectors";
import ImageList from "../ImageList/ImageList";
import { SideBarContainer, UploadImageInput } from "./SideBar.style";
import { currentImageImgSelector } from "../../store/selectors/editorSelectors";
import { setCurrentImage } from "../../store/actions/editorAction";
import { Button } from "../../GlobalStyle.style";

const SideBar = () => {
  const dispatch = useDispatch();
  const images = useSelector(imagesSelector);
  const currentImageImg = useSelector(currentImageImgSelector);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    dispatch(getImages());
  };

  const changeCurrentImage = (chosenImage) => {
    let newImage = images.filter((image) => image.image === chosenImage)[0];
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
        <Button onClick={() => fileInputRef.current.click()}>+</Button>
      </>
      {images && (
        <ImageList
          images={images}
          currentImageImg={currentImageImg}
          changeCurrentImage={changeCurrentImage}
        />
      )}
    </SideBarContainer>
  );
};

export default SideBar;
