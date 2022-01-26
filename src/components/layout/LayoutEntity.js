import React, {useEffect, useState} from "react"
import HeaderDiv from "../../components/header/HeaderDiv"
import {Link} from "react-router-dom"
import {Icon, Layout, Menu} from "antd"
import {useLocation} from "react-router"

const {Header, Sider, Content} = Layout

const LayoutEntity = (props) => {
    const currentPathname = useLocation().pathname
    return (
        <Layout className={`${props.classname}`}>
            <Sider style={{background: "#fff"}} className="sidebar-left">
                <Menu theme="light" mode="inline" selectedKeys={[currentPathname]}>
                    <Menu.Item key="/">
                        <Link to="/">
                            <div>
                                <Icon type="control" />
                                <span>Home</span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/profile">
                        <Link to="/profile">
                            <div>
                                <Icon type="profile" />
                                <span>Profile</span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/devices">
                        <Link to="/devices">
                            <div>
                                <Icon type="sliders" />
                                <span>Devices</span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/tenants">
                        <Link to="/tenants">
                            <div>
                                <Icon type="apartment" />
                                <span>Tenants</span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/customers">
                        <Link to="/customers">
                            <div>
                                <Icon type="user" />
                                <span>Customers</span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/widgets-bundles">
                        <Link to="/widgets-bundles">
                            <div>
                                <Icon type="build" />
                                <span>Widgets Bundle</span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/dashboards">
                        <Link to="/dashboards">
                            <div>
                                <Icon type="dashboard" />
                                <span>Dashboards</span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/rule-chains">
                        <Link to="/rule-chains">
                            <div>
                                <Icon type="share-alt" />
                                <span>Rule Chains</span>
                            </div>
                        </Link>
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
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutEntity
