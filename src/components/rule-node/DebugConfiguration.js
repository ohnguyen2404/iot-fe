import React, {useEffect, useState} from "react";
import {Form, Input, message} from "antd";
import CodeEditor from "../code-editor/CodeEditor";

const DebugConfiguration = (props) => {
    const {
        setName,
        setConfig,
        submitForm,
        setSubmitForm,
        setSubmitDone,
        form,
        defaultConfig
    } = props;

    const [script, setScript] = useState(defaultConfig.script)

    const {getFieldDecorator} = form;
    useEffect(() => {
        if (submitForm) {
            form.validateFields(
                [
                    "name"
                ],
                (err, values) => {
                    if (!err) {
                        setName(values.name);
                        setConfig(
                            JSON.stringify({
                                script: script
                            })
                        );

                        message.success("Create rule node successfully!");
                        form.resetFields();

                        setSubmitDone(true)
                    }
                    setSubmitForm(false)
                }
            );
        }
    }, [submitForm])

    return (
        <>
            <Form.Item label="Name">
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
            {/*<Form.Item label="function debug(msg, msgType) {" className="m-b-10 m-t-15" colon={false}>*/}
            {/*    {*/}
            {/*        getFieldDecorator('script', {*/}
            {/*            initialValue: defaultConfig.script*/}
            {/*        })(*/}
            {/*            <TextArea*/}
            {/*                rows={4}*/}
            {/*            />*/}
            {/*        )*/}
            {/*    }*/}

            {/*</Form.Item>*/}
            {/*}*/}
            <h4>function debug(msg, msgType) {`{`}</h4>
            <CodeEditor script={script} setScript={setScript}/>
            <h4>}</h4>
        </>
    );
};

export default DebugConfiguration

