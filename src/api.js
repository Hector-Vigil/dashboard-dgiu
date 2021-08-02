
const API_URL = "http://localhost:3300";

export const fetchTreeViewData = async () => {
  return await (await fetch(`${API_URL}/getTreeStructure`)).json();
};

export const fetchPieChartCentersData = async () => {
  return await (await fetch(`${API_URL}/centers-information`)).json();
};

export const fetchPieChartGroupsData = async () => {
  return await (await fetch(`${API_URL}/getGroupStats`)).json();
};


export const fetchCourseInformation = async () => {
  return await (await fetch(`${API_URL}/getCourseTypesInfo`)).json();
};

