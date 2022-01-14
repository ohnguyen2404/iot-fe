import React from "react";
import {Form, Input, message, Modal} from "antd";
import TextArea from "antd/lib/input/TextArea";

const CreateRuleNodeModal = (props) => {
    const {openCreateRuleNode, handleOpenCreateRuleNode, newNode, setNewNode} = props;

    const {getFieldDecorator} = props.form;

    const styleButton = {
        style: {borderRadius: "5px"},
        size: "large",
    };

    const handleCreateRuleNodeSubmit = async (e) => {
        e.preventDefault();
        props.form.validateFields(
            [
                "name",
                "configuration"
            ],
            async (err, values) => {
                if (!err) {
                    console.log("Received values of form: ", values);
                    try {
                        newNode.data = {
                            label: values.name,
                            configuration: values.configuration,
                            type: "typeTest"
                        }
                        setNewNode(newNode)
                    } catch (e) {
                        message.error(e.response.data.message);
                        return;
                    }
                    message.success("Create rule node successfully!");
                    props.form.resetFields();
                    handleOpenCreateRuleNode(false);
                }
            }
        );
    };

    return (
        <Modal
            title={<h2>Create Rule Node</h2>}
            visible={openCreateRuleNode}
            onOk={handleCreateRuleNodeSubmit}
            okText={"Create"}
            okButtonProps={styleButton}
            onCancel={() => handleOpenCreateRuleNode(false)}
            cancelButtonProps={styleButton}
            centered={true}
            bodyStyle={{overflowY: "scroll", height: "600px"}}
        >
            <Form className="create_rule_node_form" layout="horizontal">
                <Form.Item label="Name" >
                    {getFieldDecorator("name", {
                        rules: [
                            {
                                required: true,
                                message: "Please input rule node name!",
                                whitespace: true,
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="Configuration" className="m-b-10 m-t-15">
                    {
                        getFieldDecorator('configuration', {
                            initialValue: ""
                        })(
                            <TextArea/>
                        )
                    }
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Form.create({name: "create_rule_node_form"})(
    CreateRuleNodeModal
);
