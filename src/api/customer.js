import AxiosEntityApi from "./axios/axiosEntityApi";
import {API_CUSTOMER} from "../config/setting";

export const CustomerApi = {
  getAll: async () => {
    return await AxiosEntityApi.get(`${API_CUSTOMER}s`)
  },
  getById: async (id) => {
    return await AxiosEntityApi.get(`${API_CUSTOMER}s/${id}`)
  },
  create: (data) => AxiosEntityApi.post(`${API_CUSTOMER}`, data),
  update: (id, data) => AxiosEntityApi.put(`${API_CUSTOMER}s/${id}`, data),
  delete: (id) => AxiosEntityApi.delete(`${API_CUSTOMER}s/${id}`)
}