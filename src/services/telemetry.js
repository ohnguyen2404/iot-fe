import {TelemetryApi} from "../api";

const getByDeviceId = async (deviceId) => {
  return await TelemetryApi.getByDeviceId(deviceId)
}

export default {
    getByDeviceId
};
