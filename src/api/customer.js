import AxiosNodeApi from "./axiosNodeApi";
import {API_CUSTOMER} from "../config/setting";
import authHeader from "../helpers/authHeader";

export const CustomerApi = {
  getAll: async () => {
    const response = AxiosNodeApi.get(`${API_CUSTOMER}s`)
    return response
  },
  getById: (id) => AxiosNodeApi.get(`${API_CUSTOMER}s/${id}`),
  create: (data) => AxiosNodeApi.post(`${API_CUSTOMER}`, data),
  update: (id, data) => AxiosNodeApi.put(`${API_CUSTOMER}s/${id}`, data),
  delete: (id) => AxiosNodeApi.delete(`${API_CUSTOMER}s/${id}`)
}