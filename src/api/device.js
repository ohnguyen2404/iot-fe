import AxiosEntityApi from "./axios/axiosEntityApi";
import { API_DEVICE } from "../config/setting";

export const DeviceApi = {
  getAll: async () => {
    return await AxiosEntityApi.get(`${API_DEVICE}s`);
  },
  getById: async (id) => {
    return await AxiosEntityApi.get(`${API_DEVICE}s/${id}`);
  },
  create: async (data) => {
    return await AxiosEntityApi.post(`${API_DEVICE}`, data);
  },
  update: async (id, data) => {
    return await AxiosEntityApi.put(`${API_DEVICE}s/${id}`, data);
  },
  delete: (id) => AxiosEntityApi.delete(`${API_DEVICE}s/${id}`),

  getCredentialsById: async (deviceId) => {
    return await AxiosEntityApi.get(`${API_DEVICE}s/credentials/${deviceId}`);
  },

  updateCredentials: async (deviceId, data) => {
    return await AxiosEntityApi.put(
      `${API_DEVICE}s/credentials/${deviceId}`,
      data
    );
  },
};
