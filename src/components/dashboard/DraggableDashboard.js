import React from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GridLayout from "react-grid-layout";
import ExBarChart from "../example-widgets/charts/ExBarChart";
import ExLineChart from "../example-widgets/charts/ExLineChart";
import ExPieChart from "../example-widgets/charts/ExPieChart";
import styled from "styled-components";

const DraggableDashboard = () => {
  const StyledDiv = styled.div`
    background-color: white;
  `;

  const layout = [
    { i: "a", x: 0, y: 0, w: 4, h: 8 },
    { i: "b", x: 4, y: 0, w: 4, h: 8 },
    { i: "c", x: 8, y: 0, w: 2, h: 6 },
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      autoSize={true}
      width={1500}
    >
      <StyledDiv key="a">
        <ExBarChart />
      </StyledDiv>
      <StyledDiv key="b">
        <ExLineChart />
      </StyledDiv>
      <StyledDiv key="c">
        <ExPieChart />
      </StyledDiv>
    </GridLayout>
  );
};

export default DraggableDashboard;
