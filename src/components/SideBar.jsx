import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../store/actions/imagesAction";
import { imagesSelector } from "../store/selectors/imagesSelectors";
import ImageList from "./ImageList";
import { SideBarContainer } from "./SideBar.style";
import { currentImageIdSelector } from "../store/selectors/editorSelectors";
import { setCurrentImage } from "../store/actions/editorAction";

const SideBar = () => {
  const dispatch = useDispatch();
  const images = useSelector(imagesSelector);
  const currentImageId = useSelector(currentImageIdSelector);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    console.log("fetchImages");
    dispatch(getImages());
  };

  const changeCurrentImage = (id) => {
    let newImage = images.filter((image) => image.id === id)[0];
    dispatch(setCurrentImage(newImage));
  };

  console.log({ images, currentImageId });
  return (
    <SideBarContainer>
      <button>+</button>
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
