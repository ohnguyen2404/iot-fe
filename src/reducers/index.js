import {combineReducers} from "redux";
import auth from "./auth";
import devices from "./devices"
import telemetries from "./telemetries";
import { LOGOUT } from "../actions/types";

const appReducer = combineReducers({
  auth,
  devices,
  telemetries
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer