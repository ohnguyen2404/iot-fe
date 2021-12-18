import * as React from 'react';
import {useState} from 'react';
import Layouts from '../../components/layout/Layouts';
import {Button, Card, Col, Form, Icon, Input, message, Row} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import user from '../../static/images/user-profile.jpeg';
import {useDispatch, useSelector} from "react-redux";

const Profile = (props) => {
    const {user: currentUser} = useSelector(state => state.auth);

    const [isChanged, setIsChanged] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const values = props.form.getFieldsValue()
        if (values.email !== currentUser.email
            || values.firstName !== currentUser.firstName
            || values.lastName !== currentUser.lastName) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

            } else {
                message.error(err)
            }
        });
    }

    const {getFieldDecorator} = props.form

    return (
        <Layouts title="profile">
            <Row>
                <Col xs={16}>
                    <Card bordered={false} className="profile-details">
                        <Row>
                            <Col sm={10} md={8} xl={4} style={{padding: '20px'}}>
                                <div className="user-image m-b-20">
                                    <img src={user} alt={""}/>
                                </div>
                                <div className="personal-info d-flex justify-content-center">
                                    <h2>{currentUser.firstName} {currentUser.lastName}</h2>
                                </div>
                            </Col>
                            <Col sm={14} md={16} xl={20} style={{padding: '10px 20px'}}>
                                <div className="user-details">
                                    <span className="floating-icon"><Icon type="star"/></span>
                                    <div className="contact-info">
                                        <h2 className="after-underline">Contact Information</h2>

                                        <Form
                                            className="m-t-15 m-b-20"
                                            onSubmit={handleSubmit}
                                            onChange={handleChange}
                                        >

                                            <Form.Item
                                                label="Email"
                                                className="m-b-10 m-t-15"
                                                required={true}
                                            >
                                                {
                                                    getFieldDecorator('email', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please input your email!'
                                                        }],
                                                        initialValue: currentUser.email
                                                    })(
                                                        <Input
                                                            prefix={
                                                                <Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>
                                                            }
                                                            placeholder="Email"
                                                        />
                                                    )
                                                }
                                            </Form.Item>

                                            <Form.Item
                                                label="First Name"
                                                className="m-b-10 m-t-15"
                                            >
                                                {
                                                    getFieldDecorator('firstName', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please input your first name!'
                                                        }],
                                                        initialValue: currentUser.firstName
                                                    })(
                                                        <Input
                                                            prefix={
                                                                <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
                                                            }
                                                            placeholder="First name"
                                                        />
                                                    )
                                                }
                                            </Form.Item>

                                            <Form.Item
                                                label="Last Name"
                                                className="m-b-10 m-t-15"
                                            >
                                                {
                                                    getFieldDecorator('lastName', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please input your last name!'
                                                        }],
                                                        initialValue: currentUser.lastName
                                                    })(
                                                        <Input
                                                            prefix={
                                                                <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
                                                            }
                                                            placeholder="Last name"
                                                        />
                                                    )
                                                }

                                            </Form.Item>

                                            <Form.Item label="Phone Number"
                                                       className="m-b-10 m-t-15"
                                                       htmlFor='h1'
                                            >
                                                {
                                                    getFieldDecorator('phoneNumber', {
                                                        initialValue: ""
                                                    })(
                                                        <Input
                                                            prefix={
                                                                <Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>
                                                            }
                                                            placeholder='Phone number'
                                                        />
                                                    )
                                                }

                                            </Form.Item>

                                            <Form.Item label="Address" className="m-b-10 m-t-15">
                                                <TextArea
                                                    prefix={
                                                        <Icon type="address" style={{color: 'rgba(0,0,0,.25)'}}/>
                                                    }
                                                    placeholder="Address"
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                className="m-t-30 m-b-30 user-buttons"
                                            >
                                                <Button>
                                                    <Icon type="lock"/> Change Password
                                                </Button>
                                                <Button>Report User</Button>
                                                <Button
                                                    disabled={!isChanged}
                                                    style={{borderRadius: '5px'}}
                                                    className="float-right"
                                                    htmlType='submit'
                                                >
                                                    <Icon type="check"/> Save
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                </Col>

            </Row>

        </Layouts>
    );
}

export default Form.create({name: 'edit_profile'})(Profile);
