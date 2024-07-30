import {
  FETCH_REGIONS,
  FETCH_REGIONS_FAILURE,
  FETCH_REGIONS_SUCCESS,
  GET_EMPTY_REGIONS,
} from "../../constants/actionType";
import { getDataFromLocalStorage } from "../../functions/utils";
import { IMAGES } from "../../constants/localStorage";

export const getRegions = (imageId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_REGIONS });

    try {
      const images = getDataFromLocalStorage(IMAGES);
      const currentImage = images.filter((image) => image.id === imageId)[0];

      if (currentImage?.regions) {
        dispatch({
          type: FETCH_REGIONS_SUCCESS,
          payload: currentImage?.regions,
        });
      }
    } catch (error) {
      dispatch({ type: FETCH_REGIONS_FAILURE, payload: error.message });
    }
  };
};

export const getEmptyRegions = () => {
  return async (dispatch) => {
    dispatch({ type: GET_EMPTY_REGIONS });
  };
};
