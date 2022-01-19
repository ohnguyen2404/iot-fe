import React, { useState } from "react";
import { message, Modal, List, Avatar, Card, Icon } from "antd";
import { get, maxBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { saveChangesDashboard } from "../../actions/dashboards";
import DashboardService from "../../services/dashboard";

const AddWidgetModal = (props) => {
  const { openAddWidgetModal, handleOpenAddWidgetModal } = props;
  const { confirm } = Modal;

  const dispatch = useDispatch();
  const { widgetsBundles } = useSelector((state) => state.widgetsBundles);
  const { widgetTypes } = useSelector((state) => state.widgetTypes);
  const { openedDashboard } = useSelector((state) => state.dashboards);

  const [isShowWidgetTypes, setIsShowWidgetTypes] = useState(false);
  const [curWidgetsBundle, setCurWidgetsBundle] = useState({});

  const styleButton = {
    style: { borderRadius: "5px" },
    size: "large",
  };

  const dataBundles = widgetsBundles.map((bundle) => {
    return {
      ...bundle,
    };
  });

  const dataWidgets = [];
  widgetTypes.map((widget) => {
    if (widget.bundleAlias === curWidgetsBundle.alias) {
      dataWidgets.push({
        ...widget,
      });
    }
  });

  const handleChooseBundle = (item) => {
    setCurWidgetsBundle(item);
    setIsShowWidgetTypes(true);
  };

  const handleChooseWidget = (item) => {
    confirm({
      title: "Are you sure to add new widget?",
      centered: true,

      okText: "Yes",
      okButtonProps: {
        ...styleButton,
        icon: "check",
      },
      async onOk() {
        const curWidgets = get(
          openedDashboard,
          "dashboard.configuration.widgets",
          []
        );

        const positions = [];
        curWidgets.forEach((w) => {
          positions.push({
            y: w.y,
            h: w.h,
          });
        });

        const maxPosY = maxBy(positions, "y");
        const newPosition = {
          x: 0,
          y: maxPosY ? (maxPosY.y + maxPosY.h) : 0,
        };

        const itemDescriptor = JSON.parse(item.descriptor);
        const formattedWidget = {
          typeAlias: item.alias,
          x: newPosition.x,
          y: newPosition.y,
          w: itemDescriptor.sizeX,
          h: itemDescriptor.sizeY,
        };

        const newWidgets = [...curWidgets, formattedWidget];
        const data = {
          dashboardId: get(openedDashboard, "dashboard.id"),
          widgets: newWidgets,
        };
        try {
          dispatch(saveChangesDashboard(data));
        } catch (e) {
          message.error(e.response.data.message);
          return;
        }
        message.success("Add widget successfully");
        handleOpenAddWidgetModal(false);
      },

      cancelButtonProps: styleButton,
      onCancel() {},
    });
  };

  return (
    <Modal
      title={
        isShowWidgetTypes ? (
          <div>
            <a onClick={() => setIsShowWidgetTypes(false)}>
              <Icon type="left" />
            </a>
            <span className="m-l-10">
              {curWidgetsBundle.title}: Select widget
            </span>
          </div>
        ) : (
          "Select widgets bundle"
        )
      }
      visible={openAddWidgetModal}
      onCancel={() => handleOpenAddWidgetModal(false)}
      bodyStyle={{
        backgroundColor: "whitesmoke",
        height: 800,
        overflow: "scroll",
      }}
      centered={true}
      width={1200}
      footer={null}
      closable={false}
      destroyOnClose={true}
    >
      {isShowWidgetTypes ? (
        <List
          key={"widget_types"}
          grid={{
            column: 2,
            gutter: 16,
          }}
          dataSource={dataWidgets}
          renderItem={(item) => (
            <List.Item>
              <Card hoverable onClick={() => handleChooseWidget(item)}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={128}
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  }
                  title={<a>{item.name}</a>}
                  description={item.description}
                />
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <List
          key={"widgets_bundles"}
          grid={{
            column: 2,
            gutter: 16,
          }}
          dataSource={dataBundles}
          renderItem={(item) => (
            <List.Item>
              <Card hoverable onClick={() => handleChooseBundle(item)}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={128}
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  }
                  title={<a>{item.title}</a>}
                  description={item.description}
                />
              </Card>
            </List.Item>
          )}
        />
      )}
      ,
    </Modal>
  );
};

export default AddWidgetModal;
