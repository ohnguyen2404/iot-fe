import React, { useState, useEffect } from "react";
import {
  Form,
  Icon,
  Input,
  Modal,
  Button,
  Select,
  Tooltip,
  message,
  Tabs,
  Cascader,
  Row,
  Col,
} from "antd";
import constant from "../../helpers/constants";
import Clipboard from "../clipboard/clipboard";
import { DeviceService } from "../../services";
import { get } from "lodash";
import ManageCredentials from "../device-credentials/ManageCredentials";

const { TabPane } = Tabs;

const InfoDeviceModal = (props) => {
  const { openInfoModal, handleOpenModal, deviceId } = props;
  const { getFieldDecorator } = props.form;

  const [deviceInfo, setDeviceInfo] = useState({});
  const [openManageCredentialsModal, setOpenManageCredentialsModal] =
    useState(false);

  const handleOpenCredentialsModal = (value) => {
    setOpenManageCredentialsModal(value);
  };

  const styleButton = {
    style: { borderRadius: "5px" },
    size: "large",
  };

  useEffect(() => {
    const loadDevice = async () => {
      if (deviceId) {
        const deviceInfo = await DeviceService.getById(deviceId);
        setDeviceInfo(deviceInfo);
      }
    };
    loadDevice();
  }, []);

  const handleCreateDeviceSubmit = async (e) => {
    e.preventDefault();
    const fields = ["name", "label"];
    props.form.validateFields(fields, async (err, values) => {
      if (!err) {
        try {
          const { name, label } = values;
          const requestBody = {
            name,
            label,
          };
          console.log("requestBody", requestBody);
          await DeviceService.update(deviceId, requestBody);
        } catch (e) {
          message.error(e.response.data.message);
          return;
        }
        message.success("Update device successfully!");
        props.form.resetFields();
        handleOpenModal(false);
      }
    });
  };

  const _deviceName = get(deviceInfo, "device.name");
  const _deviceLabel = get(deviceInfo, "device.label");
  const _credentialsType = get(deviceInfo, "deviceCredentials.credentialsType");
  const _credentialsId = get(deviceInfo, "deviceCredentials.credentialsId");
  const _credentialsValue = get(
    deviceInfo,
    "deviceCredentials.credentialsValue"
  );

  let clipBoardText, clipBoardLabel;
  const isTypeAccessToken =
    _credentialsType === constant.DEVICE_CREDENTIALS_TYPE_ACCESS_TOKEN;
  const isTypeX509 =
    _credentialsType === constant.DEVICE_CREDENTIALS_TYPE_X_509;
  const isTypeMqttBasic =
    _credentialsType === constant.DEVICE_CREDENTIALS_TYPE_MQTT_BASIC;

  if (isTypeAccessToken) {
    clipBoardLabel = "Copy access token";
    clipBoardText = _credentialsId;
  }
  if (isTypeMqttBasic) {
    clipBoardLabel = "Copy MQTT credentials";
    clipBoardText = _credentialsValue;
  }

  return (
    <div>
      <ManageCredentials
        deviceId={deviceId}
        openManageCredentialsModal={openManageCredentialsModal}
        handleOpenCredentialsModal={handleOpenCredentialsModal}
      />
      <Modal
        title={<h2>Device Information</h2>}
        visible={openInfoModal}
        onOk={handleCreateDeviceSubmit} //submit form here
        okText={"Save"}
        okButtonProps={styleButton}
        onCancel={() => handleOpenModal(false)}
        cancelButtonProps={styleButton}
        centered={true}
      >
        <div>
          <Button
            icon="safety-certificate"
            type="primary"
            onClick={() => handleOpenCredentialsModal(true)}
          >
            Manage Credentials
          </Button>
        </div>
        <br />
        <div>
          <Clipboard
            label="Copy Device ID"
            copyText={deviceId}
          />
          {!isTypeX509 && (
            <Clipboard
              label={clipBoardLabel}
              copyText={clipBoardText}
              className="m-l-5"
            />
          )}
        </div>
        <Form className="edit_device_form" layout="vertical">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Device Details" key="1">
              <Form.Item label="Name">
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Please input device name!",
                      whitespace: true,
                    },
                  ],
                  initialValue: _deviceName,
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Label">
                {getFieldDecorator("label", {
                  initialValue: _deviceLabel,
                })(<Input />)}
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    </div>
  );
};

export default Form.create({ name: "edit_device_form" })(InfoDeviceModal);
