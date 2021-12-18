import AxiosNodeApi from "./axiosNodeApi";
import {API_TENANT} from "../config/setting";
import authHeader from "../helpers/authHeader";

export const TenantApi = {
  getAll: async () => {
    const response = await AxiosNodeApi.get(
      `${API_TENANT}s`,
      {headers: authHeader()}
    )
    return response
  },
  getById: (id) => AxiosNodeApi.get(`${API_TENANT}s/${id}`),
  create: (data) => AxiosNodeApi.post(`${API_TENANT}`, data),
  update: (id, data) => AxiosNodeApi.put(`${API_TENANT}s/${id}`, data),
  delete: (id) => AxiosNodeApi.delete(`${API_TENANT}s/${id}`)
}