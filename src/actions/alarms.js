import {AlarmService} from "../services";
import {LOAD_ALARMS, UPDATE_ALARMS} from "./types";

export const loadAlarmsByDeviceId = (deviceId) => async (dispatch) => {
    const data = await AlarmService.getAllByDeviceId(deviceId)
    if (data) {
        dispatch({
            type: LOAD_ALARMS,
            payload: data
        })
    }
    return data
};

export const updateAlarms = (newAlarm) => async (dispatch) => {
    dispatch({
        type: UPDATE_ALARMS,
        payload: newAlarm
    })
}