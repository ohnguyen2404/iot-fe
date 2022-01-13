import {combineReducers} from "redux";
import auth from "./auth";
import devices from "./devices"
import telemetries from "./telemetries";
import customers from "./customers"
import tenants from "./tenants"
import widgetsBundles from "./widgetsBundles";
import ruleChains from "./ruleChains";

import {LOGOUT} from "../actions/types";

const appReducer = combineReducers({
    auth,
    devices,
    telemetries,
    customers,
    tenants,
    widgetsBundles,
    ruleChains
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer