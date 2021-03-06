import * as React from "react";
import {Button, Checkbox, Form, Icon, Input} from 'antd';
import {Link} from 'react-router-dom';

class LognForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input
                            prefix={<Icon type="user"
                                          style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock"
                                          style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <Link className="login-form-forgot" to="" style={{float: 'right'}}>
                        Forgot password</Link>

                    <br/>
                    <Button type="primary" htmlType="submit" style={{width: '40%'}}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>

        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(LognForm);

export default WrappedNormalLoginForm;

