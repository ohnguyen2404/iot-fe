import { DeviceService } from "../services";
import { LOAD_DEVICES, ADD_DEVICE, UPDATE_DEVICE, REMOVE_DEVICE } from "./types";

export const loadDevices = () => async (dispatch) => {
  const data = await DeviceService.getAll();
  if (data) {
    dispatch({
      type: LOAD_DEVICES,
      payload: data,
    });
  }
  return data;
};

export const createDevice = (newDevice) => (dispatch) => {
  dispatch({
    type: ADD_DEVICE,
    payload: newDevice
  })
};

export const updateDevice = (updatedDevice) => (dispatch) => {
  dispatch({
    type: UPDATE_DEVICE,
    payload: updatedDevice
  })
}

export const removeDevice = (deviceId) => (dispatch) => {
  dispatch({
    type: REMOVE_DEVICE,
    payload: deviceId
  })
}
