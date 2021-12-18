import React from "react";
import { Form, Icon, Input, Modal, Button, Select, Tooltip, message } from "antd";
import { CustomerService } from "../../services";
const { Option } = Select;

const InfoCustomerModal = (props) => {
  const { openCreateCustomer, handleOpenCreateCustomer } = props;

  const { getFieldDecorator } = props.form;

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

  const handleCreateCustomerSubmit = async (e) => {
    e.preventDefault();
    props.form.validateFields(
      ["email", "title", "country", "city", "address", "phone", "firstName", "lastName"],
      async (err, values) => {
        if (!err) {
          values['authorities'] = ['CUSTOMER']
          console.log("Received values of form: ", values);
          try {
            await CustomerService.create(values)
          }
          catch (e) {
            message.error("Create customer failed!")
            return
          }
          message.success("Create customer successfully!")
          handleOpenCreateCustomer(false);
        }
      }
    );
  };

  return (
    <Modal
      title={<h2>Create Customer</h2>}
      visible={openCreateCustomer}
      onOk={handleCreateCustomerSubmit} //submit form here
      okText={"Create"}
      okButtonProps={styleButton}
      onCancel={() => handleOpenCreateCustomer(false)}
      cancelButtonProps={styleButton}
      centered={true}
    >
      <Form className="create_customer_form" layout="vertical">
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
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label="Firstname"
        >
          {getFieldDecorator("firstName", {
            rules: [
              {
                required: true,
                message: "Please input your Firstname!",
                whitespace: true,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label="Lastname"
        >
          {getFieldDecorator("lastName", {
            rules: [
              {
                required: true,
                message: "Please input your Lastname!",
                whitespace: true,
              },
            ],
          })(<Input />)}
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
          })(<Input />)}
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Country">
          {getFieldDecorator("country", {
            rules: [
              {
                message: "Please input your country!",
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator("city", {
            rules: [
              {
                message: "Please input your city!",
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Address">
          {getFieldDecorator("address", {
            rules: [
              {
                message: "Please input your address!",
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              {
                message: "Please input your phone number!",
              },
            ],
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create({ name: "create_customer_form" })(InfoCustomerModal);
