import {
  ADD_IMAGE,
  FETCH_IMAGES,
  FETCH_IMAGES_FAILURE,
  FETCH_IMAGES_SUCCESS,
  SET_CURRENTIMAGE,
} from "../../constants/actionType";
import { getDataFromLocalStorage } from "../../functions/utils";
import { IMAGES } from "../../constants/localStorage";

export const getImages = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_IMAGES });

    try {
      const images = getDataFromLocalStorage(IMAGES);

      dispatch({ type: FETCH_IMAGES_SUCCESS, payload: images ?? [] });
      dispatch({
        type: SET_CURRENTIMAGE,
        payload: images ? images[0] : {},
      });
    } catch (error) {
      dispatch({ type: FETCH_IMAGES_FAILURE, payload: error.message });
    }
  };
};

export const addImage = (imageUrl) => {
  return async (dispatch) => {
    const newImage = { image: imageUrl };

    dispatch({ type: ADD_IMAGE, payload: newImage });
    dispatch({ type: SET_CURRENTIMAGE, payload: newImage });
  };
};
