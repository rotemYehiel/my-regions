import {
  FETCH_REGIONS,
  FETCH_REGIONS_FAILURE,
  FETCH_REGIONS_SUCCESS,
  GET_EMPTY_REGIONS,
  RESET_REGIONS,
  UPDATE_REGIONS,
} from "../../components/actionType";

const initialState = {
  regions: null,
  loading: true,
  error: null,
};

const regionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGIONS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_REGIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        regions: action.payload,
      };
    case FETCH_REGIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_REGIONS:
      return {
        ...state,
        regions: null,
        loading: false,
        error: null,
      };
    case GET_EMPTY_REGIONS:
      return {
        ...state,
        regions: [],
        loading: false,
        error: null,
      };
    case UPDATE_REGIONS:
      return {
        ...state,
        regions: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default regionsReducer;
