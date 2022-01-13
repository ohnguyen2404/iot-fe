import React from "react";
import { Modal } from "antd";
import Charts from "./Charts";
import AnalogueGauges from "./AnalogueGauges";
import constant from "../../helpers/constants";

const WidgetTypesGrid = (props) => {
  const { widgetType, openWidgetTypesGrid, setOpenWidgetTypesGrid } = props;
  const renderTab = () => {
    switch (widgetType) {
      case constant.DEFAULT_WIDGETS_BUNDLE.CHARTS:
        return <Charts />;
      case constant.DEFAULT_WIDGETS_BUNDLE.ANALOGUE_GAUGES:
        return <AnalogueGauges />;
      default:
        return <Charts />;
    }
  };

  return (
    <Modal
      visible={openWidgetTypesGrid}
      onCancel={() => setOpenWidgetTypesGrid(false)}
      centered={true}
      width={1300}
      footer={null}
      closable={false}
      bodyStyle={{ backgroundColor: "lightgray" }}
      destroyOnClose={true}
    >
      {renderTab()}
    </Modal>
  );
};

export default WidgetTypesGrid;
