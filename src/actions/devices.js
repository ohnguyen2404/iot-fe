import { DeviceService } from "../services";
import { LOAD_DEVICES } from "./types";

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