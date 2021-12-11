import AxiosApi from "./axiosApi";
import {API_AUTH} from "../config/setting";

export const AuthApi = {
  register: (data) => AxiosApi.post(`${API_AUTH}/register`, data),
  login: (data) => AxiosApi.post(`${API_AUTH}/login`, data)
}