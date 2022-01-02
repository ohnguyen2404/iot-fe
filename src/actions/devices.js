import {DeviceService} from "../services";
import {LOAD_DEVICES, UPDATE_DEVICE_TELEMETRY} from "./types";

export const loadDevices = () => async (dispatch) => {
    const data = await DeviceService.getAll()
    if (data) {
        dispatch({
            type: LOAD_DEVICES,
            payload: data
        })
    }
    return data
};

export const updateDeviceTelemetry = (updatedDevices) => async (dispatch) => {
    dispatch({
        type: LOAD_DEVICES,
        payload: updatedDevices
    })
}