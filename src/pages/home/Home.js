import React, {useEffect, useRef, useState} from "react";
import HeaderDiv from "../../components/header/HeaderDiv";
import {Icon, Layout, Menu} from "antd";
import Dashboard from "../../pages/dashboard/Dashboard";
import Profile from "../../pages/profile/Profile"
import Tenants from "../../pages/tenants/Tenants"
import Customers from "../../pages/customers/Customers"
import Devices from "../../pages/devices/Devices"
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {TRANSPORT_API_URL} from "../../config/setting";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {updateDeviceTelemetry} from "../../actions/devices";

const {Header, Sider, Content} = Layout;

const Home = (props) => {
    const [currentTab, setCurrentTab] = useState(1);

    const {user, isLoggedIn} = useSelector((state) => state.auth);
    const {devices} = useSelector(state => state.devices);

    const dispatch = useDispatch();

    const stompClient = useRef();
    useEffect(() => {
        const connect = () => {
            const url = `${TRANSPORT_API_URL}/ws?token=${localStorage.getItem("accessToken")}`;

            const socket = new SockJS(url);
            stompClient.current = Stomp.over(socket)
            stompClient.current.debug = null;
            stompClient.current.connect('', '', onConnected, onError);
        }

        function onConnected() {
            console.log("Connected to WebSocket")
            // Subscribe to the Public Topic
            stompClient.current.subscribe(`/topic/telemetry-${user.id}`, onMessageReceived);
        }

        const onMessageReceived = (payload) => {
            const message = JSON.parse(payload.body);
            console.log(message);

            const updatedDevice = devices.find(device => device.id === message.deviceId);
            const updatedDevices = devices.filter(device => device.id !== message.deviceId);

            updatedDevice.tvs = [...message.kvs]
            updatedDevices.push(updatedDevice);

            dispatch(updateDeviceTelemetry(updatedDevices));
        }

        const onError = (err) => {
            console.log(err);
        }

        connect();
    }, [user.id]);

    if (!isLoggedIn) {
        return <Redirect to="/login"/>;
    }

    const renderTab = () => {
        switch (Number(currentTab)) {
            case 1:
                return (<Dashboard/>)
            case 2:
                return (<Profile/>)
            case 3:
                return (<Devices/>)
            case 4:
                return (<Tenants/>)
            case 5:
                return (<Customers/>)
        }
    };

    const onChangeTab = (tab) => {
        setCurrentTab(tab.key);
    };

    return (
        <Layout className={`${props.classname}`}>
            <Sider style={{background: "#fff"}} className="sidebar-left">
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={[currentTab]}
                    onSelect={onChangeTab}
                >
                    <Menu.Item key="1">
                        <div>
                            <Icon type="dashboard"/>
                            <span>Dashboard</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <div>
                            <Icon type="profile"/>
                            <span>Profile</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <div>
                            <Icon type="sliders"/>
                            <span>Devices</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <div>
                            <Icon type="apartment"/>
                            <span>Tenants</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <div>
                            <Icon type="user"/>
                            <span>Customers</span>
                        </div>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="headerTop">
                    <HeaderDiv/>
                </Header>
                <Content
                    style={{
                        padding: 24,
                        minHeight: "100vh",
                    }}
                    className={"mainContent"}
                >
                    <Layout>
                        {renderTab()}
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Home;
