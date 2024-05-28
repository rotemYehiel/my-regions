import {
  ADD_IMAGE,
  FETCH_IMAGES,
  FETCH_IMAGES_FAILURE,
  FETCH_IMAGES_SUCCESS,
  UPDATE_IMAGES,
} from "../../components/actionType";

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
      let imagesWithId = state.images.filter((image) => !!image.id);

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
    default:
      return state;
  }
};

export default imagesReducer;
