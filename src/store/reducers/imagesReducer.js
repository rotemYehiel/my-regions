import {
  ADD_IMAGE,
  FETCH_IMAGES,
  FETCH_IMAGES_FAILURE,
  FETCH_IMAGES_SUCCESS,
  REMOVE_IMAGE,
  UPDATE_IMAGES,
  RESET_IMAGES,
} from "../../constants/actionType";

const initialState = {
  images: null,
  loading: false,
  error: null,
};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        images: action.payload,
      };
    case FETCH_IMAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_IMAGES:
      let imagesWithId = state.images.filter((image) => image.id !== undefined);

      return {
        ...state,
        loading: false,
        images: [action.payload, ...imagesWithId],
      };
    case ADD_IMAGE:
      return {
        ...state,
        loading: false,
        images: [action.payload, ...state.images],
      };
    case REMOVE_IMAGE:
      let newImages = state.images.filter(
        (image) => image.id !== action.payload
      );

      return {
        ...state,
        loading: false,
        images: newImages,
      };

    case RESET_IMAGES:
      return {
        ...state,
        loading: false,
        error: null,
        images: null,
      };

    default:
      return state;
  }
};

export default imagesReducer;
