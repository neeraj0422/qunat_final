import React, { useRef } from "react";
import {TOKEN, USER_DETAILS} from "../../constants/constants";
import {URLS} from "../../constants/urls";
import {APIService} from "../api/api-service";
import {getLoginModel} from "./auth.model";
import {toasterService} from "../common/utilityService";

export const AuthService = {
  login: async (data) => {
    try {
      return await APIService.Instance.post(
          URLS.LOGIN,
          getLoginModel(data)
      );
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
      return {};
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_DETAILS)
    window.location.reload();
  },
  getUserDetails: () => {
    const stringifiedResponse = localStorage.getItem(USER_DETAILS);
    if (!stringifiedResponse) return null;
    return JSON.parse(stringifiedResponse);
  },
  getUserType: () => {
    const user = AuthService.getUserDetails();
    if (!user) return null;
    return user?.userType;
  },
  getFullName: () => {
    const user = AuthService.getUserDetails();
    if (!user) return null;
    return `${user?.firstname} ${user?.lastname || ""}`;
  },
  getEmail: () => {
    const user = AuthService.getUserDetails();
    if (!user) return null;
    return user?.email;
  },
  getOrganisation: () => {
    const user = AuthService.getUserDetails();
    if (!user) return null;
    return user?.organisation;
  },
};
