import * as React from 'react';
import Layouts from '../../components/layout/Layouts';
import {Button, Card, Col, Form, Icon, Input, Row, Tabs,} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import user from '../../static/images/user-profile.jpeg';
import {useSelector} from "react-redux";

const data = [
    'Branding',
    'UI/UX',
    'Web - Design',
    'Packaging',
    'Print & Editorial',
];
const {TabPane} = Tabs;

function callback(key) {
    console.log(key);
}

const Profile = (props) => {
    const {user: currentUser} = useSelector(state => state.auth);
    console.log(currentUser)

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 3},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 115},
        },
    };
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
                                        <Form className="m-t-15 m-b-20">
                                            <Form.Item label="Email" className="m-b-10 m-t-15">
                                                <Input
                                                    prefix={
                                                        <Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>
                                                    }
                                                    placeholder="Email"
                                                    value={currentUser.email}/>
                                            </Form.Item>

                                            <Form.Item label="First Name" className="m-b-10 m-t-15">
                                                <Input
                                                    prefix={
                                                        <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
                                                    }
                                                    placeholder="First Name"
                                                    value={currentUser.firstName}/>
                                            </Form.Item>

                                            <Form.Item label="Last Name" className="m-b-10 m-t-15">
                                                <Input
                                                    prefix={
                                                        <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
                                                    }
                                                    placeholder="Last Name"
                                                    value={currentUser.lastName}/>
                                            </Form.Item>

                                            <Form.Item label="Phone No" className="m-b-10 m-t-15"
                                                       htmlFor='h1'>
                                                <Input
                                                    prefix={
                                                        <Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>
                                                    }
                                                    placeholder='Phone number'
                                                />
                                            </Form.Item>

                                            <Form.Item label="Address" className="m-b-10 m-t-15">
                                                <TextArea
                                                    prefix={
                                                        <Icon type="address" style={{color: 'rgba(0,0,0,.25)'}}/>
                                                    }
                                                    placeholder="Address"
                                                />
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className="m-t-30 m-b-30 user-buttons">
                                        <Button><Icon type="message"/> Send Message</Button>
                                        <Button>Report User</Button>
                                        <Button className="float-right"><Icon type="check"/> Save</Button>
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

export default Profile;
