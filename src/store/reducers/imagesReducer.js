const initialState = {
  images: null,
  loading: false,
  error: null,
};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_IMAGES":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_IMAGES_SUCCESS":
      return {
        ...state,
        loading: false,
        images: action.payload,
      };
    case "FETCH_IMAGES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "RESET_IMAGES":
      return {
        ...state,
        images: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default imagesReducer;
