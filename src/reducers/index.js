import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";
import { LOGOUT } from "../actions/types";

const appReducer = combineReducers({
  auth,
  message
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer