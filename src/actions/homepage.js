import APP_ACTIONS from "../constants/actions";

export const toggleSidebar = (showSidebar) => ({
  type: APP_ACTIONS.TOGGLE_SIDEBAR,
  payload: showSidebar,
});
