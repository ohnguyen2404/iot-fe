import React, { useState } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GridLayout from "react-grid-layout";
import renderComponent from "./ComponentRenderer";
import styled from "styled-components";

const DesignLayout = () => {
  const [currentLayout, setCurrentLayout] = useState([]);
  const layout = [
    {
      i: "a",
      x: 0,
      y: 0,
      w: 4,
      h: 3,
      bundleAlias: "charts",
      typeAlias: "bar_chart",
    },
    {
      i: "b",
      x: 4,
      y: 0,
      w: 4,
      h: 3,
      bundleAlias: "charts",
      typeAlias: "line_chart",
    },
    {
      i: "c",
      x: 8,
      y: 0,
      w: 2,
      h: 2,
      bundleAlias: "charts",
      typeAlias: "pie_chart",
    },
  ];
  const StyledDiv = styled.div`
    background-color: white;
  `;

  const handleLayoutChange = (layout) => {
    setCurrentLayout(layout);
  };

  console.log('layout here', currentLayout);

  const children = React.useMemo(() => {
    return layout.map((val, idx) => {
      return (
        <StyledDiv
          key={idx}
          data-grid={{ x: val.x, y: val.y, w: val.w, h: val.h }}
        >
          {renderComponent(val.bundleAlias, val.typeAlias)}
        </StyledDiv>
      );
    });
  }, []);

  return (
    <GridLayout
      className="layout"
      cols={12}
      rowHeight={100}
      autoSize={true}
      width={1500}
      onLayoutChange={handleLayoutChange}
    >
      {children}
    </GridLayout>
  );
};

export default DesignLayout;
