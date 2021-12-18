import AxiosNodeApi from "./axiosNodeApi";
import {API_TENANT} from "../config/setting";
import authHeader from "../helpers/authHeader";

export const TenantApi = {
  getAll: async () => {
    return await AxiosNodeApi.get(`${API_TENANT}s`)
  },
  getById: async (id) => {
    return await AxiosNodeApi.get(`${API_TENANT}s/${id}`)
  },
  create: (data) => AxiosNodeApi.post(`${API_TENANT}`, data),
  update: (id, data) => AxiosNodeApi.put(`${API_TENANT}s/${id}`, data),
  delete: (id) => AxiosNodeApi.delete(`${API_TENANT}s/${id}`)
}