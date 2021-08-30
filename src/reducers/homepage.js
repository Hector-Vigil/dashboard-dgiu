import APP_ACTIONS from "../constants/actions";

const INITIAL_STATE = {
  showSideBar: true,
  darkMode: true,
  printMode: false,
};

const homepageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APP_ACTIONS.TOGGLE_SIDEBAR:
      return { ...state, showSideBar: action.payload };
    case APP_ACTIONS.TOGGLE_DARK_MODE:
      return { ...state, darkMode: action.payload };
    default:
      return state;
  }
};

export default homepageReducer;
