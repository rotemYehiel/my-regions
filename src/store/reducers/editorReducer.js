import { SET_CURRENTIMAGE } from "../../constants/actionType";

const initialState = {
  currentImage: null,
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENTIMAGE:
      return {
        ...state,
        currentImage: action.payload,
      };
    default:
      return state;
  }
};

export default editorReducer;
