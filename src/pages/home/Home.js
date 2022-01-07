import React, {useEffect, useRef, useState} from "react";
import HeaderDiv from "../../components/header/HeaderDiv";
import {Icon, Layout, Menu} from "antd";
import Dashboard from "../../components/dashboard/Dashboard";
import Profile from "../../components/profile/Profile"
import Tenants from "../../components/tenant/Tenants"
import Customers from "../../components/customer/Customers"
import Devices from "../../components/device/Devices"
import {useDispatch, useSelector} from "react-redux";
import {TRANSPORT_API_URL} from "../../config/setting";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {updateTelemetries} from "../../actions/telemetry"
import {getItem} from "../../local-storage";

const {Header, Sider, Content} = Layout;

const Home = (props) => {
    const [currentTab, setCurrentTab] = useState(1);

    const {user} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const stompClient = useRef();
    useEffect(() => {

        let socket = null;
        let recInterval = null;

        const connect = () => {
            const url = `${TRANSPORT_API_URL}/ws?token=${getItem("accessToken")}`;

            socket = new SockJS(url);

            socket.onopen = () => {
                clearInterval(recInterval)
            }
            socket.onclose = () => {
                recInterval = setInterval(() => {
                    connect()
                }, 2000)
            }
            stompClient.current = Stomp.over(socket)
            stompClient.current.debug = null;
            stompClient.current.connect('', '', onConnected, onError);
        }

        function onConnected() {
            // Subscribe to the Public Topic
            console.log("Connected to WebSocket")
            stompClient.current.subscribe(`/topic/telemetry-${user.id}`, onMessageReceived);
            stompClient.current.reconnect_relay = 10000
        }

        const onMessageReceived = (payload) => {
            const message = JSON.parse(payload.body);
            const newTelemetries = message.kvs.map((kv) => {
                return {
                    entityId: message.entityId,
                    ...kv
                }
            })
            dispatch(updateTelemetries(newTelemetries));
        }

        const onError = (err) => {
            console.log(err);
        }

        connect();
    }, [user.id]);

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
