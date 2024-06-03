import {
  RESET_CURRENTIMAGE,
  SET_CURRENTIMAGE,
} from "../../constants/actionType";

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
    case RESET_CURRENTIMAGE:
      return {
        ...state,
        currentImage: null,
      };
    default:
      return state;
  }
};

export default editorReducer;
