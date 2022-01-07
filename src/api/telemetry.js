import AxiosTelemetryApi from "./axios/axiosTelemetryApi"
import {API_DEVICE, API_TELEMETRY} from "../config/setting";

export const TelemetryApi = {
  getByDeviceId: async (deviceId) => {
    return await AxiosTelemetryApi.get(`${API_DEVICE}/${deviceId}/${API_TELEMETRY}`)
  },

  getLatestByDeviceId: async(deviceId) => {
    return await AxiosTelemetryApi.get(`${API_DEVICE}/${deviceId}/latest-${API_TELEMETRY}`)
  }
}