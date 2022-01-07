import {LOAD_TELEMETRIES, UPDATE_TELEMETRIES, LOAD_LATEST_TELEMETRIES} from "../actions/types";

const initialState = {
  telemetries: [],
  latest_telemetries: []
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
      const updatedLatestTelemetries = [...payload, ...state.latest_telemetries]
      return {
        ...state,
        telemetries: updatedTelemetries,
        latest_telemetries: updatedLatestTelemetries
      }
    
    case LOAD_LATEST_TELEMETRIES:
      return {
        ...state,
        latest_telemetries: payload
      }

    default:
      return state
  }
}
