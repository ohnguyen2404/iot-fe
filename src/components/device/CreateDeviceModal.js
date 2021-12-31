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
import Password from "antd/lib/input/Password";

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

const CreateDeviceModal = (props) => {
  const { openCreateDevice, handleOpenCreateDevice } = props;
  const { getFieldDecorator } = props.form;
  const [credentialsType, setCredentialsType] = useState(
    constant.DEVICE_CREDENTIALS_TYPE_ACCESS_TOKEN
  );

  const styleButton = {
    style: { borderRadius: "5px" },
    size: "large",
  };

  const isTypeAccessToken =
    credentialsType === constant.DEVICE_CREDENTIALS_TYPE_ACCESS_TOKEN;
  const isTypeX509 = credentialsType === constant.DEVICE_CREDENTIALS_TYPE_X_509;
  const isTypeMqttBasic =
    credentialsType === constant.DEVICE_CREDENTIALS_TYPE_MQTT_BASIC;

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

        console.log("values", values);
        try {
          const { name, label } = values;
          const requestBody = {
            name,
            label,
            credentialsType,
            credentialsValue,
          };
          console.log("requestBody", requestBody);
          await DeviceService.create(requestBody);
        } catch (e) {
          message.error(e.response.data.message);
          return;
        }
        message.success("Create device successfully!");
        props.form.resetFields();
        handleOpenCreateDevice(false);
      }
    });
  };

  const handleSelectCredentialsType = (type) => {
    setCredentialsType(type[0]);
  };

  return (
    <Modal
      title={<h2>Create Device</h2>}
      visible={openCreateDevice}
      onOk={handleCreateDeviceSubmit} //submit form here
      okText={"Create"}
      okButtonProps={styleButton}
      onCancel={() => handleOpenCreateDevice(false)}
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
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Label">
              {getFieldDecorator("label", {})(<Input />)}
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
                initialValue: [constant.DEVICE_CREDENTIALS_TYPE_ACCESS_TOKEN],
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
                {getFieldDecorator("accessToken", {})(<Input />)}
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

export default Form.create({ name: "create_device_form" })(CreateDeviceModal);
