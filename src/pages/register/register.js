import React from 'react';
import logo from '../../static/images/logo.png';
import LayoutLogin from '../../components/layout/LayoutLogin';
import {Button, Form, Icon, Input} from 'antd';
import {useDispatch} from "react-redux";
import {register} from "../../actions/auth";

const Register = (props) => {
    const dispatch = useDispatch()

    const compareToFirstPassword = (rule, value, callback) => {
        const {form} = props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                dispatch(register(values.email, values.firstName, values.lastName, values.password))
                    .then(() => {
                        props.history.push("/")
                        window.location.reload()
                    })
            }
        });
    };

    const {getFieldDecorator} = props.form;

    return (
        <LayoutLogin title="assets" classname="login">
            <div
                className="d-flex align-items-center justify-content-center flex-column"
                style={{maxWidth: '360px', margin: 'auto', height: '100vh'}}
            >
                <div className="text-center">
                    <img src={logo} alt=""/>
                    <h1 className="m-b-30 m-t-15">Ant design</h1>
                </div>
                <Form onSubmit={handleSubmit} className="register-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{
                                required: true,
                                message: 'Please input your email!'
                            }],
                        })(
                            <Input
                                prefix={
                                    <Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>
                                }
                                placeholder="Email"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('firstName', {
                            rules: [{required: true, message: 'Please input your first name!'}],
                        })(
                            <Input
                                prefix={
                                    <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
                                }
                                placeholder="First name"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('lastName', {
                            rules: [{required: true, message: 'Please input your last name!'}],
                        })(
                            <Input
                                prefix={
                                    <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
                                }
                                placeholder="Last name"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {required: true, message: 'Please input your password!'},
                            ],
                        })(
                            <Input.Password
                                prefix={
                                    <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>
                                }
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {required: true, message: 'Please input your confirm password!'},
                                {validator: compareToFirstPassword,}
                            ],
                        })(
                            <Input.Password
                                prefix={
                                    <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>
                                }
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="btn-block m-t-15"
                            size="large"
                        >
                            Register
                            {/*<Link href="/">Register</Link>*/}
                        </Button>
                        <span>
                            Already have an account?
                            <a className="m-l-5" href="/">
                                Log in
                            </a>
                        </span>

                    </Form.Item>
                </Form>
            </div>
        </LayoutLogin>
    );
}

export default Form.create({name: 'normal_login'})(Register);
