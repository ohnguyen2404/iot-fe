import {
  LOAD_WIDGETS_BUNDLES,
  CREATE_WIDGETS_BUNDLE,
  UPDATE_WIDGETS_BUNDLE,
  REMOVE_WIDGETS_BUNDLE,
} from "../actions/types";
import constant from "../helpers/constants";

const initialState = {
  widgetsBundles: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_WIDGETS_BUNDLES:
      const defaultWidgets = [
        {
          id: "default-charts",
          title: "Charts",
          alias: constant.DEFAULT_WIDGETS_BUNDLE.CHARTS,
        },
        {
          id: "default-analogue-gauges",
          title: "Analogue Gauges",
          alias: constant.DEFAULT_WIDGETS_BUNDLE.ANALOGUE_GAUGES,
        },
      ];

      return {
        ...state,
        widgetsBundles: [...defaultWidgets, ...payload],
      };

    case CREATE_WIDGETS_BUNDLE:
      return {
        ...state,
        widgetsBundles: [...state.widgetsBundles, payload],
      };

    case UPDATE_WIDGETS_BUNDLE:
      return {
        ...state,
        widgetsBundles: state.widgetsBundles.map((widgetsBundle) => {
          if (widgetsBundle.id === payload.id) {
            const updatedWidgetsBundle = {
              ...widgetsBundle,
              ...payload,
            };
            return updatedWidgetsBundle;
          }
          return widgetsBundle;
        }),
      };

    case REMOVE_WIDGETS_BUNDLE:
      return {
        ...state,
        widgetsBundles: state.widgetsBundles.filter(
          (widgetsBundle) => widgetsBundle.id !== payload
        ),
      };

    default:
      return state;
  }
}
