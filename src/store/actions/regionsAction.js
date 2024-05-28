import axios from "axios";
import { BASE_URL, GET_IMAGE_REGIONS_API } from "../../constants/api";
import {
  FETCH_REGIONS,
  FETCH_REGIONS_FAILURE,
  FETCH_REGIONS_SUCCESS,
  GET_EMPTY_REGIONS,
} from "../../components/actionType";

export const getRegions = (imageId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_REGIONS });

    try {
      const response = await axios.get(
        `${BASE_URL}${GET_IMAGE_REGIONS_API}/${imageId}`
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      if (response.data) {
        dispatch({ type: FETCH_REGIONS_SUCCESS, payload: response.data });
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
