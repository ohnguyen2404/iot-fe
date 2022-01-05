import {TelemetryService} from "../services";
import {LOAD_TELEMETRIES, UPDATE_TELEMETRIES} from "./types";

export const loadTelemetryByDeviceId = (deviceId) => async (dispatch) => {
    const data = await TelemetryService.getByDeviceId(deviceId)
    console.log('data', data);
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