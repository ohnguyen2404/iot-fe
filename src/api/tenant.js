import AxiosEntityApi from "./axios/axiosEntityApi";
import {API_TENANT} from "../config/setting";

export const TenantApi = {
  getAll: async () => {
    return await AxiosEntityApi.get(`${API_TENANT}s`)
  },
  getById: async (id) => {
    return await AxiosEntityApi.get(`${API_TENANT}s/${id}`)
  },
  create: (data) => AxiosEntityApi.post(`${API_TENANT}`, data),
  update: (id, data) => AxiosEntityApi.put(`${API_TENANT}s/${id}`, data),
  delete: (id) => AxiosEntityApi.delete(`${API_TENANT}s/${id}`)
}