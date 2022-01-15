import AxiosEntityApi from "./axios/axiosEntityApi";
import {API_DASHBOARD} from "../config/setting";

export const DashboardApi = {
  getAll: async () => {
    return await AxiosEntityApi.get(`${API_DASHBOARD}s`)
  },
  getById: async (id) => {
    return await AxiosEntityApi.get(`${API_DASHBOARD}s/${id}`)
  },
  create: (data) => AxiosEntityApi.post(`${API_DASHBOARD}`, data),
  update: (id, data) => AxiosEntityApi.put(`${API_DASHBOARD}s/${id}`, data),
  delete: (id) => AxiosEntityApi.delete(`${API_DASHBOARD}s/${id}`)
}