const initialState = {
  currentImage: null,
  loading: true,
  error: null,
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENTIMAGE":
      return {
        ...state,
        currentImage: action.payload,
      };
    case "RESET_CURRENTIMAGE":
      return {
        ...state,
        currentImage: null,
      };

    case "FETCH_IREGIONS":
      return {
        ...state,
        loading: true,
        error: null,
      };

    default:
      return state;
  }
};

export default editorReducer;
