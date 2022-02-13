import AxiosEntityApi from "./axios/axiosEntityApi";
import {API_ALARM} from "../config/setting";

export const AlarmApi = {
    getAllByDeviceId: async (deviceId) => {
        return AxiosEntityApi.get(`${API_ALARM}s/${deviceId}`);
    },
};
