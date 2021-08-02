import axios from "axios";

const API_URL = "http://localhost:3300";

export const fetchTreeViewData = async () => {
  return await (await fetch(`${API_URL}/getTreeStructure`)).json();
};
