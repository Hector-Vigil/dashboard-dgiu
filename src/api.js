/* eslint-disable no-return-await */

import axios from "axios";

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

export const fetchProfessorsList = async () =>
  await (await fetch(`${API_URL}/professors-list`)).json();

export const fetchOrganizationStatitstics = async ({ queryKey }) => {
  let headersList = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  let d = "organizations=";
  d += JSON.stringify(queryKey[1]);
  let reqOptions = {
    url: `${API_URL}/organization-statistics`,
    method: "POST",
    headers: headersList,
    data: d,
  };
  const { data } = await axios.request(reqOptions);
  return data;
};

export const fetchUsersSelectionStatitstics = async ({ queryKey }) => {
  let headersList = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  let d = "professors=";
  d += JSON.stringify(queryKey[1]);
  let reqOptions = {
    url: `${API_URL}/users-statistics`,
    method: "POST",
    headers: headersList,
    data: d,
  };
  const { data } = await axios.request(reqOptions);
  return data;
};
