import {dropRight} from "lodash";
import {LOAD_ALARMS, UPDATE_ALARMS} from "../actions/types";

const initialState = {
    alarms: [],
}

export default function (state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case LOAD_ALARMS:
            return {
                ...state,
                alarms: payload
            }

        case UPDATE_ALARMS:
            return {
                ...state,
                alarms: [payload, ...state.alarms],
            }

        default:
            return state
    }
}
