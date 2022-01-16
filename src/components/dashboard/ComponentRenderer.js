import React from "react";
import ExBarChart from "../example-widgets/charts/ExBarChart";
import ExLineChart from "../example-widgets/charts/ExLineChart";
import ExPieChart from "../example-widgets/charts/ExPieChart";
import ExLinearGauge from "../example-widgets/analogue-gauges/ExLinearGauge";
import ExRadialGauge from "../example-widgets/analogue-gauges/ExRadialGauge";
import constant from "../../helpers/constants";

const renderComponent = (typeAlias) => {
  switch (typeAlias) {
    //CHARTS
    case constant.DEFAULT_WIDGET_TYPE.BAR_CHART:
      return <ExBarChart />;
    case constant.DEFAULT_WIDGET_TYPE.LINE_CHART:
      return <ExLineChart />;
    case constant.DEFAULT_WIDGET_TYPE.PIE_CHART:
      return <ExPieChart />;
    
    //ANALOGUE_GAUGES
    case constant.DEFAULT_WIDGET_TYPE.LINEAR_GAUGE:
      return <ExLinearGauge />;
    case constant.DEFAULT_WIDGET_TYPE.RADIAL_GAUGE:
      return <ExRadialGauge />;
  }
};

export default renderComponent;
