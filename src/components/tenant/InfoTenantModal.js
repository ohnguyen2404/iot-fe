import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Modal, Button, Select, Tooltip } from "antd";
import TenantService from "../../services/tenant";

const { Option } = Select;

const InfoTenantModal = (props) => {
  const { openTenantModal, tenantId, handleOpenModel } = props;
  const [tenantInfo, setTenantInfo] = useState({});

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

  return (
    <Modal
      title={<h2>Tenant Information</h2>}
      visible={openTenantModal}
      onOk={() => handleOpenModel(false)} //submit form here
      okText={"Save"}
      okButtonProps={styleButton}
      onCancel={() => handleOpenModel(false)}
      cancelButtonProps={styleButton}
      centered={true}
    >
      <Form
        //onSubmit={this.handleSubmit}
        className="info_tenant_form"
        layout="vertical"
        //{...formItemLayout}
      >
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
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
                required: true,
                message: "Please input your title!",
                whitespace: true,
              },
            ],
            initialValue: tenantInfo.title
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Country">
          {getFieldDecorator("country", {
            rules: [
              {
                required: true,
                message: "Please input your country!",
              },
            ],
            initialValue: tenantInfo.country
          })(<Input />)}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator("city", {
            rules: [
              {
                required: true,
                message: "Please input your city!",
              },
            ],
            initialValue: tenantInfo.city
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Address">
          {getFieldDecorator("address", {
            rules: [
              {
                required: true,
                message: "Please input your address!",
              },
            ],
            initialValue: tenantInfo.address
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              {
                required: true,
                message: "Please input your phone number!",
              },
            ],
            initialValue: tenantInfo.phone
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create({ name: "info_tenant_form" })(InfoTenantModal);
