import {
  REMOVE_IMAGE,
  RESET_IMAGES,
  RESET_REGIONS,
  SET_CURRENTIMAGE,
  UPDATE_IMAGES,
  UPDATE_REGIONS,
} from "../../constants/actionType";
import {
  createImage,
  getDataFromLocalStorage,
  saveToLocalStorage,
} from "../../functions/utils";
import { IMAGES } from "../../constants/localStorage";

export const setCurrentImage = (newImage) => {
  return async (dispatch) => {
    dispatch({ type: SET_CURRENTIMAGE, payload: newImage });
    dispatch({ type: RESET_REGIONS });
  };
};

export const updateCurrentImage = (id, regions) => {
  return async (dispatch) => {
    try {
      if ((id, regions)) {
        const images = getDataFromLocalStorage(IMAGES);
        const currentImage = images.filter((image) => image.id === id)[0];
        currentImage.regions = regions;
        images[id] = currentImage;

        saveToLocalStorage(IMAGES, images);

        dispatch({ type: UPDATE_REGIONS, payload: regions });
      }
    } catch (error) {
      console.error("Error updating image regions:", error);
    }
  };
};

export const postImage = (imageUrl, regions) => {
  return async (dispatch) => {
    try {
      const images = getDataFromLocalStorage(IMAGES);

      if (imageUrl && regions) {
        const id = images ? images.length : 0;
        const image = createImage(id, imageUrl, regions);
        const newImages = images ? JSON.parse(JSON.stringify(images)) : [];

        newImages.push(image);

        saveToLocalStorage(IMAGES, newImages);

        dispatch({ type: SET_CURRENTIMAGE, payload: image });
        dispatch({ type: UPDATE_IMAGES, payload: image });
      }
    } catch (error) {
      console.error("Error post image:", error);
    }
  };
};

export const deleteImage = (id) => {
  return async (dispatch) => {
    try {
      if (id !== undefined) {
        const images = getDataFromLocalStorage(IMAGES);
        const index = images.findIndex((image) => image.id === id);

        if (index !== -1) {
          images.splice(index, 1);

          saveToLocalStorage(IMAGES, images);

          if (images.length > 0) {
            dispatch({ type: REMOVE_IMAGE, payload: id });
            dispatch({ type: SET_CURRENTIMAGE, payload: images[0] });
          } else {
            dispatch({ type: RESET_IMAGES, payload: id });
            dispatch({ type: SET_CURRENTIMAGE, payload: null });
          }
        }
      }
    } catch (error) {
      console.error("Error delete image:", error);
    }
  };
};
