import React, { useEffect, useState } from "react";
import { Form, Input, message, Modal, Button } from "antd";
import DashboardService from "../../services/dashboard";
import { find } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateDashboard, openDashboard } from "../../actions/dashboards";

const InfoDashboardModal = (props) => {
  const { openDashboardModal, dashboardId, setOpenInfoModal } = props;
  const [dashboardInfo, setDashboardInfo] = useState({});
  const [isInfoChanged, setIsInfoChanged] = useState(false);

  const dispatch = useDispatch();
  const { dashboards } = useSelector((state) => state.dashboards);

  useEffect(() => {
    const loadDashboard = async () => {
      if (dashboardId) {
        const dashboard = find(dashboards, { id: dashboardId });
        setDashboardInfo(dashboard);
      }
    };
    loadDashboard();
  }, []);
  const { getFieldDecorator } = props.form;
  const { confirm } = Modal;
  const styleButton = {
    style: { borderRadius: "5px" },
    size: "large",
  };

  const handleUpdateDashboardSubmit = async (e) => {
    e.preventDefault();
    confirm({
      title: "Are you sure to save Dashboard information?",
      centered: true,

      okText: "Yes",
      okButtonProps: {
        ...styleButton,
        icon: "check",
      },
      onOk() {
        props.form.validateFields(
          ["title", "description"],
          async (err, values) => {
            if (!err) {
              console.log("Received values of form: ", values);
              try {
                const updatedDashboard = await DashboardService.update(
                  dashboardId,
                  values
                );
                dispatch(updateDashboard(updatedDashboard));
              } catch (e) {
                message.error("Update dashboard failed!");
                return;
              }
              message.success("Update dashboard successfully!");
              setOpenInfoModal(false);
            }
          }
        );
      },

      cancelButtonProps: styleButton,
      onCancel() {},
    });
  };

  const handleInfoChange = (e) => {
    const values = props.form.getFieldsValue();
    console.log("values", values);
    if (
      values.title !== dashboardInfo.title ||
      values.description !== dashboardInfo.description
    ) {
      setIsInfoChanged(true);
    } else {
      setIsInfoChanged(false);
    }
  };

  return (
    <Modal
      title={<h2>Dashboard Information</h2>}
      visible={openDashboardModal}
      onOk={handleUpdateDashboardSubmit}
      okText={"Save"}
      onCancel={() => setOpenInfoModal(false)}
      cancelButtonProps={styleButton}
      centered={true}
      okButtonProps={{ disabled: !isInfoChanged, ...styleButton }}
      destroyOnClose={true}
    >
      <div>
        <Button
          type="primary"
          onClick={() =>
            dispatch(openDashboard({ isOpen: true, dashboard: dashboardInfo }))
          }
        >
          Open dashboard
        </Button>
      </div>
      <br/>
      <Form
        className="info_dashboard_form"
        layout="vertical"
        onChange={handleInfoChange}
      >
        <Form.Item label="Title">
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please input your title!",
                whitespace: true,
              },
            ],
            initialValue: dashboardInfo.title,
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator("description", {
            rules: [
              {
                whitespace: true,
              },
            ],
            initialValue: dashboardInfo.description,
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create({ name: "info_dashboard_form" })(InfoDashboardModal);
