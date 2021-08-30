/* eslint-disable no-return-await */

import axios from 'axios';


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

export const fetchOrganizationTree = async () =>
  await (await fetch(`${API_URL}/organization-tree`)).json();

export const fetchOrganizationStatitstics = async (organizations) => {

  const { data } = await axios.get(`${API_URL}/organization-statistics`, {
    params: {
      organizations,
    }
  });
};