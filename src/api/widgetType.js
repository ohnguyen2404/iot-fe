import AxiosEntityApi from "./axios/axiosEntityApi";
import {API_WIDGET_TYPE} from "../config/setting";

export const WidgetTypeApi = {
  getAll: async (bundleAlias) => {
    return await AxiosEntityApi.get(`${API_WIDGET_TYPE}s?bundleAlias=${bundleAlias}`)
  },
  getById: async (id) => {
    return await AxiosEntityApi.get(`${API_WIDGET_TYPE}s/${id}`)
  },
  create: (data) => AxiosEntityApi.post(`${API_WIDGET_TYPE}`, data),
  update: (id, data) => AxiosEntityApi.put(`${API_WIDGET_TYPE}s/${id}`, data),
  delete: (id) => AxiosEntityApi.delete(`${API_WIDGET_TYPE}s/${id}`)
}