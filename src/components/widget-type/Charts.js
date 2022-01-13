import React, { useState } from "react";
import ExBarChart from "../example-widgets/charts/ExBarChart";
import ExLineChart from "../example-widgets/charts/ExLineChart";
import ExPieChart from "../example-widgets/charts/ExPieChart";

import { Col, Row, Card } from "antd";

const Charts = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Timeseries Bar Chart">
            <ExBarChart />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Timeserires Line Chart">
            <ExLineChart />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Pie Chart">
            <ExPieChart />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Charts;
