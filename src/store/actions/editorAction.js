import axios from "axios";
import {
  BASE_URL,
  DELETE_IMAGE_API,
  POST_IMAGE_API,
  UPDATE_IMAGE_REGIONS_API,
} from "../../constants/api";
import {
  REMOVE_IMAGE,
  RESET_CURRENTIMAGE,
  RESET_REGIONS,
  SET_CURRENTIMAGE,
  UPDATE_IMAGES,
  UPDATE_REGIONS,
} from "../../constants/actionType";

export const setCurrentImage = (newImage) => {
  return async (dispatch) => {
    dispatch({ type: SET_CURRENTIMAGE, payload: newImage });
    dispatch({ type: RESET_REGIONS });
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

      dispatch({ type: UPDATE_REGIONS, payload: regions });
    } catch (error) {
      console.error("Error updating image regions:", error);
    }
  };
};

export const postImage = (imageUrl, regions) => {
  return async (dispatch) => {
    try {
      const blobObject = await axios.get(imageUrl, { responseType: "blob" });

      if (blobObject.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let bodyFormData = new FormData();

      bodyFormData.append("image", blobObject.data, "image.jpg");
      bodyFormData.append("regions", JSON.stringify(regions));

      const response = await axios.post(
        `${BASE_URL}${POST_IMAGE_API}`,
        bodyFormData,
        config
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      dispatch({ type: SET_CURRENTIMAGE, payload: response.data });
      dispatch({ type: UPDATE_IMAGES, payload: response.data });
    } catch (error) {
      console.error("Error post image:", error);
    }
  };
};

export const deleteImage = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}${DELETE_IMAGE_API}/${id}`);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      console.log({ response });

      // dispatch({ type: RESET_CURRENTIMAGE }); // i need to set it with new image,so it's not good like this
      dispatch({ type: REMOVE_IMAGE, payload: id });
    } catch (error) {
      console.error("Error delete image:", error);
    }
  };
};
