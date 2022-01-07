import AxiosAuthApi from "./axios/axiosAuthApi";
import {API_AUTH} from "../config/setting";

export const AuthApi = {
  register: async (data) => {
    return await AxiosAuthApi.post(`${API_AUTH}/register`, data);
  },
  login: async (data) => {
    return await AxiosAuthApi.post(`${API_AUTH}/login`, data);
  },
  changePassword: async (data) => {
    return await AxiosAuthApi.post(`${API_AUTH}/change-password`, data);
  },
};
