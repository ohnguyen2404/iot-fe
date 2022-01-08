import {
  LOAD_DEVICES,
  ADD_DEVICE,
  UPDATE_DEVICE,
  REMOVE_DEVICE,
} from "../actions/types";

const initialState = {
  devices: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_DEVICES:
      return {
        ...state,
        devices: payload,
      };

    case ADD_DEVICE:
      return {
        ...state,
        devices: [...state.devices, payload],
      };

    case UPDATE_DEVICE:
      return {
        ...state,
        devices: state.devices.map((device) => {
          if (device.id === payload.id) {
            const updatedDevice = {
              ...device,
              ...payload,
            };
            return updatedDevice;
          }
          return device;
        }),
      };
    
    case REMOVE_DEVICE:
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== payload)
      }

    default:
      return state;
  }
}
