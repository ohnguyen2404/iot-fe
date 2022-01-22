import React, { useEffect, useState } from "react";
import { Form, Input, message, Modal } from "antd";

const InfoRelationModal = (props) => {
  const { openInfoRelation, curSelectedRelation, setOpenInfoRelation, handleChange} = props;
  const [isInfoChanged, setIsInfoChanged] = useState(false);

  const { getFieldDecorator } = props.form;
  const { confirm } = Modal;
  const styleButton = {
    style: { borderRadius: "5px" },
    size: "large",
  };

  const handleUpdateRelationSubmit = async (e) => {
    e.preventDefault();
    confirm({
      title: "Are you sure to save Relation information?",
      centered: true,

      okText: "Yes",
      okButtonProps: {
        ...styleButton,
        icon: "check",
      },
      onOk() {
        props.form.validateFields(
          ["name"],
          async (err, values) => {
            if (!err) {
              console.log("Received values of form: ", values);
              try {
                curSelectedRelation.label = values.name
                handleChange(true)
              } catch (e) {
                message.error("Can't edit relation information.");
                return;
              }
              setOpenInfoRelation(false);
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
      values.name !== curSelectedRelation.label
    ) {
      setIsInfoChanged(true);
    } else {
      setIsInfoChanged(false);
    }
  };

  return (
    <Modal
      title={<h2>Relation Information</h2>}
      visible={openInfoRelation}
      onOk={handleUpdateRelationSubmit}
      okText={"Save"}
      onCancel={() => setOpenInfoRelation(false)}
      cancelButtonProps={styleButton}
      centered={true}
      okButtonProps={{ disabled: !isInfoChanged, ...styleButton }}
      destroyOnClose={true}
    >
      <Form
        className="info_relation_form"
        layout="vertical"
        onChange={handleInfoChange}
      >
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input name!",
                whitespace: true,
              },
            ],
            initialValue: curSelectedRelation.label,
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create({ name: "info_relation_form" })(InfoRelationModal);
