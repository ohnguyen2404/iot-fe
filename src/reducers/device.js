import {FETCH_DEVICE_TELEMETRY} from "../actions/types";

const initialState = {
    devices: []
}

export default (state=initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case FETCH_DEVICE_TELEMETRY:
            return {
                ...state,
                devices: [...payload.devices]
            }
    }
}