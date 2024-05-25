import axios from "axios";
import { BASE_URL, GET_IMAGE_REGIONS_API } from "../../constants/api";

export const getRegions = (imageId) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_IREGIONS" });

    try {
      const response = await axios.get(
        `${BASE_URL}${GET_IMAGE_REGIONS_API}/${imageId}`
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      if (response.data) {
        dispatch({ type: "FETCH_REGIONS_SUCCESS", payload: response.data });
      }
    } catch (error) {
      dispatch({ type: "FETCH_REGIONS_FAILURE", payload: error.message });
    }
  };
};

export const resetRegions = () => {
  return async (dispatch) => {
    dispatch({ type: "RESET_REGIONS" });
  };
};
