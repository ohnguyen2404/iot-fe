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
} from "antd";
import constant from "../../helpers/constants";
import { DeviceService } from "../../services";
import { get } from "lodash";

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const credentialsTypes = [
  {
    value: constant.DEVICE_CREDENTIALS_TYPE_ACCESS_TOKEN,
    label: "Access token",
  },
  {
    value: constant.DEVICE_CREDENTIALS_TYPE_X_509,
    label: "X.509",
  },
  {
    value: constant.DEVICE_CREDENTIALS_TYPE_MQTT_BASIC,
    label: "MQTT Basic",
  },
];

const InfoDeviceModal = (props) => {
  const { openDeviceModal, handleOpenModal, deviceId } = props;
  const { getFieldDecorator } = props.form;
  const [credentialsType, setCredentialsType] = useState(
    constant.DEVICE_CREDENTIALS_TYPE_ACCESS_TOKEN
  );

  const [deviceInfo, setDeviceInfo] = useState({});

  const styleButton = {
    style: { borderRadius: "5px" },
    size: "large",
  };

  useEffect(() => {
    const loadDevice = async () => {
      if (deviceId) {
        const deviceInfo = await DeviceService.getById(deviceId);
        setDeviceInfo(deviceInfo);
        const credentialsType = get(
          deviceInfo,
          "deviceCredentials.credentialsType"
        );
        setCredentialsType(credentialsType);
      }
    };
    loadDevice();
  }, []);

  const handleCreateDeviceSubmit = async (e) => {
    e.preventDefault();
    const fields = ["name", "label"];
    if (isTypeAccessToken) {
      fields.push("accessToken");
    }
    if (isTypeX509) {
      fields.push("RSAPublicKey");
    }
    if (isTypeMqttBasic) {
      fields.push("clientId", "username", "password");
    }

    props.form.validateFields(fields, async (err, values) => {
      if (!err) {
        let credentialsValue = {};
        if (isTypeAccessToken) {
          if (values.accessToken) {
            credentialsValue = {
              accessToken: values.accessToken,
            };
          }
        }

        if (isTypeX509) {
          credentialsValue = {
            RSAPublicKey: values.RSAPublicKey,
          };
        }

        if (isTypeMqttBasic) {
          const { clientId, username, password } = values;
          credentialsValue = {
            clientId,
            username,
            password,
          };
        }

        try {
          const { name, label } = values;
          const requestBody = {
            name,
            label,
            credentialsType,
            credentialsValue,
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

  const handleSelectCredentialsType = (type) => {
    setCredentialsType(type[0]);
  };

  const _deviceName = get(deviceInfo, "device.name");
  const _deviceLabel = get(deviceInfo, "device.label");
  const _credentialsType = get(deviceInfo, "deviceCredentials.credentialsType");
  const _credentialsId = get(deviceInfo, "deviceCredentials.credentialsId");
  const _credentialsValue = get(
    deviceInfo,
    "deviceCredentials.credentialsValue"
  );

  let _accessToken, _RSAPublicKey, _clientId, _username, _password;
  if (_credentialsType === constant.DEVICE_CREDENTIALS_TYPE_ACCESS_TOKEN) {
    _accessToken = _credentialsId;
  }

  if (_credentialsType === constant.DEVICE_CREDENTIALS_TYPE_X_509) {
    _RSAPublicKey = _credentialsValue;
  }

  if (_credentialsType === constant.DEVICE_CREDENTIALS_TYPE_MQTT_BASIC) {
    const parseValue = JSON.parse(_credentialsValue);
    _clientId = parseValue.clientId;
    _username = parseValue.username;
    _password = parseValue.password;
  }

  const isTypeAccessToken =
    credentialsType === constant.DEVICE_CREDENTIALS_TYPE_ACCESS_TOKEN;
  const isTypeX509 = credentialsType === constant.DEVICE_CREDENTIALS_TYPE_X_509;
  const isTypeMqttBasic =
    credentialsType === constant.DEVICE_CREDENTIALS_TYPE_MQTT_BASIC;

  return (
    <Modal
      title={<h2>Device Information</h2>}
      visible={openDeviceModal}
      onOk={handleCreateDeviceSubmit} //submit form here
      okText={"Save"}
      okButtonProps={styleButton}
      onCancel={() => handleOpenModal(false)}
      cancelButtonProps={styleButton}
      centered={true}
    >
      <Form className="create_device_form" layout="vertical">
        <Tabs defaultActiveKey="1">
          <TabPane tab="1. Device Details" key="1">
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

          <TabPane tab="2. Device Credentials (optional)" key="2">
            <Form.Item label="Credentials Type">
              {getFieldDecorator("credentialsType", {
                rules: [
                  {
                    required: true,
                    message: "Please select credentials type!",
                  },
                ],
                initialValue: [_credentialsType],
              })(
                <Cascader
                  options={credentialsTypes}
                  onChange={handleSelectCredentialsType}
                />
              )}
            </Form.Item>
            {isTypeAccessToken && (
              <Form.Item
                label={
                  <span>
                    Access token&nbsp;
                    <Tooltip title="Access token will be automatically generated if you don't provide.">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator("accessToken", {
                  initialValue: _accessToken,
                })(<Input />)}
              </Form.Item>
            )}
            {isTypeX509 && (
              <Form.Item label="RSA public key">
                {getFieldDecorator("RSAPublicKey", {
                  rules: [
                    {
                      required: true,
                      message: "Please input device RSA public key!",
                    },
                  ],
                  initialValue: _RSAPublicKey,
                })(<TextArea />)}
              </Form.Item>
            )}
            {isTypeMqttBasic && (
              <div>
                <Form.Item label="Client ID">
                  {getFieldDecorator("clientId", {
                    rules: [
                      {
                        required: true,
                        message: "Please input MQTT clientId!",
                      },
                    ],
                    initialValue: _clientId,
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Username">
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        message: "Please input MQTT Username!",
                      },
                    ],
                    initialValue: _username,
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Password">
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input MQTT Password!",
                      },
                    ],
                    initialValue: _password,
                  })(<Input.Password />)}
                </Form.Item>
              </div>
            )}
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  );
};

export default Form.create({ name: "create_device_form" })(InfoDeviceModal);
