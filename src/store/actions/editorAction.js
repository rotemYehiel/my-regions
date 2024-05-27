import axios from "axios";
import { BASE_URL, UPDATE_IMAGE_REGIONS_API } from "../../constants/api";

export const setCurrentImage = (newImage) => {
  return async (dispatch) => {
    dispatch({ type: "SET_CURRENTIMAGE", payload: newImage });
    dispatch({ type: "RESET_REGIONS" });
  };
};

export const updateCurrentImage = (id, regions) => {
  return async (dispatch) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    try {
      let bodyFormData = new FormData();
      bodyFormData.append("id", id);
      bodyFormData.append("regions", JSON.stringify(regions));

      const response = await axios.post(
        `${BASE_URL}${UPDATE_IMAGE_REGIONS_API}`,
        bodyFormData,
        config
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      dispatch({ type: "RESET_REGIONS" });
    } catch (error) {
      console.error("Error updating image regions:", error);
    }
  };
};
