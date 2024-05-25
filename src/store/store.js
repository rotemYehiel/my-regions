import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import imagesReducer from "./reducers/imagesReducer";
import editorReducer from "./reducers/editorReducer";
import regionsReducer from "./reducers/regionsReducer";

export const store = createStore(
  combineReducers({
    images: imagesReducer,
    editor: editorReducer,
    regions: regionsReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
