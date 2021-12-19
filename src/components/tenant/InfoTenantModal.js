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
import TenantService from "../../services/tenant";

const { Option } = Select;

const InfoTenantModal = (props) => {
  const { openTenantModal, tenantId, handleOpenModal } = props;
  const [tenantInfo, setTenantInfo] = useState({});
  const [isInfoChanged, setIsInfoChanged] = useState(false);

  useEffect(() => {
    const loadTenant = async () => {
      if (tenantId) {
        const tenantInfo = await TenantService.getById(tenantId);
        setTenantInfo(tenantInfo);
      }
    };
    loadTenant();
  }, [tenantId]);
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

  const handleUpdateTenantSubmit = async (e) => {
    e.preventDefault();
    confirm({
      title: "Are you sure to save tenant profile?",
      centered: true,

      okText: "Yes",
      okButtonProps: {
        ...styleButton,
        icon: "check",
      },
      onOk() {
        props.form.validateFields(
          ["email", "title", "country", "city", "address", "phone"],
          async (err, values) => {
            if (!err) {
              console.log("Received values of form: ", values);
              try {
                await TenantService.update(tenantId, values);
              } catch (e) {
                message.error("Update tenant failed!");
                return;
              }
              message.success("Update tenant successfully!");
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
      values.email !== tenantInfo.email ||
      values.title !== tenantInfo.title ||
      values.country !== tenantInfo.country ||
      values.city !== tenantInfo.city ||
      values.address !== tenantInfo.address ||
      values.phone !== tenantInfo.phone
    ) {
      setIsInfoChanged(true);
    } else {
      setIsInfoChanged(false);
    }
  };

  return (
    <Modal
      title={<h2>Tenant Information</h2>}
      visible={openTenantModal}
      onOk={handleUpdateTenantSubmit}
      okText={"Save"}
      okButtonProps={styleButton}
      onCancel={() => handleOpenModal(false)}
      okButtonProps={{ disabled: !isInfoChanged }}
      cancelButtonProps={styleButton}
      centered={true}
    >
      <Form
        className="info_tenant_form"
        layout="vertical"
        onChange={handleInfoChange}
      >
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                message: "Please input your E-mail!",
              },
            ],
            initialValue: tenantInfo.email,
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Title&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("title", {
            rules: [
              {
                message: "Please input your title!",
                whitespace: true,
              },
            ],
            initialValue: tenantInfo.title,
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Country">
          {getFieldDecorator("country", {
            rules: [
              {
                message: "Please input your country!",
              },
            ],
            initialValue: tenantInfo.country,
          })(<Input />)}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator("city", {
            rules: [
              {
                message: "Please input your city!",
              },
            ],
            initialValue: tenantInfo.city,
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Address">
          {getFieldDecorator("address", {
            rules: [
              {
                message: "Please input your address!",
              },
            ],
            initialValue: tenantInfo.address,
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              {
                message: "Please input your phone number!",
              },
            ],
            initialValue: tenantInfo.phone,
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create({ name: "info_tenant_form" })(InfoTenantModal);