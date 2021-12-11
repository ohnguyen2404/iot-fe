import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../static/images/logo.png';
import LayoutLogin from '../components/LayoutLogin';
import {Button, Checkbox, Form, Icon, Input} from 'antd';
import {useDispatch} from "react-redux";
import {login} from "../actions/auth";

const Login = (props) => {
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                dispatch(login(values.email, values.password))
                    .then(() => {
                        props.history.push("/dashboard")
                        window.location.reload()
                    })
            }
        });
    };

    const {getFieldDecorator} = props.form;

    return (
        <LayoutLogin title="login" classname="login">
            <div
                className="d-flex align-items-center justify-content-center flex-column"
                style={{maxWidth: '360px', margin: 'auto', height: '100vh'}}
            >
                <div className="text-center">
                    <img src={logo} alt={""}/>
                    <h1 className="m-b-30 m-t-15">Ant Dashboard</h1>
                </div>
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    type: "email",
                                    message: 'Please input your email!'
                                },
                            ],
                        })(
                            <Input
                                prefix={
                                    <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
                                }
                                placeholder="Email"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {required: true, message: 'Please input your Password!'},
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
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <Link className="float-right" to="">
                            Forgot password
                        </Link>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="btn-block m-t-15"
                            size="large"
                        >
                            Log in
                            {/*<Link to="/dashboard">Log in</Link>*/}
                        </Button>
                        <p>
                            Need an account? <Link to="/register"><a>Signup</a></Link>
                        </p>

                    </Form.Item>
                </Form>
            </div>
        </LayoutLogin>
    );
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(Login);

export default WrappedNormalLoginForm;
