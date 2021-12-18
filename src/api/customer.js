import AxiosNodeApi from "./axiosNodeApi";
import {API_CUSTOMER} from "../config/setting";

export const CustomerApi = {
  getAll: async () => {
    return await AxiosNodeApi.get(`${API_CUSTOMER}s`)
  },
  getById: async (id) => {
    return await AxiosNodeApi.get(`${API_CUSTOMER}s/${id}`)
  },
  create: (data) => AxiosNodeApi.post(`${API_CUSTOMER}`, data),
  update: (id, data) => AxiosNodeApi.put(`${API_CUSTOMER}s/${id}`, data),
  delete: (id) => AxiosNodeApi.delete(`${API_CUSTOMER}s/${id}`)
}