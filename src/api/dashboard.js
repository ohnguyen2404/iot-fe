import AxiosEntityApi from "./axios/axiosEntityApi";
import { API_DASHBOARD } from "../config/setting";

export const DashboardApi = {
  getAll: async () => {
    return await AxiosEntityApi.get(`${API_DASHBOARD}s`);
  },
  getById: async (id) => {
    return await AxiosEntityApi.get(`${API_DASHBOARD}s/${id}`);
  },
  create: async (data) => AxiosEntityApi.post(`${API_DASHBOARD}`, data),
  update: async (id, data) =>
    AxiosEntityApi.put(`${API_DASHBOARD}s/${id}`, data),
  updateConfiguration: async (id, data) =>
    AxiosEntityApi.put(`${API_DASHBOARD}s/${id}/configuration`, data),
  delete: async (id) => AxiosEntityApi.delete(`${API_DASHBOARD}s/${id}`),
};
