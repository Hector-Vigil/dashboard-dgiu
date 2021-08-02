import APP_ACTIONS from "../constants/actions";

const INITIAL_STATE = {
  showSideBar: true,
};

const homepageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APP_ACTIONS.TOGGLE_SIDEBAR:
      return { ...state, showSideBar: action.payload };
    default:
      return state;
  }
};

export default homepageReducer;
