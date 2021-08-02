import { combineReducers } from "redux";

import homepageReducer from "./homepage";

export default combineReducers({
  homepage: homepageReducer,
});
