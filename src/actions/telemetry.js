import {TelemetryService} from "../services";
import {LOAD_LATEST_TELEMETRIES, LOAD_TELEMETRIES, UPDATE_TELEMETRIES} from "./types";

export const loadTelemetryByDeviceId = (deviceId) => async (dispatch) => {
    const data = await TelemetryService.getByDeviceId(deviceId)
    if (data) {
        dispatch({
            type: LOAD_TELEMETRIES,
            payload: data.kvs
        })
    }
    return data
};

export const updateTelemetries = (updatedTelemetries) => async (dispatch) => {
    dispatch({
        type: UPDATE_TELEMETRIES,
        payload: updatedTelemetries
    })
}

export const loadLatestTelemetryByDeviceId = (deviceId) => async (dispatch) => {
  const data = await TelemetryService.getLatestByDeviceId(deviceId)
  if (data) {
      dispatch({
          type: LOAD_LATEST_TELEMETRIES,
          payload: data.kvs
      })
  }
  return data
};
