import {
  RESET_CURRENTIMAGE,
  SET_CURRENTIMAGE,
} from "../../components/actionType";

const initialState = {
  currentImage: null,
  loading: true,
  error: null,
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
