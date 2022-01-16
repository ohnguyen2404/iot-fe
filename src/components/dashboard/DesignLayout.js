import React, { useState } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GridLayout from "react-grid-layout";
import renderComponent from "./ComponentRenderer";
import { useSelector } from "react-redux";
import { saveChangesDashboard } from "../../actions/dashboards";
import DashboardService from "../../services/dashboard";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Icon, message } from "antd";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { get } from "lodash";

const StyledAction = (props) => (
  <Action style={{ backgroundColor: "orange" }} {...props}>
    {props.children}
  </Action>
);

const StyledDiv = styled.div`
  background-color: white;
`;

const DesignLayout = () => {
  const dispatch = useDispatch();
  const [currentLayout, setCurrentLayout] = useState([]);
  const { openedDashboard } = useSelector((state) => state.dashboards);
  const [isEdit, setIsEdit] = useState(false);

  const dashboardWidgets = get(
    openedDashboard,
    "dashboard.configuration.widgets",
    {}
  );

  const layout = dashboardWidgets.map((widget) => {
    return {
      x: widget.x,
      y: widget.y,
      w: widget.w,
      h: widget.h,
      typeAlias: widget.typeAlias,
    };
  });

  const children = React.useMemo(() => {
    return layout.map((val, idx) => {
      return (
        <StyledDiv
          key={val.typeAlias}
          data-grid={{ x: val.x, y: val.y, w: val.w, h: val.h }}
        >
          {renderComponent(val.typeAlias)}
        </StyledDiv>
      );
    });
  }, [isEdit]);

  const handleLayoutChange = (layout) => {
    setCurrentLayout(layout);
  };

  const handleSaveChanges = async () => {
    const formattedLayout = currentLayout.map((l) => {
      return {
        typeAlias: l.i,
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
      };
    });

    const data = {
      dashboardId: get(openedDashboard, "dashboard.id"),
      widgets: formattedLayout,
    };

    const str_widgets = JSON.stringify({ widgets: data.widgets });

    try {
      await DashboardService.updateConfiguration(data.dashboardId, str_widgets);
      dispatch(saveChangesDashboard(data));
    } catch (e) {
      message.error(e.response.data.message);
      return;
    }
    message.success("Update dashboard successfully");
    setIsEdit(false);
  };

  return (
    <div>
      <GridLayout
        isDraggable={isEdit}
        isResizable={isEdit}
        className="layout"
        cols={12}
        rowHeight={100}
        autoSize={true}
        width={1500}
        onLayoutChange={handleLayoutChange}
      >
        {children}
      </GridLayout>
      <Fab
        text={isEdit && "Save changes"}
        mainButtonStyles={{ backgroundColor: "orange" }}
        actionButtonStyles={{ backgroundColor: "orange" }}
        icon={isEdit ? <Icon type="check" /> : <Icon type="experiment" />}
        onClick={() => isEdit && handleSaveChanges()}
      >
        {!isEdit && (
          <StyledAction text="Add new widget">
            <Icon type="plus" />
          </StyledAction>
        )}
        {!isEdit && (
          <StyledAction text="Enter edit mode" onClick={() => {
            setIsEdit(true)
            message.info("Drag and resize is available now.")
          }}>
            <Icon type="edit" />
          </StyledAction>
        )}
      </Fab>
    </div>
  );
};

export default DesignLayout;
