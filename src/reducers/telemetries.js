import {LOAD_TELEMETRIES, UPDATE_TELEMETRIES} from "../actions/types";

const initialState = {
  telemetries: []
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case LOAD_TELEMETRIES:
      return {
        ...state,
        telemetries: payload
      }
    case UPDATE_TELEMETRIES:
      const updatedTelemetries = [...payload, ...state.telemetries]
      return {
        ...state,
        telemetries: updatedTelemetries
      }
    default:
      return state
  }
}
