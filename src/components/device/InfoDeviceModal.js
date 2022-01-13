import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Tabs } from "antd";

import constant from "../../helpers/constants";
import { DeviceService } from "../../services";
import { find, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateDevice } from "../../actions/devices";
import {
  loadLatestTelemetryByDeviceId,
  loadTelemetryByDeviceId,
} from "../../actions/telemetry";

import Clipboard from "../clipboard/clipboard";
import ManageCredentials from "../device-credentials/ManageCredentials";
import LatestTelemetry from "./LatestTelemetry";
import DeviceLineChart from "../device-charts/DeviceLineChart";
import DeviceBarChart from "../device-charts/DeviceBarChart";
import GaugesTelemetry from "../device-charts/GaugesTelemetry";

const { TabPane } = Tabs;

const InfoDeviceModal = (props) => {
  const { devices } = useSelector((state) => state.devices);

  const dispatch = useDispatch();

  const { openInfoModal, handleOpenModal, deviceId } = props;
  const { getFieldDecorator } = props.form;

  const [deviceInfo, setDeviceInfo] = useState({});
  const [isInfoChanged, setIsInfoChanged] = useState(false);

  const [hideFooter, setHideFooter] = useState(false);

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
        const device = find(devices, { id: deviceId });
        setDeviceInfo(device);
        dispatch(loadTelemetryByDeviceId(deviceId));
        dispatch(loadLatestTelemetryByDeviceId(deviceId));
      }
    };
    loadDevice();
  }, []);

  const handleInfoChange = (e) => {
    const values = props.form.getFieldsValue();
    console.log("values", values);
    if (values.name !== deviceInfo.name || values.label !== deviceInfo.label) {
      setIsInfoChanged(true);
    } else {
      setIsInfoChanged(false);
    }
  };

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
          const updatedDevice = await DeviceService.update(
            deviceId,
            requestBody
          );
          dispatch(updateDevice(updatedDevice));
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

  const _deviceName = get(deviceInfo, "name");
  const _deviceLabel = get(deviceInfo, "label");
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
        okButtonProps={{ disabled: !isInfoChanged, ...styleButton }}
        onCancel={() => handleOpenModal(false)}
        cancelButtonProps={styleButton}
        centered={true}
        width={1000}
        destroyOnClose={true}
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
          <Clipboard label="Copy Device ID" copyText={deviceId} />
          {!isTypeX509 && (
            <Clipboard
              label={clipBoardLabel}
              copyText={clipBoardText}
              className="m-l-5"
            />
          )}
        </div>
        <Form
          className="edit_device_form"
          layout="vertical"
          onChange={handleInfoChange}
        >
          <Tabs
            defaultActiveKey="1"
            onChange={(activeKey) => setHideFooter(activeKey !== "1")}
          >
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
            <TabPane tab="Latest telemetry" key="2">
              {deviceId && <LatestTelemetry />}
            </TabPane>
            <TabPane tab="Line Chart" key="3">
              {deviceId && <DeviceLineChart />}
            </TabPane>
            <TabPane tab="Bar Chart" key="4">
              {deviceId && <DeviceBarChart />}
            </TabPane>
            <TabPane tab="Gauges" key="5">
              {deviceId && <GaugesTelemetry />}
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    </div>
  );
};

export default Form.create({ name: "edit_device_form" })(InfoDeviceModal);
