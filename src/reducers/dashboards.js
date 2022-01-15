import { satisfies } from "semver";
import {
  LOAD_DASHBOARDS,
  CREATE_DASHBOARD,
  UPDATE_DASHBOARD,
  REMOVE_DASHBOARD,
  OPEN_DASHBOARD,
} from "../actions/types";

const initialState = {
  dashboards: [],
  openDashboard: {
    isOpen: false,
    dashboard: {},
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_DASHBOARDS:
      return {
        ...state,
        dashboards: payload,
      };

    case CREATE_DASHBOARD:
      return {
        ...state,
        dashboards: [...state.dashboards, payload],
      };

    case UPDATE_DASHBOARD:
      return {
        ...state,
        dashboards: state.dashboards.map((dashboard) => {
          if (dashboard.id === payload.id) {
            const updatedDashboard = {
              ...dashboard,
              ...payload,
            };
            return updatedDashboard;
          }
          return dashboard;
        }),
      };

    case REMOVE_DASHBOARD:
      return {
        ...state,
        dashboards: state.dashboards.filter(
          (dashboard) => dashboard.id !== payload
        ),
      };

    case OPEN_DASHBOARD:
      return {
        ...state,
        openDashboard: payload,
      };

    default:
      return state;
  }
}
