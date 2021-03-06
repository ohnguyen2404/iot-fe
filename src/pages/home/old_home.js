import React, {useEffect, useRef, useState} from "react"
import HeaderDiv from "../../components/header/HeaderDiv"
import {Icon, Layout, Menu} from "antd"
import HomeP from "../../components/home/Home"
import Profile from "../../components/profile/Profile"
import Tenants from "../../components/tenant/Tenants"
import Customers from "../../components/customer/Customers"
import Devices from "../../components/device/Devices"
import WidgetsBundles from "../../components/widgets-bundle/WidgetsBundles"
import Dashboards from "../../components/dashboard/Dashboards"
import {useDispatch, useSelector} from "react-redux"
import {TRANSPORT_API_URL} from "../../config/setting"
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import {updateTelemetries} from "../../actions/telemetry"
import {loadDevices} from "../../actions/devices"
import {loadCustomers} from "../../actions/customers"
import {loadTenants} from "../../actions/tenants"
import {loadWidgetsBundles} from "../../actions/widgetsBundles"
import {loadDashboards, openDashboard} from "../../actions/dashboards"
import {loadWidgetTypes} from "../../actions/widgetTypes"
import {getItem} from "../../local-storage"
import RuleChains from "../../components/rule-chain/RuleChains"
import {loadRuleChains, loadRuleNodeDescriptors, openRuleNodes} from "../../actions/ruleChains"

const {Header, Sider, Content} = Layout

const Home = (props) => {
    const [currentTab, setCurrentTab] = useState(1)

    const {user} = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const stompClient = useRef()
    useEffect(() => {
        const connect = () => {
            const url = `${TRANSPORT_API_URL}/ws?token=${getItem("accessToken")}`

            const socket = new SockJS(url)
            stompClient.current = Stomp.over(socket)
            stompClient.current.debug = null
            stompClient.current.connect("", "", onConnected, onError)
        }

        function onConnected() {
            // Subscribe to the Public Topic
            console.log("Connected to WebSocket")
            stompClient.current.subscribe(`/topic/telemetry-${user.id}`, onMessageReceived)
            stompClient.current.reconnect_relay = 10000
        }

        const onMessageReceived = (payload) => {
            const message = JSON.parse(payload.body)
            const newTelemetries = message.kvs.map((kv) => {
                return {
                    entityId: message.entityId,
                    ...kv,
                }
            })
            dispatch(updateTelemetries(newTelemetries))
        }

        const onError = (err) => {
            console.log("STOMP: " + err)
            setTimeout(connect, 10000)
            console.log("STOMP: Reconnecting in 10 seconds")
        }

        connect()
    }, [user.id])

    const renderTab = () => {
        switch (Number(currentTab)) {
            case 1:
                return <HomeP />

            case 2:
                return <Profile />

            case 3:
                dispatch(loadRuleNodeDescriptors())
                dispatch(loadDevices())
                return <Devices />

            case 4:
                dispatch(loadTenants())
                return <Tenants />

            case 5:
                dispatch(loadCustomers())
                return <Customers />

            case 6:
                dispatch(loadWidgetsBundles())
                dispatch(loadWidgetTypes())
                return <WidgetsBundles />

            case 7:
                dispatch(loadWidgetsBundles())
                dispatch(loadWidgetTypes())
                dispatch(loadDashboards())
                dispatch(openDashboard({isOpen: false}))
                return <Dashboards />

            case 8:
                dispatch(loadRuleChains())
                dispatch(loadRuleNodeDescriptors())
                dispatch(openRuleNodes({isOpen: false}))
                return <RuleChains />

            default:
                return <HomeP />
        }
    }

    const onChangeTab = (tab) => {
        setCurrentTab(tab.key)
    }

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
                            <Icon type="control" />
                            <span>HomeP</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <div>
                            <Icon type="profile" />
                            <span>Profile</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <div>
                            <Icon type="sliders" />
                            <span>Devices</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <div>
                            <Icon type="apartment" />
                            <span>Tenants</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <div>
                            <Icon type="user" />
                            <span>Customers</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <div>
                            <Icon type="build" />
                            <span>Widgets Bundle</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <div>
                            <Icon type="dashboard" />
                            <span>Dashboards</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <div>
                            <Icon type="share-alt" />
                            <span>Rule Chains</span>
                        </div>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="headerTop">
                    <HeaderDiv />
                </Header>
                <Content
                    style={{
                        padding: "24 0 0 24",
                        minHeight: "100vh",
                    }}
                    className={"mainContent"}
                >
                    {renderTab()}
                </Content>
            </Layout>
        </Layout>
    )
}

export default Home
