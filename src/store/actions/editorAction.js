export const setCurrentImage = (newImage) => {
  return async (dispatch) => {
    dispatch({ type: "SET_CURRENTIMAGE", payload: newImage });
    dispatch({ type: "RESET_REGIONS" });
  };
};
