const initialState = {
  regions: null,
  loading: true,
  error: null,
};

const regionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_IREGIONS":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_REGIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        regions: action.payload,
      };
    case "FETCH_REGIONS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "RESET_REGIONS":
      return {
        ...state,
        regions: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default regionsReducer;
