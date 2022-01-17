import React, { useState } from "react";
import { message, Modal, List, Avatar, Card, Icon } from "antd";
import { useDispatch, useSelector } from "react-redux";

const AddWidgetModal = (props) => {
  const { openAddWidgetModal, setOpenAddWidgetModal } = props;
  const { confirm } = Modal;

  const dispatch = useDispatch();
  const { widgetsBundles } = useSelector((state) => state.widgetsBundles);
  const { widgetTypes } = useSelector((state) => state.widgetTypes);

  const [curWidgetTypes, setCurWidgetTypes] = useState([]);
  const [isShowWidgetTypes, setIsShowWidgetTypes] = useState(false);
  const [curWidgetsBundle, setCurWidgetsBundle] = useState({});

  const styleButton = {
    style: { borderRadius: "5px" },
    size: "large",
  };

  const dataBundles = widgetsBundles.map((bundle) => {
    return {
      title: bundle.title,
      description: bundle.description,
      alias: bundle.alias,
    };
  });

  const dataWidgets = [];
  widgetTypes.map((widget) => {
    if (widget.bundleAlias === curWidgetsBundle.alias) {
      dataWidgets.push({
        name: widget.name,
        description: widget.description,
        alias: widget.alias,
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
      onOk() {
        console.log("OK");
      },

      cancelButtonProps: styleButton,
      onCancel() {
        console.log("CANCEL");
      },
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
      onCancel={() => setOpenAddWidgetModal(false)}
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
