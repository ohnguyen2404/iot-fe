import AxiosEntityApi from "./axios/axiosEntityApi";
import {API_WIDGETS_BUNDLE} from "../config/setting";

export const WidgetsBundleApi = {
  getAll: async () => {
    return await AxiosEntityApi.get(`${API_WIDGETS_BUNDLE}s`)
  },
  getById: async (id) => {
    return await AxiosEntityApi.get(`${API_WIDGETS_BUNDLE}s/${id}`)
  },
  create: (data) => AxiosEntityApi.post(`${API_WIDGETS_BUNDLE}`, data),
  update: (id, data) => AxiosEntityApi.put(`${API_WIDGETS_BUNDLE}s/${id}`, data),
  delete: (id) => AxiosEntityApi.delete(`${API_WIDGETS_BUNDLE}s/${id}`)
}