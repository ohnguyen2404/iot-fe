import React, {useEffect, useState} from "react";
import {Form, Modal} from "antd";
import EmptyConfiguration from "./EmptyConfiguration";
import SaveTsConfiguration from "./SaveTsConfiguration";
import DebugConfiguration from "./DebugConfiguration";
import SendEmailConfiguration from "./SendEmailConfiguration";
import FunctionConfiguration from "./FunctionConfiguration";
import FilterConfiguration from "./FilterConfiguration";
import CreateAlarmConfiguration from "./CreateAlarmConfiguration";

const CreateRuleNodeModal = (props) => {
    const {openCreateRuleNode, setOpenCreateRuleNode, newNode, setNewNode, ruleNodeDescriptor} = props;

    const [name, setName] = useState(null)
    const [config, setConfig] = useState(null)
    const [submitForm, setSubmitForm] = useState(false)
    const [submitDone, setSubmitDone] = useState(false)

    const styleButton = {
        style: {borderRadius: "5px"},
        size: "large",
    };

    const handleCreateRuleNodeSubmit = (e) => {
        e.preventDefault();

        setSubmitForm(true)
    }

    useEffect(() => {
        if (submitDone) {
            newNode.data = {
                label: name,
                config: config,
                clazz: ruleNodeDescriptor?.clazz
            }

            setNewNode(newNode);
            setOpenCreateRuleNode(false);

            setSubmitDone(false)
        }
    }, [submitDone])

    const handleRenderConfig = () => {
        const clazzName = ruleNodeDescriptor?.configClazz.split('.').pop();
        switch (clazzName) {
            // TODO: Save cases into enum
            case "EmptyConfiguration":
                return <EmptyConfiguration setName={setName}
                                           setConfig={setConfig}
                                           submitForm={submitForm}
                                           setSubmitForm={setSubmitForm}
                                           setSubmitDone={setSubmitDone}
                                           form={props.form}/>
            case "SaveTsConfiguration":
                return <SaveTsConfiguration setName={setName}
                                            setConfig={setConfig}
                                            submitForm={submitForm}
                                            setSubmitForm={setSubmitForm}
                                            setSubmitDone={setSubmitDone}
                                            defaultConfig={JSON.parse(ruleNodeDescriptor?.defaultConfig)}
                                            form={props.form}/>
            case "DebugConfiguration":
                return <DebugConfiguration setName={setName}
                                           setConfig={setConfig}
                                           submitForm={submitForm}
                                           setSubmitForm={setSubmitForm}
                                           setSubmitDone={setSubmitDone}
                                           defaultConfig={JSON.parse(ruleNodeDescriptor?.defaultConfig)}
                                           form={props.form}/>
            case "SendEmailConfiguration":
                return <SendEmailConfiguration setName={setName}
                                               setConfig={setConfig}
                                               submitForm={submitForm}
                                               setSubmitForm={setSubmitForm}
                                               setSubmitDone={setSubmitDone}
                                               defaultConfig={JSON.parse(ruleNodeDescriptor?.defaultConfig)}
                                               form={props.form}/>
            case "FunctionConfiguration":
                return <FunctionConfiguration setName={setName}
                                              setConfig={setConfig}
                                              submitForm={submitForm}
                                              setSubmitForm={setSubmitForm}
                                              setSubmitDone={setSubmitDone}
                                              defaultConfig={JSON.parse(ruleNodeDescriptor?.defaultConfig)}
                                              form={props.form}/>
            case "FilterConfiguration":
                return <FilterConfiguration setName={setName}
                                            setConfig={setConfig}
                                            submitForm={submitForm}
                                            setSubmitForm={setSubmitForm}
                                            setSubmitDone={setSubmitDone}
                                            defaultConfig={JSON.parse(ruleNodeDescriptor?.defaultConfig)}
                                            form={props.form}/>
            case "CreateAlarmConfiguration":
                return <CreateAlarmConfiguration setName={setName}
                                                 setConfig={setConfig}
                                                 submitForm={submitForm}
                                                 setSubmitForm={setSubmitForm}
                                                 setSubmitDone={setSubmitDone}
                                                 defaultConfig={JSON.parse(ruleNodeDescriptor?.defaultConfig)}
                                                 form={props.form}/>
        }
    }

    return (
        <Modal
            title={<h2>Create node: {ruleNodeDescriptor?.name}</h2>}
            visible={openCreateRuleNode}
            onOk={handleCreateRuleNodeSubmit}
            okText={"Create"}
            okButtonProps={styleButton}
            onCancel={() => setOpenCreateRuleNode(false)}
            cancelButtonProps={styleButton}
            centered={true}
            bodyStyle={{overflowY: "scroll", height: "600px"}}
            destroyOnClose={true}
        >

            <Form className="create_empty_config_node_form" layout="horizontal">
                {
                    handleRenderConfig()
                }
            </Form>
        </Modal>
    );
};

export default Form.create({name: "create_rule_node_form"})(
    CreateRuleNodeModal
);