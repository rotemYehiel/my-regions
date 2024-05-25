import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import imagesReducer from "./reducers/imagesReducer";
import editorReducer from "./reducers/editorReducer";

export const store = createStore(
  combineReducers({
    images: imagesReducer,
    editor: editorReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
