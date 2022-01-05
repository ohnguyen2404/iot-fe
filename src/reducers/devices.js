import {UPDATE_DEVICE_TELEMETRY, LOAD_DEVICES} from "../actions/types";

const initialState = {
  devices: []
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case LOAD_DEVICES:
      return {
        ...state,
        devices: payload
      }
    default:
      return state
  }
}