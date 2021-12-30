import AxiosEntityApi from "./axiosEntityApi";
import {API_DEVICE} from "../config/setting";

export const DeviceApi = {
  getAll: async () => {
    return await AxiosEntityApi.get(`${API_DEVICE}s`)
  },
  getById: async (id) => {
    return await AxiosEntityApi.get(`${API_DEVICE}s/${id}`)
  },
  create: (data) => AxiosEntityApi.post(`${API_DEVICE}`, data),
  update: (id, data) => AxiosEntityApi.put(`${API_DEVICE}s/${id}`, data),
  delete: (id) => AxiosEntityApi.delete(`${API_DEVICE}s/${id}`)
}