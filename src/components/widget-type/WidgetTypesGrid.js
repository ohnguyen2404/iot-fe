import React, { useState } from "react";
import { Col, Row } from "antd";

const WidgetTypesGrid = (props) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6} />
        <Col span={6} />
        <Col span={6} />
        <Col span={6} />
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6} />
        <Col span={6} />
        <Col span={6} />
        <Col span={6} />
      </Row>
    </div>
  );
};

export default WidgetTypesGrid;
