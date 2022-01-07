import {LOAD_LATEST_TELEMETRIES, LOAD_TELEMETRIES, UPDATE_TELEMETRIES} from "../actions/types";
import {dropRight} from "lodash";

const initialState = {
  telemetries: [],
  latestTelemetries: []
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
      const updatedTelemetries = [...payload, ...dropRight(state.telemetries, payload.length)]
      const updatedLatestTelemetries = [...payload, ...state.latestTelemetries]
      return {
        ...state,
        telemetries: updatedTelemetries,
        latestTelemetries: updatedLatestTelemetries
      }
    
    case LOAD_LATEST_TELEMETRIES:
      return {
        ...state,
        latestTelemetries: payload
      }

    default:
      return state
  }
}
