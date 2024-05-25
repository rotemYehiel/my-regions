import axios from "axios";

export const BASE_URL = "https://myregions.azurewebsites.net";
const GET_IMAGES_API = "/available-images-and-regions";

export const getImages = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_IMAGES" });

    try {
      const response = await axios.get(`${BASE_URL}${GET_IMAGES_API}`);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      if (response.data) {
        dispatch({ type: "FETCH_IMAGES_SUCCESS", payload: response.data });
        dispatch({ type: "SET_CURRENTIMAGE", payload: response.data[0] });
      }
    } catch (error) {
      dispatch({ type: "FETCH_IMAGES_FAILURE", payload: error.message });
    }
  };
};
