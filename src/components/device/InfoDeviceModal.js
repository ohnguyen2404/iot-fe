import React, { useState, useEffect } from "react";
import {
  Form,
  Icon,
  Input,
  Modal,
  Select,
  Tooltip,
  message,
} from "antd";
import DeviceService from "../../services/device";

const { Option } = Select;

const InfoDeviceModal = (props) => {
  const { openDeviceModal, deviceId, handleOpenModal } = props;
  const [deviceInfo, setDeviceInfo] = useState({});
  const [isInfoChanged, setIsInfoChanged] = useState(false);

  useEffect(() => {
    const loadDevice = async () => {
      if (deviceId) {
        const deviceInfo = await DeviceService.getById(deviceId);
        setDeviceInfo(deviceInfo);
      }
    };
    loadDevice();
  }, [deviceId]);
  const { getFieldDecorator } = props.form;
  const { confirm } = Modal;
  const styleButton = {
    style: { borderRadius: "5px" },
    size: "large",
  };

  const prefixSelector = getFieldDecorator("prefix", {
    initialValue: "84",
  })(
    <Select style={{ width: 70 }}>
      <Option value="84">+84</Option>
      <Option value="85">+85</Option>
    </Select>
  );

  const handleUpdateDeviceSubmit = async (e) => {
    e.preventDefault();
    confirm({
      title: "Are you sure to save device profile?",
      centered: true,

      okText: "Yes",
      okButtonProps: {
        ...styleButton,
        icon: "check",
      },
      onOk() {
        props.form.validateFields(
          ["name", "label"],
          async (err, values) => {
            if (!err) {
              console.log("Received values of form: ", values);
              try {
                await DeviceService.update(deviceId, values);
              } catch (e) {
                message.error(e.response.data.message);
                return;
              }
              message.success("Update device successfully!");
              handleOpenModal(false);
            }
          }
        );
      },

      cancelButtonProps: styleButton,
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleInfoChange = (e) => {
    const values = props.form.getFieldsValue();
    console.log('values', values);
    if (
      values.name !== deviceInfo.name ||
      values.label !== deviceInfo.label
    ) {
      setIsInfoChanged(true);
    } else {
      setIsInfoChanged(false);
    }
  };

  return (
    <Modal
      title={<h2>Device Information</h2>}
      visible={openDeviceModal}
      onOk={handleUpdateDeviceSubmit}
      okText={"Save"}
      okButtonProps={styleButton}
      onCancel={() => handleOpenModal(false)}
      okButtonProps={{ disabled: !isInfoChanged }}
      cancelButtonProps={styleButton}
      centered={true}
      bodyStyle={{overflowY: 'scroll', height: '600px'}}
    >
      <Form
        className="info_device_form"
        layout="vertical"
        onChange={handleInfoChange}
      >
        <Form.Item
          label="Name"
        >
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input device name!",
                whitespace: true,
              },
            ],
            initialValue: deviceInfo.name
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label="Label"
        >
          {getFieldDecorator("label", {
            initialValue: deviceInfo.label,
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create({ name: "info_device_form" })(InfoDeviceModal);
